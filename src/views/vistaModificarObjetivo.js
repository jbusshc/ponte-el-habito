class vistaModificarObjetivo {
    constructor() {}

   //Render vista Modificar Objetivo
    render(res, objetivos, habitos) {
        res.render('htmlModificarObjetivo',{ 
            titulo: 'Modificar Objetivos',
            objetivos: objetivos,
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

module.exports = new vistaModificarObjetivo();