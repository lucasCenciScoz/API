const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /carros
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM carros');
    res.json(rows);
  } catch (error) {
    res.status(500).send('Erro ao buscar carros');
  }
});

// GET /carros/:id
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const [rows] = await db.query('SELECT * FROM carros WHERE id_carrosesp = ?', [id]);
    if (rows.length > 0) res.json(rows[0]);
    else res.status(404).send('Carro não encontrado');
  } catch (error) {
    res.status(500).send('Erro ao buscar carro');
  }
});

// POST /carros
router.post('/', async (req, res) => {
  const { marca, modelo, ano, preco, estoque } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO carros (marca, modelo, ano, preco, estoque) VALUES (?, ?, ?, ?, ?)',
      [marca, modelo, ano, preco, estoque]
    );
    res.status(201).json({ id_carrosesp: result.insertId, marca, modelo, ano, preco, estoque });
  } catch (error) {
    res.status(500).send('Erro ao adicionar carro');
  }
});

// PUT /carros/:id
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { marca, modelo, ano, preco, estoque } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE carros SET marca = ?, modelo = ?, ano = ?, preco = ?, estoque = ? WHERE id_carrosesp = ?',
      [marca, modelo, ano, preco, estoque, id]
    );
    if (result.affectedRows > 0) res.json({ id_carrosesp: id, marca, modelo, ano, preco, estoque });
    else res.status(404).send('Carro não encontrado');
  } catch (error) {
    res.status(500).send('Erro ao atualizar carro');
  }
});

// DELETE /carros/:id
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await db.query('DELETE FROM carros WHERE id_carrosesp = ?', [id]);
    if (result.affectedRows > 0) res.send('Carro deletado com sucesso');
    else res.status(404).send('Carro não encontrado');
  } catch (error) {
    res.status(500).send('Erro ao deletar carro');
  }
});

module.exports = router;
