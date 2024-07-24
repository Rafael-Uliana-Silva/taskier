import express from 'express';
import Quadro from '../models/quadro.js';

const router = express.Router();

router.post('/:quadroId/colunas/:colunaId/tarefas', async (req, res) => {
  const { quadroId, colunaId } = req.params;
  const { title, description, subtasks, classification } = req.body;

  try {
    const quadro = await Quadro.findById(quadroId);

    if (!quadro) {
      return res.status(404).send('Quadro não encontrado');
    }

    const coluna = quadro.columns.id(colunaId);

    if (!coluna) {
      return res.status(404).send('Coluna não encontrada');
    }

    const novaTarefa = {
      title,
      description,
      subtasks,
      classification
    };

    coluna.tasks.push(novaTarefa);
    await quadro.save();

    res.status(201).send('Tarefa criada com sucesso');
  } catch (err) {
    res.status(500).send('Erro ao criar tarefa');
  }
});

router.get('/:quadroId/colunas/:colunaId/tarefas', async (req, res) => {
  const { quadroId, colunaId } = req.params;

  try {
    const quadro = await Quadro.findById(quadroId);

    if (!quadro) {
      return res.status(404).send('Quadro não encontrado');
    }

    const coluna = quadro.columns.id(colunaId);

    if (!coluna) {
      return res.status(404).send('Coluna não encontrada');
    }

    res.json(coluna.tasks);
  } catch (err) {
    res.status(500).send('Erro ao obter tarefas');
  }
});

router.get('/:quadroId/colunas/:colunaId/tarefas/:tarefaId', async (req, res) => {
  const { quadroId, colunaId, tarefaId } = req.params;

  try {
    const quadro = await Quadro.findById(quadroId);

    if (!quadro) {
      return res.status(404).send('Quadro não encontrado');
    }

    const coluna = quadro.columns.id(colunaId);

    if (!coluna) {
      return res.status(404).send('Coluna não encontrada');
    }

    const tarefa = coluna.tasks.id(tarefaId);

    if (!tarefa) {
      return res.status(404).send('Tarefa não encontrada');
    }

    res.json(tarefa);
  } catch (err) {
    res.status(500).send('Erro ao obter tarefa');
  }
});

router.patch('/:quadroId/colunas/:colunaId/tarefas/:tarefaId', async (req, res) => {
  const { quadroId, colunaId, tarefaId } = req.params;
  const { title, description, subtasks, classification } = req.body;

  try {
    const quadro = await Quadro.findById(quadroId);

    if (!quadro) {
      return res.status(404).send('Quadro não encontrado');
    }

    const coluna = quadro.columns.id(colunaId);

    if (!coluna) {
      return res.status(404).send('Coluna não encontrada');
    }

    const tarefa = coluna.tasks.id(tarefaId);

    if (!tarefa) {
      return res.status(404).send('Tarefa não encontrada');
    }

    if (title) tarefa.title = title;
    if (description) tarefa.description = description;
    if (subtasks) tarefa.subtasks = subtasks;
    if (classification) tarefa.classification = classification;

    await quadro.save();

    res.json(tarefa);
  } catch (err) {
    res.status(500).send('Erro ao atualizar tarefa');
  }
});

router.delete('/:quadroId/colunas/:colunaId/tarefas/:tarefaId', async (req, res) => {
  const { quadroId, colunaId, tarefaId } = req.params;

  try {
    const quadro = await Quadro.findById(quadroId);

    if (!quadro) {
      return res.status(404).send('Quadro não encontrado');
    }

    const coluna = quadro.columns.id(colunaId);

    if (!coluna) {
      return res.status(404).send('Coluna não encontrada');
    }

    const tarefa = coluna.tasks.id(tarefaId);

    if (!tarefa) {
      return res.status(404).send('Tarefa não encontrada');
    }

    tarefa.remove();
    await quadro.save();

    res.send('Tarefa deletada com sucesso');
  } catch (err) {
    res.status(500).send('Erro ao deletar tarefa');
  }
});

export default router;
