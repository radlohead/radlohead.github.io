---
layout: post
title: react로 Todo-app 만들기 3편
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
이번시간에는 필요한 기능들을 하나씩 추가해보도록 하겠습니다. 이번시간이 가장 중요하니 
잘 따라와주세요

<!--more-->

## 설명

가장 먼저 추가 기능을 만들어보겠습니다.
**App.js**
<pre class="brush:js">
import React, { Component } from 'react';
import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

const newId = () => Date.now();
</pre>
새로 추가될 id에 랜덤하면서 중복을 피하는 값을 넣기 위해서 Data함수를 이용합니다.
아래 코드는 constructor 아래에 입력해주세요
<pre class="brush:js">
handleAddTodo(text){
    this.setState([...this.state.todos, {
        id: newId(),
        text: text
    }]);
}
</pre>
handleAddTodo함수를 만들어서 this.state에 값이 추가를 해야하는데 this.setState를 이용해서
값을 추가해 줍니다. [...this.state.todos]에서 ...는 es6에서 추가된 기능으로 배열을 한꺼번에 
넣어줍니다.
<pre class="brush:js">
            &lt;div className="todo-app"&gt;
                &lt;Header handleAddTodo={(text)=> this.handleAddTodo(text)} /&gt;
                &lt;TodoList /&gt;
                &lt;Footer /&gt;
            &lt;/div&gt;
</pre>
**Header.js**
constructor 아래에 해당 코드를 입력해주세요
<pre class="brush:js">
    handleKeyDown(e){
        const val = this._input.value;
        if(!val || e.keyCode !== 13) return;
        this.props.handleAddTodo(val);
        this._input.value = '';
    };
</pre>
input창에 텍스트를 입력하면 조금전에 만든 handleAddTodo함수를 이용해서 추가한 텍스트를
추가하도록 처리할수 있게 handleKeyDown함수를 만들었습니다. 이제 엔터키가 눌렀을때 추가할 
이벤트를 만들어 보겠습니다.
<pre class="brush:js">
        return (
            &lt;header&gt;
                &lt;h1 className="todo-app__header"&gt;todos&lt;/h1&gt;
                &lt;input
                    className="todo-app__new-todo"
                    placeholder="이곳에 추가할 내용을 입력하세요"
                    ref={ref=&gt; { this._input = ref; }}
                    onKeyDown={(e) => this.handleKeyDown(e)}
                /&gt;
            &lt;/header&gt;
        )
</pre>
추가 기능이 완성됐습니다. 이제 추가한 기능을 삭제하는 기능을 만들어 보겠습니다.
**App.js**
<pre class="brush:js">
handleDeleteTodo(id){
    const newTodos = [...this.state.todos];
    const deleteIndex = newTodos.map(v=> v.id === id);
    newTodos.splice(deleteIndex, 1);
    this.setState({
        todos: newTodos
    });
}
</pre>
splice로 삭제를 하고 난후 setState를 이용해서 반영을 해주면 함수는 완성됐습니다.
&lt;TodoList /&gt;에 다음 코드를 추가해 주세요
<pre class="brush:js">
handleDeleteTodo={id=> this.handleDeleteTodo(id)}
</pre>
**TodoList.js**
<pre class="brush:js">
render(){
    const {
        todos,
        handleDeleteTodo
    } = this.props;
}
const todoList = todos.map(({ id, text, done }) =&gt; {
    return (
        &lt;Todo
            key = {id}
            text = {text}
            done = {done}
            onDeleteTodo = {()=> handleDeleteTodo(id)}
        /&gt;
    );
});
</pre>
**Todo.js**
<pre class="brush:js">
render(){
    const {
        text,
        done,
        onDeleteTodo
    } = this.props;
    return (
        &lt;li className="todo-item"&gt;
            &lt;div className="toggle" /&gt;
            &lt;div className="todo-item__view"&gt;
                &lt;div className="todo-item__view__text"&gt;
                    {text}
                &lt;/div&gt;
                &lt;button 
                    className="todo-item__destroy"
                    onClick={onDeleteTodo}
                /&gt;
            &lt;/div&gt;
        &lt;/li&gt;
    )
}
</pre>
여기까지 잘 따라오셨다면 삭제기능까지 구현이 완료가 되었습니다.
이번은 왼쪽에 있는 아이콘을 눌렀을때 선택기능을 구현해보겠습니다.
**App.js**
<pre class="brush:js">
import ClassNames from 'classnames';

