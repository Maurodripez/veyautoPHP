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
    <link rel="" href="https://cdn.datatables.net/fixedheader/3.1.6/css/fixedHeader.dataTables.min.css">
    <script src="../DataTables/datatables.min.js"></script>
    <script src="https://cdn.datatables.net/fixedheader/3.1.6/js/dataTables.fixedHeader.min.js"></script>
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
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
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
    <div id="divCitas" class="row" style="display:none;">
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
        <!--Modal creacion eventos-->
        <div class="modal fade" id="ModalEventos">
            <div class="modal-dialog">
                <div class="modal-content " tyle="text-align:center">
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
                                <label for="txtCitaEquipo" class="form-label">Equipo</label>
                                <select id="txtCitaEquipo" class="form-select" aria-label=".form-select-lg">
                                    <option selected disabled>Equipo</option>
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
                        <div id="divLetreroCrearCita"></div>
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
                                <label for="txtInfEquipo" class="form-label">Equipo</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <input type="text" class="form-control" id="txtInfEquipo" readonly>
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
    </div>
    <div id="divDatos" style="display:none">
        <div class="table-responsive">
            <table id="tablaFolios" class="align-middle table table-hover mdl-data-table">
                <thead>
                    <tr>
                        <th style="font-size: 13px;" scope="col" class="text-center">Accion</th>
                        <th style="font-size: 13px;" scope="col" class="text-center">Folio</th>
                        <th style="font-size: 13px;" scope="col" class="text-center">FechaCarga</th>
                        <th style="font-size: 13px;" scope="col" class="text-center">FechaSeg</th>
                        <th style="font-size: 13px;" scope="col" class="text-center">Situacion</th>
                        <th style="font-size: 13px;" scope="col" class="text-center">Seguimiento</th>
                        <th style="font-size: 13px;" scope="col" class="text-center">Dias</th>
                        <th style="font-size: 13px;" scope="col" class="text-center">Poliza</th>
                        <th style="font-size: 13px;" scope="col" class="text-center">Asegurado</th>
                        <th style="font-size: 13px;" scope="col" class="text-center">Telefono</th>
                        <th style="font-size: 13px;" scope="col" class="text-center">Tel oficina</th>
                        <th style="font-size: 13px;" scope="col" class="text-center">MarcaTipo</th>
                        <th style="font-size: 13px;" scope="col" class="text-center">Serie</th>
                        <th style="font-size: 13px;" scope="col" class="text-center">Estacion</th>
                        <th style="font-size: 13px;" scope="col" class="text-center">Clasifica</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th style="font-size: 13px;" scope="col" class="text-center">Accion</th>
                        <th style="font-size: 13px;" scope="col" class="text-center">Folio</th>
                        <th style="font-size: 13px;" scope="col" class="text-center">FechaCarga</th>
                        <th style="font-size: 13px;" scope="col" class="text-center">FechaSeg</th>
                        <th style="font-size: 13px;" scope="col" class="text-center">Situacion</th>
                        <th style="font-size: 13px;" scope="col" class="text-center">Seguimiento</th>
                        <th style="font-size: 13px;" scope="col" class="text-center">Dias</th>
                        <th style="font-size: 13px;" scope="col" class="text-center">Poliza</th>
                        <th style="font-size: 13px;" scope="col" class="text-center">Asegurado</th>
                        <th style="font-size: 13px;" scope="col" class="text-center">Telefono</th>
                        <th style="font-size: 13px;" scope="col" class="text-center">Tel oficina</th>
                        <th style="font-size: 13px;" scope="col" class="text-center">MarcaTipo</th>
                        <th style="font-size: 13px;" scope="col" class="text-center">Serie</th>
                        <th style="font-size: 13px;" scope="col" class="text-center">Estacion</th>
                        <th style="font-size: 13px;" scope="col" class="text-center">Clasifica</th>
                    </tr>
                </tfoot>
            </table>
        </div>
        <!-- Modal editar folio -->
        <div class="modal fade" id="modalEditarFolio" tabindex="-1" aria-labelledby="modalEditarFolioLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="modalEditarFolioLabel">Modal title</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p style="display: none;" id="idFolio">Ninguno</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="divHerramientas" style="display:''">
        <div class="row">
            <div id="listHerramientas" class="list-group list-group-horizontal">
                <a style="text-align:center" class="list-group-item list-group-item-action herramientas"
                    data-bs-toggle="collapse" aria-expanded="false" data-bs-target="#creacionUsuarios"
                    aria-controls="collapseExample">Usuarios</a>
                <a style="text-align:center" class="list-group-item list-group-item-action herramientas"
                    data-bs-toggle="collapse" aria-expanded="false" data-bs-target="#asignacionFolios"
                    aria-controls="collapseExample2">Asignacion</a>
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
                            <button id="btnAcordeonCrearUsuario" class="accordion-button" type="button"
                                data-bs-toggle="collapse" data-bs-target="#acordionCrearUsuarios" aria-expanded="true"
                                aria-controls="acordionCrearUsuarios">
                                Crear usuario
                            </button>
                        </h2>
                        <div id="acordionCrearUsuarios" class="accordion-collapse collapse"
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
                                                    <label class="form-check-label"
                                                        for="checkSupervisor">Supervisor</label>
                                                </li>
                                                <li class="list-group-item">
                                                    <input class="form-check-input me-1" type="checkbox" value=""
                                                        id="checkMensajero">
                                                    <label class="form-check-label"
                                                        for="checkMensajero">Mensajero</label>
                                                </li>
                                                <li class="list-group-item">
                                                    <input class="form-check-input me-1" type="checkbox" value=""
                                                        id="checkConsulta">
                                                    <label class="form-check-label" for="checkConsulta">Consulta</label>
                                                </li>
                                                <li class="list-group-item">
                                                    <input class="form-check-input me-1" type="checkbox" value=""
                                                        id="checkTeamleader">
                                                    <label class="form-check-label"
                                                        for="checkTeamleader">Teamleader</label>
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
                                                <div class="col-md-6 position-relative">
                                                    <label for="txtUsuario" class="form-label">Usuario</label>
                                                    <input type="text" class="form-control" id="txtUsuario" required>
                                                </div>
                                                <div class="col-md-6 position-relative">
                                                    <label for="txtPassword" class="form-label">Contraseña</label>
                                                    <input type="text" class="form-control" id="txtPassword" required>
                                                </div>
                                            </div>
                                            <div class="row pt-2">
                                                <div class="col-md-6 position-relative">
                                                    <label for="txtTurno" class="form-label">Turno</label>
                                                    <select class="form-select" id="txtTurno" required>
                                                        <option selected disabled value="">Selecciona...</option>
                                                        <option>Completo</option>
                                                        <option>Matutino</option>
                                                        <option>Vespertino</option>
                                                    </select>
                                                </div>
                                                <div class="col-md-6 position-relative">
                                                    <label for="txtEquipo" class="form-label">Equipo</label>
                                                    <select class="form-select" id="txtEquipo" required>
                                                        <option selected disabled value="">Selecciona...</option>
                                                        <option>General</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6 position-relative">
                                                    <label for="txtNombre" class="form-label">Nombre</label>
                                                    <div class="input-group has-validation">
                                                        <input type="text" class="form-control" id="txtNombre"
                                                            aria-describedby="validationTooltipUsernamePrepend"
                                                            required>
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
                                <div class="table-responsive">
                                    <table id="tablaUsuarios" class="table table-hover mdl-data-table ">
                                        <thead>
                                            <tr>
                                                <th scope="col" class="text-center">Usuario</th>
                                                <th scope="col" class="text-center">Nombre</th>
                                                <th scope="col" class="text-center">Turno</th>
                                                <th scope="col" class="text-center">Equipo</th>
                                                <th scope="col" class="text-center">Supervisor</th>
                                                <th scope="col" class="text-center">Mensajero</th>
                                                <th scope="col" class="text-center">Consulta</th>
                                                <th scope="col" class="text-center">teamleader</th>
                                                <th scope="col" class="text-center">Operador</th>
                                                <th scope="col" class="text-center">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr>
                                                <th scope="col" class="text-center">Usuario</th>
                                                <th scope="col" class="text-center">Nombre</th>
                                                <th scope="col" class="text-center">Turno</th>
                                                <th scope="col" class="text-center">Equipo</th>
                                                <th scope="col" class="text-center">Supervisor</th>
                                                <th scope="col" class="text-center">Mensajero</th>
                                                <th scope="col" class="text-center">Consulta</th>
                                                <th scope="col" class="text-center">teamleader</th>
                                                <th scope="col" class="text-center">Operador</th>
                                                <th scope="col" class="text-center">Acciones</th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
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
                                                    <div class="row">
                                                        <div class="col position-relative pt-2">
                                                            <label for="txtEditarPerfil"
                                                                class="form-label">Perfil</label>
                                                            <ul class="list-group">
                                                                <li class="list-group-item">
                                                                    <input class="form-check-input me-1" type="checkbox"
                                                                        value="" id="checkEditarSupervisor">
                                                                    <label class="form-check-label"
                                                                        for="checkEditarSupervisor">Supervisor</label>
                                                                </li>
                                                                <li class="list-group-item">
                                                                    <input class="form-check-input me-1" type="checkbox"
                                                                        value="" id="checkEditarMensajero">
                                                                    <label class="form-check-label"
                                                                        for="checkEditarMensajero">Mensajero</label>
                                                                </li>
                                                                <li class="list-group-item">
                                                                    <input class="form-check-input me-1" type="checkbox"
                                                                        value="" id="checkEditarConsulta">
                                                                    <label class="form-check-label"
                                                                        for="checkEditarConsulta">Consulta</label>
                                                                </li>
                                                                <li class="list-group-item">
                                                                    <input class="form-check-input me-1" type="checkbox"
                                                                        value="" id="checkEditarTeamleader">
                                                                    <label class="form-check-label"
                                                                        for="checkEditarTeamleader">Teamleader</label>
                                                                </li>
                                                                <li class="list-group-item">
                                                                    <input class="form-check-input me-1" type="checkbox"
                                                                        value="" id="checkEditarOperador">
                                                                    <label class="form-check-label"
                                                                        for="checkEditarOperador">Operador</label>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div class="col-8 pt-2">
                                                            <div class="row">
                                                                <div class="col-md-6 position-relative">
                                                                    <label for="txtEditarUsuario"
                                                                        class="form-label">Usuario</label>
                                                                    <input type="text" class="form-control"
                                                                        id="txtEditarUsuario" required>
                                                                </div>
                                                                <div class="col-md-6 position-relative">
                                                                    <label for="txtEditarPassword"
                                                                        class="form-label">Contraseña</label>
                                                                    <input type="text" class="form-control"
                                                                        id="txtEditarPassword" required>
                                                                </div>
                                                            </div>
                                                            <div class="row pt-2">
                                                                <div class="col-md-6 position-relative">
                                                                    <label for="txtEditarTurno"
                                                                        class="form-label">Turno</label>
                                                                    <select class="form-select" id="txtEditarTurno"
                                                                        required>
                                                                        <option selected disabled value="">Selecciona...
                                                                        </option>
                                                                        <option>Completo</option>
                                                                        <option>Matutino</option>
                                                                        <option>Vespertino</option>
                                                                    </select>
                                                                </div>
                                                                <div class="col-md-6 position-relative">
                                                                    <label for="txtEditarEquipo"
                                                                        class="form-label">Equipo</label>
                                                                    <select class="form-select" id="txtEditarEquipo"
                                                                        required>
                                                                        <option selected disabled value="">Selecciona...
                                                                        </option>
                                                                        <option>General</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-md-6 position-relative">
                                                                    <label for="txtEditarNombre"
                                                                        class="form-label pt-1">Nombre</label>
                                                                    <div class="input-group has-validation">
                                                                        <input type="text" class="form-control"
                                                                            id="txtEditarNombre"
                                                                            aria-describedby="validationTooltipUsernamePrepend"
                                                                            required>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div id="divLetreroEditar"></div>
                                                    <p id="idEditar" style="display: none">Ninguno</p>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary"
                                                    data-bs-dismiss="modal">Cerrar</button>
                                                <button type="button" class="btn btn-danger"
                                                    id="btnEliminarUsuario">Eliminar</button>
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
        <div class="collapse" id="asignacionFolios">
            <div class="card card-body">
                <div class="accordion" id="accordionPanelsStayOpenExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                            <button id="btnAcordionAsignarFolios" class="accordion-button" type="button"
                                data-bs-toggle="collapse" data-bs-target="#panelAsignacion" aria-expanded="true"
                                aria-controls="panelAsignacion">
                                Asignacion de folios a equipo
                            </button>
                        </h2>
                        <div id="panelAsignacion" class="accordion-collapse collapse"
                            aria-labelledby="panelsStayOpen-headingOne">
                            <div class="accordion-body">
                                <div class="row">
                                    <div class="col">
                                        <h5 class="card-title">Asignacion de Siniestros</h5>
                                        <p class="card-text pt-1">Por favor, carga el Archivo Excel</p>
                                        <div class="col">
                                            <input type="file" class="form-control" id="LeerExcel">
                                        </div>
                                    </div>
                                    <div class="col-md-6 position-relative">
                                        <label for="txtEquipo" class="form-label">Equipo</label>
                                        <select class="form-select" id="txtEquipoFolios" required="">
                                            <option selected="" disabled="" value="">Selecciona...</option>
                                        </select>
                                        <div class="col pt-1">
                                            <button id="btnCargarExcel" type="button" class="btn">Cargar</button>
                                            <a id="btnPlantillaCarga" href="../Descargas/CargaVery.xlsx"
                                                download="Plantilla.xlsx" type="button" class="btn">Plantilla</a>
                                        </div>
                                    </div>
                                </div>
                                <div id="divLetreroCarga">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                            <button id="btnAcordeonEliminarCargas" class="accordion-button collapsed" type="button"
                                data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo"
                                aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                                Eliminar Cargas
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse"
                            aria-labelledby="panelsStayOpen-headingTwo">
                            <div class="accordion-body">
                                <div class="row">
                                    <div class="col">
                                        <label for="selectEliminarCarga" class="form-label">Turno</label>
                                        <select class="form-select" id="selectEliminarCarga">
                                            <option selected disabled value="">Cargas...</option>
                                        </select>
                                        <div class="btnEliminar">
                                            <button class="btn" id="btnEliminarCarga">
                                                Eliminar carga
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false"
                                aria-controls="panelsStayOpen-collapseThree">
                                Accordion Item #3
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse"
                            aria-labelledby="panelsStayOpen-headingThree">
                            <div class="accordion-body">
                                <strong>This is the third item's accordion body.</strong> It is hidden by default, until
                                the collapse plugin adds the appropriate classes that we use to style each element.
                                These classes control the overall appearance, as well as the showing and hiding via CSS
                                transitions. You can modify any of this with custom CSS or overriding our default
                                variables. It's also worth noting that just about any HTML can go within the
                                <code>.accordion-body</code>, though the transition does limit overflow.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="../bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="./js/Principal.js"></script>
    <script src="../bootstrap/js/read-excel-file.min.js"></script>
</body>

</html>