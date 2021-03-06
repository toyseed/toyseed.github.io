---
title: 꼬리 재귀(tail recursion)와 자바스크립트
date: 2019-11-27 23-50
tags: [짧은배움, javascript]
description: 
excerpt_separator: ""
---

함수를 재귀적으로 호출하여 문제를 해결하는 방식은 코드를 간결하고 의도를 파악하기 쉽게 작성할 수 있는 장점이 있다. 하지만 재귀함수의 콜스택이 깊어 질수록 메모리 오버헤드가 발생하는 단점도 있다. 이 문제를 해결하기 위한 재귀 호출 방식을 꼬리 재귀라고 부른다. 간단하게 정의하자면 재귀함수의 실행 결과가 연산에 사용되지 않고 바로 반환되게 함으로써 이전 함수의 상태를 유지할 필요가 없도록 재귀 함수를 작성하는 것이다. 더불어 꼬리 재귀가 동작하려면 플랫폼에서 TCO(Tail Call Optimization)를 지원해 줘야한다. 하지만 안타깝게도 safari 를 제외한 모든 브라우저는 TCO를 지원하지 않으며 node 역시 TCO를 지원하지 않고 있다. ([관련자료링크](https://kangax.github.io/compat-table/es6/))  
