// Проверка поддержки webp, добавление класса webp или no-webp для HTML
export function isWebp() {
	// Проверка поддержки webp
	function testWebp(callback) {
		let webP = new Image();
		webP.onload = webP.onError = function () {
			callback(webP.height == 2);
		};
		webP.src =
			"data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	// Добавление класса _webp или _no-webp для HTML
	testWebp(function (support) {
		let className = support === true ? "webp" : "no-webp";
		document.documentElement.classList.add(className);
	});
}

export function addClassName(el, className = 'active') {
	el.classList.add(className);
}

export function removeClasses(array, className) {
	array.forEach((currentEl) => {
		currentEl.classList.remove(className);
	});
}

export function removeClassName(el, className = 'active') {
	el.classList.remove(className);
}

export function toggleClassName(el, className = 'active') {
	el.classList.toggle(className);
}

export function mediaQueryMatches(mediaQuery) {
	return window.matchMedia(mediaQuery).matches;
}

export function touchMoveHandler() {
	e.preventDefault();
	e.stopImmediatePropagation();
}

export let isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows()
		);
	},
};

export function queryMatches(width, prefix = 'max') {
	return window.matchMedia(`(${prefix}-width: ${width}px)`).matches;
}

export const COMMON_MEDIA_QUERIES = {
	TABLET: queryMatches(991.98),
	MOBILE: queryMatches(767.98),
};

// Function to detect mobile or tablet devices
export function isMobileOrTablet() {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Tablet|KFAPWI/i.test(navigator.userAgent);
}

export function changeText(el, text) {
	el.innerText = text;
}

export function dispatchCustomEvent({ el, event, detail }) {
	el.dispatchEvent(new CustomEvent(event, { detail }));
}

export function wrapElements(elms, wrapClass = 'wrapped', wrapType = 'div') {
	elms.forEach((el) => {
		const wrapEl = document.createElement(wrapType);
		wrapEl.classList = wrapClass;
		el.parentNode.children[1].before(wrapEl)
			.appendChild(wrapEl);
		wrapEl.appendChild(el);
	});
};

export function setPropertyTo({ propertyName, to, propertyValue }) {
	to.style.setProperty(propertyName, propertyValue);
}

export function setItemToSessionStorage(key, content) {
	sessionStorage.setItem(key, JSON.stringify(content));
}
export function getItemFromSessionStorage(key) {
	return JSON.parse(sessionStorage.getItem(key));
}
export function removeItemFromSessionStorage(key) {
	sessionStorage.removeItem(key);
}
