import mongoose from 'mongoose';

const TarefaSchema = new mongoose.Schema({
  title: String,
  description: String,
  subtasks: [String],
  classification: Number,
});

export default mongoose.model('Tarefa', TarefaSchema);
