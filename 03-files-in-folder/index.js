const path = require('path');
const fs = require('fs/promises');
const pathToFolder = path.join(__dirname, 'secret-folder');

async function readDir() {
  try {
    const dirElements = await fs.readdir(pathToFolder, { withFileTypes: true });

    for (const element of dirElements) {
      if (element.isFile()) {
        const elementPath = path.join(pathToFolder, element.name);
        const elementSize = (await fs.stat(elementPath)).size / 1024;

        console.log(`${path.parse(elementPath).name} - ${path.extname(elementPath).slice(1)} - ${elementSize.toFixed(3)}kb`);
      }
    }
  }
  catch(error) {
    console.log(error.message);
  }
}

readDir();