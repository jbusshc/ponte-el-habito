document.getElementById('habit-listbox').addEventListener('change', function() {
    const habitId = this.value;
    const url = `/historial-habito/${habitId}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.actividades.length > 0) {
                let tableHtml = `
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Fecha</th>
                                <th>Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>`;
                
                data.actividades.forEach(activity => {
                    tableHtml += `
                        <tr>
                            <td>${activity.REGACTIVIDAD_ID}</td>
                            <td>${activity.REGACTIVIDAD_FECHA}</td>
                            <td>${activity.REGACTIVIDAD_CANTIDAD}</td>
                        </tr>`;
                });

                tableHtml += `
                        </tbody>
                    </table>`;

                document.getElementById('activity-table-container').innerHTML = tableHtml;
            } else {
                document.getElementById('activity-table-container').innerHTML = '<p>No se encontraron actividades para este hábito.</p>';
            }
        })
        .catch(error => {
            console.error('Error al obtener las actividades:', error);
            document.getElementById('activity-table-container').innerHTML = '<p>Error al obtener las actividades.</p>';
        });
});
