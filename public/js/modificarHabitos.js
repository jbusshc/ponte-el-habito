document.addEventListener('DOMContentLoaded', () => {
    const habitListbox = document.getElementById('habit-listbox');
    const nuevo_nombre = document.getElementById('nuevo-nombre');
    const cantidad = document.getElementById('cantidad');
    const tipolim = document.getElementById('tipolim');
    const acceptButton = document.getElementById('accept-button');
    let valor = '';
    let selectedHabitId = '';
    let tipo_habito = '';

    // Cuando se selecciona un hábito del listbox
    habitListbox.addEventListener('change', function() {
        valor = this.value;
        [selectedHabitId, tipo_habito] = valor.split(',');

        nuevo_nombre.style.display = 'block';

        // Obtener detalles del hábito seleccionado
        fetch(`/modificar-habito/${selectedHabitId}/detalles?tipo=${tipo_habito}`)
            .then(response => response.json())
            .then(habito => {
                console.log('Datos del hábito:', habito);

                // Ajustar nombres de los campos según el formato recibido
                nuevo_nombre.value = habito.HABITO_NOM || '';
                if (tipo_habito == 1) {
                    cantidad.style.display = 'block';
                    tipolim.style.display = 'block';
                    cantidad.value = habito.HABITOCUA_CANTIDAD || '';
                    tipolim.value = habito.HABITOCUA_TIPOLIM || '';   
                } else {
                    cantidad.style.display = 'none';
                    tipolim.style.display = 'none';
                }
            })
            .catch(error => console.error('Error:', error));
    });

    // Al presionar el botón Aceptar
    acceptButton.addEventListener('click', function() {
        
        const nombre = nuevo_nombre.value;
        const cantidadValue = cantidad.value;
        const tipolimValue = tipolim.value;

        let data;

        const errorMessageElement = document.getElementById('error-message');
    
        // Limpiar mensaje de error previo
        if (errorMessageElement) {
            errorMessageElement.textContent = '';
        }

        if (tipo_habito == 1 && (cantidadValue < 0 || isNaN(cantidadValue))) {
            // Mostrar mensaje de error
            if (errorMessageElement) {
                errorMessageElement.textContent = 'La cantidad debe ser mayor o igual a 0.\n';
            }
            return; // Detener el envío del formulario
        }

        if(tipo_habito == 1){
            data = {
                id: selectedHabitId,
                nombre: nombre,
                tipo: tipo_habito,
                cantidad: cantidadValue,
                tipolim: tipolimValue
            };
        } else {
            data = {
                id: selectedHabitId,
                nombre: nombre,
                tipo: tipo_habito
            };
        }

        fetch(`/modificar-habito/${selectedHabitId}/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Hábito modificado con éxito');
                window.location.href = '/gestor-habitos'; // Redirigir al gestor de hábitos
            } else {
                alert('Hubo un problema al modificar el hábito: ' + data.error);
            }
        })
        .catch(error => console.error('Error:', error));
    });

    // Botón para volver atrás
    document.getElementById('btn-back').addEventListener('click', function() {
        window.location.href = '/gestor-habitos'; // Redirigir a la página de gestor de hábitos
    });
});
