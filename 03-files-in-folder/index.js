const { readdir } = require('fs/promises');
const path = require('path');
const fs = require('fs');
const folder = path.resolve(__dirname, 'secret-folder');

async function getInfo() {
    const files = await readdir(folder, {withFileTypes: true});
    for (const file of files) {
        if (file.isFile()) {
            fs.stat(path.join(folder, file.name), (err, stats) => {
                err ? console.log(err) : console.log(`${file.name.split('.')[0]} - ${file.name.split('.')[1]} - ${stats.size}b`);
            });
        }
    }     
}

getInfo();
