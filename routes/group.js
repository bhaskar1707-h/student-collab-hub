const express = require('express');
const Group = require('../models/group');
const Task = require('../models/task');
const router = express.Router();

// Create group
router.post('/', async (req, res) => {
    const { name, members } = req.body;
    const group = await Group.create({ name, members });
    res.json(group);
});

// Create task in group
router.post('/:groupId/tasks', async (req, res) => {
    const { title, assignedTo } = req.body;
    const task = await Task.create({ groupId: req.params.groupId, title, assignedTo });
    res.json(task);
});

// Get tasks in group
router.get('/:groupId/tasks', async (req, res) => {
    const tasks = await Task.find({ groupId: req.params.groupId });
    res.json(tasks);
});

module.exports = router;
