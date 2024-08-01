import express from 'express';
import Quadro from '../models/quadro.js';

const router = express.Router();

const getQuadroEColuna = async (quadroId, colunaId) => {
  const quadro = await Quadro.findById(quadroId);
  if (!quadro) {
    throw new Error('Quadro não encontrado');
  }
  const coluna = quadro.columns.id(colunaId);
  if (!coluna) {
    throw new Error('Coluna não encontrada');
  }
  return { quadro, coluna };
};

const getTarefa = (coluna, tarefaId) => {
  const tarefa = coluna.tasks.id(tarefaId);
  if (!tarefa) {
    throw new Error('Tarefa não encontrada');
  }
  return tarefa;
};

router.post('/:quadroId/colunas/:colunaId/tarefas', async (req, res) => {
  const { quadroId, colunaId } = req.params;
  const { title, description, subtasks, classification } = req.body;

  try {
    const { quadro, coluna } = await getQuadroEColuna(quadroId, colunaId);

    const novaTarefa = {
      title,
      description,
      subtasks: subtasks.map(subtask => ({ title: subtask, completed: false })),
      classification
    };

    coluna.tasks.push(novaTarefa);
    await quadro.save();
    res.status(201).send('Tarefa criada com sucesso');
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.get('/:quadroId/colunas/:colunaId/tarefas', async (req, res) => {
  const { quadroId, colunaId } = req.params;

  try {
    const { coluna } = await getQuadroEColuna(quadroId, colunaId);
    res.json(coluna.tasks);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.get('/:quadroId/colunas/:colunaId/tarefas/:tarefaId', async (req, res) => {
  const { quadroId, colunaId, tarefaId } = req.params;

  try {
    const { coluna } = await getQuadroEColuna(quadroId, colunaId);
    const tarefa = getTarefa(coluna, tarefaId);
    res.json(tarefa);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.patch('/:quadroId/colunas/:colunaId/tarefas/:tarefaId', async (req, res) => {
  const { quadroId, colunaId, tarefaId } = req.params;
  const { title, description, subtasks, classification } = req.body;

  try {
    const { quadro, coluna } = await getQuadroEColuna(quadroId, colunaId);
    const tarefa = getTarefa(coluna, tarefaId);

    if (title) tarefa.title = title;
    if (description) tarefa.description = description;
    if (subtasks) tarefa.subtasks = subtasks.map(subtask =>
      typeof subtask === 'string'
        ? { title: subtask, completed: false }
        : subtask
    );
    if (classification) tarefa.classification = classification;

    await quadro.save();
    res.json(tarefa);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.patch('/:quadroId/colunas/:colunaId/tarefas/:tarefaId/move', async (req, res) => {
  const { quadroId, colunaId, tarefaId } = req.params;
  const { newColunaId } = req.body;

  try {
    const { quadro, coluna: colunaAtual } = await getQuadroEColuna(quadroId, colunaId);
    const novaColuna = quadro.columns.id(newColunaId);

    if (!novaColuna) {
      throw new Error('Nova coluna não encontrada');
    }

    const tarefa = getTarefa(colunaAtual, tarefaId);

    colunaAtual.tasks = colunaAtual.tasks.filter(task => task._id.toString() !== tarefaId);
    novaColuna.tasks.push(tarefa);

    await quadro.save();
    res.send('Tarefa movida com sucesso');
  } catch (err) {
    console.error('Erro ao mover tarefa', err);
    res.status(404).send(err.message);
  }
});

router.delete('/:quadroId/colunas/:colunaId/tarefas/:tarefaId', async (req, res) => {
  const { quadroId, colunaId, tarefaId } = req.params;

  try {
    const { quadro, coluna } = await getQuadroEColuna(quadroId, colunaId);
    const tarefa = getTarefa(coluna, tarefaId);

    coluna.tasks = coluna.tasks.filter(task => task._id.toString() !== tarefaId);

    await quadro.save();
    res.send('Tarefa deletada com sucesso');
  } catch (err) {
    res.status(404).send(err.message);
  }
});

export default router;
