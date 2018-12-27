import React, { Component } from 'react'
import './inputTask.css'
class InputTask extends Component {
    
    render() {
        return (
            <div>
                <form onSubmit={(e) => this.props.handleSubmit(e)}>
                    <input
                    type="text"
                    value={this.props.userInput}
                    placeholder='add a task...'
                    onChange={(e)=>this.props.handleChange(e)
                    
                    }
                    />
                </form>
            </div>
        )
    }
}

export default InputTask