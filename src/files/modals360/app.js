import { setStylesForMediaCopyRight } from "../media_copy_right/js/set_styles_for_media_copy_right.js";
import { setCopyRightTo } from '../media_copy_right/js/set_copytight_to.js';

const parentWindow = window.parent;
const matches = window.matchMedia("(max-width: 800px)").matches;
const matcheMobile = window.matchMedia("(max-width: 1004px)").matches;
const timeDefault = document.body.getAttribute('data-time-default')
const slidesItem = document.querySelectorAll(".modal-center__slider .swiper-slide");
const slidesImg = document.querySelectorAll(".swiper-slide__img");
const openBtns = document.querySelectorAll(".modal-btn__open");
const closeBtns = Array.from(document.querySelectorAll(".modal-btn__close"));
const closeBtnsFirst = document.querySelectorAll(
  ".modals360__btn-arrow"
);
const allSwipers = document.querySelectorAll(".modal-center__slider .swiper");
let swiperSlideTo = [];

const swiperContainer = document.querySelector(".modal-center__slider");

closeBtns.push(...closeBtnsFirst);
const slidesLength = slidesItem.length;

const isIpade = window.matchMedia("(max-width:1170px)").matches;

const modal360Active = parentWindow.document.querySelector(".modal360");
const switcherParent = document.querySelector('.modal-center')
const switcher = switcherParent.querySelectorAll('[data-time-btn]')
const switcherSwipers = switcherParent.querySelectorAll('[data-time]')

let timeVal = timeDefault
switcher.forEach((el) => {
  el.addEventListener('click', () => {
    timeVal = el.getAttribute('data-time-btn')
    timeSwitcher(timeVal)
  })
})
function timeSwitcher(time) {
  switcher.forEach((el) => {
    if (el.getAttribute('data-time-btn') == time) {
      el.classList.add('active')
    } else {
      el.classList.remove('active')
    }
  })
  switcherSwipers.forEach(el => {
    if (el.getAttribute('data-time') == time) {
      el.classList.add('active')
    } else {
      el.classList.remove('active')
    }
  })
}
timeSwitcher(timeVal)

// PhotoSphereViewer 360VR
const viewer = new PhotoSphereViewer.Viewer({
  plugins: [PhotoSphereViewer.GyroscopePlugin],
  container: document.querySelector("#viewer"),
  panorama: slidesImg[0].getAttribute("data-src"),
  defaultZoomLvl: 0,
  navbar: [!isIpade ? "zoom" : '', "fullscreen"],
  // navbar: ["zoom", !isIpade ? "" : "fullscreen"],
  minFov: 60,
  posePitch: 2,
  GyroscopePluginConfig: {
    absolutePosition: true,
    moveMode: "smooth",
    touchmove: true,
  },
});

viewer.addEventListener('fullscreen', ({ data }) => {
  document.documentElement.classList.toggle('opened-fullscreen');
  modal360Active.classList.toggle("modal360-fullscreen");

  if (document.body.classList.contains("active-popaps")) {
    modal360Active.classList.toggle("modal360-active");
  }
});

viewer.addEventListener('ready', (e) => {
  setCopyRightTo('.psv-container', true);
  document.body.classList.add("active-modal");
}, { once: true });

const fakeFullscrenn = document.querySelector(".btn-fake");
fakeFullscrenn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 22V17.5C15 15.01 17.01 15 19.5 15H22" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2 15H5.5C7.99 15 9 15.51 9 18V22" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 2V5C8 7.49 7.49 8 5 8H2" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22 9H18.5C16.01 9 15 8.49 15 6V2" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
fakeFullscrenn.addEventListener("click", () => {
  document.body.classList.toggle("fake-fullscreen");
  parentWindow.document.body.classList.toggle('fake-fullscreen');
});


function toggleActiveClass(e) {
  const target = e.target.closest(".modal-center__slider .swiper-slide");

  if (!target) return;

  const swiper = target.closest(".modal-center__slider");

  if (!swiper) return;

  const slides = swiper.querySelectorAll(".modal-center__slider .swiper-slide");

  slides.forEach((slide) => {
    slide.classList.remove("_active");
  });

  target.classList.add("_active");

  const slideImg = target.querySelector(".swiper-slide__img");
  viewer.setPanorama(slideImg.getAttribute("data-src"));
}

swiperContainer.addEventListener("click", toggleActiveClass);

// allSwipers.forEach((swiper) => {
const slides = document.querySelectorAll(".modal-center__slider .swiper-slide");

slides.forEach((slide, index) => {
  slide.classList.remove("_active");
  if (index === 0) {
    slide.classList.add("_active");
  }
});
// });



