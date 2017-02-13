---
layout: post
title: javascript call() apply()메서드 이해하기
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
**call() apply()**는 거의 비슷한 메서드라고 볼수 있는데 객체를 상속받고 부모클래스의 
함수를 호출하고 싶을때 사용할수 있습니다. 즉 this값을 조작할 경우에 주로 사용한다고 보시면 
됩니다. call()은 보통의 인자 삽입방식이라 정적일 경우에 사용하고 apply()는 배열로 값을 
받기 때문에 동적으로 값을 조작할 경우 사용한다고 보시면 됩니다.

<!--more-->

## 설명
<pre class="brush:js">
    //apply()는 인자로 배열을 받음
    function Func(a, b) {
        console.log(a, b, this.c);  // 1, 2, 5
    }
    Func.apply({c: 5}, [1,2]);  // 첫번째 인자는 this 개체로 사용됩니다. 두번째는 배열을 받습니다.
</pre>
<pre class="brush:js">
    //call()는 인자로 숫자륿 받습니다.
    function Func(a, b) {
        console.log(a, b, this.c);  // 2, 3, 1
    }
    Func.call({c: 1}, 2, 3);  // 첫번째 인자는 this 개체로 사용됩니다. 두번째는 숫자를 받습니다.
</pre>
call()과 apply()의 차이점은 두번째 인자를 어떤형태로 받느냐의 차이입니다. 숫자로 받느냐 배열로 받느냐
<pre class="brush:js">
    (function () {
        console.log(this);  //window
    }).call(this);
</pre>
위와 같은 경우 call()이 없을 경우에는 this값이 undefined가 나옵니다.
하지만 call()이 있을 경우에는 this값을 조작하므로 window가 나오게 됩니다.
call(임의의 값)를 넘기면 임의의 값에 해당하는 정보가 this값이 됩니다.

<!-- <pre class="brush:js"></pre> -->
<!-- ![test이미지]({{site.url}}/images/es6.jpg) -->
