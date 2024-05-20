const mysql = require('mysql2');

class ConectarBD{
    constructor(){
        this.conection = mysql.createConnection({
            host : "localhost",
            user : "root",
            password : "130406",
            database : "crud"
        });
        
        this.conection.connect((err)=>{
            if(err){console.log(err);}
        });

        return this.conection;
    }
}

module.exports = {ConectarBD};