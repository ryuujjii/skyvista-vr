const isIpade = window.matchMedia("(max-width:1170px)").matches;
isIpade;
const parentWindow = window.parent;


Fancybox.bind('[data-fancybox=""]', {
  Toolbar: {
    display: {
      middle: [
        "zoomIn",
        "zoomOut",
        "toggle1to1",
        "rotateCCW",
        "rotateCW",
        "close",
      ],
      right: [],
    },
  },
});

// setTimeout(() => {
//   document.querySelector('[data-modal="floorplanModal"').click()
// }, 500);


// const switchers = document.querySelectorAll('.floorplan__switch-btn')
// const switchersContent = document.querySelectorAll('.floorplan__swiper-main')

// console.log(document.querySelector(`#twod`));

// switchers.forEach(btn => {
//   btn.addEventListener('click', () => {
//     // remove Active Class
//     switchers.forEach(removeBtn => removeBtn.classList.remove('active'))
//     switchersContent.forEach(removeContent => removeContent.classList.remove('active'))

//     let id = btn.getAttribute('data-switch')
//     btn.classList.add('active')

//     document.querySelector(`#${id}`).classList.add('active')

//   })
// });


