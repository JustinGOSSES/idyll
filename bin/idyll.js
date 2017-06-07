#! /usr/bin/env node

const idyll = require('../src/');

var argv = require('yargs')
  .usage('Usage: idyll index.idl')
  .example('$0 index.idl', 'Turn index.idl into output')
  .demandCommand(1)
  .alias({
    m: 'components',
    c: 'css',
    d: 'datasets',
    q: 'defaultComponents',
    f: 'inputFile',
    s: 'inputString',
    l: 'layout',
    n: 'no-minify',
    o: 'output',
    k: 'spellcheck',
    t: 'template',
    e: 'theme',
    w: 'watch'
  })
  .describe('components', 'Directory where components are located')
  .default('components', 'components')
  .describe('css', 'Custom CSS file to include in output')
  .describe('datasets', 'Directory where data files are located')
  .default('datasets', 'data')
  .describe('defaultComponents', 'Directory where default set of components are located')
  .describe('inputFile', 'File containing Idyll source')
  .describe('inputString', 'Idyll source as a string')
  .describe('layout', 'Name of (or path to) the layout to use')
  .default('layout', 'blog')
  .boolean('no-minify')
  .describe('no-minify', 'Skip JS minification')
  .describe('output', 'Directory where built files should be written')
  .default('output', 'build')
  .boolean('spellcheck')
  .default('spellcheck', true)
  .describe('spellcheck', 'Check spelling of Idyll source input')
  .describe('template', 'Path to HTML template')
  .array('transform')
  .describe('transform', 'Custom browserify transforms to apply.')
  .default('transform', [])
  .describe('theme', 'Name of (or path to) the theme to use')
  .default('theme', 'idyll')
  .boolean('watch')
  .describe('watch', 'Monitor input files and rebuild on changes')
  .default('watch', false)
  .alias('h', 'help')
  .argv;

// inputFile can be passed as non-hypenated argument
if (argv._[0]) argv.f = argv.inputFile = argv._[0];

// API checks the inverse
argv.minify = !argv['no-minify'];

// move spellcheck down a level
argv.compilerOptions = {
  spellcheck: argv.spellcheck
};

// delete stuff we don't need
delete argv._;
delete argv['$0'];
delete argv.n;
delete argv.noMinify;
delete argv['no-minify'];
delete argv.k;
delete argv.spellcheck;

// delete undefined keys so Object.assign won't use them
Object.keys(argv).forEach((key) => {
  if (argv[key] === undefined) delete argv[key];
})

idyll(argv).build();
