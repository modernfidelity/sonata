#!/usr/bin/env node

/**
 *
 * SONATA JS FRAMEWORK
 *
 */

var program = require('commander');

var frameworkVersion = require('./package.json').version;



program
    .version(frameworkVersion)
    .command('startproject [name]', 'Create project folder within the current directory')
    .command('startapp [name]', 'Create app for use within the project')
    .command('startmod [name]', 'Create module for use in & across apps')
    .command('list', 'list apps installed within the current project')

    .parse(process.argv);

// Show help if no option
if (!program.args.length) program.help();



