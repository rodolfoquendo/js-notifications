// webpack.mix.js

let mix = require('laravel-mix');

mix.js('lib/notification.js', 'dist/rodolfoquendo-notifications.js').setPublicPath('dist');