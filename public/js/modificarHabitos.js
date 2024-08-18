document.addEventListener('DOMContentLoaded', () => {
    const habitListbox = document.getElementById('habit-listbox');
    const nuevo_nombre = document.getElementById('nuevo-nombre');
    const cantidad = document.getElementById('cantidad');
    const tipolim = document.getElementById('tipolim');
    const acceptButton = document.getElementById('accept-button');
    valor = '';
    selectedHabitId = '';
    tipo_habito = '';
    
    // Cuando se selecciona un hábito del listbox
    habitListbox.addEventListener('change', function() {
        valor = this.value;
        [selectedHabitId, tipo_habito] = valor.split(',');

        nuevo_nombre.style.display = 'block';

        if(tipo_habito == 1){

            cantidad.style.display = 'block';
            tipolim.style.display = 'block';

        }

        if(tipo_habito == 2){

            cantidad.style.display = 'none';
            tipolim.style.display = 'none';

        }

    });

    // Al presionar el botón Aceptar
    acceptButton.addEventListener('click', function() {
        
        const nombre = nuevo_nombre.value;
        const cantidadValue = cantidad.value;
        const tipolimValue = tipolim.value;

        let data;

        if(tipo_habito == 1){

            data = {
                id: selectedHabitId,
                nombre: nombre,
                tipo: tipo_habito,
                cantidad: cantidadValue,
                tipolim: tipolimValue
            };
            
        }else{

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
        .catch(error => console.error('Error:', error))
        .then((response) => console.log("Success: ", response));
    });

    // Botón para volver atrás
    document.getElementById('btn-back').addEventListener('click', function() {
        window.location.href = '/gestor-habitos'; // Redirigir a la página de gestor de hábitos
    });
});
