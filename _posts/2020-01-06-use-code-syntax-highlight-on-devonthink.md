---
title: 데본씽크 마크다운에 syntax highlight 적용하기
tags: [devonthink]
excerpt_separator: ""
---

데본씽크 마크다운에 css 를 embed 시켜 스타일을 적용한 것처럼 마크다운에 js 파일도 embed 할 수 있다. 이를 이용하면 마크다운 코드블럭에 syntax highlight 를 적용할 수 있다.  
  
`prism` 은 다양한 언어의 syntax highlight 를 지원해 주는 라이브러리다. prism 라이브러리의 스크립트와 css 를 마크다운에 embed 시켜서 마크다운 코드블럭에 syntax highlight 가 적용되게 할 수 있다.  단 코드블럭에 언어 종류를 기술할 때 prism 스펙에 맞게 language-xxx 형태가 되어야한다. 가령 css 코드를 코드 블럭으로 지정할 경우 아래와 같이 작성해야한다.
                                
\`\`\`**language-css**  
.clsss {  
&nbsp;&nbsp;&nbsp;&nbsp;style ...  
}  
\`\`\`  

[prism download](https://prismjs.com/download.html#themes=prism-dark) 사이트에서 사용하고 싶은 테마와 지원하고 싶은 언어를 선택한 후 화면 하단 download 버튼을 이용해서 js 와 css 를 다운받을 수 있다. 다운 받은 파일을 syntax highlight 를 사용할 devonthink 데이터 베이스 원하는 위치에 복사 한 후 각 마크다운 최상단에 아래 형태로 입력을 하면 미리보기에 syntax highlight 가 적용된 것을 확인할 수 있다.  

```html
<link href="/prism.css" rel="stylesheet" />
<script src="/prism.js"></script>
```

참고로 위 경로는 데이터베이스 루트에 파일을 저장한 경우이다.

## ref

- <https://www.clien.net/service/board/cm_mac/13704710>
