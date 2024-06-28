import mongoose from "mongoose";

const tarefaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  subtarefas: [{
    type: String,
  }],
  classficacao: {
    type: String,
  }
})

export default mongoose.model("Tarefa", tarefaSchema)
