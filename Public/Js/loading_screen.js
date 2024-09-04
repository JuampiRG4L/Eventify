document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const body = document.body;

    window.addEventListener('load', function() {
        setTimeout(function() {
            loadingScreen.style.opacity = '0';
            setTimeout(function() {
                loadingScreen.style.display = 'none';
                body.classList.remove('hidden');
            }, 300);
        }, 400);
    });

    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            loadingScreen.style.display = 'flex';
            loadingScreen.style.opacity = '1';
            body.classList.add('hidden');
        });
    });

    window.addEventListener('beforeunload', function() {
        loadingScreen.style.display = 'flex';
        loadingScreen.style.opacity = '1';
        body.classList.add('hidden');
    });
});