handleToggleTodo(id){
    const newTodos = [...this.state.todos];
    const editIndex = newTodos.findIndex(v => v.id === id);
    newTodos[editIndex].done = !newTodos[editIndex].done;
    this.setState({
        todos: newTodos
    });
}
</pre>
<pre class="brush:js">
render(){
    const filter = this.props.routeParams.filter;
    
    return(
        &lt;TodoList 
            filter={filter}
            handleToggleTodo={id=&gt; this.handleToggleTodo(id)}
        /&gt;
    );
}
</pre>
**TodoList.js**
<pre class="brush:js">
render(){
    const {
        filter,
        handleDeleteTodo
    } = this.props;
    const todoList.map(({ id, text, done }) =&gt; {
        if(
            (done && filter === 'active')
            || (!done && filter === 'completed')
        ) return;
        
        return(
            &lt;Todo 
                onToggleTodo = {()=&gt; handleToggleTodo(id)}
            /&gt;
        );
    });
}
</pre>
**Todo.js**
<pre class="brush:js">
render(
    const {
        onToggleTodo
    } = this.props;
    
    return(
        &lt;li className={ClassNames("todo-item", {
            completed: done
        })}
        &gt;
            &lt;div
                className="toggle"
                onClick={onToggleTodo}
            /&gt;
       &lt;/li&gt;
    );
);
</pre>
이제 왼쪽아이콘을 눌러서 선택이 되는지 확인해보세요 여기까지 정상적으로 되셨다면 
수정을 할수 있는 기능을 만들어보겠습니다. 텍스트수정은 한가지 기능만 있지만
지금까지 기능중에서 가장 고려할게 많은 기능입니다. 코딩완료 후 설명을 이어나가겠습니다.
**App.js**
<pre class="brush:js">
handleEditTodo(id){
    this.setState({
        editing: id
    });
}

