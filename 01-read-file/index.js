const fs = require('fs');

const readStream = fs.ReadStream(__dirname + '/text.txt', 'utf-8');
readStream.on('data', (e) => {
    console.log(e);
})
