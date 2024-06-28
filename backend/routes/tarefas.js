import express from "express"
const router = express.Router();

// Buscar todos
router.get("/", (req, res) => {
  res.send("hello world")
});
// Buscar especifico
router.get("/:id", (req, res) => {

});
// Criar
router.post("/", (req, res) => {

});
// Atualizar
router.patch("/", (req, res) => {

});
// Deletar
router.delete("/:id", (req, res) => {

});

export default router;

