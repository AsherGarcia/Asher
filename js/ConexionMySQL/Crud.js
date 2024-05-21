const ConectarBD = require("./ConectarBD.js");
const {Alumno} = require("./../Clases/Alumno.js");
const {Profesor} = require("./../Clases/Profesor.js");

class Crud{
    constructor(){
        this.conexion = ConectarBD();
    }

    async obtenerIdGrupo(nombre){
        return await new Promise((resolve, reject) => {
            this.conexion.query("SELECT gru_id FROM grupos WHERE gru_grupo = ?;", [nombre], (error, result)=>{
                if(error){reject(0)}
                let id = result[0].gru_id;
                resolve(id);
            });
        });
    }

    async obtenerIdMateria(nombre){
        return await new Promise((resolve, reject) => {
            this.conexion.query("SELECT mat_id FROM materias WHERE mat_materia = ?;", [nombre], (error, result)=>{
                if(error){reject(0)}
                resolve(result[0].mat_id);
            });
        });
    }

    async obtenerNombreGrupo(id){
        return await new Promise((resolve, reject) => {
            this.conexion.query("SELECT gru_grupo FROM grupos WHERE gru_id = ?;", [id], (error, result)=>{
                if(error){reject(0)}
                let id = result[0].gru_grupo;
                resolve(id);
            });
        });
    }

    async obtenerNombreMateria(id){
        return await new Promise((resolve, reject) => {
            this.conexion.query("SELECT mat_materia FROM materias WHERE mat_id = ?;", [id], (error, result)=>{
                if(error){reject(0)}
                resolve(result[0].mat_materia);
            });
        });
    }

    async obtenerIdSiguiente(columna, tabla){
        return await new Promise((resolve, reject) => {
            this.conexion.query(`SELECT ${columna} FROM ${tabla} ORDER BY (${columna}) ASC;`, (error, result)=>{
                if(error){reject(0)}
                let id = 1;
                for(let i = 0; i < result.length; i++){
                    if(id !== result[i][columna]){
                        break;
                    }
                    id++;
                }
                
                resolve(id);
            });
        });
    }

    async obtenerProfesores(){
        return await new Promise((resolve, reject)=>{
            this.conexion.query("SELECT profesor.pro_id, profesor.pro_nombre, profesor.pro_edad, grupos.gru_grupo, materias.mat_materia FROM profesor INNER JOIN materias INNER JOIN grupos WHERE grupos.gru_id = profesor.gru_id AND materias.mat_id = profesor.mat_id ORDER BY (profesor.pro_nombre) ASC;", (error, result)=>{
                if(error){
                    reject([]);
                }

                let profes = [];
                for(let i = 0; i < result.length; i++){
                    let fila = result[i];
                    profes.push(new Profesor(fila.pro_nombre, fila.pro_edad, fila.gru_grupo, fila.mat_materia, fila.pro_id));
                }

                resolve(profes);
            });
        });
    }

    async obtenerAlumnos(){
        return await new Promise((resolve, reject)=>{
            this.conexion.query("SELECT alumno.alu_boleta, alumno.alu_nombre, alumno.alu_edad, grupos.gru_grupo FROM alumno INNER JOIN grupos WHERE alumno.gru_id = grupos.gru_id ORDER BY (alumno.alu_nombre) ASC;", (error, result)=>{
                if(error){
                    reject([]);
                }
                
                let estudiantes = [];
                for(let i = 0; i < result.length; i++){
                    let estudiante = result[i];
                    estudiantes.push(new Alumno(estudiante.alu_nombre, estudiante.alu_edad, estudiante.alu_boleta, estudiante.gru_grupo));
                }

                resolve(estudiantes);
            });
        });
    }

    async agregarProfesor(profesor){
        let id = await this.obtenerIdSiguiente("pro_id", "profesor");
        return await new Promise((resolve, reject)=>{
            this.conexion.query("INSERT INTO profesor VALUES(?, ?, ?, ?, ?);", [id, profesor.getNombre, profesor.getEdad, profesor.getGrupo, profesor.getMateria], (error, result)=>{
                if(error){
                    console.log(error); 
                    reject(false);
                }
                resolve(true);
            });
        });
    }

