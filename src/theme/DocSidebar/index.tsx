import React from 'react';
import DocSidebar from '@theme-original/DocSidebar';
import type DocSidebarType from '@theme/DocSidebar';
import type {WrapperProps} from '@docusaurus/types';
import SidebarSearch from '@site/src/components/SidebarSearch';
import styles from './styles.module.css';

type Props = WrapperProps<typeof DocSidebarType>;

export default function DocSidebarWrapper(props: Props): JSX.Element {
  return (
    <div className={styles.sidebarWrapper}>
      {/* 검색창을 사이드바 상단에 고정 */}
      <div className={styles.searchContainer}>
        <SidebarSearch />
      </div>
      
      {/* 구분선 */}
      <hr className={styles.separator} />
      
      {/* 기존 사이드바 */}
      <DocSidebar {...props} />
    </div>
  );
}