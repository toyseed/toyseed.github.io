---
title: javascript Set으로 json문자열을 만드는 방법
tags: [javascript, 짧은배움]
excerpt_separator: ''
---
javascript의 Set은 JSON.stringify 메서드로 json 문자열을 만들 수 없다. Set 은 property 로 저장되지 않기 때문이라고 한다. Set 을 json 문자열로 만들기 위해서는 Set 을 Array 로 변환하는 트릭을 사용해야 한다.  

```language-javascript
const s = new Set();
const sJson = JSON.stringify([...s]);
```

Set 을 array 로 변환한 후 json 문자열을 만들기 때문에 json 문자열에서 다시 Set 을 만들 때는 문자열을 만들 때와 반대로 진행해야 한다.

```language-javascript
new Set(JSON.parse(sJson));
```

## 참조

<https://stackoverflow.com/questions/31190885/json-stringify-a-set>
  
