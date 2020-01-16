import React from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList = ({todos, onRemove, onToggle}) => {
    return (
        <div className="TodoList"> 
          {todos.map(todo=>(
              <TodoListItem todo={todo} key={todo.id} onToggle={onToggle} onRemove={onRemove} />
          ))}  
        </div>
    );
};

export default TodoList;