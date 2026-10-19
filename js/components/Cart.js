export default class Cart {
  constructor() {
    this.items = [];

    this.list = document.querySelector('.basket__list');
    this.count = document.querySelector('.header__user-count');
    this.emptyBlock = document.querySelector('.basket__empty-block');

    this.basket = document.querySelector('.header__basket');
    this.toggleBtn = document.querySelector('.header__user-btn');

    this.checkoutBtn = document.querySelector('.basket__link');

    this.addToggleListener();
    this.render();
  }

  add(product) {
    const existing = this.items.find(item => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({
        ...product,
        quantity: 1
      });
    }

    this.render();
  }

  remove(id) {
    this.items = this.items.filter(item => item.id !== id);
    this.render();
  }

  updateCounter() {
    const total = this.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    this.count.textContent = total;
  }

  createItem(product) {
  return `
    <li class="basket__item">
      <div class="basket__img">
        <img
          src="${product.image}"
          alt="${product.name}"
          width="60"
          height="60"
        >
      </div>

      <span class="basket__name">${product.name}</span>

      <span class="basket__price">
        ${product.price.new} ₽ × ${product.quantity}
      </span>

      <button
        class="basket__item-close"
        data-id="${product.id}"
        type="button"
      >
        <svg class="main-menu__icon" width="24" height="24" aria-hidden="true">
          <use xlink:href="images/sprite.svg#icon-close"></use>
        </svg>
      </button>
      
    </li>
  `;
}

  addToggleListener() {
    this.toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.basket.classList.toggle('header__basket--active');
    });

    document.addEventListener('click', (e) => {
      if (!this.basket.contains(e.target)) {
        this.basket.classList.remove('header__basket--active');
      }
    });
  }

  render() {
    this.list.innerHTML = this.items
      .map(item => this.createItem(item))
      .join('');

    this.updateCounter();

    const hasItems = this.items.length > 0;

    this.emptyBlock.style.display = hasItems ? 'none' : 'block';
    this.checkoutBtn.style.display = hasItems ? 'flex' : 'none';

    this.bindRemoveButtons();
  }

  bindRemoveButtons() {
    const buttons = this.list.querySelectorAll('.basket__item-close');

    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();

        const id = Number(button.dataset.id);
        this.remove(id);
      });
    });
  }
}