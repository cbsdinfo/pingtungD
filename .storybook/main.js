module.exports = {
    stories: [
        '../src/**/*.stories.[tj]s'
    ],
    addons: [
        //'@storybook/preset-create-react-app',
        //'@storybook/addon-actions',
        '@storybook/addon-links',
        '@storybook/addon-knobs/register',
        '@storybook/addon-notes/register',
        '@storybook/addon-viewport/register',
        // 'storybook-addon-theme-playground/dist/register',
        './.storybook/precode/dists/register.js',
        // 2'@storybook/addon-storysource'
    ],
};