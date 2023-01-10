<?php
include "../models/FuncionesSQL.php";
$accion = $_POST['accion'];
switch ($accion) {
    case "MostrarFolios":
        $sql = "SELECT id,folio,fechacarga,fechaSeguimiento,situacion,comentSeguimiento,poliza,"
            . " asegurado,celular,telCasa,marcaTipo,numSerie,estacion,clasificacion, datediff(now(),fechacarga) as dias FROM folios "
            . "  where datediff(now(),fechacarga)<30";
        ConsultasSelectCualquiera($sql, "../models/Conexion.php", "data");
        break;
}
