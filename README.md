# API de Gestão de Revenda de Carros

API RESTful para gerenciamento de revenda de carros, desenvolvida com Node.js, Express e MySQL. Permite operações CRUD para clientes, carros, pedidos, vendas e recompras.

---

## Script banco de dados 

banco de dados integrado com o código:

create database AtividadeJL;

use AtividadeJL;

create table cliente(
id_cliente int auto_increment not null,
nome varchar(150) not null,
cpf varchar(14) not null,
primary key(id_cliente)
);


create table carros(
id_carrosesp int auto_increment not null,
marca varchar(50) not null,
modelo varchar(100) not null,
ano int not null,
preco decimal(12,2) not null,
estoque int not null,
primary key(id_carrosesp)
);


create table pedidos(
id_pedido int auto_increment not null,
id_cliente int,
status enum ('Pendente','Concluído', 'Cancelado' ),
foreign key(id_cliente) references cliente(id_cliente),
primary key (id_pedido)
);


create table vendas(
id_pedido int,
id_carrosesp int,
quantidade int,
preco_total decimal(12,2),
primary key(id_pedido, id_carrosesp),
foreign key (id_pedido) references pedidos(id_pedido),
foreign key (id_carrosesp) references carros(id_carrosesp)
);


create table recompras(
id_recompra int auto_increment,
id_cliente int,
modelo varchar(50),
marca varchar(50),
ano int,
valor_pago decimal (12,2),
primary key(id_recompra),
foreign key(id_cliente) references cliente(id_cliente)
);



---

## Configuração e execução

1. Instale o MySQL e crie o banco de dados usando o script acima.  
2. Clone o projeto ou baixe o código.  
3. No arquivo `db.js`, configure suas credenciais de acesso ao banco de dados.  
4. No terminal, dentro da pasta do projeto, execute:

npm install

node app.js


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
