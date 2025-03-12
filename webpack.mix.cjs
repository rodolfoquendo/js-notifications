// webpack.mix.js

const mix = require('laravel-mix');
mix
    .js('lib/notification.js', 'dist/rodolfoquendo-notifications.js').setPublicPath('dist')
    .sass('scss/index.scss', 'dist');