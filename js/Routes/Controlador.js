const Crud = require("./../ConexionMySQL/Crud.js");
const Generar = require("./../Extras/GenerarHtml.js");
const {Profesor} = require("./../Clases/Profesor.js");
const {Alumno} = require("./../Clases/Alumno.js");

class Controlador{
    constructor(){
        this.crud = new Crud();
        this.generar = new Generar();
    }

    async obtenerAlumnos(req, res){
        res.send(this.generar.generarTablaAlumnos(await this.crud.obtenerAlumnos(), await this.crud.obtenerGrupos()));
    }

    async obtenerProfesores(req, res){
        res.send(this.generar.generarTablaProfesores(await this.crud.obtenerProfesores(), await this.crud.obtenerGrupos(), await this.crud.obtenerMaterias()));
    }

    async ingresarGrupo(req, res){
        let grupo = req.body.grupo;
        await this.crud.insertarGrupo(grupo);
        res.redirect("/obtenerGrupos");
    }

    async ingresarMateria(req, res){
        let materia = req.body.materia;
        await this.crud.insertarMateria(materia);
        res.redirect("/obtenerMaterias");
    }

    async ingresarAlumno(req, res){
        let nombre = req.body.nombre;
        let edad = req.body.edad;
        let boleta = req.body.boleta;
        let grupo = req.body.grupo;

        try{
            parseInt(edad);
            if(edad > 15 && boleta.length === 10 && grupo.length === 4 && nombre.length > 3){
                await this.crud.agregarAlumno(new Alumno(nombre, edad, boleta, grupo));
            }
        }
        catch(err){
            console.log(err)
        }
        res.redirect("/obtenerAlumnos");
    }

    async obtenerGrupos(req, res){
        res.send(this.generar.generarFormularioGrupos(await this.crud.obtenerGrupos()));
    }

    async obtenerMaterias(req, res){
        res.send(this.generar.generarFormularioMaterias(await this.crud.obtenerMaterias()));
    }

    async ingresarProfesor(req, res){
        let nombre = req.body.nombre;
        try{
            let edad = parseInt(req.body.edad);
            let materia = await this.crud.obtenerIdMateria(req.body.materia);
            let grupo = await this.crud.obtenerIdGrupo(req.body.grupo);
            
            if(nombre.length > 3 && edad > 18 && materia.length > 3 && grupo.length === 4){
                await this.crud.agregarProfesor(new Profesor(nombre, edad, grupo, materia, 0));
            }
        }
        catch(err){
            console.log(err)
        }

        res.redirect("/obtenerProfesores");
    }

    async accionesProfesor(req, res){
        let accion = req.body.accion;
        try{
            let id = req.body.id;
            let profesorActualizar;
            let profesores = await this.crud.obtenerProfesores();

            profesores.forEach(profesor => {
                if(profesor.getIdentificador === parseInt(id)){
                    profesorActualizar = profesor;
                }   
            });

            if(accion === "Modificar" && id > 0){
                res.send(this.generar.mostrarProfesor(profesorActualizar, await this.crud.obtenerMaterias(), await this.crud.obtenerGrupos()));
            }
            else if(accion === "Eliminar"){
                await this.crud.borrarProfesor(id);
                res.redirect("/obtenerProfesores");
            }
            else{
                res.redirect("index.html")
            }
        }
        catch(err){
            console.log(err);
        }
    }

    async accionesAlumno(req, res){
        let accion = req.body.accion;
        let boleta = req.body.boleta;
        let alumnoActualizar;
        let alumnos = await this.crud.obtenerAlumnos();

        alumnos.forEach(alumno => {
            if(alumno.getBoleta === boleta){
                alumnoActualizar = alumno;
            }   
        });

        if(accion === "Modificar" && boleta.length === 10){
            res.send(this.generar.mostrarAlumno(alumnoActualizar, await this.crud.obtenerGrupos()));
        }
        else if(accion === "Eliminar"){
            await this.crud.borrarAlumno(boleta);
            res.redirect("/obtenerAlumnos");
        }
        else{
            res.redirect("index.html")
        }
    }

    async modificarProfesor(req, res){
        let nombre = req.body.nombre;
        let edad = req.body.edad;
        let materia = req.body.materia;
        let grupo = req.body.grupo;

        try{
            let id = req.body.id;  
            if(materia.length > 3 && nombre.length > 3 && grupo.length === 4 && edad > 18){      
                await this.crud.actualizarProfesor(new Profesor(nombre, edad, grupo, materia, id));
            }
        }
        catch(err){
            console.log(err);
        }

        res.redirect("/obtenerProfesores");
    }

    async modificarAlumno(req, res){
        let boleta = req.body.boleta;
        let nombre = req.body.nombre;
        let grupo = req.body.grupo;
        
        try{
            let edad = req.body.edad;
            if(boleta.length === 10 && nombre.length > 3 && grupo.length === 4){
                await this.crud.actualizarAlumno(new Alumno(nombre, edad, boleta, grupo));
            }
        }
        catch(err){
            console.log(err);
        }

        res.redirect("/obtenerAlumnos");
    }

    async mostrarHorarios(req, res){
        res.send(this.generar.generarTablaHorarios(await this.crud.obtenerHorarios()));
    }
}

module.exports = Controlador;