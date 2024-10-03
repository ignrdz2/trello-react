import React, { useState } from 'react';
import './App.css';
import bg1 from './backgrounds/bg1.jpg';
import bg2 from './backgrounds/bg2.jpg';
import bg3 from './backgrounds/bg3.jpg';
import bg4 from './backgrounds/bg4.jpg';
import bg5 from './backgrounds/bg5.jpg';
import bg6 from './backgrounds/bg6.jpg';
import TaskColumn from './components/TaskColumn.js';
import TaskFormModal from './components/TaskFormModal.js';

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
  };

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
          <TaskColumn
            title="Backlog"
            status="backlog"
            tasks={tasks.filter(task => task.status === 'backlog')}
            onEdit={openEditModal}
            onDragStart={handleDragStart}
            handleDrop={handleDrop}
            getPriorityClass={getPriorityClass}
          />
          <TaskColumn
            title="To-Do"
            status="todo"
            tasks={tasks.filter(task => task.status === 'todo')}
            onEdit={openEditModal}
            onDragStart={handleDragStart}
            handleDrop={handleDrop}
            getPriorityClass={getPriorityClass}
          />
          <TaskColumn
            title="In-Progress"
            status="in-progress"
            tasks={tasks.filter(task => task.status === 'in-progress')}
            onEdit={openEditModal}
            onDragStart={handleDragStart}
            handleDrop={handleDrop}
            getPriorityClass={getPriorityClass}
          />
          <TaskColumn
            title="Blocked"
            status="blocked"
            tasks={tasks.filter(task => task.status === 'blocked')}
            onEdit={openEditModal}
            onDragStart={handleDragStart}
            handleDrop={handleDrop}
            getPriorityClass={getPriorityClass}
          />
          <TaskColumn
            title="Done"
            status="done"
            tasks={tasks.filter(task => task.status === 'done')}
            onEdit={openEditModal}
            onDragStart={handleDragStart}
            handleDrop={handleDrop}
            getPriorityClass={getPriorityClass}
          />
        </div>
      </div>

      <TaskFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        taskForm={taskForm}
        handleInputChange={handleInputChange}
        currentTaskId={currentTaskId}
      />

    </div>
  );
}

export default App;
