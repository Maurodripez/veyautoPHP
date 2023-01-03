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
                        <a class="nav-link" aria-current="page" href="#">Citas</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Features</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Pricing</a>
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
    <div id="citas" style="display:''">

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
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
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
                            <div class="collapse" id="listaInfoAdicional">
                                <div class="card card-body">
                                    <ul id="ulListaInfo" class="list-group list-group-flush">
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    <script src="../bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="./js/Principal.js"></script>
</body>

</html>