import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // 수동으로 사이드바 구성
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: '튜토리얼',
      items: [
        'tutorial-basics/create-a-document',
        'tutorial-basics/create-a-blog-post',
        'tutorial-basics/markdown-features',
        'tutorial-basics/deploy-your-site',
      ],
    },
    {
      type: 'category',
      label: '추가 기능',
      items: [
        'tutorial-extras/manage-docs-versions',
        'tutorial-extras/translate-your-site',
      ],
    },
    // Git 관련 문서
    {
      type: 'category',
      label: 'Git & GitHub',
      items: [
        'github/stash',
        'github/alias',
      ],
    },
    // 구분선
    {
      type: 'html',
      value: '<hr style="margin: 1rem 0; border: 0; border-top: 1px solid #e5e7eb;" />',
    },
  ],
};

export default sidebars;
