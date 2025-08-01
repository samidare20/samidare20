import type { ReactNode } from 'react';
import Heading from '@theme/Heading';
import NavigationCard, { type NavigationCardProps } from './NavigationCard';
import styles from './styles.module.css';

export type NavigationCardsProps = {
  title?: string;
  subtitle?: string;
  cards: NavigationCardProps[];
};

export default function NavigationCards({ 
  title = "문서 둘러보기",
  subtitle = "원하는 주제를 선택해서 바로 시작해보세요",
  cards 
}: NavigationCardsProps): ReactNode {
  return (
    <section className={styles.navigationSection}>
      <div className="container">
        <div className="text--center margin-bottom--lg">
          <Heading as="h2">{title}</Heading>
          <p>{subtitle}</p>
        </div>
        <div className="row">
          {cards.map((cardProps, idx) => (
            <NavigationCard key={idx} {...cardProps} />
          ))}
        </div>
      </div>
    </section>
  );
}