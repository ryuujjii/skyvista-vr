import {
    isMobileOrTablet,
    isMobile
} from "../modules/functions.js";

export function video() {
    const videoOpenBtn = document.querySelector('.intro__video-btn.mob')
    // const masterplanVideo = document.querySelector('.masterplan__preview video')
    const masterplan = document.querySelector('.masterplan')
    const video = document.getElementById('myVideo');

    function loadVideo(src) {
        video.src = `https://d3b6muno9lbfvx.cloudfront.net/sky-vista-vr/video/${src}`
        video.load();
        video.play();
    }

    videoOpenBtn.addEventListener('click', () => {
        if (isMobile.iOS()) {
            document.body.classList.add('play-video')
        }

        const videoSrc = videoOpenBtn.getAttribute('data-video')

        setTimeout(() => {
            loadVideo(videoSrc)
            // masterplanVideo.pause()
            // masterplanVideo.currentTime = 0
        }, 200);
    })

    if (isMobileOrTablet()) {
        video.addEventListener('webkitendfullscreen', () => {
            document.body.classList.remove('play-video')
            console.log('Плеер Safari закрыт');

            if (!masterplan.classList.contains('_show')) {
                // masterplanVideo.currentTime = 0
                // masterplanVideo.play()
                video.currentTime = 0;
            }
        });

        if (isMobile.iOS()) {
            document.body.classList.add('ios')
        }
    }
}

// const videoPopup = document.querySelector('.video-popup')
// const video = document.querySelector('.video-popup video')

// document.addEventListener('fullscreenchange', () => {
//     if (!document.fullscreenElement) {
//         // console.log('Полноэкранный режим закрыт');
//         // videoPopup.classList.remove()
//     }
// });

// video.addEventListener('webkitendfullscreen', () => {
//     // console.log('Плеер Safari закрыт');
// });
// const masterplan = document.querySelector('.masterplan')

// // Video
// const videoPopup = document.querySelector('.video-popup')
// const video = document.querySelector('.video-popup video')

// // Buttons
// const openVideoBtn = document.querySelector('[data-open-popup="#popupOffer"')
// const closeVideo = videoPopup.querySelector(".close-video");

// // Static Elements
// const videoPauseIcon = document.querySelector(".video-popup__pause");
// const videoShadow = document.querySelector(".video-popup__shadow");

// // Video Controls
// const videoPlayBtn = document.querySelector(".video-popup__play-play");
// const videoPauseBtn = document.querySelector(".video-popup__play-pause");
// const videoActiveLine = document.querySelector(".video-popup__active-line");
// const videoInputRange = document.querySelector(".video-popup__input");

// const soundBtnOn = document.querySelector(".video-popup__sound-on");
// const soundBtnOff = document.querySelector(".video-popup__sound-off");
// const soundInputActive = document.querySelector(".video-popup__sound-active-line");
// const soundInputRange = document.querySelector(".video-popup__sound-input");

// const videoLoaderLine = document.querySelector(
//     ".popup-video__active-line_loader"
// );

// // Video Time Duration
// const durationVideo = 85.866667;
// // console.log(video.duration);

// if (isMobileOrTablet()) {
//     video.removeAttribute('controls')
// }

// //  Status Video
// let isPlaying = false;
// let isOpenVideo = false;
// let onePercentVideo = durationVideo / 100;
// let prevVolume = 20;

// const tl = gsap.timeline();
// tl.to(
//     videoActiveLine,
//     {
//         width: "100%",
//         duration: durationVideo,
//         ease: "none",
//         onComplete: () => {
//             tl.restart();
//             video.currentTime = 0;
//         },
//     },
//     "<"
// );

// tl.pause();
// video.currentTime = 0;
// video.pause();

// const toggleClass = (el, className) => el.classList.toggle(className);
// const addClass = (el, className = "active") => el.classList.add(className);
// const removeClass = (el, className = "active") => el.classList.remove(className);


// // Pause Video Function
// const togglePauseVideo = () => {
//     isPlaying = false;
//     video.pause();
//     tl.pause();
//     addClass(videoPauseIcon)
//     addClass(videoShadow)
//     addClass(videoPlayBtn)
//     removeClass(videoPauseBtn)
// }

