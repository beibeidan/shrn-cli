const { promisify } = require('util')
const download = promisify(require('download-git-repo'));
const ora = require('ora');
const chalk = require('chalk');

const clone = async function(repo, name) {
    const process = ora('start').start();
    process.text = `downloading... ${ repo }`;
    try {
        await download(repo, name);
        process.succeed();
        console.log(chalk.green(process.text = 'download completed'));
    } catch {
        process.fail();
        console.log(chalk.red(process.text = 'download failed'));
    }

}

module.exports = clone;