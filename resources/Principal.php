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

    <!--Navbar principal-->
    <nav id="navBarPrincipal" class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">VeryAuto</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class="nav-link active" aria-current="page" id="Citas" href="#">Citas</a>
                    <a class="nav-link" type="button" href="#">Features</a>
                    <a class="nav-link" href="#">Pricing</a>
                    <a class="nav-link disabled">Disabled</a>
                </div>
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
                                <input type="text" class="form-control" id="txtFecha">
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-2">
                                <label for="txtTitulo" class="form-label">Titulo</label>
                                <input type="text" class="form-control" id="txtTitulo">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="mb-2">
                                <label for="txtHoraInicio" class="form-label">Hora de inicio</label>
                                <select id="txtHoraInicio" class="selectpicker" data-live-search="true">
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
                                <select id="txtHoraFinal" class="selectpicker" data-live-search="true">
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
                    <div class="mb-2 row">
                        <label for="txtInfoAdicional" class="form-label">Informacion adicional</label>
                        <textarea class="form-control" id="txtInfoAdicional" rows="3" value="Ninguna"></textarea>
                    </div>
                    <div class="row">
                        <div class="col mb-2">
                            <label for="txtAsesor" class="form-label">Asesor</label>
                            <select id="txtAsesor" class="form-select mb-3 form-select-sm"
                                aria-label=".form-select-lg example">
                                <option selected>Asesor</option>
                            </select>
                        </div>
                        <div class="col mb-2">
                            <label for="txtColor" class="form-label">Color</label>
                            <div>
                                <select id="txtColor" name="opciones">
                                    <option value="#ff0000" class="rojo">Rojo</option>
                                    <option value="#0066ff" class="azul">azul</option>
                                    <option value="#009900" class="verde">Verde</option>
                                    </select>
                            </div>
                        </div>
                        <div class="col mb-2">
                            <label for="txtSiniestro" class="form-label">Siniestro</label>
                            <input type="text" class="form-control" id="txtSiniestro" autocomplete="off">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button id="btnGuardarCita" type="button" class="btn btn-primary">Guardar Cita</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="ModalMostrarInfoEvento" tabindex="-1" aria-labelledby="ModalMostrarInfoEventoLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="ModalMostrarInfoEventoLabel">Informacion</h1>
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
                        <textarea class="form-control" id="txtInfoInfoAdicional" rows="3" value="Ninguna" readonly></textarea>
                    </div>
                    <div class="row">
                        <div class="col mb-2">
                            <label for="txtInfoAsesor" class="form-label">Asesor</label>
                                <input type="text" class="form-control" id="txtInfoAsesor" readonly>
                        </div>
                        <div class="col pt-4">
                            <p>
                                <a id="desplegarInfoAdicional" class="btn btn-primary btn-sm" data-bs-toggle="collapse" href="#listaInfoAdicional"
                                    role="button" aria-expanded="false" aria-controls="listaInfoAdicional">
                                    Informacion adicional
                                </a>
                            </p>
                        </div>
                    </div>
                    <div class="collapse" id="listaInfoAdicional">
                        <div class="card card-body">
                            <ul id="ulListaInfo" class="list-group list-group-flush">
                            </ul>
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