// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const math = require('remark-math');
const katex = require('rehype-katex');

const title = '写个迷你TypeScript';

/** @type {import('@docusaurus/types').Config} */
const config = {
    title,
    tagline: '动手写个自己的类型检查器！',
    favicon: 'img/favicon.ico',

    // Set the production url of your site here
    url: 'https://your-docusaurus-test-site.com',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'suica', // Usually your GitHub org/user name.
    projectName: 'write-you-a-typescript', // Usually your repo name.

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'zh-Hans',
        locales: ['zh-Hans'],
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    editUrl: 'https://github.com/suica/write-you-a-typescript/tree/main/docs/',
                    remarkPlugins: [math],
                    rehypePlugins: [katex],
                    sidebarCollapsed: false,
                },
                blog: {
                    showReadingTime: true,
                    editUrl: 'https://github.com/suica/write-you-a-typescript/tree/main/docs/',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],
    stylesheets: [
        {
            href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
            type: 'text/css',
            integrity: 'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
            crossorigin: 'anonymous',
        },
    ],
    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            // Replace with your project's social card
            image: 'img/docusaurus-social-card.jpg',
            navbar: {
                title,
                logo: {
                    alt: 'My Site Logo',
                    src: 'img/logo.svg',
                },
                items: [
                    {
                        type: 'doc',
                        docId: 'intro',
                        position: 'left',
                        label: '教程',
                    },
                    // {to: '/blog', label: 'Blog', position: 'left'},
                    {
                        href: 'https://github.com/suica/write-you-a-typescript',
                        label: 'GitHub',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'dark',
                links: [
                    {
                        title: 'Docs',
                        items: [
                            {
                                label: 'Tutorial',
                                to: '/docs/intro',
                            },
                        ],
                    },
                    // {
                    //     title: 'Community',
                    //     items: [
                    //         {
                    //             label: 'Stack Overflow',
                    //             href: 'https://stackoverflow.com/questions/tagged/docusaurus',
                    //         },
                    //         {
                    //             label: 'Discord',
                    //             href: 'https://discordapp.com/invite/docusaurus',
                    //         },
                    //         {
                    //             label: 'Twitter',
                    //             href: 'https://twitter.com/docusaurus',
                    //         },
                    //     ],
                    // },
                    // {
                    //     title: 'More',
                    //     items: [
                    //         {
                    //             label: 'Blog',
                    //             to: '/blog',
                    //         },
                    //         {
                    //             label: 'GitHub',
                    //             href: 'https://github.com/facebook/docusaurus',
                    //         },
                    //     ],
                    // },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} suicca. Built with Docusaurus.`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
        }),
};

module.exports = config;