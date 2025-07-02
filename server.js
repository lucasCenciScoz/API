const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const clientesRoutes = require('./routes/clientesRoutes');
const carrosRoutes = require('./routes/carrosRoutes');
const pedidosRoutes = require('./routes/pedidosRoutes');
const vendasRoutes = require('./routes/vendasRoutes');
const recomprasRoutes = require('./routes/recomprasRoutes');

app.use('/cliente', clientesRoutes);
app.use('/carros', carrosRoutes);
app.use('/pedidos', pedidosRoutes);
app.use('/vendas', vendasRoutes);
app.use('/recompras', recomprasRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
