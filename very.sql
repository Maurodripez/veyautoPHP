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
  `fkCitas` int(11) DEFAULT NULL,
  `title` varchar(450) CHARACTER SET utf8mb4 DEFAULT NULL,
  `start` varchar(45) CHARACTER SET utf8mb4 DEFAULT NULL,
  `end` varchar(45) CHARACTER SET utf8mb4 DEFAULT NULL,
  `infoAdicional` varchar(45) CHARACTER SET utf8mb4 DEFAULT NULL,
  `operador` varchar(45) CHARACTER SET utf8mb4 DEFAULT NULL,
  `folio` varchar(450) CHARACTER SET utf8mb4 DEFAULT NULL,
  `equipo` varchar(450) CHARACTER SET utf8mb4 DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `mostrar` tinyint(4) DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla veryauto.citas: ~6 rows (aproximadamente)
DELETE FROM `citas`;
INSERT INTO `citas` (`id`, `fkCitas`, `title`, `start`, `end`, `infoAdicional`, `operador`, `folio`, `equipo`, `fecha`, `mostrar`) VALUES
	(41, 27, 'cita creada', '2023-01-11 09:00:00', '2023-01-11 10:00:00', 'qwerty', 'Mauricio Rodriguez', 'K000001', 'Mauricio Rodriguez', '2023-01-11', 1),
	(42, 28, 'la segunda creada', '2023-01-11 09:00:00', '2023-01-11 10:00:00', 'werwrewr', 'Mauricio Rodriguez', 'K000002', 'Mauricio Rodriguez', '2023-01-11', 1),
	(43, 29, 'prueba', '2023-01-11 11:00:00', '2023-01-11 12:00:00', 'la informacion necesaria', 'Mauricio Rodriguez', 'K000003', 'Mauricio Rodriguez', '2023-01-11', 1),
	(44, 30, 'ninguno hoy2222', '2023-01-11 09:00:00', '2023-01-11 10:00:00', 'veremos si haty titulo', 'Mauricio Rodriguez', 'K000004', 'Mauricio Rodriguez', '2023-01-11', 1),
	(45, 31, 'primera cita', '2023-01-12 13:00:00', '2023-01-12 15:00:00', 'por ahora nada', 'Mauricio Rodriguez', 'K000005', 'Mauricio Rodriguez', '2023-01-12', 1),
	(51, 35, 'asdd', '2023-01-24 09:00:00', '2023-01-24 10:00:00', 'adasd', 'Mauricio Rodriguez', 'K000009', 'Mauricio Rodriguez', '2023-01-24', 1);

