---
title: xcode 관련 npm install 오류 수정 방법
date: 2020-04-05 04-08
description: 
tags: [npm]
excerpt_separator: ""
---

개발환경을 구성하고 `npm install` 을 실행하다 보면 아래와 같은 오류가 발생하는 경우가 있다.

> ERROR: xcode-select: error: tool 'xcodebuild' requires Xcode, but active developer directory '/Library/Developer/CommandLineTools' is a command line tools instance

나 같은 경우는 아마도 homebrew 를 이용해서 프로그램을 설치 하는 과정에 `command line tools` 가 설치되어서 발생한 것으로 추측한다. 구글에서 두 가지 해결방법을 찾았고 두 가지 방식 모두 문제를 해결했다. 결국은 같은 역할을 하는 것 같다.

## 방법 1: command line 을 이용하는 방법

> $ sudo xcode-select -s /Applications/Xcode.app/Contents/Developer

## 방법 2: xcode 를 이용하는 방법

1. `xcode` 를 실행하고 `Preference` 를 연다.
1. 열린 창에서 `Location` 탭을 선택한다.
1. `Preference` 창 하단, `Command Line Tools` 항목에서 버전을 선택한다.
 
## 참조

- <http://airpage.org/xe/tool_data/27432>
- <http://frontend.diffthink.kr/2016/04/ios.html>