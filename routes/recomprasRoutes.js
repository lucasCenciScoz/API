const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /recompras
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM recompras');
    res.json(rows);
  } catch (error) {
    res.status(500).send('Erro ao buscar recompras');
  }
});

// GET /recompras/:id
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const [rows] = await db.query('SELECT * FROM recompras WHERE id_recompra = ?', [id]);
    if (rows.length > 0) res.json(rows[0]);
    else res.status(404).send('Recompra não encontrada');
  } catch (error) {
    res.status(500).send('Erro ao buscar recompra');
  }
});

// POST /recompras
router.post('/', async (req, res) => {
  const { id_cliente, modelo, marca, ano, valor_pago } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO recompras (id_cliente, modelo, marca, ano, valor_pago) VALUES (?, ?, ?, ?, ?)',
      [id_cliente, modelo, marca, ano, valor_pago]
    );
    res.status(201).json({ id_recompra: result.insertId, id_cliente, modelo, marca, ano, valor_pago });
  } catch (error) {
    res.status(500).send('Erro ao adicionar recompra');
  }
});

// PUT /recompras/:id
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { id_cliente, modelo, marca, ano, valor_pago } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE recompras SET id_cliente = ?, modelo = ?, marca = ?, ano = ?, valor_pago = ? WHERE id_recompra = ?',
      [id_cliente, modelo, marca, ano, valor_pago, id]
    );
    if (result.affectedRows > 0) res.json({ id_recompra: id, id_cliente, modelo, marca, ano, valor_pago });
    else res.status(404).send('Recompra não encontrada');
  } catch (error) {
    res.status(500).send('Erro ao atualizar recompra');
  }
});

// DELETE /recompras/:id
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await db.query('DELETE FROM recompras WHERE id_recompra = ?', [id]);
    if (result.affectedRows > 0) res.send('Recompra deletada com sucesso');
    else res.status(404).send('Recompra não encontrada');
  } catch (error) {
    res.status(500).send('Erro ao deletar recompra');
  }
});

module.exports = router;
