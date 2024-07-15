import mongoose from 'mongoose';

const quadroSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  content: {
    type: mongoose.Schema.Types.ObjectId, ref: "Coluna",
    required: false,  // Ajuste para não ser obrigatório
  }
});

export default mongoose.model("Quadro", quadroSchema);
