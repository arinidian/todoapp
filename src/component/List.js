import React, { Component } from 'react'
import Task from './Task'

class List extends Component {
    render() {
        return (
            <ul>
                {this.props.todos.map((todo)=>{
                    return (<Task
                     todo={todo} 
                     key={todo.id} 
                     id={todo.id}
                     
                     removeToDo={this.removoToDo}
                     handleClick={this.props.handleClick}
                     handleEditing={this.props.handleEditing}
                     handleChange={this.props.handleChange}
                     />
                    )
                })}
            </ul>
        )}
}

export default List