export default class LocationSwitcher {
  constructor() {
    this.button = document.querySelector('.location__city');
    this.cityName = document.querySelector('.location__city-name');
    this.items = document.querySelectorAll('.location__sublink');
  }

  init() {
    if (!this.button) return;

    this.button.addEventListener('click', () => {
      this.toggle();
    });

    this.items.forEach((item) => {
      item.addEventListener('click', () => {
        this.selectCity(item);
      });
    });

    document.addEventListener('click', (evt) => {
      if (!evt.target.closest('.location')) {
        this.close();
      }
    });
  }

  toggle() {
    this.button.classList.toggle('location__city--active');
  }

  close() {
    this.button.classList.remove('location__city--active');
  }

  selectCity(item) {
    this.cityName.textContent = item.textContent;
    this.close();
  }
}