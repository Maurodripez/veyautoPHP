<?php
include "../models/FuncionesSQL.php";
include "../models/Conexion.php";
$accion = $_POST['accion'];
switch ($accion) {
    case "CrearCarga":
        $cantidadFolios = $_POST['cantidadFolios'];
        $sql = "insert into historialcargas(fechasDeCargas,cantidadFolios) values(now(),'$cantidadFolios')";
        ActualizarCualquierSiniestro($sql, "../models/Conexion.php");
        $sql = "SELECT MAX(id) as ultimoId FROM historialcargas";
        echo ObtenerValorCualquiera($sql, "../models/Conexion.php");
        break;
    case "CargarExcel":
        $fk = $_POST["fk"];
        $folio = $_POST['folio'];
        $fechaAsignacion = $_POST['fechaAsignacion'];
        $poliza = $_POST['poliza'];
        $asegurado = $_POST['asegurado'];
        $celular = $_POST['celular'];
        $correo = $_POST['correo'];
        $placas = $_POST['placas'];
        $serie = $_POST['serie'];
        $colonia = $_POST['colonia'];
        $estado = $_POST['ciudad'];
        $domicilio = $_POST['calle'];
        $verificador = $_POST['verificador'];
        $equipo = $_POST['equipo'];
        try {
            $sql = $DBcon->prepare("INSERT INTO folios(folio, fechacarga,fechaAsignacion, fechaVigencia,poliza,fechaEntrega,asegurado,celular,correo,"
                . " placas,numSerie,colonia,estado,domicilio,verificador,equipo,fkHistorialCargas)"
                . " VALUES (:folio,now(),:fechaAsignacion,now(),:poliza,now(),:asegurado,:celular,:correo,:placas,:serie,:colonia,:estado,:domicilio,:verificador,:equipo,$fk)");
            $sql->bindParam(":folio", $folio);
            $sql->bindParam(":fechaAsignacion", $fechaAsignacion);
            $sql->bindParam(":poliza", $poliza);
            $sql->bindParam(":asegurado", $asegurado);
            $sql->bindParam(":celular", $celular);
            $sql->bindParam(":correo", $correo);
            $sql->bindParam(":placas", $placas);
            $sql->bindParam(":serie", $serie);
            $sql->bindParam(":colonia", $colonia);
            $sql->bindParam(":estado", $estado);
            $sql->bindParam(":domicilio", $domicilio);
            $sql->bindParam(":verificador", $verificador);
            $sql->bindParam(":equipo", $equipo);
            $sql->execute();
            echo "1";
            $DBcon = null;
        } catch (\Throwable $th) {
            echo "0";
        }
        break;
    case "ObtenerCargas":
        $sql = "select * from historialcargas group by fechasDeCargas desc";
        ConsultasSelectCualquiera($sql, "../models/Conexion.php", "Cargas");
        break;
    case "EliminarCarga":
        $id = $_POST["id"];
        $sql = "DELETE FROM historialcargas WHERE id = $id";
        ActualizarCualquierSiniestro($sql, "../models/Conexion.php");
        echo "Exito al eliminar carga";
        break;
}
