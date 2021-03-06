---
title: 마크다운을 이용해 epub 만들기
date: 2019-09-21 23-10
tags: [markdown]
description: 
excerpt_separator: ""
---

pandoc이라는 프로그램을 이용하면 간편하게 마크다운문서를 이용해서 epub 파일을 생성할 수 있다.

## 설치 방법

window 와 mac 에서 각각 chocolaty 와 homebrew 를 이용해서 간단히 설치할 수 있다.

### mac 설치 명령

`brew install pandoc`

### windows 설치 명령

`choco install pandoc`

## 사용 방법

터미널에서 아래와 같이 소스 마크다운파일명과 생성할 epub 파일명을 지정해서 실행하면 epub 파일이 생성된다.

`pandoc note.md -o note.epub`

epub 파일을 생성할 때 `--css` 옵션을 이용하면 epub 생성에 사용할 css 파일을 지정할 수 있다. css 파일을 지정하지 않고 epub 을 생성하면 조금은 못생긴 결과물이 생성되었다. github markdown css 나 기타 커스텀 css 를 이용해서 변환하는 것을 추천한다.  

자세한 설치와 이용방법은 [pandoc 공식 페이지](https://pandoc.org/index.html)에 상세하게 소개되어 있다. 

### 유용한 옵션

1. `-t`: 출력 포멧을 지정한다.
1. `-toc`, `--table-of-contents`: 목차를 생성해서 결과물에 포함시킨다.
1. `--toc-depth`: 목차에 포함시킬 heading 의 깊이를 정한다. 기본값은 3이다.
1. `--css`: epub 생성에 사용할 css 파일을 지정한다.
1. `--epub-cover-image`: epub 파일의 커버 이미지 파일을 지정한다.
  
**사용예)**  
`pandoc source.md -o dest.epub -t epub3 --toc --toc-depth=3 --css=mystyle.css --epub-cover-image=mycover.jpg`
 
## 참고

- [pandoc에서 사용할 수 있는 소스 포멧](https://pandoc.org/MANUAL.html#option--from)
- [pandoc에서 사용할 수 있는 목적 포멧](https://pandoc.org/MANUAL.html#option--to)
- [github markdown css](https://github.com/sindresorhus/github-markdown-css)
- [My EPUB CSS file + Pandoc Resources](https://www.penned.blog/my-epub-css-file-plus-pandoc-resources/)
