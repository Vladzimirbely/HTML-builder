const fs = require('fs');
const file = fs.createWriteStream(__dirname + '/text.txt', 'utf-8');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

readline.write('Hello!\n');

readline.on('line', data => {
    data === 'exit' ? readline.close() : file.write(`${data}\n`);
});

readline.on('close', () => {
    readline.output.write('Bye!');
})
