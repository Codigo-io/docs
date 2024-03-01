// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  tagline: 'Software development automation platform for blockchain developers',
  title: 'Código Docs',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.codigo.ai',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  onBrokenMarkdownLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          breadcrumbs: true,
          sidebarPath: './sidebars.js',
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
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        logo: {
          alt: 'Codigo Logo',
          src: 'img/codigo-bright.svg',
          srcDark: 'img/codigo-dark.svg'
        },
        items: [
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
                href: 'https://github.com/Codigo-io',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/Codigo-io',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/8XHQGS832k',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/CodigoPlatform',
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
        theme: prismThemes.oneLight,
        darkTheme: prismThemes.oneDark,
        additionalLanguages: ['rust'],
      },
    }),
};

export default config;