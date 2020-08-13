---
title: github 저장소를 npm 프로젝트의 의존성에 적용하는 방법
tags: [npm]
excerpt_separator: ''
---

wasm코드를 블로그에 적용할 때 wasm 패키지의 경로를 아래와 같이 파일 경로로 지정해서 사용했다.

```
  "dependencies": {
    ... 
    "rxjs": "^6.6.0",
    "wasm-game-of-life": "file:../__external/wasm-game-of-life"
  }
```

로컬 파일의 경로를 직접 사용하다보니 당연하게도 다른 pc 에서 github 페이지를 빌드할 수 없는 불상사가 생겨버렸다. 혹시 github repository를 직접 의존성으로 지장할 수 있나 싶어 찾아보니 아래 명령으로 의존성을 추가할 수 있었다. 
덕분에 간단하게 문제를 수정할 수 있었다.

```
npm install --save username/repo#branch-name
```

## 참조

- <https://medium.com/@jonchurch/use-github-branch-as-dependency-in-package-json-5eb609c81f1a>
