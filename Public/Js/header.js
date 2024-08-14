document.addEventListener("DOMContentLoaded", function() {
    const menu = document.getElementById('menu');
    let lastScrollTop = 0;
    const sticky = menu.offsetTop;

    function handleScroll() {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > sticky) {
            menu.classList.add('sticky');
            menu.classList.add('scrolled');
        } else {
            menu.classList.remove('sticky');
            menu.classList.remove('scrolled');
        }

        if (currentScroll > lastScrollTop) {
            // Desplazamiento hacia abajo
            if (currentScroll > sticky) {
                menu.classList.add('hidden');
            }
        } else {
            // Desplazamiento hacia arriba
            menu.classList.remove('hidden');
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }
    window.addEventListener('scroll', handleScroll);
});