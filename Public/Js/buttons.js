const boton = document.getElementById('verInfo');

boton.addEventListener('click', function() {
    window.location.href = '/sub_halls';
});

const botones = [...document.querySelectorAll('[id="verInfo"]')];

botones.forEach(boton => {
    boton.addEventListener('click', function() {
        window.location.href = '/sub_halls';
    });
});