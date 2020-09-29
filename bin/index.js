#!/usr/local/bin/node



const program = require('commander');
const init = require('../lib/init');

const inquirer = require('inquirer');
const fs = require('fs');
const dataList = [{
    type: 'input',
    name: 'name',
    message: 'name',
    default: ''
}, {
    type: 'input',
    name: 'author',
    message: 'author',
    default: ''
}, {
    type: 'input',
    name: 'remark',
    message: 'remark',
    default: ''
}];
program.version(require('../package.json').version);
program.command('init <name>')
    .description('a simple cli')
    .action(async name => {
        await inquirer.prompt(dataList).then(answer => {
            //重写package.json  ${process.cwd()}获取当前路径
            fs.readFile(`${process.cwd()}/package.json`, (err, data) => {
                if (err) {
                    console.log('读取文件有问题' + err);
                    throw err;
                }
                let _data = JSON.parse(data.toString());
                console.log(_data);
                _data.name = answer.name;
                _data.version = '1.0.0';
                _data.author = answer.author;
                let str = JSON.stringify(_data, null, 4);
                fs.writeFile(`${process.cwd()}/package.json`, str, (err) => {
                    if (err) {
                        throw err;
                    }
                })
            });
            // const packagePath = `${name}/package.json`;
            // const packageJson = fs.readFileSync(packagePath, 'utf-8');
            // const packageResult = handlebars.compile(packageJson)(answer);
            // fs.writeFileSync(packagePath, packageResult);
        }).catch(err => {
            if (err) {
                console.log(err);
                return;
            }
        });
        await init(name);
    });
program.parse(process.argv);