// // PLAY Video Function
// const togglePlayVideo = () => {
//     isPlaying = true;
//     tl.play();
//     video.play();
//     removeClass(videoPauseIcon)
//     removeClass(videoShadow)
//     removeClass(videoPlayBtn)
//     addClass(videoPauseBtn)
// }

// // OPEN & Play - Video
// window.addEventListener("click", (e) => {
//     if (e.target.closest('[data-open-popup="#popupVideo"]')) {
//         isOpenVideo = true;
//         isPlaying = true
//         tl.play();
//         tl.progress(0);
//         video.currentTime = 0;
//         video.play();

//         // Hide bg shadow and Pause icon before opening
//         removeClass(videoPauseIcon)
//         removeClass(videoShadow)
//     }
// });


// // CLOSE & Pause - Video
// closeVideo.addEventListener("click", () => {
//     video.pause();
//     video.currentTime = 0;
//     video.pause();
//     isPlaying = false;
//     isOpenVideo = false;
//     tl.progress(0);
//     tl.pause();

//     // Hide bg shadow and Pause icon before closing
//     removeClass(videoPauseIcon)
//     removeClass(videoShadow)
// });

// // TOGGLE Video
// video.addEventListener('click', () => {
//     if (isPlaying) {
//         togglePauseVideo()
//     } else {
//         togglePlayVideo()
//     }
// })

// videoPauseBtn.addEventListener('click', () => {
//     togglePauseVideo()
// })

// videoPlayBtn.addEventListener('click', () => {
//     togglePlayVideo()
// })

// // Change Time Video
// videoInputRange.addEventListener("input", () => {

//     const value = videoInputRange.value;
//     video.currentTime = onePercentVideo * value;

//     tl.progress(value / 100).pause();
//     // if (!isPlaying) {
//     //     console.log();

//     //     setTimeout(() => {
//     //         tl.play();
//     //     }, 100);
//     //     tl.play();
//     // }else {

//     // }
// });

// video.addEventListener("timeupdate", () => {
//     const value = (video.currentTime * 100) / video.duration;
// });


// // SOUND
// video.volume = prevVolume / 100;
// soundInputRange.value = prevVolume;

// // Toggle Sound ON/OFF
// const toggleMute = () => {
//     video.muted = !video.muted;
//     toggleClass(soundBtnOn, "active");
//     toggleClass(soundBtnOff, "active");
//     soundInputRange.value = video.muted ? 0 : prevVolume;
//     soundInputActive.style.width = `${soundInputRange.value}%`;
// };

// soundBtnOn.addEventListener("click", toggleMute);
// soundBtnOff.addEventListener("click", toggleMute);

// soundInputRange.addEventListener("input", () => {
//     const value = soundInputRange.value;
//     video.volume = value / 100;
//     prevVolume = value;
//     soundInputActive.style.width = `${value}%`;

//     if (value <= 5) {
//         video.muted = true;
//         addClass(soundBtnOff);
//         removeClass(soundBtnOn);
//     } else {
//         video.muted = false;
//         addClass(soundBtnOn);
//         removeClass(soundBtnOff);
//     }
// });


// function videoLoading() {
//     const loadingIcon = document.querySelector(".video-popup__loader");
//     function showLoadingIcon() {
//         loadingIcon.style.display = "block";
//         tl.pause();
//     }
//     function hideLoadingIcon() {
//         loadingIcon.style.display = "none";
//         tl.play();
//     }
//     video.addEventListener("waiting", showLoadingIcon);
//     video.addEventListener("canplay", hideLoadingIcon);
//     video.addEventListener("playing", hideLoadingIcon);
//     video.addEventListener("seeking", showLoadingIcon);
//     video.addEventListener("seeked", hideLoadingIcon);
//     video.addEventListener("ended", hideLoadingIcon);
//     video.addEventListener("pause", () => {
//         tl.pause();
//     });
// }

// video.addEventListener("progress", () => {
//     if (video.buffered.length > 0) {
//         const bufferedEnd = video.buffered.end(video.buffered.length - 1);
//         const duration = video.duration;
//         if (duration > 0) {
//             const percent = (bufferedEnd / duration) * 100;
//             if (percent > 90) {
//                 // videoLoaderLine.style.cssText = `width:${100}%`;
//             } else {
//                 // videoLoaderLine.style.cssText = `width:${percent}%`;
//             }
//             // console.log(`percent:${percent}`);
//         }
//     }
// });

// videoLoading();