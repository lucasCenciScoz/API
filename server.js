const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // define que estamos usando json 


const clientes = [];

app.get("/" , (req , res) => {
     res.send("hello world!");
});


app.get("/cliente", (req , res )=> {
    res.send(clientes);
})

app.get("/cliente/:id" , (req , res) => {
    const id = req.params.id;
    const cliente = clientes.find(cliente => cliente.id == id );
    res.send(cliente)
})

app.post("/cliente" , (req , res) => {
   // const nome = req.body.nome;
   let cliente = req.body;
   cliente.id = clientes.length + 1;
   clientes.push(cliente)
   res.send("cliente cadastrado com sucesso!")

})

app.put("/cliente/:id", (req , res) =>{

    const id = req.params.id;
    for(let i = 0 ; i < clientes.lenght; i++){
        if (clientes[i].id == id){
            let cliente = req.body;
            cliente.id = parseInt(id);
            clientes[i] = cliente;
           
        }
    } 
    res.send("Cliente com o id " + id + " Atualizado com sucesso!")
});

app.delete("/cliente/:id", (req , res) =>{
    const id = req.params.id;
    const listaClientes = clientes.filter(cliente => cliente.id != id);
    clientes = listaClientes
    res.send("clientes com id" + id + " Deletado com sucesso!")

})



app.listen(port , ()=> {
   console.log("servidor rodando http://localhost:3000/")
});




