# Deploy to Git (CLI)
This CLI tool is intended to be able to easily push the current branch to some target git repository or branch for deployment. 
This is useful for services like resin.io, where pushing code to their git repository is the only way of deploying your app. 



## Usage

- 2 Modes: same-repo mode (with remote and target branch) and external repo mode (with repo address and login user)

### Output of deploy-to-git --help 
```

  Usage: deploy-to-git [options]

  Options:

    -v, --version         output the version number
    -t --target <target>  Git Target to push to, this can be a full git address or a registered git remote name
    -b --branch <branch>  Target branch name to push to, defaults to the same name like input branch
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