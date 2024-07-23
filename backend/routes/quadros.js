import express from 'express';
import Quadro from '../models/quadro.js';

const router = express.Router();

// Criar um novo quadro
router.post('/', async (req, res) => {
  const quadro = new Quadro(req.body);
  try {
    const savedQuadro = await quadro.save();
    res.status(201).json(savedQuadro);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obter todos os quadros
router.get('/', async (req, res) => {
  try {
    const quadros = await Quadro.find();
    res.json(quadros);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obter um quadro por ID
router.get('/:id', getQuadro, (req, res) => {
  res.json(res.quadro);
});

// Atualizar um quadro
router.patch('/:id', getQuadro, async (req, res) => {
  if (req.body.title != null) {
    res.quadro.title = req.body.title;
  }
  // Atualizar colunas e tarefas conforme necessário
  try {
    const updatedQuadro = await res.quadro.save();
    res.json(updatedQuadro);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deletar um quadro
router.delete('/:id', getQuadro, async (req, res) => {
  try {
    await res.quadro.remove();
    res.json({ message: 'Deleted quadro' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getQuadro(req, res, next) {
  let quadro;
  try {
    quadro = await Quadro.findById(req.params.id);
    if (quadro == null) {
      return res.status(404).json({ message: 'Cannot find quadro' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.quadro = quadro;
  next();
}

export default router;
