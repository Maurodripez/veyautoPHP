<?php
function ConsultasSelect($sql)
{
    require "./Conexion.php";
    $stmt = $DBcon->prepare($sql);
    $stmt->execute();

    $datos = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

        $datos['Siniestros'][] = $row;
    }
    echo json_encode($datos);
}
function ConsultasNoSiniestros($sql, $tabla)
{
    require "../Conexion.php";
    $stmt = $DBcon->prepare($sql);
    $stmt->execute();

    $datos = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

        $datos[$tabla][] = $row;
    }
    echo json_encode($datos);
}
function EliminarSiniestro($sql)
{
    require "./Conexion.php";
    $stmt = $DBcon->prepare($sql);
    $stmt->execute();
}
function ActualizarSiniestro($sql)
{
    require "./Conexion.php";
    $stmt = $DBcon->prepare($sql);
    $stmt->execute();
}
function ObtenerValorSql($sql)
{
    require "./Conexion.php";
    $stmt = $DBcon->query($sql);
    while ($row = $stmt->fetch()) {
        return $row[0];
    }
}
function ConsultasSelects($sql)
{
    require "./Conexion.php";
    $stmt = $DBcon->prepare($sql);
    $stmt->execute();

    $datos = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

        $datos['Resultados'][] = $row;
    }
    echo json_encode($datos);
}
function ConsultasSelectCualquiera($sql, $rutaConexion, $nombreJson)
{
    require $rutaConexion;
    $stmt = $DBcon->prepare($sql);
    $stmt->execute();

    $datos = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

        $datos[$nombreJson][] = $row;
    }
    echo json_encode($datos);
}
function ConsultasSelectCualquieraNoJson($sql, $rutaConexion, $nombreJson)
{
    require $rutaConexion;
    $stmt = $DBcon->prepare($sql);
    $stmt->execute();

    $datos = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

        $datos[$nombreJson][] = $row;
    }
    return ($datos);
}
function ObtenerValorCualquiera($sql, $rutaConexion)
{
    require $rutaConexion;
    $stmt = $DBcon->query($sql);
    while ($row = $stmt->fetch()) {
        return $row[0];
    }
}
function ActualizarCualquierSiniestro($sql, $rutaConexion)
{
    require $rutaConexion;
    $stmt = $DBcon->prepare($sql);
    $stmt->execute();
}
function SelectSinNombreJson($sql,$rutaConexion){
    require $rutaConexion;
    $stmt = $DBcon->prepare($sql);
    $stmt->execute();

    $datos = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

        $datos[] = $row;
    }
    echo json_encode($datos);
}