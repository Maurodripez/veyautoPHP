<?php
include '../models/FuncionesSQL.php';
$accion = $_POST['accion'];
$sql = "SELECT * FROM usuarios";
ConsultasSelectCualquiera($sql, "../models/Conexion.php", "usuarios");
