---
layout: post
title: ajax로 json형태의 데이터를 받아 출력하기
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
**ajax**는 웹서버와 비동기적으로 데이터를 교환하고 조작하기 위해 쓰이는 기술이다.

<!--more-->

## 장점
- 페이지 이동없이 고속으로 화면을 전환할 수 있다.
- 서버처리를 기다리지 않고 비동기 요청이 가능하다.
- 수신하는 데이터양을 줄일 수 있고 클라이언트에게 처리를 위임할 수도 있다.

##단점
- Ajax를 쓸 수 없는 브라우저에 문제가 생긴다.
- Http클라이언트의 기능이 한정되어 있다.
- 페이지 이동없는 통신으로 인한 보안상의 문제
- 지원하는 Charset이 한정되어 있다.
- 스크립트로 작성되므로 Debugging이 용이하지 않다.
- 요청을 남발하면 역으로 서버부하가 늘 수 있음
- 다른 도메인과는 통신이 불가능하다.

ajax처리를 하기 위해서는 json으로 받아올 jsp파일을 생성하자
test.jsp로 생성하고 아래처럼 json 방식으로 코드를 입력하자

<pre class="brush:js">
    //test.jsp
    {"hacosa" : "minho" , "study" : {"ajax" : "ajaxValue","react":"reactValue"} }
</pre>

입력이 끝났다면 index.html에서 아래의 코드를 삽입하자

<pre class="brush:js">
    //index.html
    &lt;script&gt;
        $(document).ready(function() {
                $("#btn").click(function() {
                    var result = document.getElementById('ajaxValue');
                    $.ajax({
                        url : "test.jsp", // test.jsp 에서 받아옴
                        dataType :"json", // 데이터타입을 json 으로 받아옴
                        success : function(data) {
                            console.log(result.innerHTML = data.study.ajax);
                        },
                        error : function(e) {
                            console.log(e.responseText);
                        }
                    });
                });
        });
    &lt;/script&gt;
</pre>
<pre class="brush:js">
    //index.html
    &lt;input type="button" id="btn" value="click"&gt;
    &lt;div id="ajaxValue"&gt;&lt;/div&gt;
</pre>

여기까지 삽입이 끝났다면 필요한 코드는 모두 입력이 끝났다.
index.html을 실행해보면 data.study.ajax에 해당하는 json값이 넘어온다.
그 상태에서 study.ajax에 해당하는 json값을 수정해보자 그러면 새로고침을 하지 않아도
데이터 값이 변경 되는걸 확인할 수 있다.

<!-- <pre class="brush:js"></pre> -->
<!-- ![test이미지]({{site.url}}/images/es6.jpg) -->
