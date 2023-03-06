injeinc.guroscc = (function () {
  const guroscc = {
    nav: {
      init: function () {
        this._initElements();
        this._initEvents();
      },
      _initElements: function () {
        this.nav = document.querySelector("nav");
        this.navEls = document.querySelectorAll("nav .menu");
        this.allNav = document.querySelector(".all-nav");
        this.allNavInner = document.querySelector(".all-nav .inner");
      },
      _initEvents: function () {
        this.navEls.forEach((el) => {
          el.addEventListener("mouseenter", () => {
            this.allNav.style.height = this.allNavInner.clientHeight + "px";
          });
        });
        this.nav.addEventListener("mouseleave", () => {
          this.allNav.style.height = 0;
        });
      },
    },
    mainBanner: {
      init: function () {
        this._initElements();
        this._initEvents();
      },
      _initElements: function () {
        this.mainBannerPause = document.querySelector(
          ".main-banner .swiper-button-pause"
        );
        this.mainBannerPlay = document.querySelector(
          ".main-banner .swiper-button-play"
        );
      },
      _initEvents: function () {
        this.mainBanner = new Swiper(".main-banner", {
          loop: true,
          slidesPerView: 4,
          slidesPerGroup: 1,
          autoplay: {
            delay: 3000,
          },
          navigation: {
            prevEl: ".main-banner .swiper-button-prev",
            nextEl: ".main-banner .swiper-button-next",
          },
        });
        //!!autoplay 속성
        // this.mainBannerPause.addEventListener("click", function(){
        //   this.mainBanner.autoplay.stop();
        //   this.mainBannerPause.style.display = "none";
        //   this.mainBannerPlay.style.display = "block";
        // })

        // this.mainBannerPlay.addEventListener("click", function(){
        //   this.mainBanner.autoplay.start();
        //   this.mainBannerPlay.style.display = "none";
        //   this.mainBannerPause.style.display = "block";
        // });
        this.swiperStop = (swiper) => {
          swiper.autoplay.stop();
        };
        this.bannerStop = () => {
          this.swiperStop(this.mainBanner);
          this.mainBannerPause.style.display = "none";
          this.mainBannerPlay.style.display = "block";
        };
        this.mainBannerPause.addEventListener("click", this.bannerStop);

        this.swiperPlay = (swiper) => {
          swiper.autoplay.start();
        };
        this.bannerPlay = () => {
          this.swiperPlay(this.mainBanner);
          this.mainBannerPlay.style.display = "none";
          this.mainBannerPause.style.display = "block";
        };
        this.mainBannerPlay.addEventListener("click", this.bannerPlay);
      },
    },
    mainPopupZone: {
      init: function () {
        this._initElements();
        this._initEvents();
      },
      _initElements: function () {
        this.mainPopupLinks = document.querySelectorAll(
          ".main-popup .swiper-slide > a"
        );
        this.mainPopupPause = document.querySelector(
          ".main-popup-wrap .swiper-button-pause"
        );
        this.mainPopupPlay = document.querySelector(
          ".main-popup-wrap .swiper-button-play"
        );
      },
      _initEvents: function () {
        this.mainPopup = new Swiper(".main-popup", {
          speed: 500,
          loop: true,
          autoplay: {
            delay: 3000,
          },
          pagination: {
            el: ".main-popup-wrap .swiper-pagination",
            clickable: true,
            renderBullet: function (index, className) {
              return (
                '<button type="button" class="' +
                className +
                '">' +
                (index + 1) +
                "</button>"
              );
            },
          },
          on: {
            init: () => {
              this.mainPopupLinks.forEach((el) => {
                el.setAttribute("tabindex", "-1");
              });
              document
                .querySelectorAll(".main-popup .swiper-slide-active > a")
                .forEach((el) => {
                  el.setAttribute("tabindex", "0");
                });
            },
            transitionEnd: () => {
              this.mainPopupLinks.forEach((el) => {
                el.setAttribute("tabindex", "-1");
              });
              document
                .querySelectorAll(".main-popup .swiper-slide-active > a")
                .forEach((el) => {
                  el.setAttribute("tabindex", "0");
                });
            },
          },
        });
        //!! 질문 상위 프로퍼티의 함수..어떻게 가져올 수 있는지
        this.swiperStop = (swiper) => {
          swiper.autoplay.stop();
        };
        this.swiperPlay = (swiper) => {
          swiper.autoplay.start();
        };
        this.mainPopupPause.addEventListener("click", () =>
          this.swiperStop(this.mainPopup)
        );
        this.mainPopupPlay.addEventListener("click", () =>
          this.swiperPlay(this.mainPopup)
        );
      },
    },
  };
  return guroscc;
})();
