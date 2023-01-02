<?php
session_start();
require "../models/Conexion.php";
try {
    //verifico los datos del login
    $usuario = htmlentities(addslashes($_POST['usuario']));
    $password = htmlentities(addslashes($_POST['password']));
    $sql = "SELECT * FROM usuarios WHERE usuario = :usuario";
    //preparo la consulta SQL
    $resultado = $DBcon->prepare($sql);
    //ejecucion de la consulta
    $resultado->execute(array(":usuario" => $usuario));
    //resultado en un array asociativo tipo while
    while ($login = $resultado->fetch(PDO::FETCH_ASSOC)) {
        if (password_verify($password, $login['password'])) {
            echo "OK";
            $_SESSION['usuario'] = $usuario;
            header('Location: ../resources/Principal.php');
            return;
        }
    }
    echo "Error";
    //cierro la conexion
    $conexion = null;
} catch (Exception $e) {
    die($e->getMessage());
}
