const {createBuildApp} = require('@vuepress/core');
const { path } = require('@vuepress/utils');

(async () => {
    const staticSiteApp = createBuildApp({
        base: '/',
        source: __dirname,
        theme: path.resolve(__dirname, './theme'),
        templateBuild: path.resolve(__dirname, './theme/index.ssr.html'),
        bundler: '@vuepress/vite',
        plugins: [{
            async onInitialized(app) {

                for (let i = 0; i < posts.length; i++) {
                    const post = posts[i];

                    const {title, description} = getTitleAndDescription(post.content, postSettings);

                    const page = await createPage(app, {
                        path: getPostPath(post.id),
                        frontmatter: {
                            layout: 'Post',
                            permalink: getPostPath(post.id),
                            // permalinkPattern?: string;
                            head: [],
                            title,
                            description,
                            date: post.date,
                            ..._.pick(post, ['lang', 'id', 'images', 'videos'])
                        },
                        content: post.content,
                    });

                    app.pages.push(page);
                    postPages.push(page);
                }

                for (let i = 1; i <= intervallers.length; i++) {
                    const page = await createPage(app, {
                        path: getPaginationPostPath(i),
                        frontmatter: {
                            layout: 'BaseList',
                            permalink: getPaginationPostPath(i),
                        },
                        title: 'Page ' + i,
                        content: 'Page ' + i,
                    });

                    app.pages.push(page);
                }

                app.pages.push(await createPage(app, {
                    path: '/',
                    frontmatter: {
                        layout: 'BaseList',
                        permalink: '/',
                        home: true,
                    },
                    title: 'Home',
                    content: 'Welcome',
                }));

                app.pages.push(await createPage(app, {
                    path: '/404.html',
                    frontmatter: {
                        layout: '404',
                        permalink: '/404',
                    },
                    title: '404',
                    content: '404',
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

})();

async function generate(text) {

}