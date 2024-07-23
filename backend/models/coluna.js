import mongoose from 'mongoose';
import TarefaSchema from './tarefa.js';

const ColunaSchema = new mongoose.Schema({
  title: String,
  color: String,
  tasks: [TarefaSchema.schema], 
});

export default mongoose.model('Coluna', ColunaSchema);
