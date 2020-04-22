#!/usr/bin/env node

// Set options as a parameter, environment variable, or rc file.

// This is a hack from the esm package enables es module loading for all other imports in src/cli.js
// eslint-disable-next-line no-global-assign
require = require('esm')(module);
module.exports = require('./src/cli.js');
