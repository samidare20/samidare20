import type { ReactNode } from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import NavigationCards, { type NavigationCardsProps } from '@site/src/components/NavigationCards';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        {/* <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div> */}
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  const navigationData: NavigationCardsProps = {
    title: "문서 둘러보기",
    subtitle: "원하는 주제를 선택해서 바로 시작해보세요",
    cards: [
      {
        title: '튜토리얼',
        description: (
          <>
            Docusaurus 기본 사용법부터 배포까지 단계별로 학습할 수 있습니다.
          </>
        ),
        link: '/docs/tutorial-basics/create-a-document',
        icon: '📚',
        itemCount: 4,
      },
      {
        title: '추가 기능',
        description: (
          <>
            버전 관리, 다국어 지원 등 고급 기능들을 알아보세요.
          </>
        ),
        link: '/docs/tutorial-extras/manage-docs-versions',
        icon: '⚙️',
        itemCount: 2,
      },
      {
        title: 'Git & GitHub',
        description: (
          <>
            Git 명령어와 GitHub 활용법에 대한 실용적인 가이드입니다.
          </>
        ),
        link: '/docs/github/stash',
        icon: '🔧',
        itemCount: 2,
      },
    ],
  };

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <NavigationCards {...navigationData} />
      </main>
    </Layout>
  );
}
