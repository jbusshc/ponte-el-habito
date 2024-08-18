document.getElementById('habit-type').addEventListener('change', function() {
    const habitType = this.value;
    const textbox1 = document.getElementById('textbox1');
    const listbox = document.getElementById('listbox');

    if (habitType === 'quantitative') {
        textbox1.style.display = 'block';
        listbox.style.display = 'block';
    } else {
        textbox1.style.display = 'none';
        listbox.style.display = 'none'; 
    }
});

document.getElementById('register-habit-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío tradicional del formulario

    const habitName = document.getElementById('habit-name').value;
    const habitType = document.getElementById('habit-type').value;
    const cantidad = document.getElementById('textbox1').value;
    const tipolim = document.getElementById('listbox').value;

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
            window.location.href = '/'; // Redirigir al gestor de hábitos
        } else {
            alert('Hubo un problema al crear el hábito: ' + data.error);
        }
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('btn-back').addEventListener('click', function() {
    window.location.href = '/gestor-habitos';  // Redirigir a la página deseada
});
