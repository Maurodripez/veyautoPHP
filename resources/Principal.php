<?php
session_start();
if (!isset($_SESSION['usuario'])) {
    header('Location: ./LoginUsuarios.html');
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--recursos utilizados-->
    <link rel="stylesheet" href="../fullcalendar/fullcalendar.min.css">
    <link rel="stylesheet" href="../bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="./css/Principal.css">
    <link rel="stylesheet" href="../DataTables/datatables.min.css">
    <script src="../DataTables/datatables.min.js"></script>
    <script src="../bootstrap/js/jquery-3.6.3.min.js"></script>
    <script src="../fullcalendar/lib/moment.min.js"></script>
    <script src="../fullcalendar/fullcalendar.min.js"></script>
    <script src="../fullcalendar/locale/es.js"></script>
    <title>Document</title>
</head>

<body>
    <p id="idCitaActual" style="display: none;">El id</p>
    <!--Navbar principal-->
    <nav id="navBarPrincipal" class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">VeryAuto</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" id="btnCitas" aria-current="page" href="#">Citas</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="btnDatos" href="#">Datos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="btnHerramientas" href="#">Herramientas</a>
                    </li>
                </ul>
                <a id="btnSalir" class="nav-link" href="../models/Cerrarsesion.php"><svg
                        xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                        class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 
                        .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                        <path fill-rule="evenodd"
                            d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                    </svg></a>
            </div>
        </div>
    </nav>
    <button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top"
        data-bs-custom-class="custom-tooltip" data-toggle="tooltip"
        data-bs-title="This top tooltip is themed via CSS variables.">
        Custom tooltip
    </button>
    <div id="divCitas" class="row" style="display: none;">
        <div class="col">
            <div id="infoPorDias" class="list-group">
                <h4 class="mb-1">Folios</h4>
                <a href="#" class="list-group-item list-group-item-action">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">0 a 2 días</h5>
                        <small id="0a2Dias"></small>
                    </div>
                </a>
                <a href="#" class="list-group-item list-group-item-action">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">3 a 5 días</h5>
                        <small id="3a5Dias"></small>
                    </div>
                </a>
                <a href="#" class="list-group-item list-group-item-action">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">Más de 6 días</h5>
                        <small id="mas6Dias"></small>
                    </div>
                </a>
            </div>
        </div>
        <div class="col-10" id="citas" style="display:''">
        </div>
    </div>
    <div id="divDatos" style="display: none;">
        Hi
    </div>
    <div id="divHerramientas">
        <div class="row">
            <div id="listHerramientas" class="list-group list-group-horizontal">
                <a style="text-align:center" class="list-group-item list-group-item-action herramientas"
                    data-bs-toggle="collapse" aria-expanded="false" data-bs-target="#creacionUsuarios"
                    aria-controls="collapseExample">Usuarios</a>
                <a style="text-align:center" class="list-group-item list-group-item-action herramientas"
                    data-bs-toggle="collapse" aria-expanded="false" data-bs-target="#collapseExample2"
                    aria-controls="collapseExample2">Item 2</a>
                <a style="text-align:center" class="list-group-item list-group-item-action herramientas"
                    href="#list-item-3">Item 3</a>
                <a style="text-align:center" class="list-group-item list-group-item-action herramientas"
                    href="#list-item-4">Item 4</a>
            </div>
        </div>
        <div class="collapse" id="creacionUsuarios">
            <div class="card card-body">
                <div class="accordion" id="acordeonUsuarios">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="panelCreacion-headingOne">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                data-bs-target="#acordionCrearUsuarios" aria-expanded="true"
                                aria-controls="acordionCrearUsuarios">
                                Crear usuario
                            </button>
                        </h2>
                        <div id="acordionCrearUsuarios" class="accordion-collapse collapse show"
                            aria-labelledby="panelCreacion-headingOne">
                            <div class="accordion-body">
                                <form action="#" class="was-validated row g-3">
                                    <div class="row">
                                        <div class="col-md-4 position-relative pt-2">
                                            <label for="txtPerfil" class="form-label">Perfil</label>
                                            <ul class="list-group">
                                                <li class="list-group-item">
                                                    <input class="form-check-input me-1" type="checkbox" value=""
                                                        id="checkSupervisor">
                                                    <label class="form-check-label" for="checkSupervisor">Supervisor</label>
                                                </li>
                                                <li class="list-group-item">
                                                    <input class="form-check-input me-1" type="checkbox" value=""
                                                        id="checkMensajero">
                                                    <label class="form-check-label" for="checkMensajero">Mensajero</label>
                                                </li>
                                                <li class="list-group-item">
                                                    <input class="form-check-input me-1" type="checkbox" value=""
                                                        id="checkConsulta">
                                                    <label class="form-check-label" for="checkConsulta">Consulta</label>
                                                </li>
                                                <li class="list-group-item">
                                                    <input class="form-check-input me-1" type="checkbox" value=""
                                                        id="checkTeamleader">
                                                    <label class="form-check-label" for="checkTeamleader">Teamleader</label>
                                                </li>
                                                <li class="list-group-item">
                                                    <input class="form-check-input me-1" type="checkbox" value=""
                                                        id="checkOperador">
                                                    <label class="form-check-label" for="checkOperador">Operador</label>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="col pt-2">
                                            <div class="row">
                                                <div class="col-md-4 position-relative">
                                                    <label for="txtUsuario" class="form-label">Usuario</label>
                                                    <input type="text" class="form-control" id="txtUsuario" required>
                                                </div>
                                                <div class="col-md-4 position-relative">
                                                    <label for="txtPassword" class="form-label">Contraseña</label>
                                                    <input type="text" class="form-control" id="txtPassword" required>
                                                </div>
                                            </div>
                                            <div class="row pt-2">
                                                <div class="col-md-4 position-relative">
                                                    <label for="txtTurno" class="form-label">Turno</label>
                                                    <select class="form-select" id="txtTurno" required>
                                                        <option selected disabled value="">Selecciona...</option>
                                                        <option>Completo</option>
                                                        <option>Matutino</option>
                                                        <option>Vespertino</option>
                                                    </select>
                                                </div>
                                                <div class="col-md-4 position-relative">
                                                    <label for="txtEquipo" class="form-label">Equipo</label>
                                                    <select class="form-select" id="txtEquipo" required>
                                                        <option selected disabled value="">Selecciona...</option>
                                                        <option>Prueba1</option>
                                                        <option>Prueba2</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-4 position-relative">
                                                    <label for="txtNombre" class="form-label">Nombre</label>
                                                    <div class="input-group has-validation">
                                                        <input type="text" class="form-control" id="txtNombre"
                                                            aria-describedby="validationTooltipUsernamePrepend" required>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 btnCrearUsuario">
                                        <button id="btnCrearUsuario" class="btn" type="submit">Crear usuario</button>
                                    </div>
                                    <div id="liveAlertPlaceholder"></div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="btnMostrarUsuarios">
                            <button id="btnMostrarUsuariosHijo" class="accordion-button collapsed" type="button"
                                data-bs-toggle="collapse" data-bs-target="#acordionMostrarUsuarios"
                                aria-expanded="false" aria-controls="acordionMostrarUsuarios">
                                Mostrar usuarios
                            </button>
                        </h2>
                        <div id="acordionMostrarUsuarios" class="accordion-collapse collapse"
                            aria-labelledby="panelsStayOpen-headingTwo">
                            <div class="accordion-body">
                                <div class="alert alert-danger" role="alert">
                                    Las contraseñas no se muestran por seguridad y al estar encriptadas
                                </div>
                                <table id="tablaUsuarios" class="table table-hover mdl-data-table " style="width:100%">
                                    <thead>
                                        <tr>
                                            <th class="text-center">Usuario</th>
                                            <th class="text-center">Nombre</th>
                                            <th class="text-center">Turno</th>
                                            <th class="text-center">Equipo</th>
                                            <th class="text-center">Supervisor</th>
                                            <th class="text-center">Mensajero</th>
                                            <th class="text-center">Consulta</th>
                                            <th class="text-center">teamleader</th>
                                            <th class="text-center">Operador</th>
                                            <th class="text-center">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th class="text-center">Usuario</th>
                                            <th class="text-center">Nombre</th>
                                            <th class="text-center">Turno</th>
                                            <th class="text-center">Equipo</th>
                                            <th class="text-center">Supervisor</th>
                                            <th class="text-center">Mensajero</th>
                                            <th class="text-center">Consulta</th>
                                            <th class="text-center">teamleader</th>
                                            <th class="text-center">Operador</th>
                                            <th class="text-center">Acciones</th>
                                        </tr>
                                    </tfoot>
                                </table>
                                <div class="modal fade" id="modalEditarUsuario" tabindex="-1"
                                    aria-labelledby="modalEditarUsuarioLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-lg">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="modalEditarUsuarioLabel">Editar usuario
                                                </h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <form action="#" class="was-validated row g-3">
                                                    <div class="col-md-4 position-relative">
                                                        <label for="txtUsuario" class="form-label">Usuario</label>
                                                        <input type="text" class="form-control" id="txtEditarUsuario"
                                                            required>
                                                    </div>
                                                    <div class="col-md-4 position-relative">
                                                        <label for="txtPassword" class="form-label">Contraseña</label>
                                                        <input type="text" class="form-control" id="txtEditarPassword"
                                                            required>
                                                    </div>
                                                    <div class="col-md-4 position-relative">
                                                        <label for="txtNombre" class="form-label">Nombre</label>
                                                        <div class="input-group has-validation">
                                                            <input type="text" class="form-control" id="txtEditarNombre"
                                                                aria-describedby="validationTooltipUsernamePrepend"
                                                                required>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 position-relative">
                                                        <label for="txtPerfil" class="form-label">Perfil</label>
                                                        <select class="form-select" id="txtEditarPerfil" required>
                                                            <option selected disabled value="">Selecciona...</option>
                                                            <option>Supervisor</option>
                                                            <option>Mensajero</option>
                                                            <option>Consulta</option>
                                                            <option>Team leader</option>
                                                            <option>Operador</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-md-4 position-relative">
                                                        <label for="txtTurno" class="form-label">Turno</label>
                                                        <select class="form-select" id="txtEditarTurno" required>
                                                            <option selected disabled value="">Selecciona...</option>
                                                            <option>Completo</option>
                                                            <option>Matutino</option>
                                                            <option>Vespertino</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-md-4 position-relative">
                                                        <label for="txtEquipo" class="form-label">Equipo</label>
                                                        <select class="form-select" id="txtEditarEquipo" required>
                                                            <option selected disabled value="">Selecciona...</option>
                                                            <option>Prueba1</option>
                                                            <option>Prueba2</option>
                                                        </select>
                                                    </div>
                                                    <div id="divLetreroEditar"></div>
                                                    <p id="idEditar" style="display: none">Ninguno</p>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary"
                                                    data-bs-dismiss="modal">Cerrar</button>
                                                <button type="button" id="btnEditarUsuario" type="submit"
                                                    class="btn btnGuardar">Guardar cambios</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="collapse" id="collapseExample2">
            <div class="card card-body">
                Sel segundo
            </div>
        </div>
    </div>
    <!--Modal creacion eventos-->
    <div class="modal fade" id="ModalEventos">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">Crear cita</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col">
                            <div class="mb-2">
                                <label for="txtFecha" class="form-label">Fecha</label>
                                <input type="text" class="form-control" id="txtFecha" readonly>
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-2">
                                <label for="txtHoraInicio" class="form-label">Hora de inicio</label>
                                <select id="txtHoraInicio" class="form-select selectpicker" data-live-search="true">
                                    <option value="09:00">09:00</option>
                                    <option value="10:00">10:00</option>
                                    <option value="11:00">11:00</option>
                                    <option value="12:00">12:00</option>
                                    <option value="13:00">13:00</option>
                                    <option value="14:00">14:00</option>
                                    <option value="15:00">15:00</option>
                                    <option value="16:00">16:00</option>
                                </select>
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-2">
                                <label for="txtHoraFinal" class="form-label">Hora final</label>
                                <select id="txtHoraFinal" class="form-select selectpicker" data-live-search="true">
                                    <option value="10:00">10:00</option>
                                    <option value="11:00">11:00</option>
                                    <option value="12:00">12:00</option>
                                    <option value="13:00">13:00</option>
                                    <option value="14:00">14:00</option>
                                    <option value="15:00">15:00</option>
                                    <option value="16:00">16:00</option>
                                    <option value="17:00">17:00</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="mb-2">
                                <label for="txtTitulo" class="form-label">Titulo</label>
                                <input type="text" class="form-control" id="txtTitulo">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col mb-2">
                            <label for="txtVeri" class="form-label">Verificador</label>
                            <select id="txtVeri" class="form-select" aria-label=".form-select-lg">
                                <option selected>Verificador</option>
                            </select>
                        </div>
                        <div class="col mb-2">
                            <label for="txtFolio" class="form-label">Folio</label>
                            <input type="text" class="form-control" id="txtFolio" autocomplete="off">
                        </div>
                    </div>
                    <div class="mb-2 row  p-2">
                        <label for="txtInfoAdicional" class="form-label">Informacion adicional</label>
                        <textarea class="form-control" id="txtInfoAdicional" rows="2" value="Ninguna"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btnCerrarModal" data-bs-dismiss="modal">Cerrar</button>
                    <button id="btnGuardarCita" type="button" class="btn">Guardar Cita</button>
                </div>
            </div>
        </div>
    </div>
    <!--modal para la informacion de la cita-->
    <div class="modal fade" id="ModalMostrarInfoEvento" tabindex="-1" aria-labelledby="ModalMostrarInfoEventoLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-4" id="ModalMostrarInfoEventoLabel">Informacion</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col">
                            <div class="mb-2">
                                <label for="txtInfoFecha" class="form-label">Fecha</label>
                                <input type="text" class="form-control" id="txtInfoFecha" readonly>
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-2">
                                <label for="txtInfoTitulo" class="form-label">Titulo</label>
                                <input type="text" class="form-control" id="txtInfoTitulo" readonly>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="mb-2">
                                <label for="txtInfoHoraInicio" class="form-label">Hora de inicio</label>
                                <input type="text" class="form-control" id="txtInfoHoraInicio" readonly>
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-2">
                                <label for="txtInfoHoraFinal" class="form-label">Hora final</label>
                                <input type="text" class="form-control" id="txtInfoHoraFinal" readonly>
                            </div>
                        </div>
                    </div>
                    <div class="mb-2 row">
                        <label for="txtInfoInfoAdicional" class="form-label">Informacion adicional</label>
                        <textarea class="form-control" id="txtInfoInfoAdicional" rows="3" value="Ninguna"
                            readonly></textarea>
                    </div>
                    <div class="row">
                        <div class="col mb-2">
                            <label for="txtInfVeri" class="form-label">Verificador</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <input type="text" class="form-control" id="txtInfVeri" readonly>
                        </div>
                        <div class="col">
                            <button class="btn" type="button" id="btnOffCanvas" data-bs-toggle="offcanvas"
                                data-bs-target="#offCanvasInfo" aria-controls="offCanvasInfo">Informacion
                                adicional</button>
                        </div>
                    </div>
                    <div class="offcanvas offcanvas-end" tabindex="-1" id="offCanvasInfo"
                        aria-labelledby="offCanvasInfoLabel">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="offCanvasInfoLabel">Informacion adicional</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas"
                                aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body">
                            <div class="card card-body">
                                <ul id="ulListaInfo" class="list-group list-group-flush">
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btnCerrarModal" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    <script src="../bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="./js/Principal.js"></script>
</body>

</html>