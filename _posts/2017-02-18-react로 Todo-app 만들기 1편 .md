---
layout: post
title: react로 Todo-app 만들기 1편
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
이번시간에는 react로 todo-app을 만들어보겠습니다. 사실 다른 앱을 만들고 싶었는데 
todo-app만큼 총체적인 기능을 담을만한 앱이 떠오르지가 않아서 누구나 알고 있는 주제로 
진행해 보겠습니다.

<!--more-->

## 설명
앱을 만들기 전에 기본적으로 node.js와 react, webpack까지 설치해주세요 설치가 끝났다면 
바로 시작하겠습니다. 폴더를 하나만들고 그안에서 진행하겠습니다. 폴더구조는 아래와 같이 만들어 주세요

+ output
    - index.html
    - Todos.css
+ src
    - App.js
    - Footer.js
    - Header.js
    - Main.js
    - Todo.js
    - TodoList.js
- .babelrc
- package.js
- webpack.config.js

전체 파일구조는 이렇게 되는데 [완성파일](https://github.com/radlohead/todo_init.git)
해당 링크에서 클론해서 Todos.css는 쓰면 됩니다. 폴더구조 전체를 가져다가 써도 무방합니다.
package.js부터 수정을 하겠습니다. 설명은 Todos.css만 가져다가 쓰는걸로 생각하고 
진행을 하도록 하겠습니다.
<pre class="brush:js">
//package.js
$ npm init
</pre>
을 실행해서 package.js을 생성해주세요 그리고 필요한 플러그인을 설치하겠습니다.
<pre class="brush:js">
$ npm i -D babel babel-core babel-loader
</pre>
<pre class="brush:js">
$ npm i -D babel-preset-es2015 babel-preset-react babel-preset-stage-0
</pre>
여기까지 babel에 필요한 플러그인은 모두 설치했습니다.
나머지 플러그인도 설치하겠습니다.
<pre class="brush:js">
$ npm i -D react react-dom react-hot-loader react-router 
</pre>
<pre class="brush:js">
$ npm i -D webpack webpack-dev-server
</pre>
<pre class="brush:js">
$ npm i -D classnames
</pre>
여기까지 설치가 끝났다면 필요한 플러그인은 모두 설치되었습니다. babel과 webpack은 필수적인 요소라
설명을 제외하겠습니다. classnames는 classname을 좀 더 편리하게 쓸 수 있게끔 도와주는 요소입니다.
그리고 npm i -D에서 D는 개발자전용으로 설치하는 옵션입니다. i는 install이구요

이제 webpack.config.js를 생성해주세요

**webpack.config.js**
<pre class="brush:js">
module.export = {
    entry: './src/Main.js',
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets:['es2015']
            }
        }]
    },
    devServer: {
        inline: true,
        port: 3000,
        contentBase: __dirname + '/output/',
        historyApiFallback: true
    }
};
</pre>
webpack.config는 webpack으로 번들파일을 만들기 위한 설정입니다.

**.babelrc**
<pre class="brush:js">
{
  "presets": [
    "es2015",
    "stage-0",
    "react"
  ]
}
</pre>
여기까지 작성하셨다면 webpack, babel설정은 모두 끝났습니다. 이제 개발파일을 작성하겠습니다.
**index.html**
<pre class="brush:js">
    <div id="root"></div>
    <script src="./bundle.js"></script>
</pre>
index.html은 생성해서 div태그 하나와 bundle.js만 불러오면 됩니다. 그외 디자인적인 부분은
클론한 파일을 참고해 주세요. Main.js부터 기본구문만 작성해보겠습니다.
**Main.js**
<pre class="brush:js">
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from './App';

render(
    &lt;Router history="browserHistory"&gt;
        &lt;Route path="/(:filter)" component={App} /&gt;
    &lt;/Router&gt;
    , document.getElementById('root')
);
</pre>
**App.js**
<pre class="brush:js">
import React, { Component } from 'react';
import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            todos: [
                {id: 1000, text: 'react로 투두앱 만들기'},
                {id: 1001, text: 'react는 라이브러리이다.'},
                {id: 1002, text: '라이브러리 치곤 러닝커브가 높은편이다.'}
            ],
            editing: null
        }
    }
    render(){
        return (
            &lt;div&gt;
                &lt;Header/&gt;
                &lt;TodoList/&gt;
                &lt;Footer/&gt;
            &lt;/div&gt;
        )
    }
};

export default App;
</pre>
**Header.js**
<pre class="brush:js">
import React, { Component } from 'react';

class Header extends Component {
    constructor(){
        super();
    }
    render(){
        return (
            &lt;header&gt;
                Header
            &lt;/header&gt;
        )
    }
};

export default Header;
</pre>
**TodoList.js**
<pre class="brush:js">
import React ,{ Component } from 'react';
import Todo from './Todo';

class TodoList extends Component {
    constructor(){
        super();
    }
    render(){
        return (
            &lt;Todo /&gt;
        )
    }
}

export default TodoList;
</pre>
**Todo.js**
<pre class="brush:js">
import React, { Component } from 'react';

class Todo extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            &lt;div&gt;Todo&lt;/div&gt;
        )
    }
}

export default Todo;
</pre>
**Footer.js**
<pre class="brush:js">
import React, { Component } from 'react';

class Footer extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            &lt;footer&gt;
                Footer
            &lt;/footer&gt;
        )
    }
}

export default Footer;
</pre>
**package.js**
<pre class="brush:js">
  "scripts": {
    "start": "webpack-dev-server --hot --host 0.0.0.0"
  }
</pre>
package.js에 해당 구문을 입력해주세요 npm start로 가상서버를 돌리기 위해서 필요한 구문입니다.
여기까지 따라오셨다면 기본설정은 끝났습니다. Main.js에서 기본라우터 설정과 필터를 사용할 준비를 하고
App.js에서 모든 파일을 관리합니다.
터미널에서 **npm start**를 입력하셔서 localhost:3000에서 작업파일을 확인하실수 있습니다.
현재는 todo-app작성전이라 서버가 구동되는지 정도만 확인하실 수 있습니다.
다음장에서 본격적으로 코드를 작성하도록 하겠습니다.

<!-- <pre class="brush:js"></pre> -->
<!-- ![test이미지]({{site.url}}/images/es6.jpg) -->
