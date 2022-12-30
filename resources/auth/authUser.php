<?php

include('../../controllers/Conexion.php');

$nombre = $_POST["txtUsuario"];
$pass 	= $_POST["txtPassword"];
//antes de nada obtengo la contraseña y la cifro para insertarla
$password = $_POST['password'];
//y ahora cifro la clave usando un hash
$pass_cifrada = password_hash($password, PASSWORD_DEFAULT, array("cost"=>10));

if ($DB == true) {
//preparo el insert
$insert = $DB->prepare("INSERT INTO personal (nombre, apellidos, cargo, password, genero) VALUES (:nombre, :apellidos, :cargo, :password, :genero)");

//asocio los campos del insert a los campos del formulario
$insert->bindParam(':nombre', $_POST['nombre']);
$insert->bindParam(':apellidos', $_POST['apellidos']);
$insert->bindParam(':cargo', $_POST['cargo']);
$insert->bindParam(':password', $pass_cifrada);
$insert->bindParam(':genero', $_POST['genero']);

//ejecutamos codigo anterior
$insert->execute();
//cierramos la conexion
$DB = null;
//redirijo a un archivo php
header('Location: index.php');
} else {
echo "Error al procesar recurso";
}
?>