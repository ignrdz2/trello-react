import React, { useState } from 'react';
import './App.css';
import bg1 from './backgrounds/bg1.jpg';
import bg2 from './backgrounds/bg2.jpg';
import bg3 from './backgrounds/bg3.jpg';
import bg4 from './backgrounds/bg4.jpg';
import bg5 from './backgrounds/bg5.jpg';
import bg6 from './backgrounds/bg6.jpg';


function App() {
  // Estado para controlar el tema claro/oscuro
  const [theme, setTheme] = useState('light');

  // Estado para controlar la apertura del modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estado para manejar las tareas
  const [tasks, setTasks] = useState([]);

  // Estado para manejar el formulario de tareas
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    assignedTo: '',
    priority: 'Low',
    status: 'backlog',
    deadline: ''
  });

  // Estado para manejar el ID de la tarea que se va a editar
  const [currentTaskId, setCurrentTaskId] = useState(null);

  // Estado para manejar la imagen de fondo seleccionada
  const [backgroundImage, setBackgroundImage] = useState('');

  // Estado para manejar la tarea que se está arrastrando
  const [draggedTask, setDraggedTask] = useState(null);

  const handleDragStart = (task) => {
    setDraggedTask(task); // Guarda la tarea arrastrada
  }

  const handleDrop = (status) => {
    if (draggedTask) {
      const updatedTasks = tasks.map((task) =>
        task.id === draggedTask.id ? { ...task, status } : task
      );
      setTasks(updatedTasks); // Actualiza el estado de las tareas
      setDraggedTask(null); // Limpia la tarea arrastrada
    }
  };
  
  // Función para alternar entre modos claro y oscuro
  const toggleMode = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Función para obtener la clase de prioridad según la tarea
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'Low':
        return 'priority-low';
      case 'Medium':
        return 'priority-medium';
      case 'High':
        return 'priority-high';
      default:
        return '';
    }
  };

  // Función para cambiar la imagen de fondo
  const changeBackground = (e) => {
    const selectedBackground = e.target.value;
    setBackgroundImage(selectedBackground);
  };

  // Función para abrir el modal (para agregar una nueva tarea)
  const openModal = () => {
    setIsModalOpen(true);
    setCurrentTaskId(null); // Asegurarse de que estamos creando una nueva tarea
    setTaskForm({
      title: '',
      description: '',
      assignedTo: '',
      priority: 'Low',
      status: 'backlog',
      deadline: ''
    });
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
    setTaskForm({
      title: '',
      description: '',
      assignedTo: '',
      priority: 'Low',
      status: 'backlog',
      deadline: ''
    });
  };

  // Función para abrir el modal con los datos de la tarea a editar
  const openEditModal = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setTaskForm({
        title: taskToEdit.title,
        description: taskToEdit.description,
        assignedTo: taskToEdit.assignedTo,
        priority: taskToEdit.priority,
        status: taskToEdit.status,
        deadline: taskToEdit.deadline
      });
      setCurrentTaskId(taskId); // Guardar el ID de la tarea que estamos editando
      setIsModalOpen(true); // Abrir el modal
    }
  };

  // Función para manejar los cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskForm({
      ...taskForm,
      [name]: value
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentTaskId !== null) {
      // Actualizar tarea existente
      const updatedTasks = tasks.map((task) =>
        task.id === currentTaskId ? { ...taskForm, id: currentTaskId } : task
      );
      setTasks(updatedTasks);
    } else {
      // Agregar nueva tarea
      const newTask = { ...taskForm, id: Date.now() };
      setTasks([...tasks, newTask]);
    }

    closeModal(); // Cerrar modal después de guardar
  };

  return (
    <div className="container">
      <h2 className="title is-size-2">Gestor de Tareas</h2>

      <button onClick={toggleMode} className="button fa-solid fa-circle-half-stroke is-pulled-right"></button>

      {/* Selector de imagen de fondo */}
      <div className="select is-small is-pulled-right">
        <select onChange={changeBackground}>
          <option value="">Default</option>
          <option value={bg1}>Fondo 1</option>
          <option value={bg2}>Fondo 2</option>
          <option value={bg3}>Fondo 3</option>
          <option value={bg4}>Fondo 4</option>
          <option value={bg5}>Fondo 5</option>
          <option value={bg6}>Fondo 6</option>
        </select>
      </div>

      <div className="buttons is-centered">
        <button id="addTaskBtn" className="button is-primary" onClick={openModal}>Nueva Tarea</button>
      </div>

      {/* Aplicar fondo dinámico */}
      <div
        id="columnsContainer"
        className="columns-container"
        style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none' }}
      >
        <div className="columns is-variable is-1-mobile is-2-tablet is-3-desktop is-4-widescreen is-5-fullhd">
          {/* Columna Backlog */}
          <div
            className="column is-full-mobile is-half-tablet is-one-fifth-desktop task-column"
            id="backlog"
            onDragOver={(e) => e.preventDefault()} // Necesario para permitir el drop
            onDrop={() => handleDrop('backlog')} // Mueve la tarea al backlog
          >

            <h4 className="title is-4 column-title">Backlog</h4>
            <div className="tasks-container">
              <div className="tasks">
                {tasks.filter(task => task.status === 'backlog').map((task) => (
                  <div
                    key={task.id}
                    className={`box ${getPriorityClass(task.priority)}`}
                    onClick={() => openEditModal(task.id)}
                    draggable
                    onDragStart={() => handleDragStart(task)} // Se inicia el arrastre
                  >
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p><strong>Asignado a:</strong> {task.assignedTo}</p>
                    <p><strong>Prioridad:</strong> {task.priority}</p>
                    <p><strong>Fecha límite:</strong> {task.deadline}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Columna To-Do */}
          <div
            className="column is-full-mobile is-half-tablet is-one-fifth-desktop task-column"
            id="todo"
            onDragOver={(e) => e.preventDefault()} // Necesario para permitir el drop
            onDrop={() => handleDrop('todo')} // Mueve la tarea al backlog
          >

            <h4 className="title is-4 column-title">To-Do</h4>
            <div className="tasks-container">
              <div className="tasks">
                {tasks.filter(task => task.status === 'todo').map((task) => (
                  <div
                    key={task.id}
                    className={`box ${getPriorityClass(task.priority)}`}
                    onClick={() => openEditModal(task.id)}
                    draggable
                    onDragStart={() => handleDragStart(task)} // Se inicia el arrastre
                  >
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p><strong>Asignado a:</strong> {task.assignedTo}</p>
                    <p><strong>Prioridad:</strong> {task.priority}</p>
                    <p><strong>Fecha límite:</strong> {task.deadline}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Columna In-Progress */}
          <div
            className="column is-full-mobile is-half-tablet is-one-fifth-desktop task-column"
            id="in-progress"
            onDragOver={(e) => e.preventDefault()} // Necesario para permitir el drop
            onDrop={() => handleDrop('in-progress')} // Mueve la tarea al backlog
          >

            <h4 className="title is-4 column-title">In-Progress</h4>
            <div className="tasks-container">
              <div className="tasks">
                {tasks.filter(task => task.status === 'in-progress').map((task) => (
                  <div
                    key={task.id}
                    className={`box ${getPriorityClass(task.priority)}`}
                    onClick={() => openEditModal(task.id)}
                    draggable
                    onDragStart={() => handleDragStart(task)} // Se inicia el arrastre
                  >
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p><strong>Asignado a:</strong> {task.assignedTo}</p>
                    <p><strong>Prioridad:</strong> {task.priority}</p>
                    <p><strong>Fecha límite:</strong> {task.deadline}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Columna Blocked */}
          <div
            className="column is-full-mobile is-half-tablet is-one-fifth-desktop task-column"
            id="blocked"
            onDragOver={(e) => e.preventDefault()} // Necesario para permitir el drop
            onDrop={() => handleDrop('blocked')} // Mueve la tarea al backlog
          >

            <h4 className="title is-4 column-title">Blocked</h4>
            <div className="tasks-container">
              <div className="tasks">
                {tasks.filter(task => task.status === 'blocked').map((task) => (
                  <div
                    key={task.id}
                    className={`box ${getPriorityClass(task.priority)}`}
                    onClick={() => openEditModal(task.id)}
                    draggable
                    onDragStart={() => handleDragStart(task)} // Se inicia el arrastre
                  >
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p><strong>Asignado a:</strong> {task.assignedTo}</p>
                    <p><strong>Prioridad:</strong> {task.priority}</p>
                    <p><strong>Fecha límite:</strong> {task.deadline}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Columna Done */}
          <div
            className="column is-full-mobile is-half-tablet is-one-fifth-desktop task-column"
            id="done"
            onDragOver={(e) => e.preventDefault()} // Necesario para permitir el drop
            onDrop={() => handleDrop('done')} // Mueve la tarea al backlog
          >

            <h4 className="title is-4 column-title">Done</h4>
            <div className="tasks-container">
              <div className="tasks">
                {tasks.filter(task => task.status === 'done').map((task) => (
                  <div
                    key={task.id}
                    className={`box ${getPriorityClass(task.priority)}`}
                    onClick={() => openEditModal(task.id)}
                    draggable
                    onDragStart={() => handleDragStart(task)} // Se inicia el arrastre
                  >
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p><strong>Asignado a:</strong> {task.assignedTo}</p>
                    <p><strong>Prioridad:</strong> {task.priority}</p>
                    <p><strong>Fecha límite:</strong> {task.deadline}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para agregar/editar tareas */}
      {isModalOpen && (
        <div className="modal is-active">
          <div className="modal-background" onClick={closeModal}></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">{currentTaskId !== null ? 'Editar Tarea' : 'Nueva Tarea'}</p>
            </header>
            <section className="modal-card-body">
              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label className="label">Título</label>
                  <div className="control">
                    <input className="input" type="text" name="title" value={taskForm.title} onChange={handleInputChange} required />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Descripción</label>
                  <div className="control">
                    <textarea className="textarea" name="description" value={taskForm.description} onChange={handleInputChange} required></textarea>
                  </div>
                </div>

                <div className="field">
                  <label className="label">Asignado a</label>
                  <div className="control">
                    <div className="select">
                      <select name="assignedTo" value={taskForm.assignedTo} onChange={handleInputChange}>
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
                    <input className="input" type="date" name="deadline" value={taskForm.deadline} onChange={handleInputChange} required />
                  </div>
                </div>

                <footer className="modal-card-foot">
                  <button type="submit" className="button is-success">Guardar</button>
                  <button className="button" onClick={closeModal}>Cancelar</button>
                </footer>
              </form>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
