#!/usr/bin/env node

/**
 *
 * START PROJECT
 *
 * @type {exports}
 */

// Includes
var program = require('commander');
var fs = require('fs-extra');
var colors = require('colors');
var config = require('./sonata-config.js');

// Variables
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
pkgs.forEach(function (pkg) {


    var path = dir + pkg;

    // Main folder
    if (fs.existsSync(path)) {

        console.log("  Error : Project exists in this location...".red);


    } else {

        fs.mkdir(path);

        fs.mkdir(path + "/.sonata");

        var stream = fs.createWriteStream(dir + pkg + "/.sonata/config");

        stream.once('open', function (fd) {

            stream.write("version : " + config.version() + "\n");
            stream.end();
        });

        console.log(colors.green('  Creating Project: %s'), pkg);

    }


});

console.log();