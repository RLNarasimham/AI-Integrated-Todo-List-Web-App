import { useState } from 'react';
import PropTypes from 'prop-types';
import TaskEdit from './Taskedit';

const TodoList = ({ todos, onToggle, onDelete, onEdit }) => {
  const [editingId, setEditingId] = useState(null);

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleSave = (id, updatedTask) => {
    onEdit(id, updatedTask);
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
          {editingId === todo.id ? (
            <TaskEdit 
              todo={todo} 
              onSave={handleSave} 
              onCancel={handleCancel} 
            />
          ) : (
            <>
              <span style={{ fontSize: '20px' }} onClick={() => onToggle(todo.id)}>
  {todo.title}
</span>
<button 
  style={{ marginLeft: '0.01px', marginRight: '5px' }} 
  onClick={() => handleEdit(todo.id)}
  className="edit-btn"
>
  Edit
</button>
<button 
  style={{ marginLeft: '0' }} 
  onClick={() => onDelete(todo.id)} 
  className="delete-btn"
>
  Delete
</button>

            </>
          )}
        </li>
      ))}
    </ul>
  );
};

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default TodoList;
