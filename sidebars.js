/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  masterSidebar: [
    "whats-new",
    {
      type: "category",
      label: "Getting started",
      collapsed: false,
      link: {
        type: "doc",
        id: "getting-started/index"
      },
      items: [
        "getting-started/installation",
        "getting-started/specification",
        {
          type: "category",
          label: "Solana",
          collapsed: false,
          collapsible: false,
          link: {
            type: "doc",
            id: "getting-started/quickstart-solana"
          },
          items: [
            "getting-started/quickstart-solana-native",
            "getting-started/quickstart-solana-anchor",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Development suite",
      collapsed: false,
      items: [
        "development-suite/codigo-cli",
        "development-suite/codigo-studio",
      ]
    },
    {
      type: "category",
      label: "Learning the basics",
      collapsed: false,
      link: {
        type: "doc",
        id: "learning-the-basics/index"
      },
      items: [
        "learning-the-basics/data-types",
        "learning-the-basics/info",
        "learning-the-basics/custom-types",
        "learning-the-basics/imports",
        "learning-the-basics/methods",
        "learning-the-basics/errors",
        "learning-the-basics/solana",
      ]
    },
    {
      type: "category",
      label: "Guides",
      collapsed: false,
      items: [
        {
          type: "category",
          label: "Solana",
          collapsed: false,
          items: [
            "guides/implementing-business-logic",
            "guides/integrating-the-sdk",
            // "guides/solana-linked-seeds",
            // "guides/state-compression",
            "guides/solana-nft",
            // "guides/lender",
            // "guides/inventory",
          ],
        },
        {
          type: "link",
          label: "Additional guides",
          href: "https://github.com/Codigo-io/platform"
        },
      ]
    },
  ],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

export default sidebars;