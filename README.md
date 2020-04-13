# Push to Git (CLI)

This CLI tool is intended to be able to easily push the current branch to some target git repository or branch for deployment.
This is useful for services like resin.io, where pushing code to their git repository is the only way of deploying your app.

This could also be used for DevOps situations where you have 3 branches 'production', 'staging', and 'testing' for example.
Normally you would have to

-   check out the desired deploy target branch,
-   merge your current working branch / feature / bugfix / etc. into it,
-   push the deploy target branch and
-   check back into your working branch to continue work.

This script simplifies this action (for example pushing your current branch to the testing slot) to  
`push-to-git --target origin --branch testing`  
And if you use this cli tool in npm scripts, you can make these deployments even simpler!

## Usage

```

  Usage: push-to-git [options]

  Options:

    -v, --version         output the version number
    -t --target <target>  Git Target to push to, this can be a full git address or a registered git remote name
    -b --branch <branch>  Target branch name to push to, defaults to the same name like input branch
    -e --extra <extra>    A string value with extra git options which should be used
    -m --master           Sets the target branch to master per default
    -d --dry-run          Emulates the upload - useful for checking input params
    -p --production       Sets the production flag which triggers additional checks when uploading
    -f --force            Forces git push
    -h, --help            output usage information

  General Information:
        Version: 1.0.0
        Purpose: Pushes the current branch to an arbitrary branch
                 in the same or in another repository for deployment.

```

## Credits

Package created after  
 https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e

---

## Changelog

All notable changes to this project will be documented here.
The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

### [1.1.4] - 2019-11-14

-   Update dependencies to fix some known security issues

### [1.1.3] - 2019-04-22

-   fix broken xo config

    -   allow backtick-strings
    -   catch parameter naming
    -   space around lines

-   update dependencies

### [1.1.2] - 2019-04-21

-   update dependencies

### [1.1.1] - 2018-08-01

-   updated readme

### [1.1.0] - 2018-08-01

-   extra options for git are now possible

### [1.0.2 + 1.0.3] - 2018-07-06

-   Did some Housekeeping on this repository

#### Added

-   xo package with configuration
-   deploy script in package.json which uses this push-to-git code to push itself to master.

### [1.0.1] - 2018-06-22

#### Added

-   Changelog file
-   fixes binary name in README.md -> Usage

### [1.0.0] - 2018-06-22

Initial Release - See Readme for usage and features
