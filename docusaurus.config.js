// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Aria Watch",
  tagline: "Breathe the truth",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://aria.watch",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ariawatch', // Usually your GitHub org/user name.
  projectName: 'ariawatch-website', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
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
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Aria-Watch/Aria-Watch-Website',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Aria-Watch/Aria-Watch-Website',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/social.jpg',
      navbar: {
        logo: {
          alt: 'AriaWatch Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            to: "/about",
            html: '<i class="fa fa-compass"></i><span>About</span>',
            position: "left",
            className: "navbar__item--with-icon",
          },
          {
            to: "/blog",
            html: '<i class="fa fa-rss"></i><span>Blog</span>',
            position: "left",
            className: "navbar__item--with-icon",
          },
          {
            to: "/docs/intro",
            html: '<i class="fa fa-book"></i><span>Wiki</span>',
            position: "left",
            className: "navbar__item--with-icon",
          },
          {
            to: "/api",
            html: '<i class="fa fa-plug"></i><span>API</span>',
            position: "left",
            className: "navbar__item--with-icon",
          },
          {
            to: "/Map",
            html: '<i class="fa fa-map"></i><span>Map</span>',
            position: "left",
            className: "navbar__item--with-icon",
          },
          {
            to: "/contact",
            html: '<i class="fa fa-envelope"></i><span>Contact</span>',
            position: "left",
            className: "navbar__item--with-icon",
          },
          {
            to: "https://github.com/Aria-Watch/",
            html: '<i class="fa fa-github"></i>',
            position: "right",
            className: "navbar__item--with-icon-2",
          },
          {
            to: "https://www.instagram.com/aria.watch_official/",
            html: '<i class="fa fa-instagram"></i>',
            position: "right",
            className: "navbar__item--with-icon-2",
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
          {
            title: 'Community',
            items: [
              {
                label: 'Instagram',
                href: 'https://www.instagram.com/aria.watch_official/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/Aria-Watch/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Aria Watch`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
