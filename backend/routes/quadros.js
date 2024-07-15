
import express from 'express';
import { MongoClient } from 'mongodb';  // Importar MongoClient para criar uma nova base de dados
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const uri = process.env.MONGODB_URI;  // URL de conexão ao MongoDB

// Middleware para conectar ao MongoDB
const connectToMongo = async (dbName) => {
  try {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    return client.db(dbName);  // Retorna a base de dados especificada
  } catch (err) {
    console.error("Erro ao conectar ao MongoDB:", err);
    throw new Error('Erro ao conectar ao MongoDB');
  }
};

// Função para validar e sanitizar o nome da base de dados
const sanitizeDatabaseName = (name) => {
  // Remove caracteres inválidos e espaços
  return name.trim().replace(/[^a-zA-Z0-9_]/g, '_');  // Substitui caracteres inválidos por '_'
};

// Rota para criar uma nova base de dados com o nome do título
router.post('/create-database', async (req, res) => {
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ message: 'Título é obrigatório' });
  }

  const sanitizedNome = sanitizeDatabaseName(nome);

  try {
    const db = await connectToMongo(sanitizedNome);
    await db.createCollection('quadros');
    res.status(201).json({ message: `Base de dados ${sanitizedNome} criada com sucesso.` });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar a base de dados.', error: err.message });
    console.error("Erro ao criar a base de dados:", err);
  }
});

// Buscar todos os quadros
router.get('/', async (req, res) => {
  const { dbName } = req.query;

  if (!dbName) {
    return res.status(400).json({ message: 'Nome da base de dados é obrigatório' });
  }

  try {
    const db = await connectToMongo(dbName);
    const quadrosCollection = db.collection('quadros');
    const quadros = await quadrosCollection.find().toArray();
    res.json(quadros);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar quadros', error: err.message });
    console.error("Erro ao buscar quadros:", err);
  }
});

// Buscar um quadro específico por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { dbName } = req.query;

  if (!dbName) {
    return res.status(400).json({ message: 'Nome da base de dados é obrigatório' });
  }

  try {
    const db = await connectToMongo(dbName);
    const quadrosCollection = db.collection('quadros');
    const quadro = await quadrosCollection.findOne({ _id: new ObjectId(id) });

    if (!quadro) {
      return res.status(404).json({ message: 'Quadro não encontrado' });
    }

    res.json(quadro);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar o quadro', error: err.message });
    console.error("Erro ao buscar o quadro:", err);
  }
});

// Criar um novo quadro
router.post('/', async (req, res) => {
  const { nome, dbName } = req.body;

  if (!nome || !dbName) {
    return res.status(400).json({ message: 'Nome e nome da base de dados são obrigatórios' });
  }

  try {
    const db = await connectToMongo(dbName);
    const quadrosCollection = db.collection('quadros');
    const novoQuadro = { nome };
    await quadrosCollection.insertOne(novoQuadro);
    res.status(201).json(novoQuadro);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar o quadro', error: err.message });
    console.error("Erro ao criar o quadro:", err);
  }
});

// Atualizar um quadro específico por ID
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, dbName } = req.body;

  if (!nome || !dbName) {
    return res.status(400).json({ message: 'Nome e nome da base de dados são obrigatórios' });
  }

  try {
    const db = await connectToMongo(dbName);
    const quadrosCollection = db.collection('quadros');
    const result = await quadrosCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { nome } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Quadro não encontrado' });
    }

    res.json({ message: 'Quadro atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar o quadro', error: err.message });
    console.error("Erro ao atualizar o quadro:", err);
  }
});

// Deletar um quadro específico por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { dbName } = req.query;

  if (!dbName) {
    return res.status(400).json({ message: 'Nome da base de dados é obrigatório' });
  }

  try {
    const db = await connectToMongo(dbName);
    const quadrosCollection = db.collection('quadros');
    const result = await quadrosCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Quadro não encontrado' });
    }

    res.json({ message: 'Quadro deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar o quadro', error: err.message });
    console.error("Erro ao deletar o quadro:", err);
  }
});

export default router;
