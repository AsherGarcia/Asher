const mysql = require('mysql2');
const  {BD_HOST, BD_USER, BD_PASSWORD, BD_NAME, BD_PORT} = require("./../../config.js");

async function ConectarBD(){
    let conection = await mysql.createConnection({
        host : BD_HOST,
        user : BD_USER,
        password : BD_PASSWORD,
        database : BD_NAME,
        port: BD_PORT
    });
    
    conection.connect((err)=>{
        if(err){console.log(err);}
    });

    return this.conection;
}

module.exports = {ConectarBD};