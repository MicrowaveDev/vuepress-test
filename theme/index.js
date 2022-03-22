const { path } = require('@vuepress/utils')

module.exports = {
    name: 'blog',
    layouts: {
        BasePage: path.resolve(__dirname, 'BasePage.vue'),
        404: path.resolve(__dirname, '404.vue'),
    },
    // ...
};