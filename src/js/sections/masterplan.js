import {
  removeClasses,
  mediaQueryMatches,
  isMobileOrTablet,
} from "../modules/functions.js";
export function masterplan() {
  const masterplan = document.querySelector(".masterplan");
  const intro = document.querySelector(".intro");
  const openMaster = gsap.utils.toArray("[data-show36]");
  const backtoMain = gsap.utils.toArray("[backto-main]");
  const toggleTextsIntro = gsap.utils.toArray("[data-toggle-visible]");
  const hoverDots = gsap.utils.toArray(".masterplan__dot--hover");
  // const masterplanPreview = document.querySelector(".masterplan__preview");
  // const masterplanVideo = document.querySelector(".masterplan__preview video");
  if (!isMobileOrTablet()) {
    hoverDots.forEach((hover) => {
      hover.addEventListener("mouseover", () => {
        masterplan.classList.add("hovered");
      });
      hover.addEventListener("mouseout", (e) => {
        masterplan.classList.remove("hovered");
      });
    });
  }
  // masterplanVideo.load(() => {
  //   masterplanVideo.play();
  // })
  // const masterplanSwipeHand = document.querySelector(".masterplan__swipe-hand");
  function toMasterplan() {
    gsap.to(toggleTextsIntro, {
      yPercent: -50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.2,
      onComplete: function () {
        masterplan.classList.add("_show");
        document.body.classList.add("vr360");
        intro.classList.add("hidden");
        // masterplanPreview.classList.add('hidden')
        // masterplanVideo.pause();
        // masterplanVideo.currentTime = 0;
      },
    });
  }

  function toIntro() {
    gsap.to(toggleTextsIntro, {
      onStart: function () {
        masterplan.classList.remove("_show");
        document.body.classList.remove("vr360");
        intro.classList.remove("hidden");
        // masterplanPreview.classList.remove('hidden')
        // masterplanVideo.play();
      },
      yPercent: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.3,
      delay: 0.4,
    });
  }

  openMaster.forEach((btn) => {
    btn.addEventListener("click", () => {
      toMasterplan();
    });
  });

  backtoMain.forEach((btn) => {
    btn.addEventListener("click", () => {
      toIntro();
    });
  });

  function calculateAspectRatioDesc(height) {
    return (height * 16) / 9;
  }
  function calculateAspectRatioMob(height) {
    return (height * 9) / 16;
  }

  function handleResize() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    let aspectRatioHeight = Number.parseFloat(
      (screenHeight / screenWidth) * 100
    ).toFixed(3);
    let aspectRatioWidth;

    if (!mediaQueryMatches("(max-width: 575.98px)")) {
      aspectRatioWidth = Number.parseFloat(
        (calculateAspectRatioDesc(screenHeight) / screenWidth) * 100
      ).toFixed(3);
      !(aspectRatioHeight > 100)
        ? masterplan.classList.remove("slightly-move-x")
        : masterplan.classList.add("slightly-move-x");
      !(aspectRatioHeight < 53)
        ? masterplan.classList.remove("slightly-move-y")
        : masterplan.classList.add("slightly-move-y");
    } else {
      aspectRatioWidth = Number.parseFloat(
        (calculateAspectRatioMob(screenHeight) / screenWidth) * 100
      ).toFixed(3);
    }

    document.documentElement.style.setProperty(
      "--aspect-ratio",
      aspectRatioHeight
    );
    document.documentElement.style.setProperty(
      "--aspect-ratio-width",
      aspectRatioWidth
    );
  }

  mm.add("(max-width: 1480px)", () => {
    Draggable.create(".masterplan__media", {
      bounds: ".masterplan__wrapper",
      type: "x",
      inertia: true,
    });
  });

  mm.add("(max-width: 991px)", () => {
    gsap.set(".masterplan__media", { xPercent: -10 });
  });

  mm.add("(max-width: 780px)", () => {
    gsap.set(".masterplan__media", { xPercent: -20 });
  });

  mm.add("(max-width: 575px)", () => {
    gsap.set(".masterplan__media", { xPercent: -36 });
  });

  const hand = document.querySelector(".masterplan__draggable-hand");

  hand.addEventListener("click", () => {
    hand.classList.add("hide");
  });
  hand.addEventListener("touchstart", () => {
    hand.classList.add("hide");
  });

  handleResize();
  window.addEventListener("resize", handleResize);

  // Modal 360

  const modalIframe = document.querySelector(".modal360__iframe");
  const modal360 = document.querySelector(".modal360");

  document.addEventListener("click", function (e) {
    const target = e.target;

    if (target.closest("[data-modal360]")) {
      handleDots(target.closest("[data-modal360]"));
    }

    if (!isMobileOrTablet()) {
      if (target.closest(".close-modal360") && !target.closest('.modal360__switcher')) {
        closeModal360();
      }
    }

    if (target.closest(".modal360__close-btn-ico")) {
      closeModal360();
    }

  });

  function handleDots(dot) {
    const path = dot.getAttribute("data-modal360");
    const dotTextTitle = dot.querySelector(".dot-masterplan__text");
    const dotTextNum = dot.querySelector(".dot-masterplan__num");
    const closeTextBtn = document.querySelector(".modal360__close-btn h5");
    const closeTextP = document.querySelector(".modal360__close-btn p");

    modalIframe.innerHTML = `<iframe src="${path}" style="" frameborder="0"></iframe>`;
    closeTextP.innerHTML = dotTextTitle.innerHTML;
    closeTextBtn.innerHTML = dotTextNum?.innerHTML;

    if (
      closeTextBtn.innerHTML === "undefined" ||
      closeTextBtn.innerHTML === ""
    ) {
      closeTextBtn.style.display = "none";
    } else {
      closeTextBtn.style.display = "";
    }

    modal360.classList.add("active");
    modal360.classList.add("shadow");
  }

  function closeModal360() {
    modalIframe.innerHTML = ``;
    modal360.classList.remove("active");
    modal360.classList.remove("shadow");
    modal360.classList.remove("modal360-active");
    document.body.classList.remove("close__modal-btn");
  }
}
