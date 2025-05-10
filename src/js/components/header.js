export function header(gsapOBserver) {
    const menuToggleBtn = document.querySelector('.header__menu-btn');
    let isScroll = false;
    let scrolling = true

    window.addEventListener('click', (e) => {
        if (e.target.closest('[data-show36]')) {
            scrolling = false
        }
        if (e.target.closest('[backto-main]')) {
            scrolling = true
        }
    })


    menuToggleBtn.addEventListener('click', () => {
        if (scrolling) {
            if (!isScroll) {
                gsapOBserver.kill();
                isScroll = true
            } else {
                gsapOBserver.enable();
                isScroll = false
            }
        }
        document.body.classList.toggle('open-menu');
    })

}