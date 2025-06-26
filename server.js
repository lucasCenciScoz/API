const express = require('express');
const app = express();
const port = 3000;

const db = require('./db');

app.use(express.json()); // define que estamos usando json 


const clientes = [];

app.get("/" , (rep, res) => {
    res.send("hello world")
})

app.get("/cliente" , async (req , res) => {
     try{
        const [rows] = await db.query("Select * from cliente");
        res.json(rows);
     }catch(error){
        console.log("Erro ao buscar: " + error.message);
        res.status(500).send("Erro ao buscar clientes")

     }});


app.get("/cliente/:id" ,async (req , res) => {
    const id = req.params.id;
    try{
       const [rows] = await db.query("select * from clientes id = ?" , [id]);

                if(rows.lenght > 0 ){
                    res.json(rows[0]);
                }

                res.status(404).send("Cliente com id:" + id + "não encontrado!")
    }catch(error){
        console.log("Erro ao buscar:" + error.message);
        res.status(500).send("Erro ao buscar clientes")
    }


})

app.post("/cliente" ,async (req , res) => {
   // const nome = req.body.nome;
   let cliente = req.body;
   try{
    const [rows] = await db.query("insert into cliente(nome , idade , cpf) values (? ,? ,?)", 
    [cliente.nome, cliente.idade, cliente.cpf]);

    cliente.id = rows.insertId;
    res.status(201).json(cliente);
   }catch(error){
    console.log("Erro ao publicar:" + error.message);
    res.status(500).send("Erro ao publicar clientes")
   }
   //cliente.id = clientes.length + 1;
   //clientes.push(cliente)
   //res.send("cliente cadastrado com sucesso!")

})

app.put("/cliente/:id",async  (req , res) =>{

    const id = req.params.id;

    try{
        const [rows] = await db.query("Select * from cliente where id = ?", [id]);
        if (rows.lenght > 0){
            let cliente = req.body;
            const [rows] = await db.query("Update cliente set nome = ?, idade = ?,cpf = ?,cpf = ? Where id = ?",
            [cliente.nome , cliente.idade, cliente.cpf , id])

            cliente.id = id
            res.status(200).json(cliente);
        }
        res.status(404).send("Cliente com id:" + id + " não encontrado")
    }catch(error){
        console.log("Erro ao alterar:" + error.message);
    res.status(500).send("Erro ao alterar clientes")
    }})
           

app.delete("/cliente/:id", async(req , res) =>{
    const id = req.params.id;
   try{
       const [rows] = await db.query("Delete From cliente Where id = ? " , [id]);
       if (rows.affectedRows > 0){
        res.status(204).send("Cliente deletado com sucesso!")
       }
       res.status(404).send("Cliente não encontrado")
   }catch(error){
    console.log("Erro ao Deletar:" + error.message);
    res.status(500).send("Erro ao deletar clientes")
   }

})



app.listen(port , ()=> {
   console.log("servidor rodando http://localhost:3000/")
});




