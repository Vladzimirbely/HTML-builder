const fs = require('fs');
const distPath = __dirname + '/project-dist/';
const stylesPath = __dirname + '/styles/';

async function start(stylesBundleName) {
    const filesNames = await fs.promises.readdir(stylesPath);
    let content = '';
   
    for (let i = 0; i < filesNames.length; i++) {
        if (/\.css/.test(filesNames[i])) {
            content += await readFile(stylesPath + filesNames[i]);
        }
    }

    createFile(distPath + stylesBundleName, content);
}

function createFile(path, data) {
    return fs.promises.writeFile(path, data)
        .then(() => {
            console.log("The file was saved!");
        })
        .catch(err => {
            console.log('create', err);
        })
}

function readFile(path) {
    return fs.promises.readFile(path)
        .catch(err => {
            console.log('read', err);
        })

}

start('bundle.css');
