import { isMobileOrTablet } from "../modules/functions.js";
export function popups() {
  // const popups = gsap.utils.toArray('.popup');
  // const popupCloseBtns = gsap.utils.toArray('[data-close-popup]');
  // const popupOpenBtns = gsap.utils.toArray('[data-open-popup]');

  // document.addEventListener("click", function (e) {
  // 	const target = e.target;
  // 	if (target.closest('[data-open-popup]')) {
  // 		const currentTarget = target.closest('[data-open-popup]');
  // 		const toOpen = currentTarget.getAttribute('data-open-popup').trim();
  // 		document.querySelector(toOpen).classList.toggle('popup-show');
  // 		document.documentElement.classList.toggle('popup-show');
  // 	}
  // });

  // popupCloseBtns.forEach(el => {
  // 	el.addEventListener("click", function (e) {
  // 		const closePopup = el.parentNode.parentNode?.getAttribute('id') || el.parentNode.parentNode.parentNode.getAttribute('id');
  // 		document.querySelector(`#${closePopup}`)?.classList.remove('popup-show');
  // 		// document.querySelector(`#${closePopup}`)?.classList.add('never-show');
  // 		document.documentElement.classList.remove('popup-show');
  // 	});
  // });

  const popupBtns = gsap.utils.toArray("[data-open-popup]");
  const popupCloseBtns = gsap.utils.toArray("[data-close-popup]");
  // const masterplanVideo = document.querySelector(".masterplan__preview video");
  const masterplan = document.querySelector('.masterplan')
  const video = document.getElementById('myVideo');
  function loadVideo(src) {
    video.src = `https://d3b6muno9lbfvx.cloudfront.net/sky-vista-vr/video/${src}`;
    video.load();
    video.play();
    console.log(video);
  }

  let currentModal = null;
  let currentBtn = null;

  popupBtns.forEach((el) => {
    el.addEventListener("click", function (e) {
      const toOpen = el.getAttribute("data-open-popup").trim();
      const newModal = document.querySelector(toOpen);

      if (el === currentBtn) {
        // Toggle: close the currently opened modal
        if (currentModal.classList.contains("popup-show")) {
          currentModal.classList.remove("popup-show");
          document.documentElement.classList.remove("popup-show");
          el.classList.remove("_active");
          currentModal = null;
          currentBtn = null;
          document.body.classList.remove("open-menu");
          // console.log('111');
        } else {
          currentModal.classList.add("popup-show");
          document.documentElement.classList.add("popup-show");
          el.classList.add("_active");
        }
      } else {
        document.body.classList.add(toOpen.slice(1));
        document.body.classList.remove("open-menu");
        newModal.classList.add("popup-show");
        document.documentElement.classList.add("popup-show");
        el.classList.add("_active");
        currentModal = newModal;
        currentBtn = el;
      }

      // if (toOpen == "#popupVideo") {

      const videoSrc = el.getAttribute('data-video')

      //   // video.play()
      loadVideo(videoSrc)
      //   if (!masterplan.classList.contains('_show')) {
      //     masterplanVideo.pause()
      //     masterplanVideo.currentTime = 0
      //   }
      // }

    });
  });

  popupCloseBtns.forEach((el) => {
    el.addEventListener("click", function (e) {
      window.scrollTo(0, 0);

      const closePopup =
        el.parentNode.getAttribute("id") ||
        el.parentNode.parentNode.getAttribute("id") ||
        el.parentNode.parentNode.parentNode.getAttribute("id");
      const modalToClose = document.querySelector(`#${closePopup}`);

      // Close the modal
      modalToClose.classList.remove("popup-show");
      document.documentElement.classList.remove("popup-show");

      // modalToClose.querySelector('[data-open-popup]').classList.remove('_active');
      popupBtns.forEach((btn) => {
        btn.classList.remove("_active");
      });

      document.body.classList.remove(closePopup);

      // Clear the currently opened modal and button if it's the one that's being closed
      if (modalToClose === currentModal) {
        currentModal = null;
        currentBtn = null;
      }

      if (closePopup == "popupVideo") {
        video.pause()
        video.currentTime = 0
        // if (!masterplan.classList.contains('_show')) {
        //   masterplanVideo.play()
        // }
      }

    });
  });

  const mq = window.matchMedia("(max-width: 4000px) and (min-width: 991px)");

  const popupOpenGsap = document.querySelector('[data-open-popup="#popupDeveloper"]');
  // const popupOpenAxGsap = document.querySelector('[data-open-popup="#popupAx"]');

  if (mq.matches) {
    popupOpenGsap.addEventListener('click', function () {
      gsapPopupOpen('#popupDeveloper');
    });
    // popupOpenAxGsap.addEventListener('click', function () {
    //   gsapPopupOpen('#popupAx');
    // });
  }

  const popupCloseGsap = gsap.utils.toArray(".developer-popup [data-close-popup]");
  if (mq.matches) {
    popupCloseGsap.forEach(function (btn) {
      btn.addEventListener('click', function () {
        gsapPopupClose();
      });
    });
  }

  function gsapPopupOpen(parent) {
    let tlPopupShow = gsap.timeline({});
    tlPopupShow.from(`${parent} .developer-popup__img`, {
      yPercent: 0,
      duration: 0.8,
    });
    tlPopupShow.to(`${parent} .developer-popup__img`, {
      scale: 1.1,
      duration: 0.8,
    });

    tlPopupShow.to(`${parent} .developer-popup__img-bg`, {
      opacity: 0,
      duration: 0.8,

    }, "<");

    tlPopupShow.to(`${parent} .developer-popup__img-logo`, {
      opacity: 0,
      duration: 0.8,

    }, "<");

    tlPopupShow.to(`${parent} .developer-popup__content`, {
      clipPath: "inset(0 0 0 0)",
      delay: 0.2,
      duration: 0.7,
    }, "<");

    tlPopupShow.to(`${parent} .developer-popup__content`, {
      backgroundColor: "rgba(0, 0, 0, 0.9)",
    }, "<90%");

    tlPopupShow.to(`${parent} .developer-popup__img`, {
      scale: 1,
    }, "<20%");

    tlPopupShow.to(`${parent} .developer-popup__close`, {
      opacity: 1,
    }, "<");

    tlPopupShow.to(`${parent} .developer-popup__sub h5`, {
      opacity: 1,
      yPercent: -100,
      delay: 0.2,
    }, "<");
    tlPopupShow.to(`${parent} .developer-popup__title h3`, {
      opacity: 1,
      yPercent: -100,
    }, "<");
    tlPopupShow.to(`${parent} .developer-popup__text p`, {
      opacity: 1,
      yPercent: -100,
    }, "<");
    tlPopupShow.to(`${parent} .developer-popup__statis-line`, {
      width: "100%",
    }, "<");
    tlPopupShow.to(`${parent} .developer-popup__statis-item`, {
      opacity: 1,
      yPercent: -100,
    }, "<");
    tlPopupShow.to(".developer-popup__link", {
      opacity: 1,
    }, "<");


    tlPopupShow.to(`${parent} .developer-popup__gradient `, {
      opacity: 1,
    });
  }

  function gsapPopupClose() {
    let tlPopupShow = gsap.timeline({});
    tlPopupShow.from(".developer-popup__img", {
      yPercent: 0,
      duration: 0,
    }, "<");

    tlPopupShow.to(".developer-popup__img-bg", {
      opacity: 1,
      duration: 0,
    }, "<");

    tlPopupShow.to(".developer-popup__img-logo", {
      opacity: 1,
      duration: 0,

    }, "<");

    tlPopupShow.to(".developer-popup__content", {
      clipPath: "inset(15% 2% 15% 2%)",
      backgroundColor: "rgba(0, 0, 0, 0)",
      duration: 0,
    }, "<");

    tlPopupShow.to(".developer-popup__img", {
      scale: 0.6,
    }, "<");

    tlPopupShow.to(".developer-popup__close", {
      opacity: 0,
    }, "<");

    tlPopupShow.to(".developer-popup__sub h5", {
      opacity: 0,
      yPercent: 100,
    }, "<");
    tlPopupShow.to(".developer-popup__title h3", {
      opacity: 0,
      yPercent: 100,
    }, "<");
    tlPopupShow.to(".developer-popup__text p", {
      opacity: 0,
      yPercent: 100,
    }, "<");
    tlPopupShow.to(".developer-popup__statis-line", {
      width: "0",
    }, "<");
    tlPopupShow.to(".developer-popup__statis-item", {
      opacity: 0,
      yPercent: 100,
    }, "<");
    tlPopupShow.to(".developer-popup__link", {
      opacity: 0,
    }, "<");

    tlPopupShow.to(".developer-popup__gradient ", {
      opacity: 0,
    }, "<");
  }
}
