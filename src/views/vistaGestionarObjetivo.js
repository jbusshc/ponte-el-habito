document.getElementById('objetivo-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const tiempo = document.getElementById('objetivo-tiempo').value;
    const repeticiones = document.getElementById('objetivo-repeticiones').value;

    // Realizar una petición POST para guardar el objetivo
    fetch('/guardar-objetivo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tiempo, repeticiones }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Recargar la página o actualizar la tabla de objetivos
            location.reload();
        } else {
            alert('Error al guardar el objetivo');
        }
    })
    .catch(error => console.error('Error:', error));
});
