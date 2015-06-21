Package.describe({
  name: 'pocotan001:bem-classnames',
  version: '1.0.7',
  summary: 'A simple utility to manage BEM class names on React',
  git: 'https://github.com/pocotan001/bem-classnames.git',
})

Package.onUse(function(api) {
  api.export('cx')
  api.addFiles('index.js', ['client', 'server'])
})
