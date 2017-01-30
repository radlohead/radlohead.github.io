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
  title: https://radlohead.github.io/images/es6.jpg
---

## javascript에서 forEach, map, reduce 차이점을 알아보자    

**forEach, map, reduce**의 공통점은 배열을 이용한다는 점이다.
배열의 값을 조작해서 원하는 결과값을 도출하는데 의미가 있다.

<!--more-->

다른점은 forEach는 문밖으로 리턴값을 받지를 못한다. 아래의 코드를 보자

<pre class="brush: js">
var arr = [1,2,3,4,5];
var a = arr.forEach(function(v){
	return v;
});
console.log(a);  //undefined
</pre>

이 경우 **undefined**가 출력 된다.<br>
하지만 같은 경우라도 map을 이용하면 다르다.

<pre class="brush: js">
var arr = [1,2,3,4,5];
var a = arr.map(function(v){
	return v + 1;
});
console.log(a);  //[2,3,4,5,6]
</pre>

이 경우는 **[2,3,4,5,6]**이 들어있는 배열이 출력된다.<br>
**map**은 리턴값을 출력할수 있다.<br>
즉 **forEach와 map**의 큰 차이는 바로 리턴값에 있는 것이다.<br>
성능면에 있어서도 **map이 forEach**보다 유리하다. 가능하면 **map**을 
사용하는게 좋다. 

그럼 **reduce**에 대해서도 알아보자
**reduce**의 문법은 아래와 같다.

<pre class="brush:js">
[0, 1, 2, 3, 4].reduce(function(accumulator, currentValue, currentIndex, array) {
  return accumulator + currentValue;
});
</pre>

**reduce**의 인자로는 총4개를 받을수가 있는데 이전값,현재값,index,배열을 받을수가 있다.

간단한 코드를 통해 **reduce**를 알아보자

<pre class="brush:js">
    var arr = [1,2,3,4,5];
    var a = arr.reduce(function(prevValue,currentValue){
    	return prevValue+currentValue;
    });
    console.log(a); //15
</pre>

이전에 살펴본 **map**과 달리 **reduce**는 배열이 아닌 하나의 값으로 출력을 하고 있다.
이전값과 현재값을 더하는 방식으로 값을 출력해 내는데

1+2 = 3 <br>
3+3 = 6 <br>
6+4 = 10 <br>
10+5 = 15

이런형태로 값을 도출해 내는 걸 알수 있다.

prevValue만 리턴하면 배열의 첫번째 요소 1이 리턴이 된다.<br>
currentValue는 배열의 마지막 요소 5가 리턴이 된다.

**forEach, map, reduce** 메소드중 reduce가 더 어려운 느낌이 드는 것 같다.
<!--![test이미지]({{site.url}}/images/es6.jpg)-->
