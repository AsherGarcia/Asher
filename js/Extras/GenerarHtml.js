class Generar{
    constructor(){}

    generarEstructuraHtml(body = "", titulo = ""){
        return `<html lang='es'>
            <head>
                <title>${titulo}</title>
                <link rel="stylesheet" href="./css/style.css">
            </head>
            <body>
                ${body}
            </body>
        </html>`;
    }

    generarTablaAlumnos(alumnos, grupos){
        let filas = "", gruposDis = "";;
        for(let i = 0; i < alumnos.length; i++){
            let alumno = alumnos[i];
            filas += `<tr>
                    <td>${alumno.getBoleta}</td>
                    <td>${alumno.getNombre}</td>
                    <td>${alumno.getEdad}</td>
                    <td>${alumno.getGrupo}</td>
                    <td>
                        <form action='accionesAlumno' method='POST'>
                            <input type='hidden' name='boleta' value='${alumno.getBoleta}'>
                            <input type='submit' name='accion' value='Modificar'>
                            <input type='submit' name='accion' value='Eliminar'>
                        </form>
                    </td>
                </tr>`;
        }

        for(let i = 0; i < grupos.length; i++){
            gruposDis += `<option value='${grupos[i]}'>${grupos[i]}</option>`;            
        }

        let tabla = `<table>
            <tr>
                <td>Boleta</td>
                <td>Alumno</td>
                <td>Edad</td>
                <td>Grupo</td>
                <td>Acciones</td>
            </tr>
            <tr>
                ${filas}
            </tr>
        </table>`;

        let formulario = `<br><br><form action='/ingresarAlumno' method='POST'>
            <input type='text' name='boleta' placeholder='Boleta' required>
            <br>
            <input type='text' name='nombre' placeholder='Nombre' required>
            <br>
            <input type='number' name='edad' placeholder='Edad' required>
            <bR>
            <select name='grupo'>
                ${gruposDis}
            </select>
            <br>
            <input type='submit' value='Agregar Alumno'>
        </form>
        <br>
        <button><a href='index.html'>Regresar</a></button>`;

        return this.generarEstructuraHtml(tabla+formulario);
    }

    generarTablaProfesores(profesores, grupos, materias){
        let filas = "", gruposDis = "", materiasDis = "";

        for(let i = 0; i < profesores.length; i ++){
            let profesor = profesores[i];
            filas += `<tr>
                <td>${profesor.getIdentificador}</td>
                <td>${profesor.getNombre}</td>
                <td>${profesor.getEdad}</td>
                <td>${profesor.getMateria}</td>
                <td>${profesor.getGrupo}</td>
                <td>
                    <form action='/accionesProfesor' method='POST'>
                        <input type='hidden' name='id' value='${profesor.getIdentificador}'>
                        <input type='submit' name='accion' value='Modificar'>
                        <input type='submit' name='accion' value='Eliminar'>
                    </form>
                </td>
            </tr>`;
        }

        for(let i = 0; i < grupos.length; i ++){
            gruposDis += `<option value='${grupos[i]}'>${grupos[i]}</option>`;
        }

        for(let i = 0; i < materias.length; i ++){
            materiasDis += `<option value='${materias[i]}'>${materias[i]}</option>`;
        }

        let tabla = `<table>
            <tr>
                <td>Identificador</td>
                <td>Nombre</td>
                <td>Edad</td>
                <td>Materia</td>
                <td>Grupo</td>
                <td>Acciones</td>
            </tr>
            ${filas}
        </table>
        <br><br>
        <form action='/ingresarProfesor' method='POST'>
            <input type='text' name='nombre' placeholder='Nombre' required>
            <br>
            <input type='number' name='edad' placeholder='Edad' required>
            <br>
            <select name='grupo' required>
                ${gruposDis}
            <select>
            <br>
            <select name='materia' required>
                ${materiasDis}
            <select>
            <br>
            <input type='submit' value='Agregar Profesor'>
        </form>
        <br>
        <button><a href='index.html'>Regresar</a></button>`;

        return this.generarEstructuraHtml(tabla);
    }

    generarFormularioGrupos(grupos){
        let filas = "";
        
        for(let i = 0; i< grupos.length; i++){
            filas += `<tr>
                <td>${grupos[i]}</td>
            <tr>`;
        }

        let tabla = `<table>
            <tr>Grupos Existentes</tr>
            <tr>
                <td>Grupo</td>
            </tr>
            ${filas}
        </table>`;

        let formulario = `<form action="/ingresarGrupo" method="POST">
            <input type="text" name="grupo" required>
            <br>
            <input type="submit" value="Agregar Grupo">
        </form>
        <br>
        <button><a href='index.html'>Regresar</a></button>`;

        return this.generarEstructuraHtml(tabla+"<br><br>"+formulario);
    }

    generarFormularioMaterias(materias){
        let filas = "";
        
        for(let i = 0; i< materias.length; i++){
            filas += `<tr>
                <td>${materias[i]}</td>
            <tr>`;
        }

        let tabla = `<table>
            <tr>Materias Existentes</tr>
            <tr>
                <td>Materia</td>
            </tr>
            ${filas}
        </table>`;

        let formulario = `<form action="/ingresarMateria" method="POST">
            <input type="text" name="materia" placeholder='Materia' required>
            <br>
            <input type="submit" value="Agregar Materia">
        </form>
        <br>
        <button><a href='index.html'>Regresar</a></button>`;

        return this.generarEstructuraHtml(tabla+"<br><br>"+formulario);
    }

    mostrarProfesor(profesor, materias, grupos){
        let gruposDis = "", materiasDis = "";

        for(let i = 0; i < grupos.length; i ++){
            gruposDis += `<option value='${grupos[i]}' ${(grupos[i] === profesor.getGrupo)?"selected":""}>${grupos[i]}</option>`;
        }

        for(let i = 0; i < materias.length; i ++){
            materiasDis += `<option value='${materias[i]}' ${(materias[i] === profesor.getMateria)?"selected":""}>${materias[i]}</option>`;
        }

        let profe = `<form action='/modificarProfesor' method='POST'>
        <input type='hidden' name='id' value='${profesor.getIdentificador}'>
        <input type='text' name='nombre' placeholder='Nombre' value='${profesor.getNombre}'>
        <br>
        <input type='number' name='edad' placeholder='Edad' value='${profesor.getEdad}'>
        <br>
        <select name='grupo'>
            ${gruposDis}
        </select>
        <br>
        <select name='materia'>
            ${materiasDis}
        </select>
        <br>
        <input type='submit' value='Modificar'>
        </form>
        <br>
        <button><a href='/obtenerProfesores'>Regresar</a></button>`;

        return this.generarEstructuraHtml(profe);
    }

    mostrarAlumno(alumno, grupos){
        let gruposDis = "";

        for(let i = 0; i < grupos.length; i ++){
            gruposDis += `<option value='${grupos[i]}' ${(grupos[i] === alumno.getGrupo)?"selected":""}>${grupos[i]}</option>`;
        }

        let alum = `<form action='/modificarAlumno' method='POST'>
        <input type='hidden' name='boleta' placeholder='Boleta' value='${alumno.getBoleta}'>
        <input type='text' name='nombre' placeholder='Nombre' value='${alumno.getNombre}'>
        <br>
        <input type='number' name='edad' placeholder='Edad' value='${alumno.getEdad}'>
        <br>
        <select name='grupo'>
            ${gruposDis}
        </select>
        <br>
        <input type='submit' value='Modificar'>
        </form>
        <br>
        <button><a href='/obtenerAlumnos'>Regresar</a></button>`;

        return this.generarEstructuraHtml(alum);
    }

    generarTablaHorarios(horarios){
        let horario = "", anterior = "", fichas = "";

        for(let i = 0; i < horarios.length; i++){
            if(anterior !== horarios[i].grupo){
                fichas += `<tr>
                    ${(anterior !== "")?"<tr colspan='2'></tr>":""}
                    <td colspan='2'>Grupo ${horarios[i].grupo}</td>
                </tr>`;
                anterior = horarios[i].grupo;
            }

            fichas += `<tr>
                <td>${horarios[i].nProfesor}</td>
                <td>${horarios[i].materia}</td>
            </tr>`;
        }

        horario += `<table>
            <tr>
                <td>Nombre Profesor</td>
                <td>Materia Impartida</td>
            </tr>
            ${fichas}
        </table>
        <br>
        <br>
        <button><a href='index.html'>Regresar</a></button>`;
        
        return this.generarEstructuraHtml(horario);
    }
}

module.exports = Generar;