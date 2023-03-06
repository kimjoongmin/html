injeinc = (function () {
  const injeinc = {
    mainTab: {
      init: function () {
        this._initElements();
        this._initEvents();
      },
      _initElements: function () {
        this.tabLi = document.querySelectorAll(".tab-bar li");
        this.tabLink = document.querySelectorAll(".tab-bar li a");
      },
      _initEvents: function () {
        this.tabLink.forEach((el) => {
          el.addEventListener("click", (e) => {
            e.preventDefault();
            this.tabLi.forEach((el) => el.classList.remove("active"));
            el.parentNode.classList.add("active");
          });
        });
      },
    },
  };
  return injeinc;
})();
