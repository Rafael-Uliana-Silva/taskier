import express from "express"
import Tarefa from "../models/tarefa.js"
const router = express.Router();

// Buscar todos
router.get("/", async (req, res) => {
  try {
    const tarefas = await Tarefa.find()
    res.json(tarefas)
  } catch (err){
    res.status(500).json({ message: err.message })
  }
});

// Buscar especifico
router.get("/:id", getTarefas, (req, res) => {
  res.json(res.tarefa)
});

// Criar
router.post("/", async (req, res) => {
  try {
    const {title, desc, subtarefas, classficacao } = req.body;
    const novaTarefa = new Tarefa({ title, desc, subtarefas, classficacao});
    await novaTarefa.save()

    res.status(201).json({ novaTarefa })
  } catch (err){
    res.status(400).json({ message: "Houve um erro ao criar a tarefa:" })
    console.log(err)
  }
});


// Atualizar
router.patch("/:id", getTarefas, async (req, res) => {
  if (req.body.title != null) {
    res.tarefa.title = req.body.title
  }
  if (req.body.desc != null) {
    res.tarefa.desc = req.body.desc
  }
  if (req.body.subtarefas != null) {
    res.tarefa.subtarefas = req.body.subtarefas
  }
  if (req.body.classficacao != null) {
    res.tarefa.classficacao = req.body.classficacao
  }
  try {
    const tarefaAtualizada = await res.tarefa.save()
    res.json(tarefaAtualizada)
  } catch (err) {
    res.status(400).json({ message: err.message})
  }
});
// Deletar
router.delete("/:id", getTarefas, async (req, res) => {
  try {
    await res.tarefa.deleteOne();
    res.json({ message: "Tarefa deletada com sucesso"})
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});

async function getTarefas(req, res, next) {
  let tarefa
  try {
    tarefa = await Tarefa.findById(req.params.id)
    if (tarefa == null) {
      return res.status(404).json({ message: "tarefa não encontrada" })
    }
  } catch (err){
    return res.status(500).json({ message: err.message })
  }

  res.tarefa = tarefa
  next()
}

export default router;

