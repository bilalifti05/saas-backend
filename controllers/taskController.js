const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.addTask = async (req, res) => {
  const { title, dueDate, frequency } = req.body;
  try {
    const task = await prisma.task.create({
      data: {
        title,
        dueDate: new Date(dueDate),
        frequency,
        userId: req.userId,
      },
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Could not create task' });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({ where: { userId: req.userId } });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch tasks' });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.task.delete({ where: { id: parseInt(id), userId: req.userId } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Could not delete task' });
  }
};
