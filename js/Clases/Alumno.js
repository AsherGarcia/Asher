const {Persona} = require("./Persona.js");

class Alumno extends Persona{
    constructor(nombre, edad, boleta, grupo){
        super(nombre, edad);
        this.boleta = boleta;
        this.grupo = grupo;
    }

    get getBoleta(){
        return this.boleta;
    }

    set setBoleta(boleta){
        this.boleta = boleta;
    }

    get getGrupo(){
        return this.grupo;
    }

    set setGrupo(grupo){
        this.grupo = grupo;
    }
}

module.exports = {Alumno};