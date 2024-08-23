document.addEventListener('DOMContentLoaded', function() {
    const nombre = document.getElementById('nombre');
    const repeticiones = document.getElementById('repeticiones');
    const fecha_inicial = document.getElementById('fecha-inicial');
    const fecha_final = document.getElementById('fecha-final');
    const formulario =document.getElementById('objetivo-form');

    formulario.addEventListener('submit', function(event) {
        event.preventDefault();

        // Obtener los valores del formulario
        const habit = $('#habit-list').val();
        rep = repeticiones.value;
        f_i = fecha_inicial.value;
        f_f = fecha_final.value;
        nom = nombre.value;

        if (rep < 0 || isNaN(rep)) {
            // Mostrar mensaje de error
            if (errorMessageElement) {
                errorMessageElement.textContent = 'La cantidad de repeticiones debe ser mayor o igual a 0.\n';
            }
            return; // Detener el envío del formulario
        }

        data = {
            habito: habit,
            fecha_ini: f_i,
            fecha_fin: f_f,
            repeticiones: rep,
            nombre: nom
        }

        // Realizar una petición POST para crear el objetivo
        fetch('/crear-objetivo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Objetivo creado con éxito');
                window.location.href = '/gestor-objetivo'; // Redirigir al gestor de objetivos
            } else {
                alert('Error al crear el objetivo');
            }
        })
        .catch(error => console.error('Error:', error));
    });

});