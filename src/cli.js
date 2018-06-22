#!/usr/bin/env node
const program = require('commander');
const spawn = require('child-process-promise').spawn;
const prompt = require('console-prompt');

// This file is used to upload the current branch to the master of the jb test application for mms on resin.io
// It is needed because there is no cross-plattform way to capture the output of
// a command a to use it in command b from package.json script

program
    .option('-u --user <user>', 'Username to use for pushing, if no git remote is set')
    .option('-a --address <address>', 'Git Address or remote name to push to, if no git remote is set')
    .option('-r --remote <remote>', 'Name of the Git Remote to upload to')
    .option('-b --branch <branch>', 'Branch Name to push to, defaults to the same name like input branch')
    .option('-d --dry-run', 'Emulates the upload - useful for checking input params')
    .option('-m --master', 'Sets the branch to master per default')
    .option('-p --production', 'Sets the production flag which triggers additional checks when uploading')
    .option('-f --force', 'Forces git push');

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    //display the help text in red on the console
    program.outputHelp();
    process.exit(0);
}
//either normal user@url
const user = program.user;
const address = program.address;
// or git remote
const gitRemote = program.remote;
let targetBranch = program.branch;
const force = program.force;
const dryRun = program.dryRun;
const targetBranchDefault = (program.master) ? program.master : false;
const isProduction = program.production;
let hasGitRemote = false;
let gitAddress = undefined;

if (gitRemote === undefined) {
    if (user === undefined) {
        console.error('Git user for upload is undefined!');
        process.exit(1);
    }

    if (address === undefined) {
        console.error('Git address or remote for uploading is undefined!');
        process.exit(1);
    }

    gitAddress = `${user}@${address}`
} else {
    hasGitRemote = true
}

//git command to get the current branch name: git rev-parse --abbrev-ref HEAD
spawn('git', ['rev-parse', '--abbrev-ref', 'HEAD'], {capture: ['stdout', 'stderr']})
    .then((result) => {
    const currGitBranch = result.stdout.toString().trim();

if (!currGitBranch) {
    console.error('Current git branch is undefined!');
    process.exit(1);
}

if (targetBranch === undefined) {
    targetBranch = (targetBranchDefault) ? 'master' : currGitBranch;
}

console.log(`Push current git branch [${currGitBranch}] to ${targetBranch} of: \n` +
    `${(hasGitRemote) ? gitRemote : gitAddress}`);

const gitParams = [
    'push'
];

if (force) {
    gitParams.push('-f');
}

gitParams.push(`${(hasGitRemote) ? gitRemote : gitAddress}`);
gitParams.push(`${currGitBranch}:${targetBranch}`);

console.log(`The exact command is: 
        git ${gitParams.join(' ')}`);

if (isProduction) {
    return prompt(`CAUTION: You are updating a production branch! Proceed? (yes | NO) `)
        .then((value) => {
        if (value === 'yes' || value === 'y') {
        return runGitPush(gitParams)
    } else {
        console.log('Update canceled by user');
    }
});
} else {
    return runGitPush(gitParams);
}
}).catch(function (err) {
    const error = (err.stderr) ? err.stderr : err;
    console.error('Execution Errors: ', error);
});

function runGitPush(gitParams) {
    if (dryRun) {
        console.log('Dry Run finished');
        process.exit(0);
    }

    const gitPromise = spawn('git', gitParams);
    const childProcess = gitPromise.childProcess;

    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);

    return gitPromise;
}
