const mix = require('laravel-mix');
const Dotenv = require('dotenv-webpack');

mix.webpackConfig({
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            '@': __dirname + '/src/js',
            '~': __dirname + '/src/assets/img'
        }
    },
    plugins: [new Dotenv()]
});

mix.js('src/js/admin.js', 'public/js').vue()
mix.sass('src/scss/admin.scss', 'public/css')

