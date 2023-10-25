const  mysql = require('mysql');
const connection2 = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE2,
    port: process.env.DB_PORT
});

connection2.connect((error) =>{
    if(error){
        console.log('El error de conexion es: ' + error);
        return;
    }
    console.log('Conectado a la base de datos! Impresoras!');
})


module.exports = connection2;