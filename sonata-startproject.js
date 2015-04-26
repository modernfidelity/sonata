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


/**
 * Load template file.
 */

function loadTemplate(name) {
    return fs.readFileSync(path.join(__dirname, '..', 'templates', name), 'utf-8');
}

/**
 * Check if the given directory `path` is empty.
 *
 * @param {String} path
 * @param {Function} fn
 */

function emptyDirectory(path, fn) {
    fs.readdir(path, function(err, files){
        if (err && 'ENOENT' != err.code) throw err;
        fn(!files || !files.length);
    });
}








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

        // Create project files + folders
        fs.mkdir(path);
        fs.mkdir(path + "/.sonata");
        fs.mkdir(path + "/builds");
        fs.mkdir(path + "/modules");

        var stream = fs.createWriteStream(dir + pkg + "/.sonata/config");

        stream.once('open', function (fd) {

            stream.write("version : " + config.version() + "\n");
            stream.end();
        });

        console.log(colors.green('  Creating Project: %s'), pkg);

    }


});

console.log();