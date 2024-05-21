import mysql from 'mysql2'
import {BD_HOST, BD_USER, BD_PASSWORD, BD_NAME, BD_PORT} from "./../../config.js";

async function ConectarBD(){
    let conection = await mysql.createConnection({
        host : BD_HOST,
        user : BD_USER,
        password : BD_PASSWORD,
        database : BD_NAME,
        port: BD_PORT,        
        connectTimeout: 30000
    });
     
    conection.connect((err)=>{
        if(err){console.log(err);}
    });

    return await conection;
}

module.exports = {ConectarBD};