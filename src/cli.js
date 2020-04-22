import program from 'commander';
import {spawn} from 'child-process-promise';
import prompt from 'console-prompt';
import projectVersion from 'project-version';

// This file is used to upload the current branch to the master of the jb test application for mms on resin.io
// It is needed because there is no cross-platform way to capture the output of
// a command a to use it in command b from package.json script

program
	.version(projectVersion, '-v, --version')
	.option(
		'-t --target <target>',
		'Git Target to push to, this can be a full git address or a registered git remote name'
	)
	.option('-b --branch <branch>', 'Target branch name to push to, defaults to the same name like input branch')
	.option('-e --extra <extra>', 'A string value with extra git options which should be used')
	.option('-m --master', 'Sets the target branch to master per default')
	.option('-d --dry-run', 'Emulates the upload - useful for checking input params')
	.option('-p --production', 'Sets the production flag which triggers additional checks when uploading')
	.option('-f --force', 'Forces git push');

program.on('--help', () => {
	console.log(
		`\n  General Information: 
        Version: ${projectVersion}
        Purpose: Pushes the current branch to an arbitrary branch 
                 in the same or in another repository for deployment.
       `
	);
});

program.parse(process.argv);

if (process.argv.slice(2).length === 0) {
	// Display the help text in red on the console
	program.outputHelp();

	// eslint-disable-next-line unicorn/no-process-exit
	process.exit(0);
}

// Git address like or git remote name
// Format: protocol://user@git-repo.address/path.git OR remote-name (like "origin")
const gitTarget = program.target;
let gitTargetBranch = program.branch;
const targetBranchDefault = program.master ? program.master : false;
const extraOptions = program.extra;
const force = program.force;
const dryRun = program.dryRun;
const isProduction = program.production;

if (gitTarget === undefined) {
	console.error('Git target address or remote name is missing');
	process.exit(1);
}

function runGitPush(gitParameters) {
	if (dryRun) {
		console.log('Dry Run finished');
		process.exit(0);
	}

	const gitPromise = spawn('git', gitParameters);
	const {childProcess} = gitPromise;

	childProcess.stdout.pipe(process.stdout);
	childProcess.stderr.pipe(process.stderr);

	return gitPromise;
}

// Git command to get the current branch name: git rev-parse --abbrev-ref HEAD
spawn('git', ['rev-parse', '--abbrev-ref', 'HEAD'], {
	capture: ['stdout', 'stderr'],
})
	.then(result => {
		const currGitBranch = result.stdout.toString().trim();

		if (!currGitBranch) {
			console.error('Current git branch is undefined!');
			process.exit(2);
		}

		if (gitTargetBranch === undefined) {
			gitTargetBranch = targetBranchDefault ? 'master' : currGitBranch;
		}

		console.log(`Push current git branch [${currGitBranch}] to ${gitTargetBranch} of: \n` + `${gitTarget}`);

		const gitParameters = ['push'];

		if (force) {
			gitParameters.push('-f');
		}

		if (extraOptions !== undefined) {
			gitParameters.push(extraOptions);
		}

		gitParameters.push(`${gitTarget}`);
		gitParameters.push(`${currGitBranch}:${gitTargetBranch}`);

		console.log(`The exact command is: 
        git ${gitParameters.join(' ')}`);

		if (isProduction) {
			return prompt(`CAUTION: You are updating a production branch! Proceed? (yes | NO) `).then(value => {
				if (value === 'yes' || value === 'y') {
					return runGitPush(gitParameters);
				}

				console.log('Update canceled by user');
			});
		}

		return runGitPush(gitParameters);
	})
	.catch(error => {
		const err = error.stderr ? error.stderr : error;
		console.error('Execution Errors:', err);
	});
