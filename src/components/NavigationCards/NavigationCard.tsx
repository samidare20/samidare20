import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

export type NavigationCardProps = {
  title: string;
  description: ReactNode;
  link: string;
  icon: string;
  itemCount: number;
};

export default function NavigationCard({ 
  title, 
  description, 
  link, 
  icon, 
  itemCount 
}: NavigationCardProps) {
  return (
    <div className={clsx('col col--4')}>
      <Link to={link} className={styles.cardLink}>
        <div className={styles.navigationCard}>
          <div className={styles.cardIcon}>
            <span className={styles.iconEmoji}>{icon}</span>
          </div>
          <div className={styles.cardContent}>
            <Heading as="h3" className={styles.cardTitle}>{title}</Heading>
            <p className={styles.cardDescription}>{description}</p>
            <div className={styles.cardMeta}>
              <span className={styles.itemCount}>{itemCount}개 문서</span>
              <span className={styles.arrow}>→</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}