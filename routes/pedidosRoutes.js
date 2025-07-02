const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /pedidos
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM pedidos');
    res.json(rows);
  } catch (error) {
    res.status(500).send('Erro ao buscar pedidos');
  }
});

// GET /pedidos/:id
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const [rows] = await db.query('SELECT * FROM pedidos WHERE id_pedido = ?', [id]);
    if (rows.length > 0) res.json(rows[0]);
    else res.status(404).send('Pedido não encontrado');
  } catch (error) {
    res.status(500).send('Erro ao buscar pedido');
  }
});

// POST /pedidos
router.post('/', async (req, res) => {
  const { id_cliente, status } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO pedidos (id_cliente, status) VALUES (?, ?)',
      [id_cliente, status]
    );
    res.status(201).json({ id_pedido: result.insertId, id_cliente, status });
  } catch (error) {
    res.status(500).send('Erro ao adicionar pedido');
  }
});

// PUT /pedidos/:id
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { id_cliente, status } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE pedidos SET id_cliente = ?, status = ? WHERE id_pedido = ?',
      [id_cliente, status, id]
    );
    if (result.affectedRows > 0) res.json({ id_pedido: id, id_cliente, status });
    else res.status(404).send('Pedido não encontrado');
  } catch (error) {
    res.status(500).send('Erro ao atualizar pedido');
  }
});

// DELETE /pedidos/:id
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await db.query('DELETE FROM pedidos WHERE id_pedido = ?', [id]);
    if (result.affectedRows > 0) res.send('Pedido deletado com sucesso');
    else res.status(404).send('Pedido não encontrado');
  } catch (error) {
    res.status(500).send('Erro ao deletar pedido');
  }
});

module.exports = router;
