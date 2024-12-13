document.addEventListener('DOMContentLoaded', () => {
  const listaReglas = document.getElementById('rule-listbox');
  const deleteButton = document.getElementById('delete-button');
  reglaId = '';
  
  // Cuando se selecciona un hábito del listbox
  listaReglas.addEventListener('change', function() {
      reglaId = this.value;
  });

  // Al presionar el botón borrar
  deleteButton.addEventListener('click', function() {

      data = {id: reglaId};
  
      if (reglaId) {
          fetch(`/eliminar-regla/${reglaId}`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
          })
          .then(response => response.json())
          .then(data => {
              if (data.success) {
                  alert('Regla eliminado con éxito');
                  window.location.href = '/gestor-regla'; // Redirigir al gestor de hábitos
              } else {
                  alert('Hubo un problema al eliminar la regla: ' + data.error);
              }
          })
          .catch(error => console.error('Error:', error));
      } else {
          alert('Por favor, selecciona una regla para eliminar.');
      }
  });
});