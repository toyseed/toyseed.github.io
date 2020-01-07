---
title: 데본씽크 마크다운에 로컬 css 적용하기
tags: [devonthink]
excerpt_separator: ""
---

## 적용 방법

1. 마크다운에 적용할 css 파일을 데본씽크 데이터베이스에 복사합니다.
2. css 를 적용할 마크다운 파일 상단에 아래 코드를 입력합니다.

{% highlight html %}
<link rel="stylesheet" type="text/css" href="[CSS FILE PATH">
{% endhighlight %}

예를 들어 데이터페이스 루트에 `github.css` 파일이 있는 경우 `[CSS FILE PATH]` 는 `/github.css` 입니다.

## 출처

<https://twelvety.com/blog/how-to-use-local-css-with-markdown-in-devonthink-to-go-on-ios https://raw.githubusercontent.com/sindresorhus/github-markdown-css/gh-pages/github-markdown.css>
