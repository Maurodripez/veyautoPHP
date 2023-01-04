-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.24-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.2.0.6576
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para veryauto
CREATE DATABASE IF NOT EXISTS `veryauto` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `veryauto`;

-- Volcando estructura para tabla veryauto.citas
CREATE TABLE IF NOT EXISTS `citas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(450) DEFAULT NULL,
  `start` varchar(45) DEFAULT NULL,
  `end` varchar(45) DEFAULT NULL,
  `infoAdicional` varchar(45) DEFAULT NULL,
  `verificador` varchar(45) DEFAULT NULL,
  `fkCitas` int(11) DEFAULT NULL,
  `folio` varchar(450) DEFAULT NULL,
  `operador` varchar(450) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla veryauto.citas: ~1 rows (aproximadamente)
DELETE FROM `citas`;
INSERT INTO `citas` (`id`, `title`, `start`, `end`, `infoAdicional`, `verificador`, `fkCitas`, `folio`, `operador`) VALUES
	(27, 'qweqw', '2023-01-04 09:00:00', '2023-01-04 10:00:00', 'qwe', 'Juanito', 1, '1234', 'Juanito');

-- Volcando estructura para tabla veryauto.folios
CREATE TABLE IF NOT EXISTS `folios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `folio` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `fechacarga` datetime DEFAULT NULL,
  `fechaAsignacion` datetime DEFAULT NULL,
  `fechaVigencia` date DEFAULT NULL,
  `poliza` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `fechaEntrega` date DEFAULT NULL,
  `asegurado` varchar(450) COLLATE utf8_spanish_ci DEFAULT NULL,
  `celular` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `telCasa` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `correo` varchar(450) COLLATE utf8_spanish_ci DEFAULT NULL,
  `marcaTipo` varchar(450) COLLATE utf8_spanish_ci DEFAULT NULL,
  `placas` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `numSerie` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `domicilio` varchar(450) COLLATE utf8_spanish_ci DEFAULT NULL,
  `colonia` varchar(450) COLLATE utf8_spanish_ci DEFAULT NULL,
  `cp` varchar(10) COLLATE utf8_spanish_ci DEFAULT NULL,
  `alcaldia` varchar(450) COLLATE utf8_spanish_ci DEFAULT NULL,
  `estado` varchar(450) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla veryauto.folios: ~2 rows (aproximadamente)
DELETE FROM `folios`;
INSERT INTO `folios` (`id`, `folio`, `fechacarga`, `fechaAsignacion`, `fechaVigencia`, `poliza`, `fechaEntrega`, `asegurado`, `celular`, `telCasa`, `correo`, `marcaTipo`, `placas`, `numSerie`, `domicilio`, `colonia`, `cp`, `alcaldia`, `estado`) VALUES
	(1, '1234', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01', '12345', '2023-01-01', 'prueba', '12345', '12345', 'q@gmail.com', 'suzuki', '1221', '13234234', 'che', 'we', '12442', 'tlalpan', 'cdmx'),
	(2, '12344', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01', '12345', '2023-01-01', 'prueba', '12345', '12345', 'q@gmail.com', 'suzuki', '1221', '13234234', 'che', 'we', '12442', 'tlalpan', 'cdmx');

-- Volcando estructura para tabla veryauto.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(450) DEFAULT NULL,
  `password` varchar(500) DEFAULT NULL,
  `nombre` varchar(450) DEFAULT NULL,
  `perfil` varchar(45) DEFAULT NULL,
  `turno` varchar(45) DEFAULT NULL,
  `equipo` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla veryauto.usuarios: ~11 rows (aproximadamente)
DELETE FROM `usuarios`;
INSERT INTO `usuarios` (`id`, `usuario`, `password`, `nombre`, `perfil`, `turno`, `equipo`) VALUES
	(3, 'admin', '$2y$10$UicEpJiSnveNdr4RaGkv4e8/tKogHGERq6sf1dxpHK4.wJRfTLapW', 'Mauricio Rodriguez', 'root', 'medio', 'Prueba1'),
	(5, 'juan', '$2y$10$UicEpJiSnveNdr4RaGkv4e8/tKogHGERq6sf1dxpHK4.wJRfTLapW', 'Juanito', 'operador', 'completo', 'Prueba1'),
	(9, 'Mark1', '$2y$10$DcqjYVx.U9ISoo8LlHQraeBWqLJgjUOv.Mi/HuCYjMaczVQblxIbK', 'Mark', 'Supervisor', 'Completo', 'Prueba1'),
	(10, 'Mark11', '$2y$10$wVAqH/X2Svti2EupQkR4P.icDQyhMHCtbwuDEE0RX2MJ2A6Vz50JW', 'maa', 'Supervisor', 'Matutino', 'Prueba1'),
	(11, 'Mark', '$2y$10$iT/NmpbIelegqmJTQxRGKehKAAn6eDX7EZ31LU4IftODkSPoFXiKy', 'qqq', 'Mensajero', 'Matutino', 'Prueba2'),
	(12, 'Mark', '$2y$10$RZBWHXch82AorPrmCGqaNeMMgHwKGNO2mq55cngNtOWYZaSPUdBgy', '11', 'Supervisor', 'Matutino', 'Prueba2'),
	(13, 'Mark', '$2y$10$kKKsUNlJrWxHhAGn0fAlZe8IwAhBHqP5Cg1nzDr5147jg9vQcAfyS', 'q', 'Mensajero', 'Matutino', 'Prueba1'),
	(14, 'Mark', '$2y$10$EP4ZCb.j9w3i1FonOeX3Ou1ElasNdm8/SLQ5je4QDevnpsywG6SNa', '11', 'Consulta', 'Matutino', 'Prueba2'),
	(15, 'Mark', '$2y$10$nGjC0dld/4LDWdI3d8kvMewQMHvuFSIBJfwrMG647MoSHiEV5mlNu', 'undefined', 'Supervisor', 'Vespertino', 'Prueba1'),
	(16, 'Mark', '$2y$10$QwlxrqT/dfopgctSaRJKwO2TxXXn4gaayG62slnk1DAg5VYUUtaCy', '11', 'Mensajero', 'Completo', 'Prueba2'),
	(17, 'Mark', '$2y$10$eXrnSyN1Falp.vC4uUxTlOekQ5sm3quUZTsk07enJ3fOm71F0spga', 'a', 'Consulta', 'Matutino', 'Prueba1');

-- Volcando estructura para tabla veryauto.usuariostemporales
CREATE TABLE IF NOT EXISTS `usuariostemporales` (
  `idusuariosTemporales` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(45) DEFAULT NULL,
  `contrasena` varchar(45) DEFAULT NULL,
  `fechaDeCreacion` datetime DEFAULT NULL,
  PRIMARY KEY (`idusuariosTemporales`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla veryauto.usuariostemporales: ~3 rows (aproximadamente)
DELETE FROM `usuariostemporales`;
INSERT INTO `usuariostemporales` (`idusuariosTemporales`, `usuario`, `contrasena`, `fechaDeCreacion`) VALUES
	(17, 'hola', 'td3ttaf01u', '2022-12-20 08:08:31'),
	(30, 'SIN42129149', 'bhpsfdfn03', '2022-12-20 08:24:55'),
	(34, 'SIN042129318-003', '0sst54uk10', '2022-12-21 09:01:47');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
