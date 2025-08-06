## 한글 폰트 설정

현재 사이트는 다음과 같은 한글 폰트가 적용되어 있습니다:

### 적용된 폰트
- **Noto Sans KR**: Google에서 개발한 한글 최적화 폰트
- **Nanum Gothic**: 나눔고딕 폰트
- **IBM Plex Sans KR**: IBM에서 개발한 한글 폰트

### 폰트 변경 방법

#### 1. Google Fonts 사용
```css title="src/css/custom.css"
/* Google Fonts import */
@import url('https://fonts.googleapis.com/css2?family=원하는+폰트명:wght@300;400;500;700&display=swap');

:root {
  --ifm-font-family-base: '원하는 폰트명', sans-serif;
}
```

#### 2. 로컬 폰트 파일 사용
```css title="src/css/custom.css"
/* 로컬 폰트 정의 */
@font-face {
  font-family: 'CustomFont';
  src: url('/static/fonts/CustomFont.woff2') format('woff2'),
       url('/static/fonts/CustomFont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

:root {
  --ifm-font-family-base: 'CustomFont', sans-serif;
}
```

#### 3. 폰트 파일 추가
1. `static/fonts/` 폴더 생성
2. 폰트 파일 (.woff2, .woff, .ttf) 추가
3. CSS에서 `@font-face`로 정의
4. CSS 변수에 적용
