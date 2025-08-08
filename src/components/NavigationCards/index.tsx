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
  cards
}: NavigationCardsProps): ReactNode {
  return (
    <section className={styles.navigationSection}>
      <div className="container">
        <div className="row">
          {cards.map((cardProps, idx) => (
            <NavigationCard key={idx} {...cardProps} />
          ))}
        </div>
      </div>
    </section>
  );
}