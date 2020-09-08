---
title: 간략하게 정리한 angular 모듈의 성질
tags: [angular]
excerpt_separator: ''
---

앵귤러 모듈은 서비스에서 연관된 기능을 정의한다. 여기서 연관된 기능이란 Component, Directive, Pipe, Service 그리고 정의하는 모듈에 필요한 다른 모듈을 말한다. 개념적으로는 간단하다. 그런데 막상 사용하려고 하면 혼란이 온다. 모듈은 서로 어떻게 엮일까? 모듈은 어떻게 구성해야 할까? 이 질문에 단서가 될만한 모듈의 기본적인 특징을 알아보자.  

## Component, Directive, Pipe

모듈에 정의된 Component, Directive, Pipe(이하 delcarable)는 private이다. 모듈에서 이들을 export하지 않으면 다른 모듈에서 이들을 사용할 수 없다. export된 declarable 을 다른 모듈에서 사용하기 위해서는 다른 모듈에서 직접 import 해야한다. 예를 들어 AppModule(root module)에 AModule과 BModule이 import 되어 있더라도 AModule에서 BModule의 declarable을 사용하기 위해서는 AModule이 BModule을 import해야 한다.

모듈에 declarable을 정의할 때 한 가지 주의할 점이 있다. declarable은 어플리케이션 내에서 하나의 모듈에만 속할 수 있는 것이다. 같은 declarable을 여러 모듈에 포함시키면 앵귤러 컴파일 과정에서 오류가 일어난다.

## Service

Service는 declarable과 다르게 동작한다. 모듈에 정의된 Service는 public이다. root module에서 import하는 하나의 모듈에 Service가 정의되어 있으면 다른 모듈에서 Service를 사용할 수 있다. 기본적으로 Service는 singleton이다. root module이 import하는 여러 모듈에 같은 Service가 정의되어 있더라도 Service instance는 하나만 생성된다. 생성된 Service instance는 root module에 import된 모듈의 순서의 영향을 받으며 가장 나중에 정의된 모듈의 Service가 객체화된다.  
  
모듈이 lazy-loading될 때는 동작이 달라진다. lazy-loading되는 모듈에 Service가 정의되어 있으면 이 Service에 대한 instance가 하나 더 만들어진다. 예를 들어 AppModule이라는 root module과 lazy-loading되는 LazyModule이 있고 declarable과 Service를 제공하는 ServiceModule이있다고 가정하자. AppModule과 LazyModule이 ServiceModule에서 제공하는 declarable을 사용하기 위해 각각 ServiceModule을 import하면 LazyModule에는 AppModule과 다른 Service instance를 갖는다. 다시말해 singleton이 아니게 된다.

### providedIn과 forRoot

앵귤러는 위와 같은 경우 Service를 singleton으로 정의할 수 있는 방법을 제공한다.  
  
첫 번째는 @NgModule의 providers에 Service를 정의하지 않고 @Injectable 데코레이터의 값으로 {providedIn: 'root'}를 지정하는 방법이다. 앵귤러 6버전부터 사용가능하며 추천하는 방식이라고 한다.  
  
다른 한가지는 모듈에 forRoot와 forChild 함수를 이용하는 것이다. forRoot 함수는 Service가 포함된 모듈을 반환하고 forChild 함수는 Service가 포함되지 않는 모듈을 반환한다. root module에서는 forRoot 함수를 이용해서 모듈을 import하고 root module 이외 모듈에서는 forChild 함수를 이용해서 모듈을 import해서 Service가 반복해서 생성되는 것을 막을 수 있다.

## 출처

- <https://angular.io/guide/providers>
- <https://medium.com/@cyrilletuzi/understanding-angular-modules-ngmodule-and-their-scopes-81e4ed6f7407>
- <https://itnext.io/understanding-provider-scope-in-angular-4c2589de5bc>
