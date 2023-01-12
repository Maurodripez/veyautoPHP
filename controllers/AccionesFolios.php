<?php
include "../models/FuncionesSQL.php";
include "../models/Conexion.php";
$accion = $_POST['accion'];
switch ($accion) {
    case "MostrarFolios":
        $sql = "SELECT id,folio,fechacarga,fechaSeguimiento,situacion,comentSeguimiento,poliza,equipo,"
            . " asegurado,celular,telCasa,marcaTipo,numSerie,estacion,clasificacion, datediff(now(),fechacarga) as dias FROM folios "
            . "  where datediff(now(),fechacarga)<30";
        ConsultasSelectCualquiera($sql, "../models/Conexion.php", "data");
        break;
    case "ActualizarInfo":
        try {
            $id = $_POST["id"];
            $celular = $_POST["celular"];
            $telCasa = $_POST["telCasa"];
            $correo = $_POST["correo"];
            $marcaTipo = $_POST["marcaTipo"];
            $placas = $_POST["placas"];
            $numSerie = $_POST["numSerie"];
            $equipo = $_POST["equipo"];
            $telOficina = $_POST["telOficina"];
            $modelo = $_POST["modelo"];
            $sql = $DBcon->prepare("UPDATE folios SET celular = :celular,telCasa = :telCasa,"
                . " correo =:correo ,marcaTipo=:marcaTipo , placas =:placas , numSerie = :numSerie,equipo =:equipo ,telOficina=:telOficina , modelo =:modelo WHERE id = $id");
            $sql->bindParam(":celular", $celular);
            $sql->bindParam(":telCasa", $telCasa);
            $sql->bindParam(":correo", $correo);
            $sql->bindParam(":marcaTipo", $marcaTipo);
            $sql->bindParam(":placas", $placas);
            $sql->bindParam(":numSerie", $numSerie);
            $sql->bindParam(":equipo", $equipo);
            $sql->bindParam(":telOficina", $telOficina);
            $sql->bindParam(":modelo", $modelo);
            $sql->execute();
            $DBcon = null;
            echo "Exito al actualizar";
        } catch (\Throwable $th) {
            echo "Error al actualizar";
        }

        break;
}
