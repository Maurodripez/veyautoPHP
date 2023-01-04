<?php
require('../models/Conexion.php');
$usuario = $_POST['usuario'];
$nombre = $_POST['nombre'];
$password = $_POST['password'];
$perfil = $_POST['perfil'];
$turno = $_POST['turno'];
$equipo = $_POST['equipo'];
$passCifrada = password_hash($password, PASSWORD_DEFAULT, array("cost" => 10));
$sql = $DBcon->prepare("INSERT INTO usuarios (usuario,password, nombre, perfil, turno, equipo)"
    . " VALUES (:usuario, :password, :nombre, :perfil, :turno, :equipo)");

//asocio los campos del insert a los campos del formulario
$sql->bindParam(':usuario', $usuario);
$sql->bindParam(':password', $passCifrada);
$sql->bindParam(':nombre', $nombre);
$sql->bindParam(':perfil', $perfil);
$sql->bindParam(':turno', $turno);
$sql->bindParam(':equipo', $equipo);

//ejecutamos codigo anterior
$sql->execute();
//cierramos la conexion
$DBCon = null;
echo "exito";
