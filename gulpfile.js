const Elixir = require('laravel-elixir');

process.env.DISABLE_NOTIFIER = true;

Elixir.config.css.sass.pluginOptions['includePaths'] = ['node_modules/'];

Elixir(function (mix) {
    mix.sass('../../../theme/sass/application.scss', 'theme/css/application.css');
});