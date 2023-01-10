<?php
session_start();
$usuario = $_SESSION['usuario'];
require_once "../models/FuncionesSQL.php";
$modelos = "../models/";
$sql = "select equipo from usuarios where usuario='$usuario'";
$equipo = ObtenerValorCualquiera($sql, $modelos . "Conexion.php");
$sql = "SELECT c.id, fkCitas, title, start, end, infoAdicional, operador, c.folio, c.equipo, "
    . " fecha,datediff(curdate(),fechacarga) as dias FROM citas as c,folios where folios.id=fkCitas";
SelectSinNombreJson($sql, $modelos . "Conexion.php");