allSwipers.forEach((swiperContainer, i) => {
  const slidesLength = swiperContainer.querySelectorAll(".modal-center__slider .swiper-slide").length;
  const slidesPrev = switcherSwipers[i]?.querySelector('.swiper-button-prev')
  const slidesNext = switcherSwipers[i]?.querySelector('.swiper-button-next')
  const swiperInstance = new Swiper(swiperContainer, {
    slidesPerView:
      slidesLength === 1
        ? 1
        : slidesLength === 2
          ? 2
          : slidesLength === 3
            ? 3
            : slidesLength === 4
              ? 4
              : 5,
    spaceBetween: 3,
    navigation: {
      nextEl: slidesNext ? slidesNext : '.swiper-button-next',
      prevEl: slidesPrev ? slidesPrev : '.swiper-button-prev',
    },
    breakpoints: {
      0: {
        slidesPerView:
          slidesLength === 1
            ? 1
            : slidesLength === 2
              ? 2
              : slidesLength === 3
                ? 3
                : 3,
      },
      1004: {
        slidesPerView:
          slidesLength === 1
            ? 1
            : slidesLength === 2
              ? 2
              : slidesLength === 3
                ? 3
                : slidesLength === 4
                  ? 4
                  : 5,
      },
    },
  });

  swiperSlideTo.push(swiperInstance);

  if (matcheMobile) {
    allSwipers.forEach(function (swiper) {
      const slidesLength = swiper.querySelectorAll(".modal-center__slider .swiper-slide").length;

      if (slidesLength === 1) {
        swiper.style.width = "100px";
      } else if (slidesLength >= 2 && slidesLength <= 4) {
        swiper.style.width = slidesLength * 80 + slidesLength * 8 + "px";
      } else {
        swiper.style.width = slidesLength * 45 + slidesLength * 4 + "px";
      }
    });
  } else {
    allSwipers.forEach(function (swiper) {
      const slidesLength = swiper.querySelectorAll(".modal-center__slider .swiper-slide").length;

      if (slidesLength === 1) {
        swiper.style.width = "100px";
      } else if (slidesLength >= 2 && slidesLength < 5) {
        swiper.style.width = slidesLength * 85 + slidesLength * 8 + "px";
      } else {
        swiper.style.width = "465px";
      }
    });
  }

});



// openBtns (360, Gallery, Floorplan, Info. BTNS)
openBtns.forEach((openBtn) => {
  openBtn.addEventListener("click", (e) => {
    const modalAttribute = openBtn.getAttribute("data-modal");
    const modalElement = document.getElementById(modalAttribute);

    if (!modalElement) return;

    const isActive = openBtn.classList.contains("active");

    // Закрываем все модальные окна
    closePopup();

    // Если текущая кнопка не была активной, открываем её модальное окно
    if (!isActive) {
      openBtn.classList.add("active");
      modalElement.classList.add("active");
      document.body.classList.add("active-popaps");

      modal360Active.classList.add("modal360-active");
    }
  });
});

closeBtns.forEach((closeBtn) => {
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closePopup();
  });
});

function closePopup() {
  document.querySelectorAll(".modal.active").forEach((modal) => {
    modal.classList.remove("active");
  });

  openBtns.forEach((openBtn) => {
    openBtn.classList.remove("active");
  });

  document.body.classList.remove("active-popaps");
  modal360Active.classList.remove("modal360-active");
}


setTimeout(() => {
  window.addEventListener('click', (e) => {
    if (e.target.closest('.gallery__btn')) {
      parentWindow.document.body.classList.add("close__modal-btn");
    }
  })
}, 500);