return(
    &lt;TodoList 
        handleEditTodo={id=> this.handleEditTodo(id)}
    /&gt;
);
</pre>
**TodoList.js**
<pre class="brush:js">
render(){
    const {
        handleEditTodo
    } = this.props;
    
    return (
        &lt;Todo 
            &lt;onEditTodo={()=> handleEditTodo(id)} /&gt;
        /&gt;
    );
}
</pre>
**Todo.js**
<pre class="brush:js">
render(){
    const {
        onEditTodo
    } = this.props;
    return (
        &lt;li className={ClassNames("todo-item", {
            editing: editing,
            completed: done
        })}&gt;
            &lt;div className="todo-item__view"&gt;
                &lt;div
                    className="todo-item__view__text"
                    onDoubleClick={onEditTodo}
                &gt;
                    {text}
                &lt;/div&gt;
            &lt;/div&gt;
            &lt;input
                className="todo-item__edit"
                type="text"
                ref={ref=> { this._textInput = ref; }}
                onBlur={onCancelEditTodo}
            /&gt;
        &gt;
}
</pre>
텍스트를 더블클릭하면 텍스트가 모두 사라지고 커서도 input을 가리키고 있지 않는 걸 볼수 있는데
정상이다. 더블클릭하면 input에 커서가 이동하고 원래의 텍스트가 있도록 
**Todo.js**
<pre class="brush:js">
componnentDidUpdate(){
    if(this.props.editing) this._textInput.focus();
}
onFocus(){
    this._textInput.value = this.props.text;
}
&ltinput
    className="todo-item__edit"
    type="text"
    ref={ref=> { this._textInput = ref; }}
    onFocus={()=> this.onFocus()}
    onBlur={onCancelEditTodo}
/&gt;
</pre>
componentDidUpdate는 수정될때마다 반영을 합니다. 해당 메소드에서는 커서가 input을 
가리키게끔 되어있습니다. onFocus함수에서는 원래의 텍스트를 가지게끔 되어있다. 
이제 다 끝났... 아니 한가지가 남았다. 수정후에 엔터를 치면 텍스트가 변경되야 하는데 
현재는 변경이 되지 않는다.
**App.js**
<pre class="brush:js">
handleSaveTodo(id, newText){
    const newTodos = [...this.state.todos];
    const editIndex = newTodos.findIndex(v=> v.id === id);
    newTodos[editIndex].text = newText;
    this.setState({
        todos: newTodos,
        editing: null
    });
}

&ltTodoList 
    handleSaveTodo={(id, newText)=> this.handleSaveTodo(id, newText)}
/&gt;
</pre>
**TodoList.js**
<pre class="brush:js">
render(){
    const {
        handleSaveTodo
    } = this.props;
    return (
        &lt;Todo
            onSaveTodo = {text=> handleSaveTodo(id, text)}
        /&gt;
}
</pre>
**Todo.js**
<pre class="brush:js">
onKeyDown(e){
    const text = this._textInput.value;
    if(!text || e.keyCode !== 13) return;
    this.props.onSaveTodo(text);
}
&lt;input
    className="todo-item__edit"
    type="text"
    ref={ref=> { this._textInput = ref; }}
    onFocus={()=> this.onFocus()}
    onBlur={onCancelEditTodo}
    onKeyDown={(e)=> this.onKeyDown(e)}
/&gt;
</pre>
여기까지 수정기능은 모두 완성되었습니다. 필터에 관련된것만 남았네요
남은건 한꺼번에 진행하도록 하겠습니다.
**App.js**
<pre class="brush:js">
handleToggleAll(){
    const newToggleAll = !this.state.todos.every(v => v.done);
    const newTodos = this.state.todos.map(v => {
        v.done = newToggleAll,
        return v;
    });
    this.setState({
        todos: newTodos
    });
}
handleDeleteCompleted(){
    const newTodos = this.state.todos.filter(v => !v.done);
    this.setState({ todos: newTodos });
}
render(){
    const activeLength = todos.filter(v => !v.done).length;
    const completedLength = todos.length - activeLength;
    
    return (
        &lt;TodoList
            handleToggleAll={()=> this.handleToggleAll()} 
        /&gt;
        &lt;Footer
            filter={filter}
            activeLength={activeLength}
            completedLength={completedLength}
            handleDeleteCompleted={()=> this.handleDeleteCompleted()}
        /&gt;
    )
}
</pre>
**TogoList.js**
<pre class="brush:js">
render(){
    const {
        handleToggleAll
    } = this.props;
}
return (
    &lt;div className="todo-app__main"&gt;
        &lt;div
            className={ClassNames('toggle-all', {
                checked: todos.every(v =&gt; v.done)
            })}
            onClick={handleToggleAll}
        /&gt;
    &lt;/div&gt;
</pre>
**Footer.js**
<pre class="brush:js">
import { Link } from 'react-router';
import ClassNames from 'classnames';

render(){
    const {
        activeLength,
        filter,
        completedLength,
        handleDeleteCompleted
    } = this.props;
    return (
        &lt;div className="footer"&gt;
            &lt;span className="todo-count"&gt;
                &lt;strong&gt;{activeLength}&lt;/strong&gt;{' '}
                &lt;span&gt;{activeLength &lt; 1 ? 'items' : 'item'}&lt;/span&gt;
                {' '}left
            &lt;/span&gt;
            &lt;ul className="todo-filters"&gt;
                &lt;li&gt;
                    &lt;Link
                        to="/"
                        className={ClassNames({'selected': !filter})}
                    &gt;All&lt;/Link&gt;
                &lt;/li&gt;
                &lt;li&gt;
                    &lt;Link
                        to="/active"
                        className={ClassNames({'selected': filter === 'active'})}
                    &gt;Active&lt;/Link&gt;
                &lt;/li&gt;
                &lt;li&gt;
                    &lt;Link
                        to="/completed"
                        className={ClassNames({'selected': filter === 'completed'})}
                    &gt;Completed&lt;/Link&gt;
                &lt;/li&gt;
            &lt;/ul&gt;
            &lt;button
                className={ClassNames('todo-delete-completed', {
                    hidden: !completedLength
                })}
                onClick={handleDeleteCompleted}
            &gt;
                Delete Completed
            &lt;/button&gt;
        &lt;/div&gt;
    )
}
</pre>
여기까지 react로 todo-app을 모두 만들었습니다. 터미널에서 npm start를 입력후
localhost:3000 에서 확인이 가능합니다.
<pre class="brush:js"></pre>

<!-- <pre class="brush:js"></pre> -->
<!-- ![test이미지]({{site.url}}/images/es6.jpg) -->
