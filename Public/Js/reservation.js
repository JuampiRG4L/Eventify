document.addEventListener('DOMContentLoaded', function() {
    const reservasContainer = document.getElementById('reservas-container');

    // Simulación de datos
    const user = /* Cuando inicie sesion */ null; 
    const reservas = /*  para obtener reservas, */ []; 

    if (!user) {
        // Caso 1: Usuario no ha iniciado sesión
        reservasContainer.innerHTML = `
            <div class="alert">
                <p>Por favor <a href="/login">inicia sesión</a> para ver tus reservas.</p>
            </div>
        `;
    } else if (reservas.length === 0) {
        // Caso 2: Usuario ha iniciado sesión pero no tiene reservas
        reservasContainer.innerHTML = `
            <div class="alert">
                <p>No tienes ninguna reserva en este momento.</p>
            </div>
        `;
    } else {
        // Caso 3: Usuario ha iniciado sesión y tiene reservas
        let reservasHTML = '<p>Aquí están tus reservas:</p><ul>';
        reservas.forEach(function(reserva) {
            reservasHTML += `
                <li>
                    <strong>Salón:</strong> ${reserva.salon} <br>
                    <strong>Fecha:</strong> ${reserva.fecha} <br>
                    <strong>Hora:</strong> ${reserva.hora}
                </li>
            `;
        });
        reservasHTML += '</ul>';
        reservasContainer.innerHTML = reservasHTML;
    }
});
