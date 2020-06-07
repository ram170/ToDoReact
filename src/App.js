import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import './App.css';
import Todos from './components/Todos';
import Addtodo from './components/Addtodo';
import About from './components/pages/About';
import {v4 as uuid} from 'uuid';
import axios from 'axios';

class App extends Component {
  state = {
    todos: [
      // {
      //   id: uuid(),
      //   title: 'Take out the trash',
      //   completed: false
      // },
      // {
      //   id: uuid(),
      //   title: 'Dinner',
      //   completed: false
      // },
      // {
      //   id: uuid(),
      //   title: 'Meetings',
      //   completed: false
      // }
    ]
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=0')
    .then(res => this.setState({ todos: res.data }))
  }

  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map( todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    }) });
  }

  deleteTodo = (id) => {
    // console.log(id)
    // debugger
    // axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    this.setState({ todos: [...this.state.todos.filter(todo => todo.id!== id)]});
  }

  addTodo = (title) => {
    const newTodo = {
      id: uuid(),
      title,
      completed: false
    }
    this.setState({ todos: [...this.state.todos, newTodo]});
    // axios.post('https://jsonplaceholder.typicode.com/todos', { id: uuid(), title, completed: false})
    // .then(res => this.setState({ todos: [...this.state.todos, res.data]}));

  }
  
  render() {
    console.log(this.state.todos)
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
                <Addtodo addTodo={this.addTodo}/>
                <Todos todos = {this.state.todos} markComplete = {this.markComplete} deleteTodo = {this.deleteTodo} />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
