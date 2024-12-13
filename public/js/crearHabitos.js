const cantidadE = document.getElementById('cantidad');
const tipolimE = document.getElementById('tipolim');

document.getElementById('habit-type').addEventListener('change', function() {
    const habitType = this.value;

    if (habitType === 'quantitative') {
        cantidadE.style.display = 'block';
        tipolimE.style.display = 'block';
        cantidadE.setAttribute('required', 'required');
        tipolimE.setAttribute('required', 'required');
    } else {
        cantidadE.style.display = 'none';
        tipolimE.style.display = 'none'; 
        cantidadE.removeAttribute('required');
        tipolimE.removeAttribute('required');
    }
});

document.getElementById('register-habit-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío tradicional del formulario

    const habitName = document.getElementById('habit-name').value;
    const habitType = document.getElementById('habit-type').value;
    const cantidad = cantidadE.value;
    const tipolim = tipolimE.value;

    const errorMessageElement = document.getElementById('error-message');
    
    // Limpiar mensaje de error previo
    if (errorMessageElement) {
        errorMessageElement.textContent = '';
    }

    // Validar cantidad
    if (habitType === 'quantitative' && (cantidad < 0 || isNaN(cantidad))) {
        // Mostrar mensaje de error
        if (errorMessageElement) {
            errorMessageElement.textContent = 'La cantidad debe ser mayor o igual a 0.\n';
        }
        return; // Detener el envío del formulario
    }

    const data = {
        habitName,
        habitType,
        cantidad,
        tipolim
    }; 

    fetch('/crear-habitos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Hábito creado con éxito');
            window.location.href = '/gestor-habitos'; // Redirigir al gestor de hábitos
        } else {
            alert('Hubo un problema al crear el hábito: ' + data.error);
        }
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('btn-back').addEventListener('click', function() {
    window.location.href = '/gestor-habitos';  // Redirigir a la página deseada
});