// FancyBox
if (document.querySelector(".modal360__switcher-fancy")) {
  const switcherFancy = document.querySelector('.modal360__switcher-fancy')
  const switcherFancyBg = document.querySelector('.modal360__fancy-bg')
  const btns = switcherFancy.querySelectorAll('.modal360__switcher-wrap')
  const btnsTrigger = switcherFancy.querySelectorAll('.modal360__switcher-trigger')
  switcherFancy.classList.add('hide')
  btns.forEach((btn, i) => {
    if (btnsTrigger[i].getAttribute('data-time-fancy') == timeDefault) {
      btn.classList.add('active')
    }
    btn.addEventListener('click', () => {
      btns.forEach(el => {
        el.classList.remove('active')
        el.disabled = true
      })
      btn.classList.add('active')
      const closeBtn = document.querySelector('[data-fancybox-close]')
      closeBtn.click()
      setTimeout(() => {
        btns.forEach(el => {
          el.disabled = false
        })
      }, 500);
    })
  })
  const closeBtns = {
    day: false,
    night: false,
    sunrise: false
  }

  Fancybox.bind('[data-fancybox="gallery-day"]', {
    Hash: false,
    on: {
      close: () => {
        setTimeout(() => {
          if (!closeBtns.day && !closeBtns.night && !closeBtns.sunrise) {
            parentWindow.document.body.classList.remove("close__modal-btn");
            switcherFancyBg.classList.remove('show')
            btnsTrigger.forEach((item, j) => {
              if (item.getAttribute('data-time-fancy') == timeDefault) {
                btns[j].classList.add('active')
              } else {
                btns[j].classList.remove('active')
              }
            })
          }
        }, 200);
        closeBtns.day = false
        switcherFancy.classList.add('hide')
      },
      initLayout: (fancybox) => {
        switcherFancy.classList.remove('hide')
        switcherFancyBg.classList.add('show')
        closeBtns.day = true

        if (fancybox.userSlides.length === 1) {
          const thumbContainer = document.createElement('div');
          thumbContainer.className = 'f-thumbs fancybox__thumbs is-modern is-ltr is-horizontal';
          thumbContainer.innerHTML = `
                  <div class="f-thumbs__viewport" style="display: flex; align-items: center; justify-content: center;">
                      <div class="f-thumbs__track">
                          <div class="f-thumbs__slide for-image is-nav-selected" style="width: 100%; transform: translate3D(0,0,0);">
                              <button class="f-thumbs__slide__button" style="clip-path: none;">
                                  <img class="f-thumbs__slide__img" alt="" loading="lazy" src="${fancybox.userSlides[0].src}">
                              </button>
                          </div>
                      </div>
                  </div>`;
          // fancybox.container.appendChild(thumbContainer);

          const footerElement = fancybox.container.querySelector('.fancybox__footer');

          if (footerElement) {
            fancybox.container.insertBefore(thumbContainer, footerElement);
          } else {
            fancybox.container.appendChild(thumbContainer);
          }
        }
      },
      ready: () => {
        setTimeout(() => {
          setCopyRightTo(".fancybox__footer", false)
        }, 500);
      }
    },
  });

  Fancybox.bind('[data-fancybox="gallery-sunrise"]', {
    Hash: false,
    on: {
      close: () => {
        switcherFancy.classList.add('hide')
        setTimeout(() => {
          if (!closeBtns.day && !closeBtns.night && !closeBtns.sunrise) {
            parentWindow.document.body.classList.remove("close__modal-btn");
            switcherFancyBg.classList.remove('show')
            btnsTrigger.forEach((item, j) => {
              if (item.getAttribute('data-time-fancy') == timeDefault) {
                btns[j].classList.add('active')
              } else {
                btns[j].classList.remove('active')
              }
            })
          }
        }, 200);
        closeBtns.sunrise = false
      },
      initLayout: (fancybox) => {
        switcherFancy.classList.remove('hide')
        switcherFancyBg.classList.add('show')
        closeBtns.sunrise = true

        if (fancybox.userSlides.length === 1) {
          const thumbContainer = document.createElement('div');
          thumbContainer.className = 'f-thumbs fancybox__thumbs is-modern is-ltr is-horizontal';
          thumbContainer.innerHTML = `
                  <div class="f-thumbs__viewport" style="display: flex; align-items: center; justify-content: center;">
                      <div class="f-thumbs__track">
                          <div class="f-thumbs__slide for-image is-nav-selected" style="width: 100%; transform: translate3D(0,0,0);">
                              <button class="f-thumbs__slide__button" style="clip-path: none;">
                                  <img class="f-thumbs__slide__img" alt="" loading="lazy" src="${fancybox.userSlides[0].src}">
                              </button>
                          </div>
                      </div>
                  </div>`;
          // fancybox.container.appendChild(thumbContainer);

          const footerElement = fancybox.container.querySelector('.fancybox__footer');

          if (footerElement) {
            fancybox.container.insertBefore(thumbContainer, footerElement);
          } else {
            fancybox.container.appendChild(thumbContainer);
          }
        }
      },
      ready: () => {
        setTimeout(() => {
          setCopyRightTo(".fancybox__footer", false)
        }, 500);
      }
    },
  });

  Fancybox.bind('[data-fancybox="gallery-night"]', {
    Hash: false,
    on: {
      close: () => {
        switcherFancy.classList.add('hide')
        setTimeout(() => {
          if (!closeBtns.day && !closeBtns.night && !closeBtns.sunrise) {
            parentWindow.document.body.classList.remove("close__modal-btn");
            switcherFancyBg.classList.remove('show')

            btnsTrigger.forEach((item, j) => {
              if (item.getAttribute('data-time-fancy') == timeDefault) {
                btns[j].classList.add('active')
              } else {
                btns[j].classList.remove('active')
              }
            })
          }
        }, 200);
        closeBtns.night = false
      },
      initLayout: (fancybox) => {
        switcherFancy.classList.remove('hide')
        switcherFancyBg.classList.add('show')
        closeBtns.night = true

        if (fancybox.userSlides.length === 1) {
          const thumbContainer = document.createElement('div');
          thumbContainer.className = 'f-thumbs fancybox__thumbs is-modern is-ltr is-horizontal';
          thumbContainer.innerHTML = `
                  <div class="f-thumbs__viewport" style="display: flex; align-items: center; justify-content: center;">
                      <div class="f-thumbs__track">
                          <div class="f-thumbs__slide for-image is-nav-selected" style="width: 100%; transform: translate3D(0,0,0);">
                              <button class="f-thumbs__slide__button" style="clip-path: none;">
                                  <img class="f-thumbs__slide__img" alt="" loading="lazy" src="${fancybox.userSlides[0].src}">
                              </button>
                          </div>
                      </div>
                  </div>`;
          // fancybox.container.appendChild(thumbContainer);

          const footerElement = fancybox.container.querySelector('.fancybox__footer');

          if (footerElement) {
            fancybox.container.insertBefore(thumbContainer, footerElement);
          } else {
            fancybox.container.appendChild(thumbContainer);
          }
        }
      },
      ready: () => {
        setTimeout(() => {
          setCopyRightTo(".fancybox__footer", false)
        }, 500);
      }

    },
  });

}

