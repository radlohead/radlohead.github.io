---
layout: post
title: javascript에서 forEach, map, reduce 차이점을 알아보자
category: front-end
tags:
  - front-end
  - javascript
  - react
  - webpack
  - npm
  - ajax
comments: true
images:
  title:
---

## javascript에서 forEach, map, reduce 차이점을 알아보자    

지금부터 어떤 부분이 같고 어떤부분이 다른지 살펴보자

<!--more-->

[forEach, map, reduce]의 공통점은 배열을 이용한다는 점이다.
배열의 값을 조작해서 원하는 결과값을 도출하는데 의미가 있다.

다른점은 forEach는 문밖으로 리턴값을 받지를 못한다. 아래의 코드를 보자

<pre class="brush: js">
var arr = [1,2,3,4,5];
var a = arr.forEach(function(v){
	return v;
});
console.log(a);  //undefined
</pre>

이 경우 **undefined**가 출력 된다.