import { useEffect } from 'react';

export default function SidebarAccordion(): null {
    useEffect(() => {
        function initSidebarAccordion() {
            const sidebar = document.querySelector('.theme-doc-sidebar-menu') ||
                document.querySelector('.menu') ||
                document.querySelector('[class*="sidebar"]') ||
                document.querySelector('.theme-doc-sidebar-container');

            if (!sidebar) {
                setTimeout(initSidebarAccordion, 500);
                return;
            }

            if (sidebar.hasAttribute('data-accordion-initialized')) {
                return;
            }

            sidebar.setAttribute('data-accordion-initialized', 'true');

            sidebar.addEventListener('click', function (e) {
                const target = e.target as HTMLElement;
                const clickedCategory = target.closest('.menu__list-item--collapsible') ||
                    target.closest('[class*="category"]') ||
                    target.closest('.theme-doc-sidebar-item-category');

                if (clickedCategory) {
                    const wasCollapsedBefore = clickedCategory.classList.contains('menu__list-item--collapsed');

                    setTimeout(() => {
                        const isCollapsedAfter = clickedCategory.classList.contains('menu__list-item--collapsed');

                        if (wasCollapsedBefore && !isCollapsedAfter) {
                            const allCategories = sidebar.querySelectorAll('.menu__list-item--collapsible, [class*="category"], .theme-doc-sidebar-item-category');

                            allCategories.forEach((category) => {
                                if (category !== clickedCategory && !category.classList.contains('menu__list-item--collapsed')) {
                                    const toggleButton = category.querySelector('a[aria-expanded="true"]') ||
                                        category.querySelector('button[aria-expanded="true"]') ||
                                        category.querySelector('.menu__link--sublist') ||
                                        category.querySelector('.menu__caret') ||
                                        category.querySelector('a') ||
                                        category.querySelector('button');

                                    if (toggleButton) {
                                        (toggleButton as HTMLElement).click();
                                    } else {
                                        category.classList.add('menu__list-item--collapsed');
                                    }
                                }
                            });
                        }
                    }, 200);
                }
            });
        }

        initSidebarAccordion();

        let lastUrl = location.href;
        const observer = new MutationObserver(() => {
            const url = location.href;
            if (url !== lastUrl) {
                lastUrl = url;
                const sidebar = document.querySelector('[data-accordion-initialized]');
                if (sidebar) {
                    sidebar.removeAttribute('data-accordion-initialized');
                }
                setTimeout(initSidebarAccordion, 100);
            }
        });

        observer.observe(document, { subtree: true, childList: true });

        return () => {
            observer.disconnect();
            const sidebar = document.querySelector('[data-accordion-initialized]');
            if (sidebar) {
                sidebar.removeAttribute('data-accordion-initialized');
            }
        };
    }, []);

    return null;
}