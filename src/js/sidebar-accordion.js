/**
 * 사이드바 아코디언 기능
 * 하나의 카테고리가 열리면 다른 카테고리들이 자동으로 닫힘
 */

(function() {
  'use strict';

  // DOM이 로드된 후 실행
  function initSidebarAccordion() {
    // 사이드바 카테고리 버튼들을 찾기
    const categoryButtons = document.querySelectorAll('.theme-doc-sidebar-item-category-level-1 .menu__button');
    
    if (categoryButtons.length === 0) {
      // 사이드바가 아직 로드되지 않았으면 잠시 후 다시 시도
      setTimeout(initSidebarAccordion, 100);
      return;
    }

    // 각 카테고리 버튼에 클릭 이벤트 리스너 추가
    categoryButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        // 클릭된 카테고리의 부모 요소
        const clickedCategory = this.closest('.theme-doc-sidebar-item-category-level-1');
        
        // 다른 모든 카테고리들을 찾기
        const otherCategories = document.querySelectorAll('.theme-doc-sidebar-item-category-level-1');
        
        // 다른 카테고리들을 모두 접기
        otherCategories.forEach(category => {
          if (category !== clickedCategory) {
            const categoryButton = category.querySelector('.menu__button');
            const categoryList = category.querySelector('.theme-doc-sidebar-item-category-list');
            
            // 카테고리가 열려있으면 접기
            if (categoryList && !category.classList.contains('menu__list-item--collapsed')) {
              categoryButton.click();
            }
          }
        });
      });
    });
  }

  // 페이지 로드 시 초기화
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSidebarAccordion);
  } else {
    initSidebarAccordion();
  }

  // SPA 네비게이션을 위한 MutationObserver
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        // 사이드바가 동적으로 로드되었을 때 다시 초기화
        const sidebar = document.querySelector('.theme-doc-sidebar-menu');
        if (sidebar) {
          initSidebarAccordion();
        }
      }
    });
  });

  // DOM 변경 감지 시작
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

})(); 