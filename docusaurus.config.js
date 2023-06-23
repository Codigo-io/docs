// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  tagline: 'Software development automation platform for blockchain developers',
  title: 'Código Docs',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://your-docusaurus-test-site.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        // },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      // image: 'img/codigo-removebg-preview.png',
      navbar: {
        // title: 'Codigo',
        logo: {
          alt: 'Codigo Logo',
          src: 'img/codigo-bright.svg',
          srcDark: 'img/codigo-dark.svg'
        },
        items: [
          // {
          //   type: 'docSidebar',
          //   sidebarId: 'tutorialSidebar',
          //   position: 'left',
          //   label: 'Tutorial',
          // },
          // {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://studio.codigo.ai',
            position: 'right',
            label: 'Código Studio',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Código',
            items: [
              {
                label: 'Website',
                to: 'https://codigo.ai/',
              },
              {
                label: 'Examples',
                href: 'https://github.com/Codigo-io/examples',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub',
                href: 'https://docs.google.com/forms/d/e/1FAIpQLSdGDGH4bwQf5dX3-uFCYeRKzIGbd5dVEPxHKQPTt63bBVVcVQ/viewform',
              },
              {
                label: 'Discord',
                href: 'https://docs.google.com/forms/d/e/1FAIpQLSdSG0OgJ5xuwwU7JiSGBdn01L3ID68qNCd2HAnFSztXVYKmBg/viewform',
              },
              {
                label: 'Twitter',
                href: 'https://docs.google.com/forms/d/e/1FAIpQLScjS74ZBfurdjSDlZICyKeqmTRYiCx230FywfCEDvyf1iYqjA/viewform',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                "label": "Terms",
                "href": "https://codigo.ai/documents/Codigo---Terms-of-Service.pdf"
              },
              {
                "label": "Privacy",
                "href": "https://codigo.ai/documents/Codigo---Privacy-Policy.pdf"
              }
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Código, Inc.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
