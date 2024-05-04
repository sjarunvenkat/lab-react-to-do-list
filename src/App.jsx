import React, {Component} from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       ToDos:[],
       newToDo:"",
       editingId: null,
    }
  }

  handleInputChange = (e) => {
    this.setState({newToDo:e.target.value})
  }

  addToDo = () => {
    if(this.state.newToDo.trim()){
      const newToDo = {
        id:Date.now(),
        text:this.state.newToDo.trim()
      }
      this.setState((prevState)=>({
        ToDos:[...prevState.ToDos,newToDo],
        newToDo:""
      }))
    }
  }

  updateToDo = (id, newText) => {
    this.setState((prevState) => ({
      ToDos: prevState.ToDos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      ),
      editingId: null,
    }));
  };
  
  handleEditTodo = (id) => {
    this.setState({
      editingId:id
    })
  }

  handleEditChange = (e,id) => {
    this.updateToDo(id,e.target.value)
  }

  deleteTodo = (id) => {
    this.setState((prevState)=>({
      ToDos:prevState.ToDos.filter((todo)=>todo.id !== id)}))
    }  

    render() {
      return (
        <>
          <h1>To Do App</h1>
          <input
            type="text"
            placeholder="Enter Task"
            value={this.state.newToDo}
            onChange={this.handleInputChange}
          />
          <button onClick={this.addToDo}>Add Task</button>
          <ul>
            {this.state.ToDos.map((todo) => (
              <li key={todo.id}>
                <input
                  type="text"
                  value={todo.text}
                  onChange={(e) => this.handleEditChange(e, todo.id)}
                />
                <button onClick={() => this.deleteTodo(todo.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </>
      );
    }
}

export default App;
