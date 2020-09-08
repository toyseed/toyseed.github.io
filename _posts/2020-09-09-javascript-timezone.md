---
title: 자바스크립트에서 타임존 다루기 요약
tags: [javascript]
excerpt_separator: ''
---

토스트 기술 블로그에 올라온 자바스크립트 타임존에 관련된 포스트 요약.

<https://meetup.toast.com/posts/125>
<https://meetup.toast.com/posts/130>

## base knowlege

- 타임존
    - 동일한 로컬 시간을 따르는 지역
    - 국가나 지역들마다 자신들이 사용하는 타임존에 대한 고유 이름을 부여한다.
- GMT(Greenwich Mean Time)
    - 그리니치 천문대를 기준으로 하는 태양 시간
    - 1925년 2월 5일 부터 1972년 1월 1일 까지 사용됨
- UTC
    - GMT를 대체하기 위해 제정된 새로운 표준
    - GMT와 차이는 미세하지만 좀 더 정확한 시간을 측정
    - 지구 자전주기의 흐름이 늦어지고 있는 문제를 해결
- 오프셋
    - UTC 와의 차이
    - UTC+09:00 
        - 시간이 UTC 보다 9시간 빠르다.
        - UTC 기준 낮 12시면 UTC+09:00 은 오후 9시
    - 오프셋과 타임존의 관계는 N:1
        - 하나의 타임존이 여러 오프셋을 가질 수 있다.
    - [List of UTC Time offsets](https://en.wikipedia.org/wiki/List_of_UTC_time_offsets)
- 서머 타임
    - DST(Daylight Saving Time) 이 범용어
    - 하절기에 표준시를 원래 시간보다 한 시간 앞당신 시간을 이용하는 것
    - 보편적 규칙에 의해 적용되는 것이 아니라 지역/국가의 법에 따라 적용됨
- IANA time zone database (tz database, tzdata)
    - 전 세계 모든 지역의 표준시와 DST 변경 내역을 담고 있는 데이터베이스
    - UNIX 시간(1970.01.01 00:00:00) 이후의 데이터 정확도 보장
    - Area/Location 규칙으로 이름 붙임
        - Area: 대륙이나 대양명
        - Location: 큰 도시명
        - 대한민국의 타임존은 Asia/Seoul
    - 리눅스, unix, macos, java, php 등에서 내부적으로 IANA 사용
- Microsoft Time Zone Database
    - MS 에서 사용하는 데이터베이스
    - IANA 에 비해 신뢰도가 떨어진다.
- [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date string format
    - 날짜와 시간을 표현하는 국제 표준
    - 날짜와 시간 데이터 교환을 cover(?) 한다.
    - 문자열 마지막 `Z` 는 UTC 기준 zero offset 을 의미한다.

## 자바스크립트

- 자바스크립트는 실행 환경(OS)에 설정된 타임존을 따른다.
- 브라우저마다 타임존 연산이 다르게 동작하는 경우도 있다.
- ISO string 으로 date 객체를 생성한 경우 toString 의 결과가 브라우저마다 다르다.
    - zero offset flat(Z) 가 반영되거나 반영되지 않거나.
- 다른 언어에 비해 신뢰할만한 타임존 지원이 부족하다.
- **타임존간 변환이 필요한 경우 [moment](https://momentjs.com) 라이브러리를 사용하라.**

## Date functions

- Date.prototype.getTime()
    - UNIX 시간을 반환한다.
    - UNIX 시간은 UTC 시간이다.
- Date.prototype.getTimeZoneOffset()
    - 자바스크립트 실행 환경의 타임존 오프셋을 분단위로 반환한다.
    - 예를 들어 `-540` 은 UTC 기준 540분 빠름을 의미한다.
        - 그러니까 UTC 시간에 540분(9시간)을 더해야한다.
- Date.prototype.toString()
    - date 객체의 시간을 local time 으로 해석하고 시간을 출력한다.
    - 결과가 브라우저마다 다르다.
    - new Date().toString() 은 현재 시간에 offset 과 timezone 을 함께 표기한다.
        - "Sun Mar 01 2020 03:41:09 GMT+0900 (Korean Standard Time)"
        - 시간은 3시 41분이고 이 시간은 GMT 기준으로 9시간 빠르다.
- Date.prototype.toISOString()
    - date 객체의 값을 ISO-8601 포멧으로 표현된 문자열을 반환한다.
    - "2020-01-31T19:17:06.183Z"
        - UTC 기준 19시 17분 -> time zone 을 적용해야 local time 을 알 수 있다.

