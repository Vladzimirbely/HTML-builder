const fs = require('fs');

async function copyDirectory() {
    try {
        await fs.promises.rm(__dirname + '/files-copy', { recursive: true });
    } catch (err) {
    }
    
    await fs.promises.mkdir(__dirname + '/files-copy', { recursive: true });

    const dir = await fs.promises.readdir(__dirname + '/files', { withFileTypes: true });
    
    for (let i of dir) {
        if (i.isFile()) {
            await fs.promises.copyFile(`${__dirname}/files/${i.name}`, `${__dirname}/files-copy/${i.name}`);
        }
    }

}

copyDirectory();