-- Volcando estructura para tabla veryauto.folios
CREATE TABLE IF NOT EXISTS `folios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `folio` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `fechacarga` date DEFAULT current_timestamp(),
  `fechaAsignacion` date DEFAULT NULL,
  `fechaVigencia` date DEFAULT current_timestamp(),
  `poliza` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `fechaEntrega` date DEFAULT current_timestamp(),
  `asegurado` varchar(450) COLLATE utf8_spanish_ci DEFAULT NULL,
  `celular` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `telCasa` varchar(45) COLLATE utf8_spanish_ci DEFAULT 'N/D',
  `correo` varchar(450) COLLATE utf8_spanish_ci DEFAULT NULL,
  `marcaTipo` varchar(450) COLLATE utf8_spanish_ci DEFAULT 'N/D',
  `placas` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `numSerie` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `domicilio` varchar(450) COLLATE utf8_spanish_ci DEFAULT NULL,
  `colonia` varchar(450) COLLATE utf8_spanish_ci DEFAULT NULL,
  `cp` varchar(10) COLLATE utf8_spanish_ci DEFAULT 'N/D',
  `alcaldia` varchar(450) COLLATE utf8_spanish_ci DEFAULT 'N/D',
  `estado` varchar(450) COLLATE utf8_spanish_ci DEFAULT NULL,
  `verificador` varchar(450) COLLATE utf8_spanish_ci DEFAULT NULL,
  `equipo` varchar(450) COLLATE utf8_spanish_ci NOT NULL,
  `fkHistorialCargas` int(11) DEFAULT NULL,
  `fechaSeguimiento` date DEFAULT current_timestamp(),
  `situacion` varchar(100) COLLATE utf8_spanish_ci DEFAULT 'NUEVO',
  `comentSeguimiento` varchar(450) COLLATE utf8_spanish_ci DEFAULT 'PENDIENTE',
  `tipo` varchar(400) COLLATE utf8_spanish_ci DEFAULT 'BANCOMER',
  `estacion` varchar(450) COLLATE utf8_spanish_ci DEFAULT 'NUEVO',
  `clasificacion` varchar(450) COLLATE utf8_spanish_ci DEFAULT 'NUEVO',
  `del` varchar(450) COLLATE utf8_spanish_ci DEFAULT 'N/D',
  `telOficina` varchar(450) COLLATE utf8_spanish_ci DEFAULT 'N/D',
  `modelo` varchar(450) COLLATE utf8_spanish_ci DEFAULT 'N/D',
  `mostrar` tinyint(4) DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `fkHistorialCargas` (`fkHistorialCargas`),
  CONSTRAINT `fkHistorialCargas` FOREIGN KEY (`fkHistorialCargas`) REFERENCES `historialcargas` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla veryauto.folios: ~12 rows (aproximadamente)
DELETE FROM `folios`;
INSERT INTO `folios` (`id`, `folio`, `fechacarga`, `fechaAsignacion`, `fechaVigencia`, `poliza`, `fechaEntrega`, `asegurado`, `celular`, `telCasa`, `correo`, `marcaTipo`, `placas`, `numSerie`, `domicilio`, `colonia`, `cp`, `alcaldia`, `estado`, `verificador`, `equipo`, `fkHistorialCargas`, `fechaSeguimiento`, `situacion`, `comentSeguimiento`, `tipo`, `estacion`, `clasificacion`, `del`, `telOficina`, `modelo`, `mostrar`) VALUES
	(27, ' K000001', '2023-01-01', '2021-01-24', '2023-01-09', 'P000001', '2023-01-09', 'Ejemplo asegurado', '5500000044', '11', 'noemail@dominio.com', 'N/D', 'eje placas', 'eje serie2', 'Eje Calle', 'Eje Colonia', 'N/D', 'N/D', 'Eje Ciudad', 'Especialista', 'Mauricio Rodriguez', 8, '2023-01-10', 'NUEVO', 'PENDIENTE', 'BANCOMER', 'NUEVO', 'NUEVO', 'N/D', '11wqeeq', 'N/Dq11', 1),
	(28, 'K000002', '2023-01-09', '2022-01-24', '2023-01-09', 'P000001', '2023-01-09', 'Ejemplo asegurado', '5500000044', 'N/D', 'noemail@dominio.com', 'N/D', 'eje placas', 'eje serie', 'Eje Calle', 'Eje Colonia', 'N/D', 'N/D', 'Eje Ciudad', 'Especialista', 'Mauricio Rodriguez', 8, '2023-01-10', 'NUEVO', 'PENDIENTE', 'BANCOMER', 'NUEVO', 'NUEVO', 'N/D', 'N/D', 'N/D', 1),
	(29, 'K000003', '2022-12-30', '2021-01-24', '2023-01-10', 'P000001', '2023-01-10', 'Ejemplo asegurado', '5500000044', 'N/D', 'noemail@dominio.com', 'N/D', 'eje placas', 'eje serie', 'Eje Calle', 'Eje Colonia', 'N/D', 'N/D', 'Eje Ciudad', 'Especialista', 'Mauricio Rodriguez', 9, '2023-01-10', 'NUEVO', 'PENDIENTE', 'BANCOMER', 'NUEVO', 'NUEVO', 'N/D', 'N/D', 'N/D', 1),
	(30, 'K000004', '2023-01-10', '2022-01-24', '2023-01-10', 'P000001', '2023-01-10', 'Ejemplo asegurado', '5500000044', 'N/D', 'noemail@dominio.com', 'N/D', 'eje placas', 'eje serie', 'Eje Calle', 'Eje Colonia', 'N/D', 'N/D', 'Eje Ciudad', 'Especialista', 'Mauricio Rodriguez', 9, '2023-01-10', 'NUEVO', 'PENDIENTE', 'BANCOMER', 'NUEVO', 'NUEVO', 'N/D', 'N/D', 'N/D', 1),
	(31, 'K000005', '2023-01-05', '2021-01-24', '2023-01-10', 'P000001', '2023-01-10', 'Ejemplo asegurado', '5500000044', 'N/D', 'noemail@dominio.com', 'N/D', 'eje placas', 'eje serie', 'Eje Calle', 'Eje Colonia', 'N/D', 'N/D', 'Eje Ciudad', 'Especialista', 'Mauricio Rodriguez', 10, '2023-01-10', 'NUEVO', 'PENDIENTE', 'BANCOMER', 'NUEVO', 'NUEVO', 'N/D', 'N/D', 'N/D', 1),
	(32, 'K000006', '2023-01-10', '2022-01-24', '2023-01-10', 'P000001', '2023-01-10', 'Ejemplo asegurado', '5500000044', 'N/D', 'noemail@dominio.com', 'N/D', 'eje placas', 'eje serie', 'Eje Calle', 'Eje Colonia', 'N/D', 'N/D', 'Eje Ciudad', 'Especialista', 'Mauricio Rodriguez', 10, '2023-01-10', 'NUEVO', 'PENDIENTE', 'BANCOMER', 'NUEVO', 'NUEVO', 'N/D', 'N/D', 'N/D', 1),
	(33, 'K000007', '2023-01-10', '2021-01-24', '2023-01-10', 'P000001', '2023-01-10', 'Ejemplo asegurado', '5500000044', 'N/D', 'noemail@dominio.com', 'N/D', 'eje placas', 'eje serie', 'Eje Calle', 'Eje Colonia', 'N/D', 'N/D', 'Eje Ciudad', 'Especialista', 'Mauricio Rodriguez', 11, '2023-01-10', 'NUEVO', 'PENDIENTE', 'BANCOMER', 'NUEVO', 'NUEVO', 'N/D', 'N/D', 'N/D', 1),
	(34, 'K000008', '2023-01-10', '2022-01-24', '2023-01-10', 'P000001', '2023-01-10', 'Ejemplo asegurado', '5500000044', 'N/D', 'noemail@dominio.com', 'N/D', 'eje placas', 'eje serie', 'Eje Calle', 'Eje Colonia', 'N/D', 'N/D', 'Eje Ciudad', 'Especialista', 'Mauricio Rodriguez', 11, '2023-01-10', 'NUEVO', 'PENDIENTE', 'BANCOMER', 'NUEVO', 'NUEVO', 'N/D', 'N/D', 'N/D', 1),
	(35, 'K000009', '2023-01-12', '2021-01-24', '2023-01-12', 'P000001', '2023-01-12', 'Ejemplo asegurado', '5500000044', 'N/D', 'noemail@dominio.com', 'N/D', 'eje placas', 'eje serie', 'Eje Calle', 'Eje Colonia', 'eje cp', 'N/D', 'eje estado', 'Especialista', 'Mauricio Rodriguez', 20, '2023-01-12', 'NUEVO', 'PENDIENTE', 'BANCOMER', 'NUEVO', 'NUEVO', 'eje del', 'N/D', 'N/D', 1),
	(36, 'K000010', '2023-01-12', '2022-01-24', '2023-01-12', 'P000001', '2023-01-12', 'Ejemplo asegurado', '5500000044', 'N/D', 'noemail@dominio.com', 'N/D', 'eje placas', 'eje serie', 'Eje Calle', 'Eje Colonia', 'eje cp', 'N/D', 'eje estado', 'Especialista', 'Mauricio Rodriguez', 20, '2023-01-12', 'NUEVO', 'PENDIENTE', 'BANCOMER', 'NUEVO', 'NUEVO', 'eje del', 'N/D', 'N/D', 1),
	(37, 'K000011', '2023-01-12', '2021-01-24', '2023-01-12', 'P000001', '2023-01-12', 'Ejemplo asegurado', '5500000044', 'N/D', 'noemail@dominio.com', 'N/D', 'eje placas', 'eje serie', 'Eje Calle', 'Eje Colonia', 'eje cp', 'N/D', 'eje estado', 'Especialista', 'Mauricio Rodriguez', 21, '2023-01-12', 'NUEVO', 'PENDIENTE', 'BANCOMER', 'NUEVO', 'NUEVO', 'eje del', 'N/D', 'N/D', 1),
	(38, 'K000012', '2023-01-12', '2022-01-24', '2023-01-12', 'P000001', '2023-01-12', 'Ejemplo asegurado', '5500000044', 'N/D', 'noemail@dominio.com', 'N/D', 'eje placas', 'eje serie', 'Eje Calle', 'Eje Colonia', 'eje cp', 'N/D', 'eje estado', 'Especialista', 'mario', 21, '2023-01-12', 'NUEVO', 'PENDIENTE', 'BANCOMER', 'NUEVO', 'NUEVO', 'eje del', 'N/D', 'N/D', 1);

-- Volcando estructura para tabla veryauto.historialcargas
CREATE TABLE IF NOT EXISTS `historialcargas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fechasDeCargas` datetime DEFAULT NULL,
  `cantidadFolios` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla veryauto.historialcargas: ~14 rows (aproximadamente)
DELETE FROM `historialcargas`;
INSERT INTO `historialcargas` (`id`, `fechasDeCargas`, `cantidadFolios`) VALUES
	(8, '2023-01-09 11:49:39', 2),
	(9, '2023-01-10 09:01:19', 2),
	(10, '2023-01-10 09:11:33', 2),
	(11, '2023-01-10 09:12:53', 2),
	(12, '2023-01-12 09:06:29', 2),
	(13, '2023-01-12 09:08:25', 2),
	(14, '2023-01-12 09:10:17', 2),
	(15, '2023-01-12 09:12:10', 2),
	(16, '2023-01-12 09:13:00', 2),
	(17, '2023-01-12 09:17:27', 2),
	(18, '2023-01-12 09:17:30', 2),
	(19, '2023-01-12 09:17:58', 2),
	(20, '2023-01-12 09:19:16', 2),
	(21, '2023-01-12 11:32:00', 2);

-- Volcando estructura para tabla veryauto.seguimiento
CREATE TABLE IF NOT EXISTS `seguimiento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(405) DEFAULT NULL,
  `fechaSeguimiento` date DEFAULT NULL,
  `hora` time DEFAULT NULL,
  `estatus` varchar(450) DEFAULT NULL,
  `comentarios` varchar(450) DEFAULT 'Ninguno',
  `situacion` varchar(450) DEFAULT NULL,
  `estacion` varchar(450) DEFAULT NULL,
  `clasificacion` varchar(450) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla veryauto.seguimiento: ~0 rows (aproximadamente)
