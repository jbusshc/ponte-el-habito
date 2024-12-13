-- phpMyAdmin SQL Dump
-- version 5.2.1deb1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 26-08-2024 a las 03:39:03
-- Versión del servidor: 10.11.6-MariaDB-0+deb12u1
-- Versión de PHP: 8.2.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ponteelhabito`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `HABITO`
--

CREATE TABLE `HABITO` (
  `HABITO_ID` int(10) UNSIGNED NOT NULL,
  `HABITO_NOM` varchar(50) NOT NULL,
  `HABITO_IDT` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `HABITO`
--

INSERT INTO `HABITO` (`HABITO_ID`, `HABITO_NOM`, `HABITO_IDT`) VALUES
(1, 'Estudiar horas de inglés', 1),
(2, 'Leer páginas hábitos atómicos', 1),
(3, 'Leer páginas El hábito hace al monje', 1),
(4, 'Estudiar para PEP 3 Fundamentos', 2),
(5, 'No fumar', 2),
(6, 'Trotar kilómetros', 1),
(7, 'Preparar la presentación de Ing. de Software II', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `HABITOCUA`
--

CREATE TABLE `HABITOCUA` (
  `HABITOCUA_TIPOLIM` varchar(2) NOT NULL,
  `HABITOCUA_CANTIDAD` smallint(5) UNSIGNED NOT NULL,
  `HABITOCUA_IDH` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `HABITOCUA`
--

INSERT INTO `HABITOCUA` (`HABITOCUA_TIPOLIM`, `HABITOCUA_CANTIDAD`, `HABITOCUA_IDH`) VALUES
('>=', 1, 1),
('=', 30, 2),
('>=', 50, 3),
('<=', 10, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `HISTORIALPROD`
--

CREATE TABLE `HISTORIALPROD` (
  `HISTORIALPROD_FECHA` date NOT NULL,
  `HISTORIALPROD_COMPLETADA` char(1) NOT NULL,
  `HISTORIALPROD_IDR` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `HISTORIALPROD`
--

INSERT INTO `HISTORIALPROD` (`HISTORIALPROD_FECHA`, `HISTORIALPROD_COMPLETADA`, `HISTORIALPROD_IDR`) VALUES
('2024-08-25', 'S', 1),
('2024-08-25', 'S', 2),
('2024-08-25', 'S', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `OBJETIVO`
--

CREATE TABLE `OBJETIVO` (
  `OBJETIVO_ID` int(10) UNSIGNED NOT NULL,
  `OBJETIVO_NOM` varchar(50) NOT NULL,
  `OBJETIVO_IDH` int(10) UNSIGNED NOT NULL,
  `OBJETIVO_FECHAINI` date NOT NULL,
  `OBJETIVO_FECHAFIN` date NOT NULL,
  `OBJETIVO_REPETICIONES` smallint(5) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `OBJETIVO`
--

INSERT INTO `OBJETIVO` (`OBJETIVO_ID`, `OBJETIVO_NOM`, `OBJETIVO_IDH`, `OBJETIVO_FECHAINI`, `OBJETIVO_FECHAFIN`, `OBJETIVO_REPETICIONES`) VALUES
(1, 'Preparar la maratón 42k', 6, '2024-08-25', '2024-09-25', 10),
(2, 'Pasar Fundamentos I', 4, '2024-08-25', '2024-08-28', 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `REGACTIVIDAD`
--

CREATE TABLE `REGACTIVIDAD` (
  `REGACTIVIDAD_ID` int(10) UNSIGNED NOT NULL,
  `REGACTIVIDAD_FECHA` date NOT NULL,
  `REGACTIVIDAD_CANTIDAD` float NOT NULL,
  `REGACTIVIDAD_IDH` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `REGACTIVIDAD`
--

INSERT INTO `REGACTIVIDAD` (`REGACTIVIDAD_ID`, `REGACTIVIDAD_FECHA`, `REGACTIVIDAD_CANTIDAD`, `REGACTIVIDAD_IDH`) VALUES
(1, '2024-08-25', 2, 1),
(2, '2024-08-25', 30, 2),
(3, '2024-08-25', 50, 3),
(4, '2024-08-25', 1, 7),
(5, '2024-08-25', 1, 4),
(6, '2024-08-25', 5, 6),
(7, '2024-08-25', 1, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `REGLA`
--

CREATE TABLE `REGLA` (
  `REGLA_ID` int(10) UNSIGNED NOT NULL,
  `REGLA_NOM` varchar(50) NOT NULL,
  `REGLA_TIPO` char(2) NOT NULL,
  `REGLA_ESTADO` char(1) DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `REGLA`
--

INSERT INTO `REGLA` (`REGLA_ID`, `REGLA_NOM`, `REGLA_TIPO`, `REGLA_ESTADO`) VALUES
(1, 'Lectura', 'OB', 'A'),
(2, 'Estudio', 'OP', 'A'),
(3, 'Vida sana', 'OB', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `REGLAHABITO`
--

CREATE TABLE `REGLAHABITO` (
  `REGLAHABITO_IDR` int(10) UNSIGNED NOT NULL,
  `REGLAHABITO_IDH` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `REGLAHABITO`
--

INSERT INTO `REGLAHABITO` (`REGLAHABITO_IDR`, `REGLAHABITO_IDH`) VALUES
(1, 2),
(1, 3),
(2, 1),
(2, 4),
(2, 7),
(3, 5),
(3, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `THABITO`
--

CREATE TABLE `THABITO` (
  `THABITO_ID` int(10) UNSIGNED NOT NULL,
  `THABITO_NOM` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `THABITO`
--

INSERT INTO `THABITO` (`THABITO_ID`, `THABITO_NOM`) VALUES
(1, 'Cuantitativo'),
(2, 'Binario');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `HABITO`
--
ALTER TABLE `HABITO`
  ADD PRIMARY KEY (`HABITO_ID`),
  ADD KEY `HABITO_IDT` (`HABITO_IDT`);

--
-- Indices de la tabla `HABITOCUA`
--
ALTER TABLE `HABITOCUA`
  ADD PRIMARY KEY (`HABITOCUA_IDH`);

--
-- Indices de la tabla `HISTORIALPROD`
--
ALTER TABLE `HISTORIALPROD`
  ADD PRIMARY KEY (`HISTORIALPROD_IDR`,`HISTORIALPROD_FECHA`);

--
-- Indices de la tabla `OBJETIVO`
--
ALTER TABLE `OBJETIVO`
  ADD PRIMARY KEY (`OBJETIVO_ID`),
  ADD KEY `OBJETIVO_IDH` (`OBJETIVO_IDH`);

--
-- Indices de la tabla `REGACTIVIDAD`
--
ALTER TABLE `REGACTIVIDAD`
  ADD PRIMARY KEY (`REGACTIVIDAD_ID`),
  ADD KEY `REGACTIVIDAD_IDH` (`REGACTIVIDAD_IDH`);

--
-- Indices de la tabla `REGLA`
--
ALTER TABLE `REGLA`
  ADD PRIMARY KEY (`REGLA_ID`);

--
-- Indices de la tabla `REGLAHABITO`
--
ALTER TABLE `REGLAHABITO`
  ADD PRIMARY KEY (`REGLAHABITO_IDR`,`REGLAHABITO_IDH`),
  ADD KEY `REGLAHABITO_IDH` (`REGLAHABITO_IDH`);

--
-- Indices de la tabla `THABITO`
--
ALTER TABLE `THABITO`
  ADD PRIMARY KEY (`THABITO_ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `HABITO`
