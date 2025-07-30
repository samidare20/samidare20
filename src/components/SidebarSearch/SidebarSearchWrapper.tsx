import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import SidebarSearch from './index';

// 사이드바에 검색바를 삽입하는 래퍼 컴포넌트
export default function SidebarSearchWrapper(): null {
  useEffect(() => {
    let root: any = null;
    let isRendered = false;
    
    const renderSearchBar = () => {
      const container = document.getElementById('sidebar-search-container');
      
      if (container && !isRendered) {
        try {
          // 컨테이너가 이미 React root로 사용되었는지 확인
          if ((container as any)._reactRootContainer) {
            console.warn('컨테이너가 이미 React root로 사용됨');
            return;
          }
          
          // 기존 React root가 있다면 안전하게 제거
          if (root) {
            try {
              root.unmount();
            } catch (unmountError) {
              console.warn('기존 root 언마운트 실패:', unmountError);
            }
            root = null;
          }
          
          // 컨테이너가 여전히 DOM에 존재하고 비어있는지 확인
          if (document.contains(container) && container.children.length === 0) {
            // 새로운 React root 생성
            root = createRoot(container);
            root.render(<SidebarSearch />);
            isRendered = true;
          }
        } catch (error) {
          console.error('검색바 렌더링 오류:', error);
          isRendered = false; // 오류 발생 시 다시 렌더링 가능하도록
        }
      }
    };
    
    // 사이드바가 로드될 때까지 대기
    const checkSidebar = () => {
      const sidebar = document.querySelector('nav[class*="menu"]');
      const container = document.getElementById('sidebar-search-container');
      
      if (sidebar && container && !isRendered) {
        renderSearchBar();
      }
    };
    
    // 초기 체크
    checkSidebar();
    
    // 사이드바 로드 대기 및 페이지 변경 감지
    const observer = new MutationObserver((mutations) => {
      let shouldRender = false;
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          // 사이드바가 추가되거나 변경된 경우
          const hasSidebarChange = Array.from(mutation.addedNodes).some(node => 
            node.nodeType === Node.ELEMENT_NODE && 
            (node as Element).querySelector?.('nav[class*="menu"]')
          );
          
          // 검색바 컨테이너가 추가된 경우
          const hasSearchContainer = Array.from(mutation.addedNodes).some(node => 
            node.nodeType === Node.ELEMENT_NODE && 
            (node as Element).id === 'sidebar-search-container'
          );
          
          if ((hasSidebarChange || hasSearchContainer) && !isRendered) {
            shouldRender = true;
          }
        }
      });
      
      if (shouldRender) {
        setTimeout(checkSidebar, 100);
      }
    });
    
    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['class']
    });
    
    // 페이지 변경 감지를 위한 추가 리스너
    const handleRouteChange = () => {
      // 기존 root 정리
      if (root) {
        try {
          root.unmount();
        } catch (error) {
          console.warn('페이지 변경 시 root 언마운트 실패:', error);
        }
        root = null;
      }
      isRendered = false; // 페이지 변경 시 다시 렌더링 가능하도록 설정
      setTimeout(checkSidebar, 200);
    };
    
    // popstate 이벤트 (브라우저 뒤로가기/앞으로가기)
    window.addEventListener('popstate', handleRouteChange);
    
    // pushstate/replacestate 이벤트 감지
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;
    
    history.pushState = function(...args) {
      originalPushState.apply(history, args);
      handleRouteChange();
    };
    
    history.replaceState = function(...args) {
      originalReplaceState.apply(history, args);
      handleRouteChange();
    };
    
    return () => {
      observer.disconnect();
      window.removeEventListener('popstate', handleRouteChange);
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
      if (root) {
        try {
          root.unmount();
        } catch (error) {
          console.error('검색바 언마운트 오류:', error);
        }
        root = null;
      }
    };
  }, []);

  return null;
} 