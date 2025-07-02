const express = require('express');
const router = express.Router();
const db = require('../db'); // importar conexão com o banco

// GET /cliente - lista todos os clientes
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM cliente');
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error.message);
    res.status(500).send('Erro ao buscar clientes');
  }
});

// GET /cliente/:id - busca cliente pelo id
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const [rows] = await db.query('SELECT * FROM cliente WHERE id_cliente = ?', [id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).send(`Cliente com id ${id} não encontrado`);
    }
  } catch (error) {
    console.error('Erro ao buscar cliente:', error.message);
    res.status(500).send('Erro ao buscar cliente');
  }
});

// POST /cliente - insere um novo cliente
router.post('/', async (req, res) => {
  const { nome, cpf } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO cliente (nome, cpf) VALUES (?, ?)',
      [nome, cpf]
    );
    res.status(201).json({ id_cliente: result.insertId, nome, cpf });
  } catch (error) {
    console.error('Erro ao inserir cliente:', error.message);
    res.status(500).send('Erro ao inserir cliente');
  }
});

// PUT /cliente/:id - atualiza cliente pelo id
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { nome, cpf } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE cliente SET nome = ?, cpf = ? WHERE id_cliente = ?',
      [nome, cpf, id]
    );
    if (result.affectedRows > 0) {
      res.json({ id_cliente: id, nome, cpf });
    } else {
      res.status(404).send(`Cliente com id ${id} não encontrado`);
    }
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error.message);
    res.status(500).send('Erro ao atualizar cliente');
  }
});

// DELETE /cliente/:id - deleta cliente pelo id
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await db.query('DELETE FROM cliente WHERE id_cliente = ?', [id]);
    if (result.affectedRows > 0) {
      res.send(`Cliente com id ${id} deletado com sucesso`);
    } else {
      res.status(404).send(`Cliente com id ${id} não encontrado`);
    }
  } catch (error) {
    console.error('Erro ao deletar cliente:', error.message);
    res.status(500).send('Erro ao deletar cliente');
  }
});

module.exports = router;
