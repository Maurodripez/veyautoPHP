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
        $consulta = $_POST['consulta'];
        if($consulta=="Citas"){
            $fk = ObtenerId($id);
            $sql = "select * from folios where id=$fk";
            ConsultasSelectCualquiera($sql, $modelos . "Conexion.php", "InfoAdicional");
        }else if($consulta=="Folios"){
            $sql = "select * from folios where id=$id";
            ConsultasSelectCualquiera($sql, $modelos . "Conexion.php", "InfoAdicional");
        }
        break;
    case "ValidarCita":
        $folio = $_POST["folio"];
        $sql = "select count(folio) as conteo from citas where folio='$folio'";
        ConsultasSelectCualquiera($sql, $modelos . "Conexion.php", "Respuesta");
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
    case "CrearCita":
        $usuario = $_SESSION['usuario'];
        $title = isset($_POST['title']) ? $_POST['title'] : "";
        $start = isset($_POST['start']) ? $_POST['start'] : "";
        $fecha = isset($_POST['fecha']) ? $_POST['fecha'] : "";
        $start = isset($_POST['start']) ? $_POST['start'] : "";
        $infoAdicional = isset($_POST['infoAdicional']) ? $_POST['infoAdicional'] : "";
        $equipo = isset($_POST['equipo']) ? $_POST['equipo'] : "";
        $end = isset($_POST['end']) ? $_POST['end'] : "";
        $folio = isset($_POST['folio']) ? $_POST['folio'] : "";
        $sql = "select count(id) from folios where folio='$folio' and folio not in (select folio from citas)";
        $existe = ObtenerValorCualquiera($sql, $modelos . "Conexion.php");
        if ($existe == 1) {
            $sql = "select id from folios where folio='$folio'";
            $id = ObtenerValorCualquiera($sql, "../models/Conexion.php");
            $sql = "select nombre from usuarios where usuario='$usuario'";
            $operador = obtenerValorCualquiera($sql, "../models/Conexion.php");
            $sql = "INSERT INTO citas (title,start,end,infoAdicional,equipo,fkCitas,folio,operador,fecha)"
                . " VALUES ('$title','$start','$end','$infoAdicional','$equipo','$id','$folio','$operador','$fecha')";
            ActualizarCualquierSiniestro($sql, $modelos . "Conexion.php");
            echo "Cita generada";
        } else {
            echo "Error, el folio no existe o ya hay existe una cita";
        }
        break;
    case "FoliosCitas":
        $mayor = $_POST["mayor"];
        $menor = $_POST["menor"];
        $sql = "select count(folios.id) as conteo from folios,citas where datediff(curdate(), fechacarga)>=$mayor and citas.mostrar=1"
            . " and datediff(curdate(), fechacarga)<$menor and folios.id = fkCitas";
        ConsultasSelectCualquiera($sql, "../models/Conexion.php", "Folios");
        break;
    case "FoliosActivosNoCitas":
        $mayor = $_POST["mayor"];
        $menor = $_POST["menor"];
        $sql = "select count(id) as conteo from folios where datediff(curdate(), fechacarga)>=$mayor and mostrar=1"
            . " and datediff(curdate(), fechacarga)<$menor and id not in (select fkCitas from citas)";
        ConsultasSelectCualquiera($sql, "../models/Conexion.php", "Folios");
        break;
    case "FoliosTotalesActivos":
        $mayor = $_POST["mayor"];
        $menor = $_POST["menor"];
        $sql = "select count(id) as conteo from folios where datediff(curdate(), fechacarga)>=$mayor and datediff(curdate(), fechacarga)<=$menor and mostrar=1";
        ConsultasSelectCualquiera($sql, "../models/Conexion.php", "Folios");
        break;
    case "TotalActivos":
        $mayor = $_POST["mayor"];
        $menor = $_POST["menor"];
        $sql = "select count(id) as conteo from folios where datediff(curdate(), fechacarga)<=$menor and mostrar=1";
        ConsultasSelectCualquiera($sql, "../models/Conexion.php", "Folios");
        break;
    case "TotalCitas":
        $mayor = $_POST["mayor"];
        $menor = $_POST["menor"];
        $sql = "select count(folios.id) as conteo from folios,citas where folios.id=citas.fkCitas and datediff(curdate(), fechacarga)<=$menor AND citas.mostrar=1";
        ConsultasSelectCualquiera($sql, "../models/Conexion.php", "Folios");
        break;
    case "TotalNoCitas":
        $mayor = $_POST["mayor"];
        $menor = $_POST["menor"];
        $sql = "select count(id) as conteo from folios where datediff(curdate(), fechacarga)<$menor and id not in (select fkCitas from citas) AND mostrar=1";
        ConsultasSelectCualquiera($sql, "../models/Conexion.php", "Folios");
        break;
}
function ObtenerId($id)
{
    $sql = "select fkCitas from citas where id=$id";
    $fk = ObtenerValorCualquiera($sql, "../models/Conexion.php", "Adicional");
    return $fk;
}
function obtenerNombreReal()
{
    $usuario = $_SESSION['usuario'];
    $sql = "select nombreReal from usuarios where usuario= '$usuario'";
    //$resultado = ObtenerValorCualquiera($sql, "../Conexion.php");
    // return $resultado;
}
