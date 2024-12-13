document.addEventListener('DOMContentLoaded', () => {
    // Obtener referencias a los elementos del DOM
    const listaObjetivos = document.getElementById('objective-listbox');
    const habitIdElement = $('#habit-list'); // Usar jQuery para Select2
    const nombreElement = document.getElementById('nuevo-nombre');
    const repeticionesElement = document.getElementById('repeticiones');
    const fechaInicialElement = document.getElementById('fecha-inicial');
    const fechaFinalElement = document.getElementById('fecha-final');
    const acceptButton = document.querySelector('.btn-confirm'); // Asegúrate de que el selector sea correcto
    
    let objetivoId = '';

    // Inicializar Select2
    $('#habit-list').select2({
        placeholder: "Selecciona un hábito",
        allowClear: true
    });

    // Manejar el cambio en el listbox de objetivos
    listaObjetivos.addEventListener('change', function() {
        objetivoId = this.value;
        fetch(`/modificar-objetivo/${objetivoId}/detalles`)
            .then(response => response.json())
            .then(objetivo => {
                console.log('Datos del objetivo:', objetivo); // Verificar los datos del objetivo

                // Actualizar los campos del formulario
                nombreElement.value = objetivo.OBJETIVO_NOM;
                repeticionesElement.value = objetivo.OBJETIVO_REPETICIONES;
                fechaInicialElement.value = objetivo.OBJETIVO_FECHAINI.substring(0, 10);
                fechaFinalElement.value = objetivo.OBJETIVO_FECHAFIN.substring(0, 10);

                // Asegúrate de que el valor seleccionado sea visible
                habitIdElement.val(objetivo.OBJETIVO_IDH).trigger('change');
            })
            .catch(error => console.error('Error:', error));
    });

    // Asegúrate de que el botón existe
    if (!acceptButton) {
        console.error('El botón de aceptación no se encontró.');
        return;
    }

    // Al presionar el botón Aceptar
    acceptButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
        console.log('Formulario enviado'); // Verificar si este mensaje aparece en la consola

        // Obtener los valores actuales de los inputs
        const habitId = habitIdElement.val(); // Usar jQuery para obtener el valor
        const nombre = nombreElement.value;
        const repeticiones = repeticionesElement.value;
        const fechaInicial = fechaInicialElement.value;
        const fechaFinal = fechaFinalElement.value;

        // Validar fechas
        const fechaInicialDate = new Date(fechaInicial);
        const fechaFinalDate = new Date(fechaFinal);

        if (repeticiones < 0 || isNaN(repeticiones)) {
            alert('La cantidad de repeticiones debe ser mayor o igual a 0.');
            return; // Detener el envío del formulario
        }

        if (fechaFinalDate < fechaInicialDate) {
            alert('La fecha final no puede ser anterior a la fecha inicial.');
            return; // Detener la ejecución si la validación falla
        }

        // Crear el objeto de datos
        const data = {
            objectiveId: objetivoId,
            nombre: nombre,
            repeticiones: repeticiones,
            fechaInicial: fechaInicial,
            fechaFinal: fechaFinal,
            habitId: habitId
        };

        // Enviar los datos usando fetch
        fetch(`/modificar-objetivo/${objetivoId}/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            // Manejar la respuesta del servidor
            if (data.success) {
                alert('Objetivo modificado con éxito');
                window.location.href = '/gestor-objetivo'; // Redirigir a la página de gestor de objetivos
            } else {
                alert('Hubo un problema al modificar el objetivo: ' + data.error);
            }
        })
        .catch(error => console.error('Error:', error));
    });
});
