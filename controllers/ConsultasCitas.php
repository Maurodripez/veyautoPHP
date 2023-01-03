<?php
session_start();
$modelos = "../models/";
include "../models/FuncionesSQL.php";
$accion = $_POST['accion'];
switch ($accion) {
    case "MostrarInfoCita":
        $id = $_POST['id'];
        $sql = "select * from citas where id=$id";
        ConsultasSelectCualquiera($sql, $modelos . "Conexion.php", "Cita");
        break;
    case "InfoAdicional":
        $id = $_POST['id'];
        $fk = ObtenerId($id);
        $sql = "select asegurado,telefonoPrincipal,contacto,telContacto,marca,tipo,modelo,numSerie from infosiniestro, infoauto,infocliente"
            . " where idRegistro=infoauto.fkIdRegistro and idRegistro = infocliente.fkIdRegistro and idRegistro=$fk";
        //ConsultasSelectCualquiera($sql, "../Conexion.php", "InfoAdicional");
        break;
    case "ValidarCita":
        $folio = $_POST["folio"];
        $sql = "select count(folio) as conteo from citas where folio='$folio'";
        ConsultasSelectCualquiera($sql, "../models/Conexion.php", "Respuesta");
        break;
    case "MostrarOperadores":
        $sql = "select nombre from usuarios where perfil='operador'";
        ConsultasSelectCualquiera($sql, $modelos . "Conexion.php", "Operadores");
        break;
    case "SaberPerfil":
        $usuario = $_SESSION['usuario'];
        $sql = "select perfil from usuarios where usuario= '$usuario'";
        $resultado = ObtenerValorCualquiera($sql, "../Conexion.php");
        echo $resultado;
        break;
    case "ObtenerCitaActiva":
        $id = $_POST['id'];
        $sql = "select * from citas where fkCitas=$id";
        //ConsultasSelectCualquiera($sql, "../Conexion.php", "Cita");
        break;
    case "EliminarCita":
        $id = $_POST["id"];
        $nombreReal = obtenerNombreReal();
        $sql = "DELETE FROM citas WHERE fkCitas = $id";
        //ActualizarCualquierSiniestro($sql, "../Conexion.php");
        $sql = "INSERT INTO seguimientoprincipal (fkIdRegistroSegPrincipal,usuario,fechaseguimiento,estatusSeguimiento,comentarios,msgInterno)"
            . " VALUES ($id, '$nombreReal',now(), 'CITA CANCELADA', 'SE CANCELA LA CITA', 'Interno')";
        //ActualizarCualquierSiniestro($sql, "../Conexion.php");
        break;
    case "CrearCita":
        $usuario = $_SESSION['usuario'];
        $title = isset($_POST['title']) ? $_POST['title'] : "";
        $start = isset($_POST['start']) ? $_POST['start'] : "";
        $infoAdicional = isset($_POST['infoAdicional']) ? $_POST['infoAdicional'] : "";
        $veri = isset($_POST['veri']) ? $_POST['veri'] : "";
        $end = isset($_POST['end']) ? $_POST['end'] : "";
        $folio = isset($_POST['folio']) ? $_POST['folio'] : "";
        $sql = "select count(id) from folios where folio='$folio'";
        $existe = ObtenerValorCualquiera($sql, $modelos . "Conexion.php");
        if ($existe == 1) {
            $sql = "select id from folios where folio='$folio'";
            $id = ObtenerValorCualquiera($sql, "../models/Conexion.php");
            $sql = "select nombre from usuarios where usuario='$usuario'";
            $operador = obtenerValorCualquiera($sql, "../models/Conexion.php");
            $sql = "INSERT INTO citas (title,start,end,infoAdicional,verificador,fkCitas,folio,operador)"
                . " VALUES ('$title','$start','$end','$infoAdicional','$veri','$id','$folio','$operador')";
            ActualizarCualquierSiniestro($sql, "../models/Conexion.php");
            echo "Cita generada";
        } else {
            echo "Error, el folio no existe";
        }
        break;
}
function ObtenerId($id)
{
    $sql = "select fkCitas from citas where id=$id";
    //$fk = ObtenerValorCualquiera($sql, "../Conexion.php", "Adicional");
    //return $fk;
}
function obtenerNombreReal()
{
    $usuario = $_SESSION['usuario'];
    $sql = "select nombreReal from usuarios where usuario= '$usuario'";
    //$resultado = ObtenerValorCualquiera($sql, "../Conexion.php");
    // return $resultado;
}