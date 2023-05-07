const fs = require('fs');
const distPath = __dirname + '/project-dist/';
const stylesPath = __dirname + '/styles/';

fs.mkdir(__dirname + '/project-dist', { recursive: true }, (err) => {
    if (err) {
        console.error(err);
    }
})

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

start('style.css');

async function copyDist(dist, copy) {
    try {
        await fs.promises.mkdir(copy, { recursive: true });
        const assets = await fs.promises.readdir(dist, { withFileTypes: true });
        for (let i of assets) {
            if (i.isFile()) {
                await fs.promises.copyFile(`${dist}/${i.name}`, `${copy}/${i.name}`);
            } else {
                await copyDist(`${dist}/${i.name}`, `${copy}/${i.name}`);
            }
        }
    } catch (err) {
        console.log(err);
    }
}

copyDist(__dirname + '/assets', __dirname + '/project-dist/assets');

fs.copyFile(__dirname + '/template.html', __dirname + '/project-dist/index.html', err => {
    if (err) {
        console.log(err);
    }
});

function addComponents() {
    fs.readFile(__dirname + '/template.html', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        }
    
        let info = data;
    
        for (let i of data.match(/{{\w+}}/g)) {
            const componentsPath = __dirname + `/components/${i.slice(2, -2)}.html`;
    
            fs.readFile(componentsPath, 'utf-8', (err, dataComponents) => {
                if (err) {
                    console.log(err);
                }
    
                info = info.replace(i, dataComponents);
    
                fs.rm(__dirname + '/project-dist/index.html', { recursive: true }, err => {
                    if (err) {
                        console.error(err);
                    }
                    
                    fs.createWriteStream(__dirname + '/project-dist/index.html').write(info);
                });
            });
        }
    });
}

addComponents();
