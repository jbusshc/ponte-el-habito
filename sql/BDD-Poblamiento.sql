INSERT INTO THABITO (THABITO_NOM) VALUES
('Cuantitativo'),
('Binario');

INSERT INTO `HABITO` (`HABITO_ID`, `HABITO_NOM`, `HABITO_IDT`) VALUES
(1, 'Estudiar horas de inglés', 1),
(2, 'Leer páginas hábitos atómicos', 1),
(3, 'Leer páginas El hábito hace al monje', 1),
(4, 'Estudiar para PEP 3 Fundamentos', 2),
(5, 'No fumar', 2),
(6, 'Trotar kilómetros', 1),
(7, 'Preparar la presentación de Ing. de Software II', 2);

INSERT INTO `HABITOCUA` (`HABITOCUA_TIPOLIM`, `HABITOCUA_CANTIDAD`, `HABITOCUA_IDH`) VALUES
('>=', 1, 1),
('=', 30, 2),
('>=', 50, 3),
('<=', 10, 6);

INSERT INTO `HISTORIALPROD` (`HISTORIALPROD_FECHA`, `HISTORIALPROD_COMPLETADA`, `HISTORIALPROD_IDR`) VALUES
('2024-08-25', 'S', 1),
('2024-08-25', 'S', 2),
('2024-08-25', 'S', 3);

INSERT INTO `OBJETIVO` (`OBJETIVO_ID`, `OBJETIVO_NOM`, `OBJETIVO_IDH`, `OBJETIVO_FECHAINI`, `OBJETIVO_FECHAFIN`, `OBJETIVO_REPETICIONES`) VALUES
(1, 'Preparar la maratón 42k', 6, '2024-08-25', '2024-09-25', 10),
(2, 'Pasar Fundamentos I', 4, '2024-08-25', '2024-08-28', 7);

INSERT INTO `REGACTIVIDAD` (`REGACTIVIDAD_ID`, `REGACTIVIDAD_FECHA`, `REGACTIVIDAD_CANTIDAD`, `REGACTIVIDAD_IDH`) VALUES
(1, '2024-08-25', 2, 1),
(2, '2024-08-25', 30, 2),
(3, '2024-08-25', 50, 3),
(4, '2024-08-25', 1, 7),
(5, '2024-08-25', 1, 4),
(6, '2024-08-25', 5, 6),
(7, '2024-08-25', 1, 5);

INSERT INTO `REGLA` (`REGLA_ID`, `REGLA_NOM`, `REGLA_TIPO`, `REGLA_ESTADO`) VALUES
(1, 'Lectura', 'OB', 'A'),
(2, 'Estudio', 'OP', 'A'),
(3, 'Vida sana', 'OB', 'A');

INSERT INTO `REGLAHABITO` (`REGLAHABITO_IDR`, `REGLAHABITO_IDH`) VALUES
(1, 2),
(1, 3),
(2, 1),
(2, 4),
(2, 7),
(3, 5),
(3, 6);