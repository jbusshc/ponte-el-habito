const habitListbox = document.getElementById('habitoId');
const habito_cuantitativo = document.getElementById('habito-cuantitativo');
const habito_binario = document.getElementById('habito-binario');
valor = '';
selectedHabitId = '';
tipo_habito = '';

habitListbox.addEventListener('change', function() {
    valor = this.value;
    [selectedHabitId, tipo_habito] = valor.split(',');
    
    if(tipo_habito == 1){
        habito_binario.style.display = 'none';
        habito_cuantitativo.style.display = 'block';
        document.getElementById('binario').removeAttribute('required');
        document.getElementById('cantidad').setAttribute('required', 'required');
    }else{
        habito_cuantitativo.style.display = 'none';
        habito_binario.style.display = 'block';
        document.getElementById('cantidad').removeAttribute('required');
        document.getElementById('binario').setAttribute('required', 'required');
    }

});

document.getElementById('register-activity-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    const fecha = document.getElementById('fecha').value; 

    if(tipo_habito == 1){
        
        const cantidad = document.getElementById('cantidad').value;

        if (cantidad < 0 || isNaN(cantidad)) {
            // Mostrar mensaje de error
            if (errorMessageElement) {
                errorMessageElement.textContent = 'La cantidad debe ser mayor o igual a 0.\n';
            }
            return; // Detener el envío del formulario
        }
    
        data = {
            fecha: fecha,
            habitoId: selectedHabitId,
            cantidad: cantidad
        };

    }else{
        const binario = document.getElementById('binario').value;
        data = {
            fecha: fecha,
            habitoId: selectedHabitId,
            cantidad: binario
        };
    }

    fetch('/registrar-actividad', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Actividad registrada con éxito.');
            window.location.href = '/'; // Redirigir a la página de inicio u otra página
        } else {
            alert('Error al registrar la actividad: ' + data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al registrar la actividad.');
    });
});
