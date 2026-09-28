// Presentation Layer: handles HTTP only.
// Parses requests, calls the service, sends responses.
// Contains ZERO business logic.

const taskService = require('../services/taskService');

const taskController = {
  getAll(req, res) {
    const tasks = taskService.getAllTasks();
    res.json(tasks);
  },

  getOne(req, res) {
    try {
      const task = taskService.getTaskById(Number(req.params.id));
      res.json(task);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  create(req, res) {
    try {
      const task = taskService.createTask(req.body);
      res.status(201).json(task);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  update(req, res) {
    try {
      const task = taskService.updateTask(Number(req.params.id), req.body);
      res.json(task);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  remove(req, res) {
    try {
      taskService.deleteTask(Number(req.params.id));
      res.json({ message: 'Deleted' });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
};

module.exports = taskController;