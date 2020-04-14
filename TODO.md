# TODO

Internal plan for improving this package.

1. Install esm and convert cli.js to esm module and run with `node -r esm src/cli.js` ✅
2. Prerequisite for 3.: Write AVA Tests for cli.js to check functionality.
3. Update commander to version 5.0.0 and check, if tests do still run.

Breaking Change:

-   remove -m option to make master default target branch and simply push to master when no target branch is given
-   add flag -c/ --targetCurrentBranch = pushes the current branch to a remote branch with the same name
