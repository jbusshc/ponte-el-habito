document.addEventListener('DOMContentLoaded', () => {
    const listaReglas = document.getElementById('rule-listbox');
    const listaHabitos = $('#habit-list'); // Utiliza jQuery para Select2
    const nuevo_nombre = document.getElementById('nuevo-nombre');
    const tipo_regla = document.getElementById('tipo-regla');
    const estado_regla = document.getElementById('estado-regla');
    const acceptButton = document.querySelector('.btn-confirm'); // Cambiado para seleccionar el botón de confirmar
    const dinamico = document.getElementById('dynamic-elements');
    let reglaId = '';

    $(document).ready(function() {
        $('#habit-list').select2({
            tags: true,
            placeholder: "Selecciona uno o más hábitos",
            allowClear: true
        });
    });

    // Cuando eliges regla debes mostrar el formulario con los hábitos que tiene la regla marcados
    listaReglas.addEventListener('change', function() {
        reglaId = this.value;
        console.log('Regla seleccionada:', reglaId);

        const url = new URL(`/modificar-regla/obtener-habito/${reglaId}`, window.location.origin);

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Datos recibidos:', data); // Verifica la estructura de data
            if (data.success) {
                console.log('Hábitos asociados:', data.habitos); // Verifica los hábitos

                // Seleccionar los hábitos correspondientes
                const habitIds = data.habitos.map(habito => habito.REGLAHABITO_IDH); // Extrae solo los IDs
                listaHabitos.val(habitIds).trigger('change'); // Actualiza la selección
            } else {
                alert('Hubo un problema: ' + data.error);
            }
        })
        .catch(error => console.error('Error:', error));

        dinamico.style.display = 'block';
    });

    // Al presionar el botón Aceptar
    acceptButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

        const nombre = nuevo_nombre.value;
        const tipo = tipo_regla.value;
        const estado = estado_regla.value;
        const habitList = $('#habit-list').val();

        let data = {
            id: reglaId,
            nombre: nombre,
            tipo: tipo,
            habitos: habitList
        };

        fetch(`/modificar-regla/${reglaId}/update`, { // Asegúrate de que la URL coincida
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(response => console.log("Success:", response))
        .catch(error => console.error('Error:', error));
    });

    // Botón para volver atrás
    document.getElementById('btn-back').addEventListener('click', function() {
        window.location.href = '/gestor-regla'; // Redirigir a la página de gestor de hábitos
    });
});