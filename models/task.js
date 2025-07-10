const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    groupId: mongoose.Schema.Types.ObjectId,
    title: String,
    status: { type: String, default: 'pending' },
    assignedTo: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Task', taskSchema);
