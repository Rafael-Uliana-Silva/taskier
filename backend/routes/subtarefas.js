import express from 'express';
import Quadro from '../models/quadro.js';

const router = express.Router();

router.patch('/:quadroId/colunas/:colunaId/tarefas/:tarefaId/subtasks/:subtaskId', async (req, res) => {
  const { quadroId, colunaId, tarefaId, subtaskId } = req.params;
  const { completed } = req.body;

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

    const subtask = tarefa.subtasks.id(subtaskId);

    if (!subtask) {
      return res.status(404).send('Subtarefa não encontrada');
    }

    subtask.completed = completed;
    await quadro.save();

    res.send('Subtarefa atualizada com sucesso');
  } catch (err) {
    res.status(500).send('Erro ao atualizar subtarefa');
  }
});

router.get('/:quadroId/colunas/:colunaId/tarefas/:tarefaId/subtasks', async (req, res) => {
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

    res.json(tarefa.subtasks);
  } catch (err) {
    res.status(500).send('Erro ao obter subtarefas');
  }
});

router.post('/:quadroId/colunas/:colunaId/tarefas/:tarefaId/subtasks', async (req, res) => {
  const { quadroId, colunaId, tarefaId } = req.params;
  const { title } = req.body;

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

    const novaSubtask = { title, completed: false };
    tarefa.subtasks.push(novaSubtask);
    await quadro.save();

    res.status(201).send('Subtarefa criada com sucesso');
  } catch (err) {
    res.status(500).send('Erro ao criar subtarefa');
  }
});

router.delete('/:quadroId/colunas/:colunaId/tarefas/:tarefaId/subtasks/:subtaskId', async (req, res) => {
  const { quadroId, colunaId, tarefaId, subtaskId } = req.params;

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

    const subtask = tarefa.subtasks.id(subtaskId);

    if (!subtask) {
      return res.status(404).send('Subtarefa não encontrada');
    }

    subtask.remove();
    await quadro.save();

    res.send('Subtarefa deletada com sucesso');
  } catch (err) {
    res.status(500).send('Erro ao deletar subtarefa');
  }
});

export default router;
