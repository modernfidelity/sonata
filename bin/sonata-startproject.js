#!/usr/bin/env node

/**
 *
 * SONATA : Project Generator
 *
 * @type {exports}
 *
 */


var program = require('commander');
var mkdirp = require('mkdirp');
var colors = require('colors/safe');
var os = require('os');
var fs = require('fs');
var path = require('path');
var readline = require('readline');
var sortedObject = require('sorted-object');
var _exit = process.exit;
var eol = os.EOL;

var pkg = require('./../package.json');

var version = pkg.version;

// Re-assign process.exit because of commander
process.exit = exit

// CLI
before(program, 'outputHelp', function () {
    this.allowUnknownOption();
});

program
    .version(version)
    .usage('[options] [dir]')
    //.option('    --git', 'add .gitignore')
    .option('-f, --force', 'force on non-empty directory')
    .parse(process.argv);

if (!exit.exited) {
    main();
}

/**
 * Install a before function; AOP.
 */

function before(obj, method, fn) {
    var old = obj[method];

    obj[method] = function () {
        fn.call(this);
        old.apply(this, arguments);
    };
}

/**
 * Prompt for confirmation on STDOUT/STDIN
 */

function confirm(msg, callback) {
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question(msg, function (input) {
        rl.close();
        callback(/^y|yes|ok|true$/i.test(input));
    });
}

/**
 * Create application at the given directory `path`.
 *
 * @param {String} path
 */

function createProject(app_name, path) {

    var wait = 10;

    console.log();

    function complete() {
        //if (--wait) return;
        //console.log();
        //console.log('   install dependencies:');
        //console.log('     $ cd %s && npm install', path);
        //console.log();
        //console.log('   run the app:');
        //console.log('     $ DEBUG=' + app_name + ':* ./bin/www');
        //console.log();
    }

    // Load Templates
    var app = loadTemplate('js/app.js');
    var index = loadTemplate('js/routes/index.js');



    mkdir(path, function(){

        mkdir(path + '/models');

        mkdir(path + '/views');

        mkdir(path + '/controllers');

        mkdir(path + '/builds');

        mkdir(path + '/routes', function(){
            write(path + '/routes/index.js', index);
            //complete();
        });



        // Template support
        app = app.replace('{views}', program.template);

        // package.json
        var pkg = {
            name: app_name
            , version: '0.0.0'
            , private: true
            , scripts: { start: 'node ./bin/www' }
            , dependencies: {
                'debug': '~2.1.1'
            }
        }

        // sort dependencies like npm(1)
        pkg.dependencies = sortedObject(pkg.dependencies);

        // write files
        write(path + '/package.json', JSON.stringify(pkg, null, 2));

        write(path + '/app.js', app);



        if (program.git) {
            write(path + '/.gitignore', fs.readFileSync(__dirname + '/../templates/js/gitignore', 'utf-8'));
        }

        //complete();

    });

    console.log(colors.green('Success :)'));
    console.log(colors.green('----------'));
    console.log();
}

function copy_template(from, to) {
    from = path.join(__dirname, '..', 'templates', from);
    write(to, fs.readFileSync(from, 'utf-8'));
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

/**
 * Graceful exit for async STDIO
 */

function exit(code) {
    // flush output for Node.js Windows pipe bug
    // https://github.com/joyent/node/issues/6247 is just one bug example
    // https://github.com/visionmedia/mocha/issues/333 has a good discussion
    function done() {
        if (!(draining--)) _exit(code);
    }

    var draining = 0;
    var streams = [process.stdout, process.stderr];

    exit.exited = true;

    streams.forEach(function(stream){
        // submit empty write request and wait for completion
        draining += 1;
        stream.write('', done);
    });

    done();
}

/**
 * Load template file.
 */

function loadTemplate(name) {
    return fs.readFileSync(path.join(__dirname, '..', 'templates', name), 'utf-8');
}

/**
 * Main program.
 */

function main() {

    // Path
    var destinationPath = program.args.shift() || '.';

    // App name
    var appName = path.basename(path.resolve(destinationPath));


    // Generate application
    emptyDirectory(destinationPath, function (empty) {

        if (empty || program.force) {

            createProject(appName, destinationPath);



        } else {
            confirm('destination is not empty, continue? [y/N] ', function (ok) {

                if (ok) {

                    process.stdin.destroy();

                    createProject(appName, destinationPath);



                } else {
                    console.error('aborting');
                    console.log();
                    exit(1);
                }
            });
        }

        console.log();

    });
}

/**
 * echo str > path.
 *
 * @param {String} path
 * @param {String} str
 */

function write(path, str, mode) {
    fs.writeFileSync(path, str, { mode: mode || 0666 });
    console.log(colors.grey('Created') + ' : ' + path);
}

/**
 * Mkdir -p.
 *
 * @param {String} path
 * @param {Function} fn
 */

function mkdir(path, fn) {
    mkdirp(path, 0755, function(err){
        if (err) throw err;
        console.log(colors.grey('Created') + ' : ' + path);
        fn && fn();
    });
}
