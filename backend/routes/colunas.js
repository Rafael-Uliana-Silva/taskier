import express from 'express';
import Quadro from '../models/quadro.js';

const router = express.Router();

// Adicionar coluna a um quadro
router.post('/:id/colunas', async (req, res) => {
  const { id } = req.params;
  const { title, color } = req.body;

  try {
    const quadro = await Quadro.findById(id);

    if (!quadro) {
      return res.status(404).send('Quadro não encontrado');
    }

    quadro.columns.push({ title, color });
    await quadro.save();

    res.status(201).send('Coluna criada com sucesso');
  } catch (err) {
    res.status(500).send('Erro ao criar coluna');
  }
});

export default router;
