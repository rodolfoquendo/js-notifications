// webpack.mix.js

const mix = require('laravel-mix');
mix.setPublicPath('dist')
    .js('lib/Notification.js', 'dist/rodolfoquendo-notifications.js')
    .sass('scss/index.scss', 'dist/rodolfoquendo-notifications.css');