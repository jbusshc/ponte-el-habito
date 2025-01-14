CREATE TABLE THABITO(
    THABITO_ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    THABITO_NOM VARCHAR(30) NOT NULL
);

CREATE TABLE HABITO (
    HABITO_ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    HABITO_NOM VARCHAR(50) NOT NULL,
    HABITO_IDT INT UNSIGNED NOT NULL,
    FOREIGN KEY (HABITO_IDT) REFERENCES THABITO(THABITO_ID)
);

CREATE TABLE HABITOCUA (
    HABITOCUA_TIPOLIM VARCHAR(2) NOT NULL, -- '<=' o '>=' o '<' o '>' o '='
    HABITOCUA_CANTIDAD SMALLINT UNSIGNED NOT NULL,
    HABITOCUA_IDH INT UNSIGNED NOT NULL PRIMARY KEY,
    FOREIGN KEY (HABITOCUA_IDH) REFERENCES HABITO(HABITO_ID)
);

CREATE TABLE OBJETIVO (
    OBJETIVO_ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    OBJETIVO_NOM VARCHAR(50) NOT NULL,
    OBJETIVO_IDH INT UNSIGNED NOT NULL,
    OBJETIVO_FECHAINI DATE NOT NULL,
    OBJETIVO_FECHAFIN DATE NOT NULL,
    OBJETIVO_REPETICIONES SMALLINT UNSIGNED NOT NULL,
    FOREIGN KEY (OBJETIVO_IDH) REFERENCES HABITO(HABITO_ID) 
);

CREATE TABLE REGLA (
	REGLA_ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
	REGLA_NOM VARCHAR(50) NOT NULL, 
	REGLA_TIPO CHAR(2) NOT NULL, -- 'OB' o 'OP' (OBLIGATORIA o OPCIONAL)
	REGLA_ESTADO CHAR(1) DEFAULT 'A' -- 'A' o 'I' (ACTIVA o INACTIVA)
);

CREATE TABLE HISTORIALPROD (
    HISTORIALPROD_FECHA DATE NOT NULL,
    HISTORIALPROD_COMPLETADA CHAR(1) NOT NULL, -- 'S' o 'N' (SI O NO)
    HISTORIALPROD_IDR INT UNSIGNED NOT NULL,
    PRIMARY KEY (HISTORIALPROD_IDR, HISTORIALPROD_FECHA),
    FOREIGN KEY (HISTORIALPROD_IDR) REFERENCES REGLA(REGLA_ID)
);

CREATE TABLE REGACTIVIDAD (
    REGACTIVIDAD_ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    REGACTIVIDAD_FECHA DATE NOT NULL,
    REGACTIVIDAD_CANTIDAD FLOAT NOT NULL,
    REGACTIVIDAD_IDH INT UNSIGNED NOT NULL,
    FOREIGN KEY (REGACTIVIDAD_IDH) REFERENCES HABITO(HABITO_ID)
);

CREATE TABLE REGLAHABITO (
    REGLAHABITO_IDR INT UNSIGNED NOT NULL,
    REGLAHABITO_IDH INT UNSIGNED NOT NULL,
    PRIMARY KEY (REGLAHABITO_IDR, REGLAHABITO_IDH),
    FOREIGN KEY (REGLAHABITO_IDR) REFERENCES REGLA(REGLA_ID),
    FOREIGN KEY (REGLAHABITO_IDH) REFERENCES HABITO(HABITO_ID)
);