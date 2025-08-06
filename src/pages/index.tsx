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
        title:'Algorithm & DataStructure',
        description:(
          <>
          알고리즘이랑 자료구조
          </>
        ),
        link:'/category/datastructure',
        'icon':'📝',
        itemCount: 2
      },
      {
        title: 'Utils',
        description: (
          <>
            개발 도구 관련
          </>
        ),
        link: '/category/github',
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
