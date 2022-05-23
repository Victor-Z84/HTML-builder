const fs = require('fs');
const path = require('path');
const { stdin, stdout, exit } = process;
const filePath = path.join(__dirname, 'text.txt');

let writeStream = fs.createWriteStream(filePath, 'utf-8');

stdout.write('Hey! You can write your text here:\n');

stdin.on('data', chunk => {
  if (chunk.toString().trim() === 'exit') {
    exitFunction();  
  } else {
    writeStream.write(chunk.toString());
  }
});

process.on('SIGINT', exitFunction);

function exitFunction() {
  stdout.write('Goodbye! See you later...');
  exit();
}