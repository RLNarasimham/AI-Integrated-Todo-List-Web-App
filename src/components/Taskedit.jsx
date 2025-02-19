import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/TaskEdit.css';

const TaskEdit = ({ todo, onSave, onCancel }) => {
  const [title, setTitle] = useState(todo.title);

  const handleSave = () => {
    if (title.trim()) {
      onSave(todo.id, { ...todo, title });
    } else {
      alert('Task title cannot be empty.');
    }
  };

  return (
    <div className="task-edit">
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        className="edit-input"
      />
      <button onClick={handleSave} className="save-btn">Save</button>
      <button onClick={onCancel} className="cancel-btn">Cancel</button>
    </div>
  );
};

TaskEdit.propTypes = {
  todo: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default TaskEdit;