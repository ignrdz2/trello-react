import React from 'react';

const Task = ({ task, onEdit, onDragStart, getPriorityClass }) => {
  return (
    <div
      key={task.id}
      className={`box ${getPriorityClass(task.priority)}`}
      onClick={() => onEdit(task.id)}
      draggable
      onDragStart={() => onDragStart(task)}
    >
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p><strong>Asignado a:</strong> {task.assignedTo}</p>
      <p><strong>Prioridad:</strong> {task.priority}</p>
      <p><strong>Fecha límite:</strong> {task.deadline}</p>
    </div>
  );
};

export default Task;
