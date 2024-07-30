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

router.get('/:id/colunas', async (req, res) => {
  const { id } = req.params;

  try {
    const quadro = await Quadro.findById(id);

    if (!quadro) {
      return res.status(404).send('Quadro não encontrado');
    }

    res.json(quadro.columns);
  } catch (err) {
    res.status(500).send('Erro ao obter colunas');
  }
});

router.get('/:id/colunas/:colunaId', async (req, res) => {
  const { id, colunaId } = req.params;

  try {
    const quadro = await Quadro.findById(id);

    if (!quadro) {
      return res.status(404).send('Quadro não encontrado');
    }

    const coluna = quadro.columns.id(colunaId);

    if (!coluna) {
      return res.status(404).send('Coluna não encontrada');
    }

    res.json(coluna);
  } catch (err) {
    res.status(500).send('Erro ao obter coluna');
  }
});

router.patch('/:id/colunas/:colunaId', async (req, res) => {
  const { id, colunaId } = req.params;
  const { title, color } = req.body;

  try {
    const quadro = await Quadro.findById(id);

    if (!quadro) {
      return res.status(404).send('Quadro não encontrado');
    }

    const coluna = quadro.columns.id(colunaId);

    if (!coluna) {
      return res.status(404).send('Coluna não encontrada');
    }

    if (title) coluna.title = title;
    if (color) coluna.color = color;

    await quadro.save();

    res.json(coluna);
  } catch (err) {
    res.status(500).send('Erro ao atualizar coluna');
  }
});

router.delete('/:id/colunas/:colunaId', async (req, res) => {
  const { id, colunaId } = req.params;

  try {
    const quadro = await Quadro.findById(id);

    if (!quadro) {
      return res.status(404).send('Quadro não encontrado');
    }

    const coluna = quadro.columns.id(colunaId);

    if (!coluna) {
      return res.status(404).send('Coluna não encontrada');
    }

    quadro.columns.pull(colunaId);
    await quadro.save();

    res.send('Coluna deletada com sucesso');
  } catch (err) {
    res.status(500).send('Erro ao deletar coluna');
  }
});


export default router;
