const bodyParser = require("body-parser");
const express = require("express");
const Routes = require("./../Routes/Routes.js");
const app = express();

class Servidor{
    constructor(){
        this.abierto = false;
        this.puerto = 1999;
        this.url = 'http://localhost:'+this.puerto+'/';
    }

    configurarServidor(){
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended : true
        })); 
        app.use(express.static("html"));

        new Routes(app);
    }

    iniciarServidor(){
        app.listen(this.puerto ,()=>{
            console.log(`Servidor escuchando en ${this.url}`);
        });
    }

    start() {
        this.configurarServidor();
        this.iniciarServidor();
    }
}

module.exports = Servidor;