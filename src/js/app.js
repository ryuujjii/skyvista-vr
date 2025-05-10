import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebp();
import { plugins } from "./modules/plugins.js";
plugins();

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Draggable, CSSRulePlugin);
Swiper.use([Autoplay, Pagination, EffectFade]);

import "latest-createjs/lib/preloadjs/preloadjs.js";
import { loader } from "./components/loader.js";
import { isMobileOrTablet } from './modules/functions.js';
import { header } from "./components/header.js";
import { global } from "./global.js";
import { popups } from "./components/popups.js";
import { slides } from "./components/slides.js";
import { masterplan } from "./sections/masterplan.js";
import { video } from "./components/video.js";
import { gallery } from "./components/gallery.js";


window.windowWidth = window.innerWidth;
window.windowHeight = window.innerHeight;
window.mm = gsap.matchMedia();
window.isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
isMobileOrTablet() ? document.body.classList.add('touchable-device') : null;

document.addEventListener('contextmenu', (e) => {
	e.preventDefault();
});
// Fancybox.defaults.Hash = false;


document.addEventListener("DOMContentLoaded", function () {
	window.scrollTo(0, 0);
	loader();
	masterplan();
	global();
	popups();
	slides();
	gallery()
	video()

	document.querySelector('.footer__copyright span').innerHTML = new Date().getFullYear();

	ScrollTrigger.config({
		autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
	});
});
