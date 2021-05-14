---
title: Automatic variable name for logging
---

Logging variables in Java or Kotlin in most of the cases end up with duplicated
content - one have to specify variable name first and then the variable itself:

```kotlin
Debug.i("index: $index, value: $value, direction: ${vector.direction}")
```

```java
Debug.i("index: %s, value: %s, direction: %s", index, value, vector.direction);
```

Typing each variable twice takes time, slows down and 
seem to have a room for improvement. What if...

![Enumerate with Live Templates]({{ this.$withBase('/assets/gif/live-enumerate.gif') }})

<p $excerpt></p>

[Intellij Live Templates](https://www.jetbrains.com/help/idea/using-live-templates.html)
can _autocomplete_ certain  actions to enhance code. For example,
[Debug](https://github.com/noties/Debug) Android logging library contains 
a live template to automatically generate a log statement with all method parameters. 

![Debug]({{ this.$withBase('/assets/gif/live-debug-template.gif') }})

This live template is implemented with a Groovy script. It receives a list
of method parameters and turns them into a logging statement. The code, adjusted
to the requirements for Groovy scripts in live templates, looks like this:

```groovy
def a = _1.collect{ it + \": %s\"}.join(\", \"); 
def b = _1.collect{ it }.join(\", \"); 
def c = '\"' + a + '\", ' + b; 
c
```

Most of the information on Live Templates focus on abbreviations. 
For example, when you type `abbr` a live template will be triggered.
But there is also another type - surrounding live templates. They are
triggered by code selection and a special shortcut: `⌥+⌘+J`. This
makes selected code available as an _input_ for a live template.

A minimum sample, that takes selection and returns it unmodified
will look like:
```
groovyScript("_1", SELECTION)
```

Now, let's take an enumeration of variables and turn them into
a logging statement:

```groovy
// Java
// `pattern` represent first argument to the String.format() call
def pattern = _1.split(', *')
  .collect { '' + it + ': %s' }
  .join(', ');
'java.lang.String.format(\"' + pattern + '\", ' + _1 + ')';
```

```groovy
// Kotlin
'' + ((char) 34) + _1.split(', *')
  .collect { '' + it + '=' + '${' + it + '}' }
  .join(', ') + ((char) 34);
```

Note that scripts might look a bit more cryptic than Groovy itself.
This comes from a limitation that seem to be applied to groovy scripts
in live templates - cannot use unescaped double quote symbol `"`.
`(char) 34` is just double quote symbol with a twist.

The full live templates variables for both Java and Kotlin respectively:

```
groovyScript("def pattern = _1.split(', *').collect { '' + it + ': %s' }.join(', '); 'java.lang.String.format(\"' + pattern + '\", ' + _1 + ')';", SELECTION)
```

```
groovyScript("'' + ((char) 34) + _1.split(', *').collect { '' + it + '=' + '${' + it + '}' }.join(', ') + ((char) 34);", SELECTION)
```
