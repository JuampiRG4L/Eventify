document.addEventListener('DOMContentLoaded', function() {
    const perfilButton = document.getElementById('perfilButton');
    const perfilMenu = document.getElementById('perfilMenu');

    perfilButton.addEventListener('click', function() {
        perfilMenu.classList.toggle('show');
    });

    // Cierra el menú si se hace clic fuera de él
    document.addEventListener('click', function(event) {
        if (!perfilButton.contains(event.target) && !perfilMenu.contains(event.target)) {
            perfilMenu.classList.remove('show');
        }
    });
});

// Función para cerrar sesión (ajusta según tu lógica de cierre de sesión)
function cerrarSesion() {
    // Lógica para cerrar sesión
    window.location.href = '/logout'; // Cambia esta URL según tu ruta de cierre de sesión
}
