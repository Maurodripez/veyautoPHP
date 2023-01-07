<?php
session_start();
$usuario = $_SESSION['usuario'];
require_once "../models/FuncionesSQL.php";
$modelos = "../models/";
$sql = "select equipo from usuarios where usuario='$usuario'";
$equipo = ObtenerValorCualquiera($sql, $modelos . "Conexion.php");
$sql = "SELECT * FROM citas where equipo='$equipo' ORDER BY id";
SelectSinNombreJson($sql, $modelos . "Conexion.php");
