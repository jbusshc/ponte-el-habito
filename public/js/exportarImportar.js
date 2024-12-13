document.getElementById('importForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío normal del formulario

    const formData = new FormData(this);

    fetch('/importar', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const resultDiv = document.getElementById('importResult');
        if (data.success) {
            resultDiv.innerHTML = '<p>Importación exitosa.</p>';
        } else {
            resultDiv.innerHTML = `<p>Error: ${data.error}</p>`;
        }
    })
    .catch(error => {
        const resultDiv = document.getElementById('importResult');
        resultDiv.innerHTML = '<p>Error al procesar la solicitud.</p>';
        console.error('Error:', error);
    });
});

document.getElementById('exportForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío normal del formulario

    fetch('/exportar', {
        method: 'POST'
    })
    .then(response => response.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'base_de_datos.json';
        document.body.appendChild(a);
        a.click();
        a.remove();
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
