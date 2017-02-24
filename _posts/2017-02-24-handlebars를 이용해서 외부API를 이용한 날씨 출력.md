---
layout: post
title: handlebars와 외부API를 이용한 날씨 출력
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
comments: true
images:
  title: 
---

## 서론  
handlebars와 Webpack, Node.js, Ajax등 프론트엔드에 필요한 것들을 활용해서 
외부API를 활용해서 날씨를 출력해 보겠습니다.

<!--more-->

## 설명
폴더구조 부터 설정하겠습니다.

+ output
    + images
        - transparent.jpg
    - index.html
+ src
    - app.js
- package.json
- webpack.config.js

위와 같은 구조로 작업을 진행해 보겠습니다. 
[https://getmdl.io/components/index.html#layout-section](https://getmdl.io/components/index.html#layout-section) 
이곳에 있는 레이아웃 형태로 만들어서 토글 버튼을 만들어서 날씨데이터를 불러올 것입니다. 
레이아웃에 있는 배경bg를 다운받아주시고 그 아래 코드들을 index.html에 넣어주세요
그리고 헤드안에는 Getting Started에 있는 코드를 넣어주세요

**index.html**
<pre class="brush:js">
&lt;link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"&gt;
&lt;link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css"&gt;
&lt;script defer src="https://code.getmdl.io/1.3.0/material.min.js"&gt;&lt;/script&gt;
</pre>
<pre class="brush:js">
&lt;style&gt;
.demo-layout-transparent {
  background: url('../assets/demos/transparent.jpg') center / cover;
}
.demo-layout-transparent .mdl-layout__header,
.demo-layout-transparent .mdl-layout__drawer-button {
  /* This background is dark, so we set text to white. Use 87% black instead if
     your background is light. */
  color: white;
}
&lt;/style&gt;

&lt;div class="demo-layout-transparent mdl-layout mdl-js-layout"&gt;
  &lt;header class="mdl-layout__header mdl-layout__header--transparent"&gt;
    &lt;div class="mdl-layout__header-row"&gt;
      &lt;!-- Title --&gt;
      &lt;span class="mdl-layout-title"&gt;Title&lt;/span&gt;
      &lt;!-- Add spacer, to align navigation to the right --&gt;
      &lt;div class="mdl-layout-spacer"&gt;&lt;/div&gt;
      &lt;!-- Navigation --&gt;
      &lt;nav class="mdl-navigation"&gt;
        &lt;a class="mdl-navigation__link" href=""&gt;Link&lt;/a&gt;
        &lt;a class="mdl-navigation__link" href=""&gt;Link&lt;/a&gt;
        &lt;a class="mdl-navigation__link" href=""&gt;Link&lt;/a&gt;
        &lt;a class="mdl-navigation__link" href=""&gt;Link&lt;/a&gt;
      &lt;/nav&gt;
    &lt;/div&gt;
  &lt;/header&gt;
  &lt;div class="mdl-layout__drawer"&gt;
    &lt;span class="mdl-layout-title"&gt;Title&lt;/span&gt;
    &lt;nav class="mdl-navigation"&gt;
      &lt;a class="mdl-navigation__link" href=""&gt;Link&lt;/a&gt;
      &lt;a class="mdl-navigation__link" href=""&gt;Link&lt;/a&gt;
      &lt;a class="mdl-navigation__link" href=""&gt;Link&lt;/a&gt;
      &lt;a class="mdl-navigation__link" href=""&gt;Link&lt;/a&gt;
    &lt;/nav&gt;
  &lt;/div&gt;
  &lt;main class="mdl-layout__content"&gt;
  &lt;/main&gt;
&lt;/div&gt;
</pre>
위의 코드들을 index.html에 넣었다면 이제 작성한 코드들을 담을 div와 bundle.js를 
넣어주세요
<pre class="brush:js">
    &lt;div id="root"&gt;&lt;/div&gt;
    &lt;script src="bundle.js"&gt;&lt;/script&gt;
</pre>
위 코드는 &lt;/body&gt; 위에 삽입해주세요.
이제 index.html 작성은 모두 끝났습니다. 
package.js를 생성하고 본격적으로 세팅을 하겠습니다.
터미널을 실행하고 
<pre class="brush:js">
$ npm init
</pre>
위의 코드를 입력해주세요

**package.js**
<pre class="brush:js">
{
  "name": "handlebar",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server -d --hot --host 0.0.0.0"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/suhokim2/suhokim2.github.com.git"
  },
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/suhokim2/suhokim2.github.com/issues"
  },
  "homepage": "https://github.com/suhokim2/suhokim2.github.com#readme",
  "devDependencies": {
    "babel": "^6.5.2",
    "babel-core": "^6.22.1",
    "babel-loader": "^6.2.10",
    "babel-preset-es2015": "^6.22.0",
    "babel-preset-es2016": "^6.22.0",
    "bootstrap": "^3.3.7",
    "handlebars": "^4.0.6",
    "handlebars-loader": "^1.4.0",
    "jquery": "^3.1.1",
    "webpack": "^2.2.1",
    "webpack-dev-server": "^2.3.0"
  }
}
</pre>
위의 코드를 **package.js**에 넣어주세요.
그리고 터미널 창에서 
<pre class="brush:js">
$ npm i
</pre>
를 입력해주세요 package.js에 정의된 플러그인들이 모두 설치 됩니다.
이제 webpack.config.js를 작성해 보겠습니다.

