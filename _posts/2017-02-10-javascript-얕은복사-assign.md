---
layout: post
title: javascript assign(얕은복사)에 대해서 알아보자
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
comments: true
images:
  title: 
---

## 서론  
**assign**는 하나이상의 오브젝트로 부터 타겟 오브젝트로 프로퍼티를 복사하는데 사용됩니다.

<!--more-->

## 설명
- Object.assign() 메소드는 null 이나 undefined는 반환하지 않습니다.
- TypeError가 발생하는 상황에서는 타겟오브젝트에는 변화가 없을 것입니다.
- 열거가능성을 포함한 프로퍼티를  프로토타입으로 복사하기 위해서는 
Object.getOwnPropertyDescriptor()와 Object.defineProperty() 
을 사용하시기 바랍니다.

<pre class="brush:js">
    //객체 복사하기
    const obj = {a: 1};
    const copy = Object.assign({}, obj);
    console.log(copy);  //{a: 1}
</pre>
<pre class="brush:js">
    //같은 프로퍼티를 가지고 있는 객체 병합하기
    const a = {a: 1, b: 1, c: 1};
    const b = {b: 2, c: 2};
    const c = {c: 3};

    const obj = Object.assign({}, a,b,c);
    console.log(obj);  //{a: 1, b: 2, c: 3}
</pre>
<pre class="brush:js">
    //객체 병합하기
    const a = {a: 1};
    const b = {b: 2};
    const c = {c: 3};

    const obj = Object.assign(a,b,c);
    console.log(obj); //{a: 1, b: 2, c: 3}
    console.log(a);   //{a: 1, b: 2, c: 3}
</pre>
<pre class="brush:js">
    //심볼타입 프로퍼티 복사하기
    const a = {a: 1};
    const b = { [Symbol('foo')]: 2};
    const obj = Object.assign({}, a,b);
    console.log(obj);
    console.log(Object.getOwnPropertySymbols(obj));
</pre>
<pre class="brush:js">
    //프로토타입 체인위에 있는 프로퍼티와 열거할수 없는 프로퍼티들은 복사되지 않습니다.
    const obj = Object.create({foo: 1},{
        bar: {
            value: 2
        },
        baz: {
            value: 3,
            enumerable: true
        }
    });
    const copy = Object.assign({}, obj);
    console.log(copy);  //{baz: 3}
</pre>
<pre class="brush:js">
    //원시타입들은 객체로 변환될 것입니다.
    //String과 객체, 배열을 제외한 값은 변환되지 않습니다.
    //그 이유는 그외의 값들은 enumerable값을 가지고 있지 않기 때문입니다.
    const a = 'abc';
    const b = true;
    const c = 10;
    const d = Symbol('foo');
    const obj = Object.assign({}, a, null, b, undefined, c, d);
    console.log(obj);  //{0: "a", 1: "b", 2: "c" }
</pre>

<!-- <pre class="brush:js"></pre> -->
<!-- ![test이미지]({{site.url}}/images/es6.jpg) -->
