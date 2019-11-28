---
title: css 함수에서 sass 변수 사용하기
tags: [sass, css]
excerpt_separator: ""
---

`calc()`와 같은 css 함수는 산술식을 파라미터로 입력받을 수 있다. 그런데 파라미터로 전달할 산술식에 sass 변수가 포함된 경우 sass 파서는 연산자를 sass 변수에 적용해야할지 변수부분만 치환해야할지 판단할 수 없다. 그래서 sass 는 css 함수 파라미터 구문에서 sass 변수를 직접 사용하는 것을 허용하지 않는다. css 함수 내부에서 sass 변수(혹은 표현식)를 사용해야 하는 경우 [sass interpolation](https://sass-lang.com/documentation/interpolation) 사용해야 한다.

sass interpolation 은 `#{sass expression}` 형태를 취하며 아래와 같이 사용할 수 있다.

```sass
.selector {
    width: calc(0.8em + #{$sass_variable});
}
```

## 참조

- <https://stackoverflow.com/questions/17982111/sass-variable-in-css-calc-function>
- <https://sass-lang.com/documentation/interpolation>
- <https://sass-lang.com/documentation/syntax/special-functions>