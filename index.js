const {createBuildApp, createPage} = require('@vuepress/core');
const { path } = require('@vuepress/utils');
const { rmDir } = require('./helpers');
const fs = require('fs');

(async () => {
    const vuepressPath = path.resolve(__dirname, './.vuepress');
    const indexHtmlPath = path.resolve(vuepressPath, 'dist/index.html');

    await generate('Test 1');

    console.log('\n\nincludes 1:', fs.readFileSync(indexHtmlPath, {encoding: 'utf8'}).includes('Test 1'));

    rmDir(vuepressPath);
    console.log('\n\nnot exists:', !fs.existsSync(vuepressPath))

    await generate('Test 2');

    console.log('\n\nincludes 2:', fs.readFileSync(indexHtmlPath, {encoding: 'utf8'}).includes('Test 2'));
    console.log('\n\n')
})();

async function generate(content) {
    console.log('\n\nSTART');

    const staticSiteApp = createBuildApp({
        base: '/',
        source: __dirname,
        theme: path.resolve(__dirname, './theme'),
        templateBuild: path.resolve(__dirname, './theme/index.ssr.html'),
        bundler: '@vuepress/vite',
        plugins: [{
            async onInitialized(app) {
                app.pages.push(await createPage(app, {
                    content,
                    path: '/',
                    frontmatter: { layout: 'BasePage', permalink: '/', home: true },
                }));

                app.pages.push(await createPage(app, {
                    content: '404',
                    path: '/404.html',
                    frontmatter: { layout: '404', permalink: '/404' },
                }));
            }

        }]
    });

    console.log('initialize and prepare');
    await staticSiteApp.init();
    await staticSiteApp.prepare();

    console.log('build');
    await staticSiteApp.build();

    console.log('process onGenerated hook');
    await staticSiteApp.pluginApi.hooks.onGenerated.process(staticSiteApp);

    console.log('DONE');
}