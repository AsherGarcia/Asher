const bodyParser = require("body-parser");
const express = require("express");
const Rutas = require("./js/Rutas/Rutas.js");

const puerto = 8888;
const url = 'http://localhost:'+puerto+'/';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended : true
})); 
app.use(express.static("public"));

new Rutas(app).agregarMetodos();

app.listen(puerto ,()=>{
    console.log(`Servidor escuchando en ${url}`);
});