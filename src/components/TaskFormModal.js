import React from 'react';

const TaskFormModal = ({ isOpen, onClose, onSubmit, taskForm, handleInputChange, currentTaskId }) => {
  if (!isOpen) return null; // Retorna null si el modal no está abierto

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{currentTaskId !== null ? 'Editar Tarea' : 'Nueva Tarea'}</p>
          <button className="delete" onClick={onClose} aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          <form onSubmit={onSubmit}>
            <div className="field">
              <label className="label">Título</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="title"
                  value={taskForm.title}
                  onChange={handleInputChange}
                  placeholder="Ingresa el título de la tarea"
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Descripción</label>
              <div className="control">
                <textarea
                  className="textarea"
                  name="description"
                  value={taskForm.description}
                  onChange={handleInputChange}
                  placeholder="Descripción de la tarea"
                  required
                ></textarea>
              </div>
            </div>

            <div className="field">
              <label className="label">Asignado a</label>
              <div className="control">
                <div className="select">
                  <select name="assignedTo" value={taskForm.assignedTo} onChange={handleInputChange}>
                    <option value="">Selecciona a quien asignar</option>
                    <option value="Persona1">Juan</option>
                    <option value="Persona2">Diego</option>
                    <option value="Persona3">Álvaro</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label">Prioridad</label>
              <div className="control">
                <div className="select">
                  <select name="priority" value={taskForm.priority} onChange={handleInputChange}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label">Estado</label>
              <div className="control">
                <div className="select">
                  <select name="status" value={taskForm.status} onChange={handleInputChange}>
                    <option value="backlog">Backlog</option>
                    <option value="todo">To-Do</option>
                    <option value="in-progress">In-Progress</option>
                    <option value="blocked">Blocked</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label">Fecha límite</label>
              <div className="control">
                <input
                  className="input"
                  type="date"
                  name="deadline"
                  value={taskForm.deadline}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </form>
        </section>
        <footer className="modal-card-foot">
          <button type="submit" className="button is-success" onClick={onSubmit}>
            Guardar
          </button>
          <button className="button" onClick={onClose}>Cancelar</button>
        </footer>
      </div>
    </div>
  );
};

export default TaskFormModal;
