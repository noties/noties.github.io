'use strict';

const fs = require('fs');
const path = require('path');

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
const deepFreeze = (obj) => {

    if (Object.isFrozen(obj)) {
        return obj;
    }

    for (let name of Object.getOwnPropertyNames(obj)) {
        const value = obj[name];
        const type = value && typeof value;
        if (type === 'object') {
            obj[name] = deepFreeze(value);
        }
    }

    return Object.freeze(obj);
}

const $config = deepFreeze({
    // where posts are
    pagesDirectory: 'posts/',
    // output will be placed in this directory
    distributionDirectory: 'www/',
    // assets that will be copied
    publicDirectory: 'public'
});

const fileContents = (() => {
    const cache = {};
    // const path = require('path');
    return (file, dirname = __dirname) => {
        const p = path.join(file, dirname);
        let content = cache[p];
        if (!content) {
            content = cache[p] = removeHtmlComments(readFileSync(file, dirname));
        }
        return content;
    }
})();

const $globalFunctions = deepFreeze({

    $include: (context, file, props = {}) => {

        let content = fileContents(file);

        const includeContext = {
            ...context,
            props
        };

        // read content and eval scripts given the supplied context
        content = evalScripts(includeContext, content);

        // if it's markdown -> process markdown
        // NB, currently only *.md extension
        if (/.+?\.md/.test(file)) {
            content = markdown(content);
        }

        // no need to beautify here, it should be done on the final document
        return content;
    },

    $withBase: (url) => {

        // change that... let's go with env variables instead of this
        if ($site.url) {
            return `${url}`;
        }

        // for file:/// scheme, remove leading slash
        if (url[0] === '/') {
            return url.substring(1);
        }
        return url;
    },

    $nextPage(site, page) {
        const { pages } = site;
        const index = pages && pages.indexOf(page) + 1;
        if (index >= 0 && index < pages.length) {
            return pages[index];
        }
    },

    $previousPage(site, page) {
        const { pages } = site;
        const index = pages && pages.indexOf(page) - 1;
        if (index >= 0 && index < pages.length) {
            return pages[index];
        }
    },

    $formatDate(date) {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return date.toLocaleDateString('en-US', options);
    },

    $findPage(file) {
        const page = this.$pages.filter(p => file === p.file)[0];
        if (!page) {
            throw `Cannot find page{${file}} referenced in file{${this.$page.file}}`
        }
        return page;
    },

    $includeVideo(file) {

        const poster = file + '-preview.jpg';
        const video = file + '.mp4';

        (() => {
            const missing = [poster, video]
                .filter(f => {
                    return !fs.existsSync(path.join(__dirname, 'public', f));
                });
            if (missing && missing.length > 0) {
                throw `Cannot include video, files missing: ${missing}`
            }
        })();

        return `
<video controls="true" loop poster="${this.$withBase(poster)}">
    <source src="${this.$withBase(video)}" type="video/mp4">
    You browser does not support mp4 playback, try downloading 
    video file <a href="${this.$withBase(video)}">directly</a>
</video>
        `
    }
})

// switch `/` and actual url for dev & prod builds
const $site = deepFreeze({
    // url: 'https://noties.github.io',
    url: 'https://noties.io',
    title: 'Di\'s blog',
    author: 'Dimitry Ivanov'
});

// utility function to read a file
const readFileSync = (file, directory = __dirname) => {
    return fs.readFileSync(path.join(directory, file), { encoding: 'utf-8' });
}

// remove all html comments from supplied input (useful to no mess with the commented eval scripts)
const removeHtmlComments = (html) => {
    return html.replace(/(<!--)([\s\S]+?)(-->)/gm, '');
}

const layoutTemplate = (layout) => {
    return fileContents(`templates/${layout}.template.html`);
}

// highlight code inside, takes language and code produces html
const highlight = (() => {

    const prism = require('prismjs');
    const loadLanguages = require('prismjs/components/');

    return (language, code) => {

        if (!language) {
            return code;
        }

        let grammar = prism.languages[language];
        if (!grammar) {
            loadLanguages([language]);
            grammar = prism.languages[language];
        }

        if (!grammar) {
            // we need language for styling
            if (language !== 'noop') {
                console.warn(`No grammar for language: '${language}' is found`);
            }
            return code;
        }

        return prism.highlight(code, grammar, language);
    }
})();

