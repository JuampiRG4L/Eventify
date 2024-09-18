document.getElementById('paymentForm').addEventListener('submit', function(event) {
    const horaInicio = document.getElementById('horaInicio').value;
    const horaFin = document.getElementById('horaFin').value;
    const errorMessage = document.getElementById('error-message');

    if (horaInicio && horaFin) {
      const startTime = new Date(`1970-01-01T${horaInicio}:00`);
      const endTime = new Date(`1970-01-01T${horaFin}:00`);
      
      // Ajustar el final del tiempo para el caso en que la horaFin sea menor a horaInicio
      if (endTime < startTime) {
        endTime.setDate(endTime.getDate() + 1);
      }

      const duration = (endTime - startTime) / (1000 * 60 * 60); // duración en horas

      if (duration < 4) {
        event.preventDefault(); // Detener el envío del formulario
        errorMessage.style.display = 'block'; // Mostrar mensaje de error
      } else {
        errorMessage.style.display = 'none'; // Ocultar mensaje de error
      }
    }
  });