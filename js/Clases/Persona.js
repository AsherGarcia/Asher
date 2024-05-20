class Persona{
    constructor(nombre, edad){
        this.nombre = nombre;
        this.edad = edad;
    }

    get getNombre(){
        return this.nombre;
    }

    set setNombre(nombre){
        this.nombre = nombre;
    }

    get getEdad(){
        return this.edad;
    }

    set setEdad(edad){
        this.edad = edad;
    }
}

module.exports = {Persona};