// process markdown via commonmark, takes text produces html
const markdown = (() => {

    const commonmark = require('commonmark');
    const parser = new commonmark.Parser();
    const renderer = new commonmark.HtmlRenderer({ safe: false });

    // hm, we have to override this one, as we should be able to emit html content
    renderer.code_block = function (node) {
        var info_words = node.info ? node.info.split(/\s+/) : []
            , attrs = this.attrs(node);
        if (info_words.length > 0 && info_words[0].length > 0) {
            attrs.push(['class', 'language-' + this.esc(info_words[0], false)]);
        }
        this.cr();
        this.tag('pre');
        this.tag('code', attrs);
        this.lit(node.literal);
        this.tag('/code');
        this.tag('/pre');
        this.cr();
    };

    const processInfo = (info) => {

        if (!info) {
            info = 'noop';
        }

        let outInfo;
        let outLines;

        const start = info.indexOf('{');
        if (start >= 0) {
            outInfo = info.substring(0, start);
            outLines = info.substring(start + 1, info.length - 1)
                .split(',')
                .reduce((p, c) => {
                    // 1,2,3,4-19
                    const pairs = c.split('-');
                    if (pairs.length === 1) {
                        // single entry
                        p.push(parseInt(pairs[0]));
                    } else {
                        for (let i = parseInt(pairs[0]), length = parseInt(pairs[1]); i <= length; i++) {
                            p.push(i);
                        }
                    }
                    return p;
                }, [])
                .sort();
        } else {
            outInfo = info;
        }

        return {
            info: outInfo,
            highlightLines: outLines
        };
    }

    return (content) => {

        const document = parser.parse(content);
        const iterator = document.walker();

        let event, node;

        while (event = iterator.next()) {
            if (event.entering) {
                node = event.node;
                if ('code_block' === node.type) {

                    // we need language for styling
                    const { info, highlightLines } = processInfo(node.info);

                    node.info = info;
                    node.literal = highlight(info, node.literal);

                    if (highlightLines) {
                        const lines = node.literal.split('\n');
                        const processed = []
                        // 1-based to display, 0-based internally
                        for (let i = 0; i < lines.length; i++) {
                            if (highlightLines.indexOf(i + 1) >= 0) {
                                processed.push(lines[i]);
                            } else {
                                processed.push(`<span class="code-fade">${lines[i]}</span>`);
                            }
                        }
                        node.literal = processed.join('\n');
                    }
                }
            }
        }

        // safe=false to include html
        return renderer.render(document, { safe: false });
    }
})();

// post-process HTML
const beautify = (() => {

    const beatify = require('js-beautify').html;
    const config = JSON.parse(readFileSync('js-beautify.config.json'));

    return (html) => beatify(html, config);
})();

// takes input, removes html comments, evals scripts inside given the context, 
// returns content (actual type doesn't matter, it can be html or markdown, or whatever, but text of cause)
const evalScripts = (context, content) => {

    // patterns (regex) to find eval scripts inside content
    // currently supports `{{ js }}` and `<script $> js </script>` patterns
    // (<script $> is added for the syntax-highlight in editor) 
    const patterns = [
        /({{)([\s\S]+?)(}})/gm,
        /(<script \$>)([\s\S]+?)(<\/script>)/gm
    ];

    // evals supplied `js` with supplied context as this
    const evalInContext = (context, js) => {
        return function (js) {
            try {
                return eval(js);
            } catch (e) {
                console.error(`Error evaluating script`);
                console.error(js);
                throw e;
            }
        }.call(context, js);
    }

    // regex takes group[2] as the actual content of a script
    const process = (regex, content) => {
        let script;
        while (script = regex.exec(content)) {
            // eval script
            const replaced = evalInContext(context, script[2]) || ''
            // replace it in original content (updating content)
            content = (content.substring(0, script.index) +
                replaced +
                content.substring(script.index + script[0].length));
            // store last index in regex
            regex.lastIndex = script.index;
        }
        return content;
    }

    return patterns
        .reduce((content, regex) => process(regex, content), removeHtmlComments(content));
}

const extractPages = (() => {

    const frontMatter = require('yaml-front-matter');

    const func = (dir) => {
        let pages = [];
        if (fs.existsSync(dir)) {
            fs.readdirSync(dir).forEach(f => {
                const p = path.join(dir, f);
                if (fs.lstatSync(p).isDirectory()) {
                    pages = pages.concat(func(p));
                } else {
                    // so, frontmatter should not define these properties: file, directory, path
                    pages.push({
                        ...frontMatter.loadFront(readFileSync(f, dir)),
                        file: f,
                        directory: dir,
                        path: p
                    });
                }
            });
        }
        return pages;
    }

    return () => {
        return func(path.join(__dirname, $config.pagesDirectory));
    };
})();

const processExcerpt = (content) => {

    const pattern = /\<p\s+\$excerpt\>(.*?)\<\/p\>/
    const result = pattern.exec(content);

    if (result) {
        const excerpt = content.substring(0, result.index);
        return {
            content: excerpt + '<p id="excerpt-continue"></p>' + content.substring(result.index + result[0].length),
            excerpt,
            excerptLabel: result[1] || 'Continue'
        }
    }

    return {
        content
    }
}

const preparePage = (pages, page) => {

    // validate that required fields are present:
    // * title
    // * date
    // * url
    (() => {
        const missing = ['file', 'directory', 'title', 'date', 'url'].filter(s => !(s in page))
        if (missing.length > 0) {
            throw `Page is missing required arguments: ${missing}, page: ${JSON.stringify(page)}`;
        }
    })();

    const context = deepFreeze({
        $site,
        $page: {
            ...page,
            author: page.author || $site.author,
            __content: null
        },
        $pages: pages,
        ...$globalFunctions
    });

    let content;
    try {
        content = markdown(evalScripts(context, page.__content));
    } catch (e) {
        console.error(`Error processing page: ${page.path}`);
        console.error(page);
        throw e;
    }

    const excerpt = processExcerpt(content);

    return {
        ...context.$page,
        ...excerpt
    };
}

