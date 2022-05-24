const fs = require('fs'); 
const path = require('path'); 

const outputStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'), 'utf-8');
const stylesSource = path.join(__dirname, 'styles');

async function createStyleBundle() {
  const files = await fs.promises.readdir(stylesSource, { withFileTypes: true });
  files.filter((file) => file.isFile()).forEach((file) => {
    const filePath = path.join(stylesSource, file.name);
    if (path.extname(filePath) === '.css') {
      const readStream = fs.createReadStream(filePath, 'utf-8');
      readStream.pipe(outputStream);
    }
  });
}

createStyleBundle();