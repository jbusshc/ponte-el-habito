class vistaModificarRegla {
    constructor() {}

   //Render vista Modificar Regla
    render(res, reglas, habitos) {
        res.render('htmlModificarRegla',{ 
            titulo: 'Modificar Reglas',
            reglas: reglas,
            habitos: habitos
        });
    }

    //render Error
    ErrorRender(res, message){
        res.status(500).render('error', {
            titulo: 'Error', 
            message: message
        });
    }
}

module.exports = new vistaModificarRegla();