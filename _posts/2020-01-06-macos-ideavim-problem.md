---
title: macos intellij 의 ideavim 에서 multi-cursors 플러그인 이슈 
tags: [intellij]
excerpt_separator: ""
---

ideavim 의 multi-cursors 플러그인은 기본적으로 alt 키에 바인이되어 있다. 그런데 macos 에서는 alt 키가 특수 문자를 입력하는데 사용되도록 되어있기 때문에 multi-cursors 플러그인이 동작하지 않는다. 

문제를 해결하는 방법 한가지는 키보드설정에서 input source 를 'Unicode Hex Input' 으로 변경하는 것이다.  
  
하지만 키보드 input source 를 변경하면 다른 곳에서 문제가 생긴다. 하나는 alt 와 방향키를 이용한 단어 단위 이동이 안되는 것이고 다른 하나는 ideaVim-extension 플러그인과 관련된 것이다. 이 plugin 은 ideavim 이 명령 모드일 때 input source 를 영문으로 변경해 준다. 한글과 영문을 번갈아가며 입력할 때 굉장히 유용한 플러그인이지만 input source 가 'ABC'인 경우만 정상 동작한다.  

macos 에서 multi-cursor 플러그인과 ideavim-extension 플러그인을 동시에 사용하기 위해서는 vim 의 키 매핑을 수정해야했다. [링크](https://youtrack.jetbrains.com/issue/VIM-1531?_ga=2.32297534.1434268824.1578243903-2056734841.1574954856)에서 제안한 대로 alt 대신 ctrl 을 사용하도록 키 매핑을 변경한 후 두 플러그인을 같이 사용할 수 있었다.
  
```
map <C-N>  <A-N>
map <C-P>  <A-P>
map <C-X>  <A-X>
map g<C-N> g<A-N>
```

## 참조

- <https://stackoverflow.com/questions/55202799/ideavim-multi-cursor-usage/55217839>
- <https://intellij-support.jetbrains.com/hc/en-us/community/posts/360001478280-How-to-unset-key-mapped-by-vim-plugin-multiple-cursors->
- <https://youtrack.jetbrains.com/issue/VIM-1531?_ga=2.32297534.1434268824.1578243903-2056734841.1574954856>
