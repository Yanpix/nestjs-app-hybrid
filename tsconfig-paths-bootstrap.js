const fs = require('fs');
let tsConfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8').trim());
// let tsConfig = require('./tsconfig.json');
const tsConfigPaths = require('tsconfig-paths');

const baseUrl = './dist';
tsConfigPaths.register({
    baseUrl,
    paths: tsConfig.compilerOptions.paths
});