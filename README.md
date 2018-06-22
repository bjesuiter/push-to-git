# Deploy to Git (CLI)
This CLI tool is intended to be able to easily push the current branch to some target git repository or branch for deployment. 
This is useful for services like resin.io, where pushing code to their git repository is the only way of deploying your app. 



## Usage

- 2 Modes: same-repo mode (with remote and target branch) and external repo mode (with repo address and login user)

### Output of deploy-to-git --help 
```
   Usage: deploy-to-git [options]
 
   Options:
 
     -v, --version           output the version number
     -u --user <user>        Username to use for pushing, if no git remote is set
     -a --address <address>  Git Address or remote name to push to, if no git remote is set
     -r --remote <remote>    Name of the Git Remote to upload to
     -b --branch <branch>    Branch Name to push to, defaults to the same name like input branch
     -d --dry-run            Emulates the upload - useful for checking input params
     -m --master             Sets the branch to master per default
     -p --production         Sets the production flag which triggers additional checks when uploading
     -f --force              Forces git push
     -h, --help              output usage information
 
  General Information: 
         Version: 1.0.0
```

## Credits
Package created after  
 https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e