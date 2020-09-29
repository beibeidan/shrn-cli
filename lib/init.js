const { promisify } = require('util');
const figlet = promisify(require('figlet'));


const conlog = (con) => {
    console.log(con);
}
const clone = require('../lib/download');

const init = async function(name) {

    // clone(`github:beibeidan/sr-template`, name);
    const data = await figlet(name + ' ' + 'welcome');
    conlog(data);

}

module.exports = init;