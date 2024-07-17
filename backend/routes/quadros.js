import express from 'express';
import mongoose from 'mongoose';
import Quadro from '../models/quadro.js'

const router = express.Router();

// Endpoint para criar uma nova coleção
router.post('/', async (req, res) => {
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ message: 'Nome da coleção é obrigatório' });
  }

  try {
    // Cria uma nova coleção
    const db = mongoose.connection.db;
    await db.createCollection(nome);

    // Responde com uma mensagem de sucesso
    res.status(201).json({ message: `Coleção '${nome}' criada com sucesso` });
  } catch (err) {
    res.status(500).json({ message: `Houve um erro ao criar a coleção: ${err.message}` });
    console.log(err);
  }
});

// Endpoint para listar todas as coleções
router.get('/', async (req, res) => {
  try {
    const db = mongoose.connection.db; // Acesso ao banco de dados
    const collections = await db.listCollections().toArray();
    res.json(collections.map(c => ({ id: c.name, name: c.name }))); // Envia a lista de coleções
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar as coleções.', error: error.message });
  }
});

router.get('/:collectionName', async (req, res) => {
  const { collectionName } = req.params;

  try {
    const db = mongoose.connection.db;
    const collection = db.collection(collectionName);
    const documents = await collection.find({}).toArray();

    if (!documents) {
      return res.status(404).json({ message: `Coleção '${collectionName}' não encontrada ou está vazia` });
    }

    res.json(documents);
  } catch (err) {
    res.status(500).json({ message: `Erro ao buscar documentos da coleção '${collectionName}': ${err.message}` });
    console.log(err);
  }
});


export default router;
