import React from 'react';
import Task from './Task.js'; // Verifica la ruta

const TaskColumn = ({ title, tasks, status, onEdit, onDragStart, handleDrop, getPriorityClass }) => {
  return (
    <div
      className="column is-full-mobile is-half-tablet is-one-fifth-desktop task-column"
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => handleDrop(status)}
    >
      <h4 className="title is-4 column-title">{title}</h4>
      <div className="tasks-container">
        <div className="tasks">
          {tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDragStart={onDragStart}
              getPriorityClass={getPriorityClass}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskColumn;
