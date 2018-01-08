#!/usr/bin/env node

const yargs = require('yargs');
const path = require('path');
const preact2HTML = require('./index');

const argv_config = yargs
    .option('config', {
        alias: 'c',
        describe: 'Configuration file',
        type: 'string'
    })
    .demandOption(['config'], 'Please provide a Configuration file')
    .help()
    .argv

if (argv_config) {
    try {
        const config = require(path.resolve(argv_config.config));
        preact2HTML(config);
    } catch (error) {
        console.log(error.toString())   
    }
}