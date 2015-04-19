#!/usr/bin/env node

/**
 *
 * SONATA JS
 *
 */

var program = require('commander');

//console.log('');
//console.log('sonata framework admin');
//console.log('----------------------');

program
    .version('0.0.2')
    .command('startproject [name]', 'Create project folder within the current directory')
    .command('startapp [name]', 'Create app for use within the project')
    .command('startmod [name]', 'Create module for use in & across apps')
    .command('list', 'list apps installed within the current project')

    .parse(process.argv);

// Show help if no option
if (!program.args.length) program.help();