Fancybox.bind('[data-fancybox="gallery"]', {
  Hash: false,
  on: {
    close: () => {
      parentWindow.document.body.classList.remove("close__modal-btn");
    },
    initLayout: () => {
      setCopyRightTo(".fancybox__footer", false);
    },

  },
});

Fancybox.bind('[data-fancybox="view"]', {
  Hash: false,
  Thumbs: {
    autoStart: true,
  },
  on: {
    close: () => {
      parentWindow.document.body.classList.remove("close__modal-btn");
    },
    initLayout: (fancybox) => {
      setCopyRightTo(".fancybox__footer", false);
      document.querySelector('.fancybox__container').classList.add('view')
      // document.querySelectorAll("button.f-thumbs_slide__button").forEach((button, index) => {
      //   if (fancybox.userSlides[index] && fancybox.userSlides[index].caption) {
      //     button.setAttribute("data-caption", fancybox.userSlides[index].caption);
      //   }
      // });
      // fancybox.userSlides.forEach((item, i) => {
      //   console.log(item);
      //   if (item.caption) {
      //     let captionDiv = document.createElement("div");
      //     captionDiv.className = "custom-caption";
      //     captionDiv.textContent = item.caption;
      //     item.thumbEl.setAttribute("aria-label", item.caption);
      //     // thumb[i].appendChild(captionDiv);
      //   }
      // })
    },
  },
});

(function floorSwipe() {
  var tabPanes = document.querySelectorAll(".floorplan__tab-body");

  tabPanes.forEach(function (tabPane) {
    var sliderElements = tabPane.querySelectorAll(
      ".floorplan__swiper-main .swiper"
    );
    var thumbElements = tabPane.querySelectorAll(
      ".floorplan__swiper-thumb .swiper"
    );

    sliderElements.forEach(function (slider) {
      var swiperBig = new Swiper(slider, {
        spaceBetween: 10,
        slidesPerView: "auto",
        pagination: {
          el: ".floorplan__swiper-pagination.swiper-pagination",
          clickable: true,
        },
      });

      thumbElements.forEach(function (thumbSlider) {
        var swiperThumbMob = new Swiper(thumbSlider, {
          slidesPerView: "auto",
          freeMode: true,
          spaceBetween: 10,
          watchSlidesProgress: true,
          allowTouchMove: false,
          effect: "fade",
        });

        swiperBig.controller.control = swiperThumbMob;
        swiperThumbMob.controller.control = swiperBig;
      });
    });
  });

  // Добавляем обработчик события на переключение табов
  // var tabLinks = document.querySelectorAll(".floorplan__tab-link");
  // tabLinks.forEach(function (tabLink) {
  //   tabLink.addEventListener("click", function () {
  //     // Задержка для переинициализации swiperThumbMob после переключения табов
  //     setTimeout(function () {
  //       tabPanes.forEach(function (tabPane) {
  //         var thumbElements = tabPane.querySelectorAll(
  //           ".floorplan__swiper-thumb .swiper"
  //         );
  //         thumbElements.forEach(function (thumbSlider) {
  //           var swiperThumbMob = new Swiper(thumbSlider, {
  //             slidesPerView: "auto",
  //             freeMode: true,
  //             spaceBetween: 10,
  //             watchSlidesProgress: true,
  //             allowTouchMove: false,
  //             effect: "fade",
  //           });
  //         });
  //       });
  //     }); // Задержка в миллисекундах
  //   });
  // });
})();

import { floorplanTab } from "./script/floorplanTabs.js";
floorplanTab();
setStylesForMediaCopyRight();