import React, { Component } from 'react';
import './App.css';
import Header from './component/header'
import InputTask from './component/inputTask'
import Task from './component/Task'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInput: '',
      todos: []
    }

    this.removeToDo = this.removeToDo.bind(this);
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(todos => this.setState({ todos }))
      .catch(() =>
        alert('Failed to load tasks')
      )
  }

  handleChange = (e) => {
    this.setState({ userInput: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newToDo = {
      title: this.state.userInput,
      completed: false,
      userId: 1
      // id: Date.now()
    };
    if (this.state.userInput.length < 1) {
      return
    }
    this.setState({ userInput: '' })
    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify(newToDo),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(newToDo => {
        const todos = this.state.todos;
        todos.unshift(newToDo)
        this.setState({
          todos, userInput: ''
        })
      })
      .catch(() =>
        alert('Failed to add task')
      )
  }

  removeToDo(index) {
    const todos = [...this.state.todos];
    fetch(`https://jsonplaceholder.typicode.com/todos/${todos[index].id}`, {
      method: 'DELETE'
    })
      .then(_ => {
        todos.splice(index, 1);
        this.setState({ todos });
      })
      .catch(() =>
        alert('Failed to remove task')
      )
  }

  handleClick = (index) => {
    const todos = [...this.state.todos];
    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'PATCH',
      body: JSON.stringify({ completed: !todos[index].completed }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(_ => {
        todos[index].completed = !todos[index].completed
        this.setState({ todos })
      })
      .catch(() =>
        alert('Failed to mark task')
      )
  }

  handleChangeText(index, title) {
    const todos = this.state.todos.map((value, inner) => {
      if (index === inner) {
        return { title } //return modified list
      }
      return value //return unmodified list
    })

    this.setState({ todos });
  }



  render() {
    return (
      <div className="App">
        <div className="wrapper">
          <Header />
          <InputTask
            handleSubmit={this.handleSubmit}
            userInput={this.state.userInput}
            handleChange={this.handleChange}
          />
          <ul>
            {this.state.todos.map((todo, index) => {
              return (<Task
                {...todo}
                key={index}
                index={index}
                removeToDo={this.removeToDo}
                handleClick={this.handleClick}
                handleChangeText={(e) => this.handleChangeText(index, e.target.value)}
              />
              )
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
