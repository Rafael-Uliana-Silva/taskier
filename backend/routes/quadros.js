import express from 'express';
import Quadro from '../models/quadro.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const quadro = new Quadro(req.body);
  try {
    const savedQuadro = await quadro.save();
    res.status(201).json(savedQuadro);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const quadros = await Quadro.find();
    res.json(quadros);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', getQuadro, (req, res) => {
  res.json(res.quadro);
});

router.patch('/:id', getQuadro, async (req, res) => {
  if (req.body.title != null) {
    res.quadro.title = req.body.title;
  }
  try {
    const updatedQuadro = await res.quadro.save();
    res.json(updatedQuadro);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', getQuadro, async (req, res) => {
  try {
    await Quadro.findByIdAndDelete(req.params.id);
    res.json({ message: 'Quadro deletado com sucesso' });
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

router.patch('/:id/updateordem', async (req, res) => {
  const { id } = req.params;
  const { columnOrder } = req.body;

  try {
    const quadro = await Quadro.findById(id);
    if (!quadro) {
      return res.status(404).json({ message: 'Quadro não encontrado' });
    }

    quadro.columns.sort((a, b) => columnOrder.indexOf(a._id.toString()) - columnOrder.indexOf(b._id.toString()));

    await quadro.save();

    res.status(200).json({ message: 'Ordem das colunas atualizada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar a ordem das colunas', error });
  }
});

export default router;
