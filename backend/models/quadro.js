import mongoose from 'mongoose';

const quadroSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Quadro", quadroSchema);
