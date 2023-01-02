    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Registro</title>
    </head>

    <body>
        <h3>Registrar Usuario</h3>
        <div class="form-group">
            <label for="nombre">Nombre:</label>
            <input id="nombre" required type="text" class="form-control" placeholder="Nombre">
        </div>
        <div class="form-group">
            <label for="usuario">Usuario:</label>
            <input id="usuario" required type="text" class="form-control" placeholder="Apellidos">
        </div>
        <div class="form-group">
            <label for="perfil">Perfil:</label>
            <select required id="perfil" class="form-control">
                <option value="">Selecciona...
                </option>
                <option value="Administrador">Administrador</option>
                <option value="Operador">Operador</option>
                <option value="Supervisor">Supervisor</option>
                <option value="Consulta">Consulta</option>
                <option value="Verificador">Verificador</option>
            </select>
        </div>
        <div class="form-group">
            <label for="password">Contraseña:</label>
            <input id="password" required type="password" class="form-control" placeholder="Password">
        </div>
        <div class="form-group">
            <label for="turno">Turno:</label>
            <select required id="turno" class="form-control">
                <option value="">Selecciona...
                </option>
                <option value="medio">Medio tiempo</option>
                <option value="completo">Tiempo completo</option>
            </select>
        </div>
        <div class="form-group">
            <label for="equipo">Equipo:</label>
            <select required id="equipo" class="form-control">
                <option value="">Selecciona...
                </option>
                <option value="Prueba1">Prueba1</option>
                <option value="Prueba2">Prueba2</option>
            </select>
        </div>
        <button id="btnCrearUsuario" class="btn btn-primary">Registrar</button>
        <script src="./js/index.js"></script>
    </body>

    </html>