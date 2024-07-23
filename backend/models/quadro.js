import mongoose from 'mongoose';
import ColunaSchema from './coluna.js';

const QuadroSchema = new mongoose.Schema({
  title: String,
  columns: [ColunaSchema.schema], 
});

export default mongoose.model('Quadro', QuadroSchema);