    async agregarAlumno(alumno){
        let id = await this.obtenerIdSiguiente("alu_id", "alumno");
        let idGrupo = await this.obtenerIdGrupo(alumno.getGrupo);
        return await new Promise((resolve, reject)=>{
            this.conexion.query("INSERT INTO alumno VALUES(?, ?, ?, ?, ?);", [id, alumno.getBoleta, alumno.getNombre, alumno.getEdad, idGrupo], (error, result)=>{
                if(error){
                    console.log(error); 
                    reject(false);
                }
                resolve(true);
            });
        });
    }

    async actualizarProfesor(profesor){
        let idMateria = await this.obtenerIdMateria(profesor.getMateria);
        let idGrupo = await this.obtenerIdGrupo(profesor.getGrupo);

        return await new Promise((resolve, reject)=>{
            this.conexion.query("UPDATE profesor SET pro_nombre = ?, pro_edad = ?, gru_id = ?, mat_id = ? WHERE pro_id = ?;", [profesor.getNombre, profesor.getEdad, idGrupo, idMateria, profesor.getIdentificador], (error, result)=>{
                if(error){
                    console.log(error); 
                    reject(false);
                }
                resolve(true);
            });
        });
    }

    async actualizarAlumno(alumno){
        let idGrupo = await this.obtenerIdGrupo(alumno.getGrupo);
        return await new Promise((resolve, reject)=>{
            this.conexion.query("UPDATE alumno SET alu_nombre = ?, alu_edad = ?, gru_id = ? WHERE alu_boleta = ?;", [alumno.getNombre, alumno.getEdad, idGrupo, alumno.getBoleta], (error, result)=>{
                if(error){
                    console.log(error); 
                    reject(false);
                }
                resolve(true);
            });
        });
    }

    async borrarProfesor(id){
        return await new Promise((resolve, reject)=>{
            this.conexion.query("DELETE FROM profesor WHERE pro_id = ?;", [id], (error, result)=>{
                if(error){
                    console.log(error); 
                    reject(false);
                }
                resolve(true);
            });
        });
    }

    async borrarAlumno(boleta){
        return await new Promise((resolve, reject)=>{
            this.conexion.query("DELETE FROM alumno WHERE alu_boleta = ?;", [boleta], (error, result)=>{
                if(error){
                    console.log(error); 
                    reject(false);
                }
                resolve(true);
            });
        });
    }

    async insertarGrupo(grupo){
        let id = await this.obtenerIdSiguiente("gru_id", "grupos");
        return new Promise((resolve, reject)=>{
            this.conexion.query("INSERT INTO grupos VALUES(?, ?);", [id, grupo], (error, result)=>{
                if(error){
                    console.log(error); 
                    reject(false);
                }
                resolve(true);
            });
        });
    }

    async insertarMateria(materia){
        let id = await this.obtenerIdSiguiente("mat_id", "materias");
        return new Promise((resolve, reject)=>{
            this.conexion.query("INSERT INTO materias VALUES(?, ?);", [id, materia], (error, result)=>{
                if(error){
                    console.log(error); 
                    reject(false);
                }
                resolve(true);
            });
        });
    }

    async obtenerGrupos(){
        return await new Promise((resolve, reject)=>{
            this.conexion.query("SELECT gru_grupo FROM grupos;", (error, result)=>{
                if(error){
                    console.log(error); 
                    reject([]);
                }
                
                let grupos = [];
                for(let i = 0; i< result.length; i++){
                    grupos.push(result[i].gru_grupo);
                }

                resolve(grupos);
            });
        });
    }

    async obtenerMaterias(){
        return await new Promise((resolve, reject)=>{
            this.conexion.query("SELECT mat_materia FROM materias;", (error, result)=>{
                if(error){
                    console.log(error); 
                    reject([]);
                }
                
                let materias = [];
                for(let i = 0; i< result.length; i++){
                    materias.push(result[i].mat_materia);
                }

                resolve(materias);
            });
        });
    }

    async obtenerHorarios(){
        return await new Promise((resolve, reject)=>{
            this.conexion.query("SELECT grupos.gru_grupo, profesor.pro_nombre, materias.mat_materia FROM profesor INNER JOIN grupos INNER JOIN materias WHERE profesor.gru_id = grupos.gru_id AND materias.mat_id = profesor.mat_id ORDER BY (gru_grupo) ASC;", (error, result)=>{
                if(error){
                    console.log(error);
                    reject([]);
                }

                let horarios = [];
                for(let i = 0; i< result.length; i++){
                    horarios.push({grupo: result[i].gru_grupo, nProfesor: result[i].pro_nombre, materia: result[i].mat_materia});
                }
                
                resolve(horarios);
            });
        });
    }
}

module.exports = Crud;