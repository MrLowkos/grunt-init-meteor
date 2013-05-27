/*
 * grunt-init-meteor
 * https://gruntjs.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'Create a Meteor applacation in Coffeescript or Javascript, including Jasmine unit tests, karma.js ...';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'gruny-init-meteor should ' +
  'be a unique ID not already in use at search.npmjs.org.';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You should now install project dependencies with _npm ' +
  'install_. After that, you may execute project tasks with _grunt_. For ' +
  'more information about installing and configuring Grunt, please see ' +
  'the Getting Started guide:' +
  '\n\n' +
  'http://gruntjs.com/getting-started';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({type: 'meteor'}, [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('description', 'Coming soon'),
    init.prompt('version'),
    init.prompt('git_username', 'MrLowkos'),
    init.prompt('homepage'),
    init.prompt('bugs'),
    init.prompt('licenses', 'MIT'),
    init.prompt('author_name', 'Quentin Defois'),
    init.prompt('author_email', "qdefois@gmail.com"),
    init.prompt('author_url', 'http://eldotk.com'),
    init.prompt('node_version', '>= 0.8.0'),
    init.prompt('main', './'),
    init.prompt('npm_test', 'grunt karma/jasmine'),
    {
      name: 'travis',
      message: 'Will this project be tested with Travis CI?',
      default: 'y/N',
      warning: 'If selected, you must enable Travis support for this project in https://travis-ci.org/profile'
    }
  ], function(err, props) {
    props.keywords = [];
    props.devDependencies = {
    };

    // TODO: compute dynamically?
    props.travis = /y/i.test(props.travis);
    props.travis_node_version = '0.10';
    props.repository = 'git://github.com/'+ props.git_username +'/'+ props.name +'.git';

    // Files to copy (and process).
    var files = init.filesToCopy(props);
    if (!props.travis) { delete files['.travis.yml']; }

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file.
    // init.writePackageJSON('package.json', props);

    // All done!
    done();
  });

};