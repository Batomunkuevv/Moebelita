"use strict";

function initHeader() {
    const header = document.querySelector(".site-header");

    if (!header) return;

    animateHeader();

    function animateHeader() {
        let lastScrollTop = 0;

        window.addEventListener("scroll", (e) => {
            const scrollTop = document.documentElement.scrollTop;

            header.classList.remove("scroll-down");
            header.classList.add("scroll-up");
            header.classList.add("is-scroll");

            if (scrollTop > lastScrollTop) {
                header.classList.add("scroll-down");
                header.classList.remove("scroll-up");
            }

            if (scrollTop === 0) {
                header.classList.remove("scroll-up");
                header.classList.remove("is-scroll");
            }

            lastScrollTop = scrollTop;
        });
    }
}

function initBurger() {
    const header = document.querySelector('.site-header');
    const burger = header.querySelector(".burger");
    const headerPanel = header.querySelector(".site-header__panel");

    if (!burger || !headerPanel) return;

    const menuLinks = headerPanel.querySelectorAll('.menu__link');

    if (window.matchMedia("(max-width: 768px)").matches) {
        setStyleHeaderPanel();
        closePanelOnLinkClick();
    }

    burger.addEventListener("click", (e) => {
        burger.classList.toggle("is-active");
        headerPanel.classList.toggle("is-active");
        header.classList.toggle("is-open-panel");
        document.body.classList.toggle("lock");
    });

    function closePanelOnLinkClick() {
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove("is-active");
                headerPanel.classList.remove("is-active");
                header.classList.remove("is-open-panel");
                document.body.classList.remove("lock");
            })
        })
    }

    function setStyleHeaderPanel() {
        const header = document.querySelector(".site-header");

        headerPanel.style.height = `calc(100% - ${header.clientHeight}px)`;
        headerPanel.style.top = `${header.clientHeight}px`;
    }
}



function initAnimatedLines() {
    const animatedLinesElements = document.querySelectorAll('[data-animated-line]');

    if (!animatedLinesElements) return;

    animatedLinesElements.forEach(element => {
        window.addEventListener('scroll', (e) => {
            const scrollTop = document.documentElement.scrollTop;
            const elementTop = window.pageYOffset + element.getBoundingClientRect().top;
            let elementStep = element.dataset.animatedLine;

            if (!elementStep) elementStep = 2;

            if (scrollTop > (elementTop - window.innerHeight / elementStep)) {
                element.classList.add('is-visible-line');
            } else {
                element.style.transition = 'unset';
                element.style.transition = '';
                element.classList.remove('is-visible-line');
            }
        })
    })
}

function initLazyload() {
    const lazyItems = document.querySelectorAll("[data-lozad]");

    if (!lazyItems) return;

    const observer = lozad(lazyItems);
    observer.observe();
}

function initTeamSlides() {
    let teamSlider = document.querySelector('.team__slider');

    if (!teamSlider) return;

    const teamSliderOptions = {
        spaceBetween: 55,
        slidesPerView: 5,
        loop: true,
        grabCursor: true,
        speed: 1000,
        navigation: {
            prevEl: '[data-slider-prev]',
            nextEl: '[data-slider-next]',
        },
        autoplay: {
            delay: 2000
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clicable: true,
            dynamicBullets: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 1,

            },
            576: {
                slidesPerView: 2,
                spaceBetween: 24,
            },
            1200: {
                slidesPerView: 3,

            },
            1520: {
                slidesPerView: 5,
            }
        }
    }

    teamSlider = new Swiper(teamSlider, teamSliderOptions)
}

function initPartnersSlider() {
    let partnersSlider = document.querySelector('.partners__slider');

    if (!partnersSlider) return;

    const partnersSliderOptions = {
        slidesPerView: 4,
        speed: 4000,
        loop: true,
        allowTouchMove: false,
        spaceBetween: 150,
        autoplay: {
            delay: 0,
        },
        breakpoints: {
            300: {
                slidesPerView: 1.6,
                spaceBetween: 50,
            },
            576: {
                slidesPerView: 2
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 150,
            },
            992: {
                slidesPerView: 4,
            }
        }
    }

    partnersSlider = new Swiper(partnersSlider, partnersSliderOptions)
}

function initPhoneMask() {
    [].forEach.call(document.querySelectorAll('[name="tel"]'), function (input) {
        var keyCode;

        function mask(event) {
            event.keyCode && (keyCode = event.keyCode);

            var pos = this.selectionStart;

            if (pos < 3) event.preventDefault();

            var matrix = "+7 (___) ___-__-__",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                new_value = matrix.replace(/[_\d]/g, function (a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
                });
            i = new_value.indexOf("_");
            if (i != -1) {
                i < 5 && (i = 3);
                new_value = new_value.slice(0, i);
            }
            var reg = matrix
                .substr(0, this.value.length)
                .replace(/_+/g, function (a) {
                    return "\\d{1," + a.length + "}";
                })
                .replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || (keyCode > 47 && keyCode < 58)) this.value = new_value;
            if (event.type == "blur" && this.value.length < 5) this.value = "";
        }

        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false);
    });
}

function initAnchors() {
    const anchors = document.querySelectorAll('[data-anchor]');

    if (!anchors) return;

    anchors.forEach(anchor => {
        const anchorLink = anchor.getAttribute('href');
        const anchorTarget = document.querySelector(anchorLink);

        anchor.addEventListener('click', (e) => {
            e.preventDefault();

            anchorTarget.scrollIntoView({ behavior: "smooth", block: "start" });
        })
    })
}

function initPopups() {
    const overlay = document.querySelector(".overlay");

    if (!overlay) return;

    initCloseModalsOnClickOverlay();

    const popups = document.querySelectorAll("[data-popup]");
    const popupBtns = document.querySelectorAll("[data-popup-btn]");

    if (!popupBtns) return;

    popupBtns.forEach((btn) => {
        const popup = overlay.querySelector(`[data-popup=${btn.dataset.popupBtn}]`);

        btn.addEventListener("click", (e) => {
            e.preventDefault();
            openModal(popup);
        });
    });

    popups.forEach((popup) => {
        const popupCloses = popup.querySelectorAll("[data-popup-close]");

        if (popupCloses) {
            popupCloses.forEach((close) => {
                close.addEventListener("click", (e) => {
                    closeModal(popup);
                });
            });
        }
    });

    function openModal(popup) {
        overlay.classList.add("is-visible");
        popup.classList.remove("is-hidden");
        document.body.classList.add("lock");
    }

    function closeModal(popup) {
        if (popup.classList.contains('popup-video')) stopVideo(popup);

        overlay.classList.remove("is-visible");
        popup.classList.add("is-hidden");
        document.body.classList.remove("lock");
    }

    function initCloseModalsOnClickOverlay() {
        const overlayChilds = Array.from(overlay.querySelectorAll("*"));

        overlay.addEventListener("click", (e) => {
            const { target } = e;

            if (!contains(overlayChilds, target)) {
                if (popups) {
                    popups.forEach((popup) => {
                        closeModal(popup);
                    });
                }
                document.body.classList.remove("lock");
                overlay.classList.remove("is-visible");
            }
        });
    }

    function stopVideo(popup) {
        const popupVideo = popup.querySelector('video');

        popupVideo.pause();
    }
}

function contains(array, element) {
    return array.includes(element);
}

window.addEventListener("DOMContentLoaded", (e) => {
    initHeader();
    initBurger();
    initLazyload();
    initTeamSlides();
    initPartnersSlider();
    initPhoneMask();
    initAnchors();
    initAnimatedLines();
    initPopups();
});
