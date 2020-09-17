---
title: rxjs의 가장 기초적인 용어 
tags: [rxjs]
excerpt_separator: ''
---

## Observable

data publisher. `Observer`에게 데이터를 전달하는 주체. 데이터 전달 방식에 따라 `Cold Observable`과 `Hot Observable`로 나뉜다. `Cold Observable`은 `subscribe`이 발생하는 시전에 데이터를 발행하며 `Cold Observable`을 `subscribe`하는 `Observer`는 `subscribe`한 시점에 관계 없이 같은 데이터를 받는다. `Hot Observable`은 `subscribe`이 발생하지 않아도 데이터를 발행한다. `Cold Observable`과 달리 `Hot Observable`을 `subscribe`하는 `Observer`는 `subscribe` 시점에 따라 다른 데이터를 받을 수 있다. 

## Observer

data consumer. 3개의 함수로 정의되는 단순한 객체. 객체를 정의하는 함수는 `next`, `error`, `complete` 이다. `next`는 `Observable`이 데이터를 발행할 때 호출한다. `error`는 `Observable`에서 오류가 발생했을 때 호출된다. `complete`은 `Observable`이 완료되면 호출된다.

## Subscriber

처음에는 Observer == Subscriber 라고 생각했다. `Observer`를 이용해서 `Observable`을 `subscribe`하는 객체 정도로 이해하면 될 것같다.

## Operator

`Observable`에서 발행하는 데이터 스트림을 생성/변형/필터링/조합등을 하기 위한 사용하는 rx에 정의된 연산자를 말한다. 

## Higher-Order Observable/Operator

`Observable`에서 발행하는 데이터가 값이 아닌 다른 `Observable`인 경우 `Observable`을 발행하는 `Observable`을 `Higher-Order Observable`이라고 한다. 마찬가지로 연산의 결과가 `Observable`은 `Operator`를 `Higher-Order Operator`라고 한다. 대표적은 `Higher-Order Operator`로 `conscatMap`, `mergeMap`, `switchMap`등이 있다.

