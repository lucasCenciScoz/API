# API de Gestão de Revenda de Carros

API RESTful para gerenciamento de revenda de carros, desenvolvida com Node.js, Express e MySQL. Permite operações CRUD para clientes, carros, pedidos, vendas e recompras.

---

## Requisitos mínimos do sistema

- Gerenciar clientes com nome e CPF.  
- Gerenciar carros com marca, modelo, ano, preço e estoque.  
- Registrar pedidos vinculados a clientes, com status: Pendente, Concluído, Cancelado.  
- Registrar vendas associadas a pedidos e carros, incluindo quantidade e preço total.  
- Registrar recompras de carros por clientes.  
- Permitir operações CRUD para todas as entidades.  
- Validar dados e tratar erros nas requisições.  
- Manter integridade referencial para evitar exclusão de clientes com pedidos ou vendas vinculados.  
- Atualizar estoque de carros conforme vendas realizadas.

---

## Configuração e execução

1. Instale o MySQL e crie o banco de dados usando o script acima.  
2. Clone o projeto ou baixe o código.  
3. No arquivo `db.js`, configure suas credenciais de acesso ao banco de dados.  
4. No terminal, dentro da pasta do projeto, execute:

npm install
node app.js

markdown
Copiar
Editar

5. O servidor iniciará na porta 3000 (http://localhost:3000).  
6. Use o Postman ou similar para testar os endpoints da API.

---

## Endpoints principais

- **Cliente:**  
  - GET /cliente — lista todos os clientes  
  - POST /cliente — cria cliente  
  - PUT /cliente/:id — atualiza cliente  
  - DELETE /cliente/:id — remove cliente (apenas se não houver pedidos vinculados)

- **Carros:**  
  - GET /carros  
  - POST /carros  
  - PUT /carros/:id  
  - DELETE /carros/:id

- **Pedidos:**  
  - GET /pedidos  
  - POST /pedidos  
  - PUT /pedidos/:id  
  - DELETE /pedidos/:id

- **Vendas:**  
  - GET /vendas  
  - POST /vendas  
  - PUT /vendas/:id_pedido/:id_carrosesp  
  - DELETE /vendas/:id_pedido/:id_carrosesp

- **Recompras:**  
  - GET /recompras  
  - POST /recompras  
  - PUT /recompras/:id  
  - DELETE /recompras/:id
