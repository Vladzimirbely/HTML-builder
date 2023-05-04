const fs = require('fs');

fs.mkdir(__dirname + '/files-copy', { recursive: true }, (err) => {
    if (err) {
        console.error(err);
        return;
    }
})

fs.readdir(__dirname + '/files', (err, files) => {
    if (err) {
        console.log(err);
        return;
    }

    files.forEach((items) => {
      fs.readFile(`${__dirname}/files/${items}`, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        fs.writeFile(`${__dirname}/files-copy/${items}`, data, (err) => {
            if (err) {
                console.log(err);
                return;
            }
        })

      })
    })
})
