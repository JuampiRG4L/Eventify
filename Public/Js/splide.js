document.addEventListener('DOMContentLoaded', function () {
    var mainCarousel = new Splide('#main-carousel', {
      heightRatio: 0.5,
      pagination: false,
      arrows: false,
      cover: true
    }).mount();
  
    var thumbnailCarousel = new Splide('#thumbnail-carousel', {
      fixedWidth: 150,
      fixedHeight: 160,
      perPage: 4,
      perMove: 1,
      autoplay: true,
      rewind: true,
      rewindSpeed: 1000,
      isNavigation: true,
      arrows: false,
      gap: 10,
      type: 'loop',
      pagination: false,
      cover: true,
      breakpoints: {
        768: {
          fixedWidth: 100,
          fixedHeight: 100,
        },
      },
    }).mount();
  
    mainCarousel.sync(thumbnailCarousel);
});