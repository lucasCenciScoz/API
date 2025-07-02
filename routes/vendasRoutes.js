const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /vendas
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM vendas');
    res.json(rows);
  } catch (error) {
    res.status(500).send('Erro ao buscar vendas');
  }
});

// GET /vendas/:idPedido/:idCarro
router.get('/:idPedido/:idCarro', async (req, res) => {
  const { idPedido, idCarro } = req.params;
  try {
    const [rows] = await db.query(
      'SELECT * FROM vendas WHERE id_pedido = ? AND id_carrosesp = ?',
      [idPedido, idCarro]
    );
    if (rows.length > 0) res.json(rows[0]);
    else res.status(404).send('Venda não encontrada');
  } catch (error) {
    res.status(500).send('Erro ao buscar venda');
  }
});

// POST /vendas
router.post('/', async (req, res) => {
  const { id_pedido, id_carrosesp, quantidade, preco_total } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO vendas (id_pedido, id_carrosesp, quantidade, preco_total) VALUES (?, ?, ?, ?)',
      [id_pedido, id_carrosesp, quantidade, preco_total]
    );
    res.status(201).json({ id_pedido, id_carrosesp, quantidade, preco_total });
  } catch (error) {
    res.status(500).send('Erro ao adicionar venda');
  }
});

// PUT /vendas/:idPedido/:idCarro
router.put('/:idPedido/:idCarro', async (req, res) => {
  const { idPedido, idCarro } = req.params;
  const { quantidade, preco_total } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE vendas SET quantidade = ?, preco_total = ? WHERE id_pedido = ? AND id_carrosesp = ?',
      [quantidade, preco_total, idPedido, idCarro]
    );
    if (result.affectedRows > 0) res.json({ id_pedido: idPedido, id_carrosesp: idCarro, quantidade, preco_total });
    else res.status(404).send('Venda não encontrada');
  } catch (error) {
    res.status(500).send('Erro ao atualizar venda');
  }
});

// DELETE /vendas/:idPedido/:idCarro
router.delete('/:idPedido/:idCarro', async (req, res) => {
  const { idPedido, idCarro } = req.params;
  try {
    const [result] = await db.query(
      'DELETE FROM vendas WHERE id_pedido = ? AND id_carrosesp = ?',
      [idPedido, idCarro]
    );
    if (result.affectedRows > 0) res.send('Venda deletada com sucesso');
    else res.status(404).send('Venda não encontrada');
  } catch (error) {
    res.status(500).send('Erro ao deletar venda');
  }
});

module.exports = router;
