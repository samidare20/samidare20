/**
 * 사이드바 아코디언 기능
 * 하나의 카테고리가 열리면 다른 카테고리들이 자동으로 닫힘
 */

(function () {
  'use strict';
  // 사이드바 전체에 이벤트 위임 사용
  function initSidebarAccordion() {
    const sidebar = document.querySelector('.theme-doc-sidebar-menu, .menu, [class*="sidebar"]');

    if (!sidebar) {
      setTimeout(initSidebarAccordion, 500);
      return;
    }

    // 기존 이벤트 리스너가 있는지 확인
    if (sidebar.hasAttribute('data-accordion-initialized')) {
      return;
    }

    // 초기화 표시
    sidebar.setAttribute('data-accordion-initialized', 'true');

    // 이벤트 위임을 사용하여 모든 클릭을 감지
    sidebar.addEventListener('click', function (e) {

      // 클릭된 요소가 카테고리 토글 버튼인지 확인
      const clickedElement = e.target;
      const isToggleButton = clickedElement.matches('.menu__link--sublist, .menu__caret, [aria-expanded], .menu__list-item--collapsible > .menu__link') ||
        clickedElement.closest('.menu__link--sublist, .menu__caret, [aria-expanded]');

      if (!isToggleButton) {
        return;
      }

      // 클릭된 카테고리 찾기
      const clickedCategory = clickedElement.closest('.menu__list-item--collapsible, [class*="category"]');

      if (!clickedCategory) {
        return;
      }


      // 약간의 지연 후 다른 카테고리들 닫기
      setTimeout(() => {
        // 현재 카테고리가 열린 상태인지 확인
        const isCurrentlyOpen = !clickedCategory.classList.contains('menu__list-item--collapsed');

        if (isCurrentlyOpen) {
          // 모든 열린 카테고리 찾기
          const allOpenCategories = sidebar.querySelectorAll('.menu__list-item--collapsible:not(.menu__list-item--collapsed)');

          allOpenCategories.forEach(category => {
            if (category !== clickedCategory) {

              // 카테고리를 닫기 위한 버튼 찾기
              const toggleButton = category.querySelector('.menu__link--sublist, .menu__caret, [aria-expanded="true"]');

              if (toggleButton) {
                toggleButton.click();
              } else {
                // 직접 클래스 조작
                category.classList.add('menu__list-item--collapsed');
                const ariaButton = category.querySelector('[aria-expanded]');
                if (ariaButton) {
                  ariaButton.setAttribute('aria-expanded', 'false');
                }
              }
            }
          });
        }
      }, 50);
    });
  }

  // 초기화 함수
  function initialize() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initSidebarAccordion);
    } else {
      initSidebarAccordion();
    }
  }

  // 초기화 실행
  initialize();

  // SPA 네비게이션을 위한 감지
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      // 기존 초기화 표시 제거
      const sidebar = document.querySelector('[data-accordion-initialized]');
      if (sidebar) {
        sidebar.removeAttribute('data-accordion-initialized');
      }
      setTimeout(initSidebarAccordion, 100);
    }
  }).observe(document, { subtree: true, childList: true });

})();