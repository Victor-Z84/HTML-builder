const fs = require('fs/promises');
const path = require('path');

const pathToSourceFolder = path.join(__dirname, 'files');
const pathToCopyFolder = path.join(__dirname, 'files-copy');

async function copyDir() {
  await fs.rm(pathToCopyFolder, { recursive: true, force: true });
  await fs.mkdir(pathToCopyFolder);

  let elements = await fs.readdir(pathToSourceFolder, { withFileTypes: true });
  for (let element of elements) {
    await fs.copyFile(path.join(pathToSourceFolder, element.name), path.join(pathToCopyFolder, element.name));
  }
}

copyDir();