const prepareDistributionDirectory = (() => {

    const func = (dir, file) => {
        const p = path.join(dir, file);
        if (fs.lstatSync(p).isDirectory()) {
            fs.readdirSync(p).forEach(f => func(p, f));
            fs.rmdirSync(p);
        } else {
            fs.unlinkSync(p);
        }
    };

    return () => {
        const p = path.join(__dirname, $config.distributionDirectory);
        if (!fs.existsSync(p)) {
            // if dist does not exist -> create
            fs.mkdirSync(p);
        } else {
            // else clean it's contents, but keep itself
            fs.readdirSync(p).forEach(f => func(p, f));
        }
        return p;
    };
})();

// TODO:
// * hash function that we can use for the assets (attach file hash to href attribute)
// * rss feed
// * postcss our css

const renderPage = (site, page) => {

    const layout = layoutTemplate(page.layout || 'page');
    const context = deepFreeze({
        $site: site,
        $page: page,
        ...$globalFunctions
    });

    let html;
    try {
        html = beautify(evalScripts(context, layout));
    } catch (e) {
        console.error(`Error rendering page ${page.path}`);
        console.error(page);
        throw e;
    }

    return {
        ...page,
        html
    }
}

const renderPages = () => {

    const rawPages = extractPages()
        .filter(p => !!!p.draft);

    const pages = rawPages
        .map(p => preparePage(rawPages, p))
        .sort(({ date: a }, { date: b }) => a - b);

    if (pages.length === 0) {
        // nothing to do
        throw 'No pages found';
    }

    const site = {
        ...$site,
        pages
    }

    return pages.map(p => renderPage(site, p));
}

const renderIndex = (pages) => {

    const layout = layoutTemplate('index');

    // for index pages are reversed
    const context = deepFreeze({
        $site,
        $pages: pages.slice().reverse(),
        ...$globalFunctions
    });

    let content;
    try {
        content = beautify(evalScripts(context, layout));
    } catch (e) {
        console.error('Error rendering index');
        throw e;
    }

    return content;
}

const copyPublicFiles = (distFolder) => {

    const publicFolder = path.join(__dirname, 'public');

    // if public doesn't exist -> ignore
    if (!fs.existsSync(publicFolder)) {
        return
    }

    const process = (origin, target) => {

        if (!fs.existsSync(target)) {
            fs.mkdirSync(target);
        }

        fs.readdirSync(origin).forEach(f => {
            // ignore dot-files
            if (f[0] !== '.') {
                const originFile = path.join(origin, f);
                const targetFile = path.join(target, f);
                if (fs.lstatSync(originFile).isDirectory()) {
                    process(originFile, targetFile);
                } else {
                    console.log(`copy ${originFile} -> ${targetFile}`);
                    // here we can execute our custom logic on top of files (like postcss)
                    fs.copyFileSync(originFile, targetFile);
                }
            }
        });
    }

    process(publicFolder, distFolder);
}

const createIndexFile = (distFolder, index) => {
    const file = path.join(distFolder, 'index.html');
    fs.writeFileSync(file, index, { encoding: 'utf-8' });
}

const createPages = (distFolder, pages) => {

    const createPage = (page) => {

        const parts = page.url.split('/').filter(s => !!s);

        let currentPath = distFolder;

        // last segment is file
        for (let i = 0; i < parts.length - 1; i++) {
            currentPath = path.join(currentPath, parts[i]);
            if (!fs.existsSync(currentPath)) {
                fs.mkdirSync(currentPath);
            }
        }

        fs.writeFileSync(path.join(currentPath, parts[parts.length - 1]), page.html, { encoding: 'utf-8' });
    }

    pages.forEach(createPage);
}

const createRSS = (distFolder, pages) => {
    const builder = require('xmlbuilder');
    const json = {
        'rss': {
            '@version': '2.0',
            'channel': {
                'title': $site.title,
                'link': $site.url,
                'description': $site.title,
                'item': pages.slice().reverse().map(p => {
                    return {
                        'title': p.title,
                        'description': '',
                        'link': $site.url + p.url,
                        'pubDate': $globalFunctions.$formatDate(p.date)
                    }
                })
            }
        }
    }
    const rss = builder.create(json, { encoding: 'utf-8' }).end({ pretty: true });
    const file = path.join(distFolder, 'rss.xml');
    fs.writeFileSync(file, rss, { encoding: 'utf-8' });
}

const pages = renderPages();
const index = renderIndex(pages);

const dist = prepareDistributionDirectory();

copyPublicFiles(dist);

createIndexFile(dist, index);

createPages(dist, pages);

createRSS(dist, pages);
