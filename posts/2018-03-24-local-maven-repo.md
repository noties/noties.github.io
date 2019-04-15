---
title: "Local Maven repository"
date: 2018-03-24
url: /blog/2018/03/24/local-maven-repo/index.html
---

With a little help of Gradle one can have a local Maven repository literally with a single line of code in the build configuration file:

```groovy
repositories {
    maven { url 'file:///Users/me/.maven-local' }
}
```

It can be used to _release_ your local artifacts also. For example, if you are using [gradle-mvn-push](https://github.com/chrisbanes/gradle-mvn-push):

```groovy
if (project.hasProperty('local') {
    ext.RELEASE_REPOSITORY_URL = 'file:///Users/me/.maven-local'
}
```

```noop
./gradlew upA -Plocal
```

<em>BTW `upA` here stands for `uploadArchives` but Gradle allows us to shorten task name a bit</em>

<p $excerpt></p>

If this repository is intended to be used by multiple projects it's better to introduce a system variable, so there is little to none of copy/paste. Head to the `gradle.properties` file in your HOME directory (create one if it's missing) and add a line:

```noop
LOCAL_MAVEN_URL=file:///Users/me/.maven-local
```

Then we can use this variable in all our Gradle scripts:

```groovy
repositories {
    maven { url LOCAL_MAVEN_URL }
}
```
