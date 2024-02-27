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
    "index",
    "whats-new",
    {
      type: "category",
      label: "Introduction",
      collapsed: false,
      items: [
        "getting_started/installation",
        "getting_started/specification",
        {
          type: "category",
          label: "Quickstart",
          collapsed: false,
          items: [
            "getting_started/quickstart-solana-native",
            "getting_started/quickstart-solana-anchor",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Learning the basics",
      collapsed: false,
      items: [
        "learning-the-basics/info",
        "learning-the-basics/data-types",
        "learning-the-basics/custom-types",
        "learning-the-basics/attributes",
        "learning-the-basics/imports",
        "learning-the-basics/methods",
        "learning-the-basics/errors",
      ]
    },
    {
      type: "category",
      label: "Guides",
      collapsed: false,
      items: [
        "guides/implementing-business-logic",
        "guides/integrating-the-sdk",
        "guides/lender",
        "guides/solana-nft",
        "guides/inventory",
        {
          type: "link",
          label: "Additional guides",
          href: "https://github.com/Codigo-io/platform"
        },
      ]
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