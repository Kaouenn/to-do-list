import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class Todo extends React.Component {
  render = () => {
    return (
      <li
        onClick={() => {
          // lors du clique sur le li, on "previent" le parent (ici APP)
          // en appelant la fonction passée en props
          this.props.onTodoClick();
        }}
      >
        {/* les valeurs 'done' et 'title' sont passées en props */}
        {this.props.done ? "😎" : "😱"} {this.props.title}
      </li>
    );
  };
}

class App extends React.Component {
  // state
  state = {
    todos: [
      { title: "Learn to code", done: true },
      { title: "Rule the world", done: false }
    ],
    newTodo: ""
  };

  render = () => {
    return (
      <div className="App">
        <h1>Todo List</h1>
        <ul>
          {this.state.todos.map((element, index) => {
            return (
              <Todo
                // key car nous sommes dans un map
                key={index}
                // on passe `done` et `title` en props
                done={element.done}
                title={element.title}
                // on "demande" à TODO de prevenir quand l'element est cliqué
                onTodoClick={() => {
                  // on veut changer this.state.todos[index].done
                  // il faut donc faire une copie de this.state.todos
                  // mais aussi une copie de this.state.todos[index]

                  // on commence par copier this.state.todos[index]
                  const changedTodo = { ...this.state.todos[index] };
                  // on peut maintenant modifier la propriété `done` de la copie
                  changedTodo.done = !changedTodo.done;
                  // on copie this.state.todos
                  const changedTodos = [...this.state.todos];
                  // on peut maintenant modifier l'element à la position `index` de la copie
                  changedTodos[index] = changedTodo;
                  // on renvoit le résultat au state avec setState
                  this.setState({ todos: changedTodos });
                }}
              />
            );
          })}
        </ul>
        <input
          placeholder="new todo"
          value={this.state.newTodo}
          onChange={event => {
            this.setState({ newTodo: event.target.value });
          }}
        />
        <button
          onClick={() => {
            // on veut changer this.state.todos (ajouter un element)
            // il faut donc le copier avant
            const changedTodos = [...this.state.todos];
            changedTodos.push({ title: this.state.newTodo, done: false });
            this.setState({ todos: changedTodos, newTodo: "" });
          }}
        >
          Add Todo
        </button>
      </div>
    );
  };
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