DELETE FROM `seguimiento`;
INSERT INTO `seguimiento` (`id`, `usuario`, `fechaSeguimiento`, `hora`, `estatus`, `comentarios`, `situacion`, `estacion`, `clasificacion`) VALUES
	(1, 'Mario', '2023-01-09', '13:25:19', 'we', 'www', NULL, NULL, NULL);

-- Volcando estructura para tabla veryauto.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(450) DEFAULT NULL,
  `password` varchar(500) DEFAULT NULL,
  `nombre` varchar(450) DEFAULT NULL,
  `turno` varchar(45) DEFAULT NULL,
  `equipo` varchar(45) DEFAULT NULL,
  `Supervisor` varchar(2) DEFAULT 'No',
  `Mensajero` varchar(2) DEFAULT 'No',
  `Consulta` varchar(2) DEFAULT 'No',
  `Teamleader` varchar(2) DEFAULT 'No',
  `Operador` varchar(2) DEFAULT 'No',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla veryauto.usuarios: ~3 rows (aproximadamente)
DELETE FROM `usuarios`;
INSERT INTO `usuarios` (`id`, `usuario`, `password`, `nombre`, `turno`, `equipo`, `Supervisor`, `Mensajero`, `Consulta`, `Teamleader`, `Operador`) VALUES
	(3, 'admin', '$2y$10$sQF.SCHYhcFH.MSW5GTYTOK8.HtGja..XsemT./blq0SDJvIBEYuy', 'Mauricio Rodriguez', 'Matutino', 'Mauricio Rodriguez', 'Si', 'Si', 'Si', 'Si', 'Si'),
	(49, 'admin2', '$2y$10$bdoYJCQJs0Ojb5nmhqUVsOCyhUfMdzI3mSuBoCC.G6JrH6Ag08BG2', 'mario', 'Completo', 'mario', 'Si', 'Si', 'Si', 'Si', 'Si'),
	(53, 'sdad', '$2y$10$aixSk05xoMVgznmSpAO9T.Vpr7NoGbmuI0aN/YGMYsdIopnlwdnZW', 'asdads', 'Completo', 'General', 'Si', 'No', 'No', 'No', 'No');

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
