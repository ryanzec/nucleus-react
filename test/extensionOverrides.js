import path from 'path';
import sass from 'node-sass';
import packageImporter from 'node-sass-package-importer';
import cssModulesHook from 'css-modules-require-hook';

const IMAGE_EXTENSIONS = [
  '.png',
  '.gif',
  '.jpg',
  '.jpeg',
  '.eot',
  '.tff',
  '.otf',
  '.svg',
  '.woff',
  '.woff2',
  '.ico'
];

console.log(path.resolve(__dirname, '..'));
console.log(path.resolve(__dirname, '..'));
console.log(path.resolve(__dirname, '..'));
console.log(path.resolve(__dirname, '..'));
console.log(path.resolve(__dirname, '..'));
console.log(path.resolve(__dirname, '..'));
console.log(path.resolve(__dirname, '..'));
console.log(path.resolve(__dirname, '..'));
console.log(path.resolve(__dirname, '..'));
console.log(path.resolve(__dirname, '..'));
console.log(path.resolve(__dirname, '..'));
console.log(path.resolve(__dirname, '..'));
console.log(path.resolve(__dirname, '..'));
console.log(path.resolve(__dirname, '..'));
console.log(path.resolve(__dirname, '..'));
console.log(path.resolve(__dirname, '..'));
console.log(path.resolve(__dirname, '..'));
console.log(path.resolve(__dirname, '..'));
console.log(path.resolve(__dirname, '..'));
console.log(path.resolve(__dirname, '..'));
console.log(path.resolve(__dirname, '..'));
console.log(path.resolve(__dirname, '..'));

IMAGE_EXTENSIONS.forEach((extension) => {
  require.extensions[extension] = (module, filename) => {
    return filename;
  };
});

cssModulesHook({
  devMode: false,
  extensions: ['.scss'],
  generateScopedName: '[name]__[local]___TEST',
  preprocessCss(scss, filename) {
    return sass.renderSync({
      data: scss,
      file: filename,
      importer: packageImporter(),
      // includePaths: [path.resolve(__dirname, '..')]
    }).css;
  }
});

