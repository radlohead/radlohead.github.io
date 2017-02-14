---
layout: post
title: javascript 콜백함수 이해하기
category: front-end
tags:
  - front-end
  - javascript
  - react
  - webpack
  - npm
  - ajax
  - babel
  - json
  - node
comments: true
images:
  title: 
---

## 서론  
**callback함수**는 자바스크립트를 먼저 학습하고 제이쿼리를 익히신 분들이라면 익숙할 것 입니다.
하지만 제이쿼리를 먼저 익히고 자바스크립트를 익히신 분들은 이번 기회에 제대로 익히시는 걸 추천합니다.
자바스크립트 개발에 있어서 제이쿼리는 DOM컨트롤 하는데 있어서는 생산성 부분때문에 대부분 쓰는데 
제이쿼리의 이벤트 부분은 대부분 콜백으로 이루어져 있습니다.

<!--more-->

## 설명
콜백 기본구조
call([thisObj[, arg1[, arg2[,  [, argN]]]]])
<pre class="brush:js">
    const arr = [1,2,3,4,5];

    Func1 = (arr, callback) => callback(arr);
    Func2 = (data) => console.log(data);
    Func1(arr, Func2);  //[1,2,3,4,5]
</pre>
이벤트 처리에서 콜백을 사용하면 버그를 미연에 방지할 수 있다.
<pre class="brush:js">
    const btn = document.getElementById('btn');
    callFunc = () => document.getElementById('root').innerHTML = Date();
    btn.addEventListener("click", callFunc);
</pre>
위와 같은 경우 id가 root인 태그에 날짜와 시간 정보가 들어가게 된다.
대부분의 이벤트들은 이런 콜백형태를 사용한다고 보면 된다.
우리가 흔히 알고 있는 제이쿼리도 콜백으로 만들어졌다.
<pre class="brush:js">
    const $ = () => ({
        click: function () {
            console.log("click 이벤트는 이런형태로 구현이 됩니다.");
        }
    });
    $().click();  //$()이곳에 인자를 넣어서 selector설정을 하면 click이 구현이 됩니다.
</pre>

<!-- <pre class="brush:js"></pre> -->
<!-- ![test이미지]({{site.url}}/images/es6.jpg) -->
