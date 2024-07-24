import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5005;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch(err => console.log(`Houve um erro de conexão: ${err}`));

app.use(express.json());
app.use(cors());

// Rotas

import quadrosRouter from "./routes/quadros.js"
import colunasRouter from "./routes/colunas.js"
import tarefasRouter from "./routes/tarefas.js"

app.use("/quadros", quadrosRouter)
app.use("/quadros", colunasRouter)
app.use("/quadros", tarefasRouter)

app.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}`));
