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
    //"whats-new",
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
        "development-suite/features",
        "development-suite/codigo-studio",
      ]
    },
    {
      type: "category",
      label: "Guides & Examples",
      collapsed: false,
      link: {
        type: "doc",
        id: "guides/index"
      },
      items: [
        {
          type: "category",
          label: "Solana",
          collapsed: false,
          link: {
            type: "doc",
            id: "guides/solana/index"
          },
          items: [
            "guides/solana/start-from-prompt",
            "guides/solana/start-from-template",
            "guides/solana/start-from-github",
            "guides/solana/build-and-deploy",
            "guides/solana/ai-autocomplete",
            "guides/solana/unit-tests",
            //"guides/integrating-the-sdk",
            // "guides/solana-linked-seeds",
            // "guides/state-compression",
            //"guides/solana-nft",
            //"guides/lender",
            // "guides/inventory",
          ],
        },
      ]
    },
    {
      type: "category",
      label: "Get Help or Report Bug",
      collapsed: true,
      link: {
        type: "doc",
        id: "help/index"
      },
      items: []
    },
    {
      type: "category",
      label: "Expert System",
      collapsed: true,
      link: {
        type: "doc",
        id: "expert-system/index"
      },
      items: [
        "expert-system/specification",
        "expert-system/codigo-cli",
        "expert-system/data-types",
        "expert-system/info",
        "expert-system/custom-types",
        "expert-system/imports",
        "expert-system/methods",
        "expert-system/errors",
        "expert-system/solana",
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