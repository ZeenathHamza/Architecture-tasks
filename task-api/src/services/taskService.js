// Business Logic Layer: applies RULES.
// Doesn't know about HTTP or database technology.

const taskRepository = require('../repositories/taskRepository');

const taskService = {
  getAllTasks() {
    return taskRepository.findAll();
  },

  getTaskById(id) {
    const task = taskRepository.findById(id);
    if (!task) {
      throw new Error('Task not found');   // business rule
    }
    return task;
  },

  createTask({ title, description }) {
    // BUSINESS RULE: title is required
    if (!title || title.trim() === '') {
      throw new Error('Title is required');
    }
    return taskRepository.save({
      title,
      description: description || '',
      completed: false
    });
  },

  updateTask(id, changes) {
    const updated = taskRepository.update(id, changes);
    if (!updated) throw new Error('Task not found');
    return updated;
  },

  deleteTask(id) {
    const deleted = taskRepository.delete(id);
    if (!deleted) throw new Error('Task not found');
    return { message: 'Task deleted' };
  }
};

module.exports = taskService;