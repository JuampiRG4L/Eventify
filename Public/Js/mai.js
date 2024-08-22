let next = document.querySelector('.carousel-next');
let prev = document.querySelector('.carousel-prev');

next.addEventListener('click', function() {
    let items = document.querySelectorAll('.carousel-item');
   document.querySelector('.carousel-slide').appendChild(items[0]);
});

prev.addEventListener('click', function() {
    let items = document.querySelectorAll('.carousel-item');
    document.querySelector('.carousel-slide').prepend(items[items.length - 1]);
});

