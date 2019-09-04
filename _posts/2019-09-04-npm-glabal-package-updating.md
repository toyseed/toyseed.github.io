---
title: 전역 npm 패키지 업데이트 하기
date: 2019-09-04 23-35
description: 
tags: [npm]
excerpt_separator: ""
---

### 설치된 전역 패키지 확인 명령

`npm list -g --depth=0`

### 업데이트가 필요한 전역 패키지 확인 명령

`npm outdated -g --depth=0`

### 전역 패키지 업데이트 명령

#### 특정 패키지 업데이트

`npm install -g <package>`

#### 전체 패키지 업데이트

`npm update -g`

