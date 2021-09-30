window.addEventListener('DOMContentLoaded', function () {
  const slider = tns({
    container: '.steps__list',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false,
    center: true,
    edgePadding: 25,
    responsive: {
      680: {
        disable: true,
      },
    },
    rewind: true,
    speed: 500,
  });
});
