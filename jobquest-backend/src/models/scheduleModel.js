const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    institute: { type: Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, required: true },
    content: { type: String, required: true }
});

module.exports = mongoose.model('Note', NoteSchema);