**webpack.config.js**
<pre class="brush:js">
const webpack = require('webpack');

module.exports = {
    entry: './src/app.js',
    output: __dirname+'bundle.js',
    module:{
        loaders:[{
            test: /\.hbs$/,
            loader: 'handlebars-loader?helperDirs[]=/src/util/handlebars-helpers'
        },{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'es2016']
            }
        }]
    },
    plugins:[
        new webpack.optmize.uglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    ],
    devServer:{
        inline: true,
        port: 7777,
        contentBase: __dirname+'/output',
        historyApiFallback: true
    }
};
</pre>
**webpack.config.js** 설정도 끝났습니다.
src폴더 안에 util폴더를 만들고 그안에 ajax.js파일을 생성해 주세요
ajax.js파일을 아래처럼 작성해주세요

**ajax.js**
<pre class="brush:js">
export default (url, callback) => {
    const xhr = XMLHttpRequest();
    
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4 && xhr.status === 200){
            callback(JSON.parse(xhr.responseText));
        }
    }
    
    xhr.open('get', url, true);
    xhr.send();
}
</pre>
ajax.js 작성이 끝났습니다.
이제 index.html에 있는 코드를 handlebars 파일로 분리해보겠습니다.
+ src
    + templates
        + weather
            - weather.hbs
        - header.hbs
        - list.hbs
        - main.hbs
        - mdl-layout__content.hbs
        - mdl-layout__drawer.hbs
위와 같은 구조로 폴더와 파일을 추가로 생성해주세요
header.hbs부터 index.html에 있는 파일을 옮겨주세요

**header.hbs**
<pre class="brush:js">
&lt;header class="mdl-layout__header mdl-layout__header--transparent"&gt;
    &lt;div class="mdl-layout__header-row"&gt;
        &lt;!-- Title --&gt;
        &lt;span class="mdl-layout-title"&gt;Title&lt;/span&gt;
        &lt;!-- Add spacer, to align navigation to the right --&gt;
        &lt;div class="mdl-layout-spacer"&gt;&lt;/div&gt;
        &lt;!-- Navigation --&gt;
        &lt;nav class="mdl-navigation"&gt;
          &lt;a class="mdl-navigation__link" href=""&gt;Link&lt;/a&gt;
          &lt;a class="mdl-navigation__link" href=""&gt;Link&lt;/a&gt;
          &lt;a class="mdl-navigation__link" href=""&gt;Link&lt;/a&gt;
          &lt;a class="mdl-navigation__link" href=""&gt;Link&lt;/a&gt;
        &lt;/nav&gt;
    &lt;/div&gt;
