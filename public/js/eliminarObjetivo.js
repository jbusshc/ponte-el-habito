document.addEventListener('DOMContentLoaded', () => {
    const habitListbox = document.getElementById('objetivo-listbox');
    const deleteButton = document.getElementById('delete-button');
    selectedObjetivoId = '';
    
    // Cuando se selecciona un objetivo del listbox
    habitListbox.addEventListener('change', function() {
        selectedObjetivoId = this.value;
    });

    // Al presionar el botón Aceptar
    deleteButton.addEventListener('click', function() {
        console.log('Botón eliminar presionado'); // Añade esta línea para depuración

        data = {
            id: selectedObjetivoId,
        };
    
        if (selectedObjetivoId) {
            fetch(`/eliminar-objetivo/${selectedObjetivoId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Objetivo eliminado con éxito');
                    window.location.href = '/gestor-objetivo'; // Redirigir al gestor de objetivos
                } else {
                    alert('Hubo un problema al eliminar el objetivo: ' + data.error);
                }
            })
            .catch(error => console.error('Error:', error));
        } else {
            alert('Por favor, selecciona un objetivo para eliminar.');
        }
    });
});