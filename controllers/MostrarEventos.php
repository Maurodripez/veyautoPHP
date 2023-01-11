<?php
session_start();
$usuario = $_SESSION['usuario'];
require_once "../models/FuncionesSQL.php";
$modelos = "../models/";
$mayor = $_GET['mayor'];
$menor = $_GET['menor'];
$sql = "select equipo from usuarios where usuario='$usuario'";
$equipo = ObtenerValorCualquiera($sql, $modelos . "Conexion.php");
$sql = "SELECT c.id, fkCitas, title, start, end, infoAdicional, operador, c.folio, c.equipo, "
    . " fecha,datediff(curdate(),fechacarga) as dias FROM citas as c,folios where "
    . " folios.id=fkCitas and datediff(curdate(),fechacarga)>=$mayor and datediff(curdate(),fechacarga)<$menor";
SelectSinNombreJson($sql, $modelos . "Conexion.php");
