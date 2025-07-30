import React, { useState, useEffect, useRef } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

interface SearchResult {
  title: string;
  url: string;
  content?: string;
}

export default function SidebarSearch(): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // 빌드 타임에 생성된 검색 데이터 사용
  const collectAllDocs = (): SearchResult[] => {
    try {
      // 빌드 타임에 생성된 검색 데이터 import
      const searchData = require('./searchData.json');
      return searchData.map((doc: any) => ({
        title: doc.title,
        url: doc.url,
        content: doc.content
      }));
    } catch (error) {
      console.error('검색 데이터 로드 실패:', error);
      return [];
    }
  };

  // 검색 결과를 필터링하는 함수
  const filterResults = (term: string): SearchResult[] => {
    if (!term.trim()) return [];
    
    const allDocs = collectAllDocs();
    const lowerTerm = term.toLowerCase();
    
    return allDocs.filter(doc => 
      doc.title.toLowerCase().includes(lowerTerm)
    );
  };

  // 검색 실행
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setIsSearching(true);
    
    setTimeout(() => {
      const filteredResults = filterResults(term);
      setResults(filteredResults);
      setIsSearching(false);
      setShowResults(term.length > 0);
      
      // 디버깅용: 수집된 문서 목록 출력
      if (term.length === 0) {
        const allDocs = collectAllDocs();
        console.log('수집된 문서 목록:', allDocs);
      }
    }, 100);
  };

  // 검색 결과 클릭 처리
  const handleResultClick = (url: string) => {
    window.location.href = url;
    setShowResults(false);
    setSearchTerm('');
  };

  // 외부 클릭 시 결과 숨기기 및 초기 문서 수집
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    // 초기 문서 수집 (페이지 로드 후)
    const initialCollection = () => {
      setTimeout(() => {
        const allDocs = collectAllDocs();
      }, 1000);
    };
    
    initialCollection();
    
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.sidebarSearch} ref={searchRef}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="문서 검색..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className={styles.searchInput}
        />
        <button 
          className={styles.searchButton}
          onClick={() => handleSearch(searchTerm)}
        >
          🔍
        </button>
      </div>
      
      {showResults && (
        <div className={styles.searchResults}>
          {isSearching ? (
            <div className={styles.loading}>검색 중...</div>
          ) : results.length > 0 ? (
            <ul className={styles.resultsList}>
              {results.map((result, index) => (
                <li 
                  key={index}
                  className={styles.resultItem}
                  onClick={() => handleResultClick(result.url)}
                >
                  <span className={styles.resultTitle}>{result.title}</span>
                </li>
              ))}
            </ul>
          ) : searchTerm.length > 0 ? (
            <div className={styles.noResults}>검색 결과가 없습니다.</div>
          ) : null}
        </div>
      )}
    </div>
  );
} 