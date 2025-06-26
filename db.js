const mysql = require("mysql2/promise");

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'clientes_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
    
};

const pool =  mysql.createPool(dbConfig);

pool.getConnection()
        .then(connection => {
            console.log("Conexao estabelecida com sucesso!");
            connection.release();
        })
        .catch(error => {
            console.error("Erro ao conectar com o Banco de Bados, erro: ", error.message);
                process.exit(1);
        })

        module.exports = pool;