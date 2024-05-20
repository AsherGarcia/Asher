const Controlador = require("../Comunicacion/Comunicar.js");

class Rutas{    
    constructor(app){
        this.app = app;
        this.controlador = new Controlador();
    }

    agregarMetodos(){
        this.app.use("/obtenerAlumnos", (req, res)=>{this.controlador.obtenerAlumnos(req, res)});
        this.app.use("/obtenerProfesores", (req, res)=>{this.controlador.obtenerProfesores(req, res)});
        this.app.use("/obtenerGrupos", (req, res)=>{this.controlador.obtenerGrupos(req, res)});        
        this.app.use("/obtenerMaterias", (req, res)=>{this.controlador.obtenerMaterias(req, res)});
        this.app.use("/obtenerHorarios", (req, res)=>{this.controlador.mostrarHorarios(req, res)});
        
        this.app.post("/accionesProfesor", (req, res)=>{this.controlador.accionesProfesor(req, res)});
        this.app.post("/ingresarGrupo", (req, res)=>{this.controlador.ingresarGrupo(req, res)});
        this.app.post("/ingresarAlumno", (req, res)=>{this.controlador.ingresarAlumno(req, res)});
        this.app.post("/ingresarProfesor", (req, res)=>{this.controlador.ingresarProfesor(req, res)});
        this.app.post("/ingresarMateria", (req, res)=>{this.controlador.ingresarMateria(req, res)});       
        this.app.post("/modificarProfesor", (req, res)=>{this.controlador.modificarProfesor(req, res)});
        this.app.post("/modificarAlumno", (req, res)=>{this.controlador.modificarAlumno(req, res)});
        this.app.post("/accionesAlumno", (req, res)=>{this.controlador.accionesAlumno(req, res)});
    }
}

module.exports = Rutas;