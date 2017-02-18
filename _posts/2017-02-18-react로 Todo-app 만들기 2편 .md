---
layout: post
title: react로 Todo-app 만들기 2편
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
전시간에 기본뼈대는 만들었습니다. 이제 이 틀을 가지고 기능을 붙여보겠습니다. todo-app에는 
추가, 삭제, 수정, 선택한 요소에 대해서 필터링 기능도 가지고 있습니다. 이런 기능등을 하나씩
붙여나가고 마지막에는 리액트는 this.state 요소를 이용해서 텍스트들을 관리하는데 이것은 
axios를 이용해서 json파일로 분리하는법까지 진행하겠습니다.

<!--more-->

## 설명

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
        const = {
            todos
        } = this.state;
        
        return (
            &lt;div className="todo-app"&gt;
                &lt;Header/&gt;
                &lt;TodoList
                    todos={todos}
                /&gt;
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
                &lt;h1 className="todo-app__header"&gt;todos&lt;/h1&gt;
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
        const {
            todos
        } = this.props;
        const todoList = todos.map(({id, text}) =&gt; {
            return (
                &lt;Todo
                    key = {id}
                    text = {text}
                /&gt;
            )
        });

        return (
        &lt;div className="todo-app__main"&gt;
            &lt;ul className="todo-list"&gt;
                {todoList}
            &lt;/ul&gt;
        &lt;/div&gt;
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
        const {
            text
        } = this.props;
        return (
            &lt;li className="todo-item"&gt;
                &lt;div className="toggle" /&gt;
                &lt;div className="todo-item__view"&gt;
                    &lt;div className="todo-item__view__text"&gt;
                        {text}
                    &lt;/div&gt;
                    &lt;button className="todo-item__destroy" /&gt;
                &lt;/div&gt;
            &lt;/li&gt;
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
            &lt;div className="footer"&gt;
                Footer
            &lt;/div&gt;
        )
    }
}

export default Footer;
</pre>
여기까지는 별다른 기능없이 화면에 기본 todo-app 구성을 그리는 것만 해서 별다른 설명없이
입력했는데요 다른편에서 필요한 기능들을 코딩해보겠습니다.

<!-- <pre class="brush:js"></pre> -->
<!-- ![test이미지]({{site.url}}/images/es6.jpg) -->
