import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Samidare20',
  tagline: '러다이트 운동 준비중인 개발자',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://samidare20.github.io', // GitHub organization 또는 username + github.io
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/samidare20/', // '/projectName/' 포맷으로 깃헙 레포지토리 이름을 입력한다.

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'samidare20', // Usually your GitHub org/user name.
  projectName: 'samidare20', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/samidare20/samidare20/tree/main/',
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
            'https://github.com/samidare20/samidare20/tree/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Samidare20',
      logo: {
        alt: 'Samidare20 Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: '문서',
        },
        // {to: '/blog', label: '블로그', position: 'left'},
        {
          href: 'https://github.com/samidare20/samidare20',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://solved.ac/profile/samidare20',
          label: 'Solved.ac',
          position: 'right',
        },
        {
          href: 'https://github.com/samidare20/hateu',
          label: '알고리즘',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '문서',
          items: [
            {
              label: '시작하기',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: '커뮤니티',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'X',
              href: 'https://x.com/docusaurus',
            },
          ],
        },
        {
          title: '더보기',
          items: [
            // {
            //   label: '블로그',
            //   to: '/blog',
            // },
            {
              label: 'GitHub',
              href: 'https://github.com/samidare20/samidare20',
            },
            {
              label: 'Solved.ac',
              href: 'https://solved.ac/profile/samidare20',
            },
            {
              label: '알고리즘 코드',
              href: 'https://github.com/samidare20/hateu',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Samidare20. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
