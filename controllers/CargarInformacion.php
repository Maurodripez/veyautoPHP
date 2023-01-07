<?php
include "../models/FuncionesSQL.php";
$accion = $_POST['accion'];
switch ($accion) {
    case "CargarExcel":
        $folio = $_POST['folio'];
        $poliza = $_POST['poliza'];
        $verificador = $_POST['verificador'];
        $fechaAsignacion = $_POST['fechaAsignacion'];
        $asegurado = $_POST['asegurado'];
        $ciudad = $_POST['ciudad'];
        $colonia = $_POST['colonia'];
        $calle = $_POST['calle'];
        $celular = $_POST['celular'];
        $correo = $_POST['correo'];
        $placas = $_POST['placas'];
        $serie = $_POST['serie'];
        $sql = "INSERT INTO folios(folio, fechacarga,fechaAsignacion, fechaVigencia,poliza,fechaEntrega,asegurado,celular,telCasa,correo,marcaTipo,"
        ." placas,numSerie,domicilio,colonia,cp,alcaldia,estado) "
        ." VALUES (:folio,now(),:fechaAsignacion,now(),:poliza,:now(),:asegurado,:celular,:correo,:placas,:serie,:domicilio:colonia:)";
        break;
}
echo $_POST['asegurado'];
