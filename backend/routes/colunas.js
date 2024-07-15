import express from 'express';
import Coluna from '../models/coluna.js';
const router = express.Router();

// Buscar todas as colunas
router.get('/', async (req, res) => {
  try {
    const colunas = await Coluna.find();
    res.json(colunas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Buscar uma coluna específico por ID
router.get('/:id', getColunaById, (req, res) => {
  res.json(res.coluna);
});

// Criar uma nova coluna
router.post('/', async (req, res) => {
  const { nome, cor } = req.body;

  if (!nome || !cor) {
    return res.status(400).json({ message: 'Nome e cor são obrigatórios' });
  }

  try {
    const novaColuna = new Coluna({ nome, cor });
    await novaColuna.save();
    res.status(201).json(novaColuna);
  } catch (err) {
    res.status(400).json({ message: 'Houve uma erro ao criar o Coluna' });
    console.log(err);
  }
});

// Atualizar uma Coluna específico por ID
router.patch('/:id', getColunaById, async (req, res) => {
  if (req.body.nome != null) {
    res.coluna.nome = req.body.nome;
  }
  if (req.body.cor != null) {
    res.coluna.cor = req.body.cor;
  }

  try {
    const colunaAtualizada = await res.coluna.save();
    res.json(colunaAtualizada);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deletar uma Coluna específico por ID
router.delete('/:id', getColunaById, async (req, res) => {
  try {
    await res.coluna.deleteOne();
    res.json({ message: 'coluna deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware para buscar uma Coluna por ID
async function getColunaById(req, res, next) {
  let coluna;
  try {
    coluna = await Coluna.findById(req.params.id);
    if (coluna == null) {
      return res.status(404).json({ message: 'coluna não encontrada' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.coluna = coluna;
  next();
}

export default router;
