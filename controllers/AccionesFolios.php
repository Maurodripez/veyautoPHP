<?php
include "../models/FuncionesSQL.php";
$accion = $_POST['accion'];
switch ($accion) {
    case "MostrarFolios":
        $sql = "SELECT * FROM veryauto.folios where datediff(now(),fechacarga)<30";
        ConsultasSelectCualquiera($sql, "../models/Conexion.php", "Folios");
        break;
}