&lt;/header&gt;
</pre>
**main.hbs**
<pre class="brush:js">
&lt;div class="demo-layout-transparent mdl-layout mdl-js-layout"&gt;
    {{&gt; header}}
    {{&gt; mdl-layout__drawer}}
    {{&gt; mdl-layout__content}}
&lt;/div&gt;
</pre>
**mdl-layout__content.hbs**
<pre class="brush:js">
&lt;main class="mdl-layout__content"&gt;
    &lt;!-- Accent-colored raised button --&gt;
    &lt;button data-btn="weather" class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent"&gt;
        날씨
    &lt;/button&gt;
    &lt;div data-view="weather"&gt;&lt;/div&gt;
&lt;/main&gt;
</pre>
**mdl-layout__drawer.hbs**
<pre class="brush:js">
  &lt;div class="mdl-layout__drawer"&gt;
    &lt;span class="mdl-layout-title"&gt;Title&lt;/span&gt;
    &lt;nav class="mdl-navigation"&gt;
      &lt;a class="mdl-navigation__link" href=""&gt;Link&lt;/a&gt;
      &lt;a class="mdl-navigation__link" href=""&gt;Link&lt;/a&gt;
      &lt;a class="mdl-navigation__link" href=""&gt;Link&lt;/a&gt;
      &lt;a class="mdl-navigation__link" href=""&gt;Link&lt;/a&gt;
    &lt;/nav&gt;
  &lt;/div&gt;
</pre>
여기까지 넣었으면 이제 중복되는 부분을 수정해보겠습니다. **nav**가 중복이 있는데 이 부분을 
줄여보겠습니다.

