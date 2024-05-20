const Controlador = require("./Controlador.js");

class Routes{    
    constructor(app){
        this.controlador = new Controlador();

        app.use("/obtenerAlumnos", (req, res)=>{this.controlador.obtenerAlumnos(req, res)});
        app.use("/obtenerProfesores", (req, res)=>{this.controlador.obtenerProfesores(req, res)});
        app.use("/obtenerGrupos", (req, res)=>{this.controlador.obtenerGrupos(req, res)});        
        app.use("/obtenerMaterias", (req, res)=>{this.controlador.obtenerMaterias(req, res)});
        app.use("/obtenerHorarios", (req, res)=>{this.controlador.mostrarHorarios(req, res)});
        
        app.post("/accionesProfesor", (req, res)=>{this.controlador.accionesProfesor(req, res)});
        app.post("/ingresarGrupo", (req, res)=>{this.controlador.ingresarGrupo(req, res)});
        app.post("/ingresarAlumno", (req, res)=>{this.controlador.ingresarAlumno(req, res)});
        app.post("/ingresarProfesor", (req, res)=>{this.controlador.ingresarProfesor(req, res)});
        app.post("/ingresarMateria", (req, res)=>{this.controlador.ingresarMateria(req, res)});       
        app.post("/modificarProfesor", (req, res)=>{this.controlador.modificarProfesor(req, res)});
        app.post("/modificarAlumno", (req, res)=>{this.controlador.modificarAlumno(req, res)});
        app.post("/accionesAlumno", (req, res)=>{this.controlador.accionesAlumno(req, res)});
    }
}

module.exports = Routes;