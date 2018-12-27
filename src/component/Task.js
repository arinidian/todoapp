import React, { Component } from 'react'
import './Task.css'
class Task extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
            editing: false
        }
    }

    handleDelete() {
        var index = parseInt(this.props.index);
        this.props.removeToDo(index);
    }

    editText() {
        const { editing } = this.state;
        if (editing) {
            return (
                <form onSubmit={(e) => this.setState({ editing: false })}>
                    <input
                        type="text"
                        value={this.props.title}
                        onChange={(e) => this.props.handleChangeText(e)
                        }
                    />
                </form>
            );
        } else {
            return (
                <p style={{ textDecoration: this.props.completed ? 'line-through' : 'none' }} onClick={() => this.setState({ editing: true })}>{this.props.title}</p>
            )
        }
    }



    render() {
        return (
            <div className="taskWrapper">

                <button className="completeToDo"
                    onClick={() => this.props.handleClick(this.props.index)}>
                    {this.props.completed ? 'undo' : 'complete'}</button>
                <button className="removeToDo" onClick={this.handleDelete}>remove</button>
                <div className="box" >
                    {this.editText()}

                </div>

            </div>
        )
    }
}

export default Task