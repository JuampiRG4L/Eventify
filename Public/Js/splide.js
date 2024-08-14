document.addEventListener('DOMContentLoaded', function () {
  var splide = new Splide('.splide', {
      type: 'loop',
      perPage: 3,
      perMove: 1,
      interval: 4000,
      autoplay: true,
      pagination: false,
      arrows: false,
  });

  splide.mount();
});