**list.hbs**
<pre class="brush:js">
{{#each list}}
    &lt;a class="mdl-navigation__link" href="{{href}}"&gt;{{name}}&lt;/a&gt;
{{/each}}
</pre>
위의 코드 문법이 handlebars에서 사용하는 문법입니다. 이제 반복되는 부분은 저기서 추가로 
생성이 됩니다. 기존에 **nav**가 있었던 부분을 수정하겠습니다.

**header.hbs**
<pre class="brush:js">
    &lt;nav class="mdl-navigation" data-view="list"&gt;
    &lt;/nav&gt;
</pre>
**mdl-layout__drawer.hbs**
<pre class="brush:js">
    &lt;nav class="mdl-navigation" data-view="list"&gt;
    &lt;/nav&gt;
</pre>
위 코드처럼 중복되는 부분을 모두 제거하고 data-view="list"를 추가해주세요
list에 해당하는 부분은 추가로 생성한 hbs부분에서 관리가 됩니다.
weather폴더에 있는 weather.hbs에 테이블을 넣고 날씨데이터를 출력할텐데요 테이블은
아까 링크로 준 사이트에서 component메뉴에 있는 Tables를 클릭하면 테이블 소스들이 있는데 
아래의 소스로 해보겠습니다.
**weather.hbs**
<pre class="brush:js">
&lt;table class="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp"&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th class="mdl-data-table__cell--non-numeric"&gt;Material&lt;/th&gt;
      &lt;th&gt;Quantity&lt;/th&gt;
      &lt;th&gt;Unit price&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;td class="mdl-data-table__cell--non-numeric"&gt;Acrylic (Transparent)&lt;/td&gt;
      &lt;td&gt;25&lt;/td&gt;
      &lt;td&gt;$2.90&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td class="mdl-data-table__cell--non-numeric"&gt;Plywood (Birch)&lt;/td&gt;
      &lt;td&gt;50&lt;/td&gt;
      &lt;td&gt;$1.25&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td class="mdl-data-table__cell--non-numeric"&gt;Laminate (Gold on Blue)&lt;/td&gt;
      &lt;td&gt;10&lt;/td&gt;
      &lt;td&gt;$2.35&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;
</pre>
위의 코드가 기본코드인데 이것을 필요한 부분만 쓰고 중복되는 부분은 제거하겠습니다.
<pre class="brush:js">
&lt;table class="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp"&gt;
    &lt;thead&gt;
    &lt;tr&gt;
        &lt;th class="mdl-data-table__cell--non-numeric"&gt;일자&lt;/th&gt;
        &lt;th&gt;온도&lt;/th&gt;
    &lt;/tr&gt;
    &lt;/thead&gt;
    {{#each weather}}
    &lt;tbody&gt;
    &lt;tr&gt;
        &lt;td class="mdl-data-table__cell--non-numeric"&gt;{{date}}&lt;/td&gt;
        &lt;td&gt;{{temp}}도&lt;/td&gt;
    &lt;/tr&gt;
    &lt;/tbody&gt;
    {{/each}}
&lt;/table&gt;
</pre>
tbody는 날씨가 표시되는 부분이라 일주일치 즉 7개가 표시가 되는 부분이라 중복을 위와 같이 
제거 하면 됩니다. 이제 이것들을 app.js에서 관리하도록 코드를 작성해보겠습니다.

**app.js**
<pre class="brush:js">
import $ from 'jquery';
const tplWeather = require('./templates/weather/weather.hbs');
const tplList = require('./templates/list.hbs');
const tplMain = require('./templates/main.hbs');
const list = require('./json/drawer-list.json');
import ViewComponent from './component/ViewComponent';

const DOM = {
    weatherBtn: '[data-btn="weather"]',
    drawerList: '[data-view="list"]'
};

$('#root').html(tplMain({}));
$(DOM.drawerList).html(tplList({
    list: list
}));

$(DOM.weatherBtn).click(() => {
    weatherComponent.toggle();
});
</pre>
여기까지 입력하고 npm start후 localhost:7777에서 확인하면 에러가 날 것 입니다.
이유는 weatherComponent.toggle(); 에 해당하는 코드가 작성이 되어 있지 않기 때문인데요

**app.js**
<pre class="brush:js">
const weatherComponent = new ViewComponent({
    url: 'http://api.openweathermap.org/data/2.5/forecast/daily?q=seoul&mode=json&units=metric&cnt=7&apikey=8d554a626fc5d01d77812b612a6de257',
    view: '[data-view="weather"]',
    list: (data) =&gt; {
        return tplWeather({
            weather: data.list.map(v =&gt; {
                return {
                    date: new Date(v.dt * 1000),
                    temp: Math.round(v.temp.day)
                }
            })
        })
    }
});
</pre>
**app.js**에 위의 코드를 추가해주시고 폴더와 파일을 추가하겠습니다.
+ src
    + component
        - ViewComponent.js

**ViewComponent.js**
<pre class="brush:js">
import $ from 'jquery';
import ajax from '../util/ajax';
const tplWeather = require('../templates/weather/weather.hbs');

class ViewComponent {
    constructor(data){
        this.isShow = false;
        this.url = data.url;
        this.view = data.view;
        this.list = data.list;
    }
    show(){
        this.isShow = true;
        ajax(this.url, data =&gt; {
            $(this.view).html(this.list(data));
        });
    }
    hide(){
        this.isShow = false;
        $(this.view).html('');
    }
    toggle(){
        this[!this.isShow?'show':'hide']();
    }
}

export default ViewComponent;
</pre>
여기까지 잘 따라오셨다면 모두 끝났습니다. **npm start** 후
**localhost:7777**에서 확인해보세요 날씨버튼을 클릭하면 날씨가 날짜와 날씨가 잘 
동작 되는걸 확인할수가 있습니다.
[완성파일](https://github.com/radlohead/handlebar.git)은 이곳에서 확인하실 수
있습니다.

<!-- <pre class="brush:js"></pre> -->
<!-- ![test이미지]({{site.url}}/images/es6.jpg) -->
