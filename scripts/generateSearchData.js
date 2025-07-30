const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// docs 폴더 경로
const docsDir = path.join(__dirname, '../docs');

// 검색 데이터를 저장할 배열
const searchData = [];

// 재귀적으로 .md/.mdx 파일을 찾는 함수
function scanDocsDirectory(dir, basePath = '') {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // 폴더인 경우 재귀적으로 스캔
      const newBasePath = basePath ? `${basePath}/${file}` : file;
      scanDocsDirectory(filePath, newBasePath);
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      // .md/.mdx 파일인 경우 처리
      const relativePath = path.relative(docsDir, filePath);
      const docId = relativePath.replace(/\.(md|mdx)$/, '');
      
      try {
        // 파일 내용 읽기 (제목 추출을 위해서만)
        const content = fs.readFileSync(filePath, 'utf8');
        const { data: frontmatter, content: markdownContent } = matter(content);
        
        // 제목 추출 (frontmatter의 title 또는 첫 번째 # 제목)
        let title = frontmatter.title || frontmatter.sidebar_label;
        if (!title) {
          const titleMatch = markdownContent.match(/^#\s+(.+)$/m);
          title = titleMatch ? titleMatch[1].trim() : file.replace(/\.(md|mdx)$/, '');
        }
        
        // URL 생성
        const url = `/samidare20/docs/${docId}`;
        
        // 검색 데이터에 추가 (제목과 URL만 저장)
        searchData.push({
          id: docId,
          title: title,
          url: url
        });
        
      } catch (error) {
        console.error(`❌ ${filePath} 처리 중 오류:`, error.message);
      }
    }
  });
}

// docs 폴더 스캔 시작
scanDocsDirectory(docsDir);

// 검색 데이터를 JSON 파일로 저장
const outputPath = path.join(__dirname, '../src/components/SidebarSearch/searchData.json');
fs.writeFileSync(outputPath, JSON.stringify(searchData, null, 2));
 