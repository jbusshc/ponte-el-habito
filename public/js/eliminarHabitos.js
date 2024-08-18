document.addEventListener('DOMContentLoaded', () => {
    const habitListbox = document.getElementById('habit-listbox');
    const deleteButton = document.getElementById('delete-button');
    valor = '';
    selectedHabitId = '';
    tipo_habito = '';
    
    // Cuando se selecciona un hábito del listbox
    habitListbox.addEventListener('change', function() {
        valor = this.value;
        [selectedHabitId, tipo_habito] = valor.split(',');
    });

    // Al presionar el botón Aceptar
    deleteButton.addEventListener('click', function() {

        data = {
            id: selectedHabitId,
            tipo: tipo_habito
        };
    
        if (selectedHabitId) {
            fetch(`/eliminar-habito/${selectedHabitId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Hábito eliminado con éxito');
                    window.location.href = '/gestor-habitos'; // Redirigir al gestor de hábitos
                } else {
                    alert('Hubo un problema al eliminar el hábito: ' + data.error);
                }
            })
            .catch(error => console.error('Error:', error));
        } else {
            alert('Por favor, selecciona un hábito para eliminar.');
        }
    });
});