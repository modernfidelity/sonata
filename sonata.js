#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');

console.log('');
console.log('sonata framework admin');
console.log('----------------------');

program
    .version('0.0.1')
    .command('startproject [name]', 'install one or more packages')
    .command('startapp [name]', 'search with optional query')
    .command('list', 'list apps installed within the current project')

    .parse(process.argv);

// Show help if no option
if (!program.args.length) program.help();



