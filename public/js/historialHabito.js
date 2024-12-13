document.getElementById('habit-listbox').addEventListener('change', function() {
    const habitId = this.value;
    const url = `/historial-habito/${habitId}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('activity-table-container');
            let tableHtml = `
                <table>
                    <thead>
                        <tr>
                            <th>Nombre del hábito</th>
                            <th>Fecha</th>`;

            if (data.actividades && data.actividades.length > 0) {
                if (data.actividades[0].HABITO_IDT == 1) {
                    tableHtml += `<th>Cantidad</th>`;
                } else if (data.actividades[0].HABITO_IDT == 2) {
                    tableHtml += `<th>Logrado</th>`;
                }
            } else {
                tableHtml += `<th>Cantidad/Logrado</th>`;
            }

            tableHtml += `</tr></thead><tbody>`;

            if (data.actividades && data.actividades.length > 0) {
                data.actividades.forEach(activity => {
                    // Format the date here
                    const fechaFormateada = new Date(activity.REGACTIVIDAD_FECHA).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    });

                    let cantidadOrLogrado = activity.REGACTIVIDAD_CANTIDAD;

                    tableHtml += `
                        <tr>
                            <td>${activity.HABITO_NOM}</td>
                            <td>${fechaFormateada}</td>
                            <td>${cantidadOrLogrado}</td>
                        </tr>`;
                });
            } else {
                tableHtml += `
                    <tr>
                        <td colspan="3" style="text-align: center;">No hay registros de actividades para este hábito.</td>
                    </tr>`;
            }

            tableHtml += `
                    </tbody>
                </table>`;

            container.innerHTML = tableHtml;
        })
        .catch(error => {
            console.error('Error al obtener las actividades:', error);
            document.getElementById('activity-table-container').innerHTML = '<p>Error al obtener las actividades.</p>';
        });
});
