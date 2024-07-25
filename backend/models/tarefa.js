import mongoose from 'mongoose';

const SubtaskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
});

const TarefaSchema = new mongoose.Schema({
  title: String,
  description: String,
  subtasks: [SubtaskSchema],
  classification: Number,
});

export default mongoose.model('Tarefa', TarefaSchema);
