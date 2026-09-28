const express = require('express');
const taskController = require('./controllers/taskController');

const app = express();
app.use(express.json());

// Routes → map HTTP verbs to controller methods
app.get('/tasks', taskController.getAll);
app.get('/tasks/:id', taskController.getOne);
app.post('/tasks', taskController.create);
app.put('/tasks/:id', taskController.update);
app.delete('/tasks/:id', taskController.remove);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));