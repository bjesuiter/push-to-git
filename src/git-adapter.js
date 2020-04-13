import {spawn} from 'child-process-promise';

export function getCurrentBranchName() {
	return spawn('git', ['rev-parse', '--abbrev-ref', 'HEAD'], {
		capture: ['stdout', 'stderr'],
	});
}
