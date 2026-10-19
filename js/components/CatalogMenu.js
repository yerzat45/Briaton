export default class CatalogMenu {
  constructor() {
    this.openButton = document.querySelector('.header__catalog-btn');
    this.menu = document.querySelector('.main-menu');
    this.closeButton = document.querySelector('.main-menu__close');
  }

  init() {
    if (!this.openButton || !this.menu || !this.closeButton) return;

    this.addListeners();
  }

  addListeners() {
    this.openButton.addEventListener('click', () => {
      this.open();
    });

    this.closeButton.addEventListener('click', () => {
      this.close();
    });

    this.menu.addEventListener('click', (event) => {
      if (event.target === this.menu) {
        this.close();
      }
    });
  }

  open() {
    this.menu.classList.add('main-menu--active');
  }

  close() {
    this.menu.classList.remove('main-menu--active');
  }
}