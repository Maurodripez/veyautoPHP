<?php
require('../models/Conexion.php');
require("../models/FuncionesSQL.php");
$accion = $_POST['accion'];
switch ($accion) {
    case "CrearUsuario":
        $usuario = $_POST['usuario'];
        $nombre = $_POST['nombre'];
        $password = $_POST['password'];
        $turno = $_POST['turno'];
        $supervisor = $_POST['supervisor'];
        $mensajero = $_POST['mensajero'];
        $consulta = $_POST['consulta'];
        $teamleader = $_POST['teamleader'];
        $operador = $_POST['operador'];
        $equipo = $_POST['equipo'];
        $passCifrada = password_hash($password, PASSWORD_DEFAULT, array("cost" => 10));
        $sql = $DBcon->prepare("INSERT INTO usuarios (usuario,password, nombre, turno, equipo,Supervisor,Mensajero,Consulta,Teamleader,Operador)"
            . " VALUES (:usuario, :password, :nombre, :turno, :equipo,:supervisor, :mensajero, :consulta, :teamleader, :operador)");

        //asocio los campos del insert a los campos del formulario
        $sql->bindParam(':usuario', $usuario);
        $sql->bindParam(':password', $passCifrada);
        $sql->bindParam(':nombre', $nombre);
        $sql->bindParam(':turno', $turno);
        $sql->bindParam(':equipo', $equipo);
        $sql->bindParam(':supervisor', $supervisor);
        $sql->bindParam(':mensajero', $mensajero);
        $sql->bindParam(':consulta', $consulta);
        $sql->bindParam(':teamleader', $teamleader);
        $sql->bindParam(':operador', $operador);

        //ejecutamos codigo anterior
        $sql->execute();
        //cierramos la conexion
        $DBCon = null;
        echo "exito";
        break;
    case "MostrarUsuarios":
        $sql = "select * from usuarios";
        ConsultasSelectCualquiera($sql, "../models/Conexion.php", "data");
        break;
    case "ValidarExistencia":
        $usuario = $_POST["usuario"];
        $sql = $DBcon->prepare("select count(usuario) from usuarios where usuario=:usuario");
        $sql->bindParam(":usuario", $usuario);
        $sql->execute();
        $DBCon = null;
        $resultado = $sql->fetchColumn();
        echo $resultado;
        break;
    case "EditarUsuario":
        $usuario = $_POST['usuario'];
        $nombre = $_POST['nombre'];
        $password = $_POST['password'];
        $turno = $_POST['turno'];
        $supervisor = $_POST['supervisor'];
        $mensajero = $_POST['mensajero'];
        $consulta = $_POST['consulta'];
        $teamleader = $_POST['teamleader'];
        $operador = $_POST['operador'];
        $equipo = $_POST['equipo'];
        $id = $_POST['id'];
        $passCifrada = password_hash($password, PASSWORD_DEFAULT, array("cost" => 10));
        $sql = $DBcon->prepare("UPDATE usuarios SET usuario = :usuario, password = :password, nombre = :nombre, turno = :turno, equipo = :equipo,"
            . " Supervisor= :supervisor,Mensajero= :mensajero,Consulta= :consulta,Teamleader= :teamleader,Operador= :operador  WHERE id = :id");
        //asocio los campos del insert a los campos del formulario
        $sql->bindParam(':usuario', $usuario);
        $sql->bindParam(':password', $passCifrada);
        $sql->bindParam(':nombre', $nombre);
        $sql->bindParam(':turno', $turno);
        $sql->bindParam(':equipo', $equipo);
        $sql->bindParam(':id', $id);
        $sql->bindParam(':supervisor', $supervisor);
        $sql->bindParam(':mensajero', $mensajero);
        $sql->bindParam(':consulta', $consulta);
        $sql->bindParam(':teamleader', $teamleader);
        $sql->bindParam(':operador', $operador);
        //ejecutamos codigo anterior
        $sql->execute();
        //cierramos la conexion
        $DBCon = null;
        echo "exito";
        break;
    case "ObtenerEquipos":
        $sql = "select nombre from usuarios where Teamleader='Si'";
        ConsultasSelectCualquiera($sql, "../models/Conexion.php", "Equipos");
        break;
    case "EliminarUsuario":
        $id = $_POST["id"];
        try {
            $sql = "DELETE FROM usuarios WHERE id=$id";
            ActualizarCualquierSiniestro($sql, "../models/Conexion.php");
            echo "Eliminado con exito";
        } catch (\Throwable $th) {
            echo "Error al eliminar usuario";
        }
        break;
}
