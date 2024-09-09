var map = L.map('map').setView([6.3130861, -75.5706621], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
}).addTo(map);

L.marker([6.3130861, -75.5706621]).addTo(map)
    .bindPopup('Ubicación del Salón<br>Bello, Antioquía.')
    .openPopup();
