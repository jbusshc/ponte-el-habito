document.getElementById('register-rule-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Evitar el envío tradicional del formulario

  const ruleName = document.getElementById('rule-name').value;
  const ruleType = document.getElementById('rule-type').value;
  const habitList = $('#habit-list').val();

  console.log(ruleName);
  console.log(ruleType);
  console.log(habitList);
  

  const data = {
      ruleName,
      ruleType,
      habitList
  }; 

  fetch('/crear-regla', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          alert('Regla creada con éxito');
          window.location.href = '/gestor-regla'; // Redirigir al gestor de regla
      } else {
          alert('Hubo un problema al crear el regla: ' + data.error);
      }
  })
  .catch(error => console.error('Error:', error));
});

document.getElementById('btn-back').addEventListener('click', function() {
  window.location.href = '/gestor-regla';  // Redirigir a la página deseada
});