--
ALTER TABLE `HABITO`
  MODIFY `HABITO_ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `OBJETIVO`
--
ALTER TABLE `OBJETIVO`
  MODIFY `OBJETIVO_ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `REGACTIVIDAD`
--
ALTER TABLE `REGACTIVIDAD`
  MODIFY `REGACTIVIDAD_ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `REGLA`
--
ALTER TABLE `REGLA`
  MODIFY `REGLA_ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `THABITO`
--
ALTER TABLE `THABITO`
  MODIFY `THABITO_ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `HABITO`
--
ALTER TABLE `HABITO`
  ADD CONSTRAINT `HABITO_ibfk_1` FOREIGN KEY (`HABITO_IDT`) REFERENCES `THABITO` (`THABITO_ID`);

--
-- Filtros para la tabla `HABITOCUA`
--
ALTER TABLE `HABITOCUA`
  ADD CONSTRAINT `HABITOCUA_ibfk_1` FOREIGN KEY (`HABITOCUA_IDH`) REFERENCES `HABITO` (`HABITO_ID`);

--
-- Filtros para la tabla `HISTORIALPROD`
--
ALTER TABLE `HISTORIALPROD`
  ADD CONSTRAINT `HISTORIALPROD_ibfk_1` FOREIGN KEY (`HISTORIALPROD_IDR`) REFERENCES `REGLA` (`REGLA_ID`);

--
-- Filtros para la tabla `OBJETIVO`
--
ALTER TABLE `OBJETIVO`
  ADD CONSTRAINT `OBJETIVO_ibfk_1` FOREIGN KEY (`OBJETIVO_IDH`) REFERENCES `HABITO` (`HABITO_ID`);

--
-- Filtros para la tabla `REGACTIVIDAD`
--
ALTER TABLE `REGACTIVIDAD`
  ADD CONSTRAINT `REGACTIVIDAD_ibfk_1` FOREIGN KEY (`REGACTIVIDAD_IDH`) REFERENCES `HABITO` (`HABITO_ID`);

--
-- Filtros para la tabla `REGLAHABITO`
--
ALTER TABLE `REGLAHABITO`
  ADD CONSTRAINT `REGLAHABITO_ibfk_1` FOREIGN KEY (`REGLAHABITO_IDR`) REFERENCES `REGLA` (`REGLA_ID`),
  ADD CONSTRAINT `REGLAHABITO_ibfk_2` FOREIGN KEY (`REGLAHABITO_IDH`) REFERENCES `HABITO` (`HABITO_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;