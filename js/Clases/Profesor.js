const {Persona} = require("./Persona.js");

class Profesor extends Persona{
    constructor(nombre, edad, grupo, materia, identificador){
        super(nombre, edad);
        this.grupo = grupo;
        this.materia = materia;
        this.identificador = identificador;
    }

    get getGrupo(){
        return this.grupo;
    }

    set setGrupo(grupo){
        this.grupo = grupo;
    }

    get getMateria(){
        return this.materia;
    }

    set setMateria(materia){
        this.materia = materia;
    }

    get getIdentificador(){
        return this.identificador;
    }

    set setidentificador(identificador){
        this.identificador = identificador;
    }
}

module.exports = {Profesor};