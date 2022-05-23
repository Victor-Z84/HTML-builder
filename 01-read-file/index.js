const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');

const stream = fs.createReadStream(filePath, 'utf-8');
let data = '';

stream.on('data', (chunk) => {
  data += chunk;
}).on('end', () => {
  process.stdout.write(data);
}).on('Error', (error) => {
  console.log(error.stack);
});
