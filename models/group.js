const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: String,
    members: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('Group', groupSchema);
