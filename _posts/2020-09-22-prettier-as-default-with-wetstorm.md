---
title: Prettier를 Webstorm의 기본 서식으로 사용하는 방법
tags: [tool, intellij]
excerpt_separator: ''
---

webstorm 의 기본 포멧과 prettier 의 기본 포멧이 다르다보니 `import optimization` 등을 실행하면 포멧이 틀어져 항상 prettier 로 다시 포멧을 변경해야했다. webstorm 2020.2 부터는 이런 불편함을 없앨 수 있게 되었다.  
  
webstorm 2020.2 에서는 prettier 를 기본 서식 지정도구로 사용할 수 있다.

## 적용 방법

`Preference > Languages & Frameworks > Javascript > Prettier` 에서 `On Code Reformat` 체크박스 체크.

![Preference]({{"./assets/img/webstorm-prettier.png" | absolute_url}})

## 출처

- <https://blog.jetbrains.com/ko/webstorm/2020/08/webstorm-2020-2-ko/>
