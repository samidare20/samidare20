import React from 'react';
import SidebarAccordion from '@site/src/components/SidebarAccordion';

export default function Root({children}: {children: React.ReactNode}): JSX.Element {
  return (
    <>
      {children}
      <SidebarAccordion />
    </>
  );
}