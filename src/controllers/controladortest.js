const Modelo = require('../models/modelo');

class ControladorCrearHabito{

  constructor(){}

  solicita_crear_habito(p_nom, p_tipo, p_parametro){

    Modelo.habito.crear_habito(p_nom, p_tipo, p_parametro);

  }


}

class ControladorGestionarHabito{

  constructor(){

    this.controlador_crear_habito = new ControladorCrearHabito();

  }

  opcion_crear_habito(p_nom, p_tipo, p_parametro){

    this.controlador_crear_habito.solicita_crear_habito(p_nom, p_tipo, p_parametro);

  }

}

class ControladorPrincipal {

  constructor(){
    this.controlador_gestionar_habito = new ControladorGestionarHabito();
  }

  opcion_gestionar_habito(){

    // Redirigir a gestionar habito mediante la vista.

  }

}

let controlador_gestionar_habito = new ControladorGestionarHabito();

p_nom = 'SEXODURO';
p_tipo = 1;

let p_parametro = {
  tipolim: "=",
  cantidad: 60
};

controlador_gestionar_habito.opcion_crear_habito(p_nom, p_tipo, p_parametro)