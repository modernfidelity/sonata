#!/usr/bin/env node

/**
 *
 * START PROJECT
 *
 * @type {exports}
 */

var program = require('commander');
var fs = require('fs-extra');
var dir = "./";

program
    .option('-f, --force', 'force installation')
    .parse(process.argv);

var pkgs = program.args;

if (!pkgs.length) {
    console.error('Project name required');
    process.exit(1);
}

console.log();

if (program.force) console.log('  force: install');


// Create 'named' project folder
pkgs.forEach(function(pkg){


    // Main folder
    fs.mkdir(dir + pkg);

    // Sub folders
    fs.mkdir(dir + pkg + "/.sonata");

    var stream = fs.createWriteStream(".info");

    stream.once('open', function(fd) {
        stream.write("My first row\n");
        stream.write("My second row\n");
        stream.end();
    });

    console.log('  Creating Project: %s', pkg);

});

console.log();