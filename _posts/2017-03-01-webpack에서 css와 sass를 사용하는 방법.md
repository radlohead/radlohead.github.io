---
layout: post
title: webpack에서 css와 sass를 사용하는 방법
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
  - handlebars
  - D3
  - sass
  
comments: true
images:
  title: 
---

## 서론  
webpack에서 css와 sass사용에 관한 글이 생각보다 많지가 않은 것 같아서 포스팅하게 되었습니다.


<!--more-->

## 설명
css를 webpack으로 사용하는 방법을 먼저 알아보고 sass로 사용하는 방법에 대해서 알아보도록 
하겠습니다. **webpack에서 app.js파일을 불러오고 index.html에서 번들 될수 있도록 준비를 해주세요**
css를 사용하기 위해서 필요한 플러그인을 설치하겠습니다.
<pre class="brush:js">
$ npm i -D style-loader css-loader
</pre>
**webpack.config.js**
<pre class="brush:js">
loaders:[{
    test:/\.css/,
    loader: 'style-loader!css-loader'
}]
</pre>
위와 같이 webpack.config.js를 수정해주세요 그리고 **app.js** 상단에
<pre class="brush:js">
require('./style.css');
</pre>
스타일을 불러오면 적용이 됩니다. 이제 scss를 불러오는 방법을 해보겠습니다.
<pre class="brush:js">
$ npm i -D sass-loader
</pre>
**sass**로더를 설치하시
<pre class="brush:js">
loaders:[{
    test:/\.scss/,
    loader: 'style-loader!css-loader!sass-loader'
}]
</pre>
조금전에 입력한 코드에서 css->scss, **sass-loader**를 추가해 주시면 됩니다.

**app.js**
<pre class="brush:js">
require('./style.scss');
</pre>
파일을 불러오시면 적용이 끝났습니다.

<!-- <pre class="brush:js"></pre> -->
<!-- ![test이미지]({{site.url}}/images/es6.jpg) -->
