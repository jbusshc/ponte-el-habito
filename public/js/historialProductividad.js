document.addEventListener('DOMContentLoaded', () => {

    const regla_id = document.getElementById('rule-listbox');
    const fechaini = document.getElementById('fecha-inicial');
    const fechafin = document.getElementById('fecha-final');
    const acceptButton = document.querySelector('.btn-confirm');

    acceptButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

        const idr = regla_id.value;
        const f_i = fechaini.value;
        const f_f = fechafin.value;

        // Validar fechas
        const fechai = new Date(f_i);
        const fechaf = new Date(f_f);

        const errorMessageElement = document.getElementById('error-message');
    
        // Limpiar mensaje de error previo
        if (errorMessageElement) {
            errorMessageElement.textContent = '';
        }

        // Validar cantidad
        if (fechai > fechaf) {
            // Mostrar mensaje de error
            if (errorMessageElement) {
                errorMessageElement.textContent = 'La fecha inicial debe ser anterior o igual a la fecha final...\n';
            }
            return; // Detener el envío del formulario
        }

        const url = `/historial-productividad/${idr}?fechai=${encodeURIComponent(f_i)}&fechaf=${encodeURIComponent(f_f)}`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('activity-table-container');
            let tableHtml = `
                <table>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Cumplida</th>`;

            tableHtml += `</tr></thead><tbody>`;

            if (data.histprod && data.histprod.length > 0) {
                data.histprod.forEach(histprod => {
                    // Format the date here
                    const fechaFormateada = new Date(histprod.HISTORIALPROD_FECHA).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    });

                    tableHtml += `
                        <tr>
                            <td>${fechaFormateada}</td>
                            <td>${histprod.HISTORIALPROD_COMPLETADA}</td>
                        </tr>`;
                });
            } else {
                tableHtml += `
                    <tr>
                        <td colspan="3" style="text-align: center;">No hay registros de productividad para esta regla.</td>
                    </tr>`;
            }

            tableHtml += `
                    </tbody>
                </table>`;

            container.innerHTML = tableHtml;
        })
        .catch(error => {
            console.error('Error al obtener el historial de productividad:', error);
            document.getElementById('activity-table-container').innerHTML = '<p>Error al obtener el historial de productividad.</p>';
        });

    })

})