// Подключение модулей
const path = require('path');
const fs = require('fs');

const pathToProjectFolder = path.join(__dirname, 'project-dist');

const baseAssetsFolder = path.join(__dirname, 'assets');
const assetsFolder = path.join(pathToProjectFolder, 'assets');

const pathToStyleSource = path.join(__dirname, 'styles');
const stylePath = path.join(pathToProjectFolder, 'style.css');

const pathToTemplate = path.join(__dirname, 'template.html');
const pathToComponentsSource = path.join(__dirname, 'components');
const indexPath = path.join(pathToProjectFolder, 'index.html');


async function createProject() {
  await createFolder();
  await copyDir(baseAssetsFolder, assetsFolder);
  await createStyleBundle();
  await createIndexFile();
}

async function createFolder() {
  await fs.promises.rm(pathToProjectFolder, { recursive: true, force: true });
  await fs.promises.mkdir(pathToProjectFolder);
}

async function copyDir(from, to) {
  await fs.promises.rm(to, { recursive: true, force: true });
  await fs.promises.mkdir(to);
  const elements = await fs.promises.readdir(from, { withFileTypes: true });
  elements.forEach(async (element) => {
    if (element.isFile()) {
      await fs.promises.copyFile(path.join(from, element.name), path.join(to, element.name));
    } else {
      await copyDir(path.join(from, element.name), path.join(to, element.name));
    }
  });
}

async function createStyleBundle() {
  const outputStream = fs.createWriteStream(stylePath, 'utf-8');

  const files = await fs.promises.readdir(pathToStyleSource, { withFileTypes: true });
  files.filter((file) => file.isFile()).forEach((file) => {
    const filePath = path.join(pathToStyleSource, file.name);
    if (path.extname(filePath) === '.css') {
      const readStream = fs.createReadStream(filePath, 'utf-8');
      readStream.pipe(outputStream);
    }
  });
}

async function createIndexFile() {
  let templateContent = await fs.promises.readFile(pathToTemplate, { encoding: 'utf-8' });

  const files = await fs.promises.readdir(pathToComponentsSource, { withFileTypes: true });
  for (const file of files) {
    const filePath = path.join(pathToComponentsSource, file.name);
    if (file.isFile() && path.extname(filePath) === '.html') {
      const fileContent = await fs.promises.readFile(filePath, { encoding: 'utf-8' });
      const component = file.name.replace('.html', '');
      templateContent = templateContent.replace(`{{${component}}}`, fileContent);
    }
  }
  await fs.promises.writeFile(indexPath, templateContent);
}

createProject();