<?php
session_start();
$usuario = $_SESSION['usuario'];
require_once "../models/FuncionesSQL.php";
$modelos = "../models/";
$sql = "select perfil from usuarios where usuario='$usuario'";
$perfil = ObtenerValorCualquiera($sql, $modelos . "Conexion.php");
if ($perfil == "operador") {
    $sql = "select nombre from usuarios where usuario='$usuario'";
    $operador = obtenerValorCualquiera($sql, $modelos . "Conexion.php");
    $sql = "SELECT * FROM citas where operador='$operador' ORDER BY id";
    SelectSinNombreJson($sql, $modelos . "Conexion.php");
} else {
    $sql = "SELECT * FROM citas ORDER BY id";
    SelectSinNombreJson($sql, $modelos . "Conexion.php");
}
