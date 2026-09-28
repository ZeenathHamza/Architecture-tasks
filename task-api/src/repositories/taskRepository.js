// Data Access Layer: only cares about STORING and LOADING tasks.
// It knows nothing about HTTP or business rules.

let tasks = [];   // in-memory "database"
let nextId = 1;

const taskRepository = {
  findAll() {
    return tasks;
  },

  findById(id) {
    return tasks.find(t => t.id === id);
  },

  save(task) {
    const newTask = { id: nextId++, ...task };
    tasks.push(newTask);
    return newTask;
  },

  update(id, changes) {
    const task = tasks.find(t => t.id === id);
    if (!task) return null;
    Object.assign(task, changes);
    return task;
  },

  delete(id) {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  }
};

module.exports = taskRepository;