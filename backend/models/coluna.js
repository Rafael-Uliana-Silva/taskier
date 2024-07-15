import mongoose from "mongoose";

const colunaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  cor: {
    type: String,
    required: true,
  },
  content: {
    type: mongoose.Schema.Types.Mixed, 
    default: {},
  }
})

export default mongoose.model("Coluna", colunaSchema)
