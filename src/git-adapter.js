import {spawn} from 'child-process-promise';

/**
 * Git command to get the current branch name: git rev-parse --abbrev-ref HEAD
 */
export async function getCurrentBranchName() {
	const result = await spawn('git', ['rev-parse', '--abbrev-ref', 'HEAD'], {
		capture: ['stdout', 'stderr'],
	});

	return result.stdout.toString().trim();
}

/**
 * @param extraGitOptions string which gets appended to the git push command
 */
export function assembleGitPush(targetUrl, sourceBranch, targetBranch, force, extraGitOptions) {
	const gitParameters = ['push'];

	if (force) {
		gitParameters.push('-f');
	}

	if (extraGitOptions !== undefined) {
		gitParameters.push(extraGitOptions);
	}

	gitParameters.push(`${targetUrl}`);
	gitParameters.push(`${sourceBranch}:${targetBranch}`);

	return gitParameters;
}

export function gitPush(gitParameters) {
	const gitPromise = spawn('git', gitParameters);
	const {childProcess} = gitPromise;

	childProcess.stdout.pipe(process.stdout);
	childProcess.stderr.pipe(process.stderr);

	return gitPromise;
}
