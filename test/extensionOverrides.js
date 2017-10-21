import cssModulesHook from 'css-modules-require-hook';

cssModulesHook({
  devMode: false,
  extensions: ['.scss'],
  generateScopedName: '[name]__[local]___TEST',
});

