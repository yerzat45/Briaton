export default class Products {
    constructor(cart) {
        this.cart = cart;
        this.list = document.querySelector('.catalog__list');
        this.sortSelect = document.querySelector('.catalog__sort-select');
        this.products = [];

        this.form = document.querySelector('.catalog-form');
        this.checkboxes = document.querySelectorAll('input[name="type"]');
        this.statusRadios = document.querySelectorAll('input[name="status"]');
    }

    async init() {
        this.products = await this.loadProducts();

        this.updateCategoryCounts();
        this.addListeners();
        this.update();
    }

    async loadProducts() {
        const response = await fetch('./data/data.json');
        return await response.json();
    }

    addListeners() {
        this.sortSelect.addEventListener('change', () => {
            this.update();
        });

        this.form.addEventListener('change', () => {
            this.update();
        });

        this.form.addEventListener('reset', () => {
            setTimeout(() => this.update(), 0);
        });
    }

    sortProducts(products) {
        const value = this.sortSelect.value;
        const sorted = [...products];

        switch (value) {
            case 'price-min':
                sorted.sort((a, b) => a.price.new - b.price.new);
                break;

            case 'price-max':
                sorted.sort((a, b) => b.price.new - a.price.new);
                break;

            case 'rating-max':
                sorted.sort((a, b) => b.rating - a.rating);
                break;
        }

        return sorted;
    }

    createCard(product) {
        return `
      <li class="catalog__item">
        <div class="product-card">
          <div class="product-card__visual">
            <img
              class="product-card__img"
              src="${product.image}"
              alt="${product.name}"
              width="290"
              height="436"
            >

            <div class="product-card__more">
              <a href="#" class="product-card__link btn btn--icon" data-id="${product.id}">
                      <span class="btn__text">В корзину</span>
                      <svg width="24" height="24" aria-hidden="true">
                        <use xlink:href="images/sprite.svg#icon-basket"></use>
                      </svg>
                    </a>
              <a href="#" class="product-card__link btn btn--secondary">
                      <span class="btn__text">Подробнее</span>
                    </a>
            </div>
          </div>

          <div class="product-card__info">
            <h2 class="product-card__title">${product.name}</h2>

            <span class="product-card__old">${product.price.old} ₽</span>
            <span class="product-card__price">${product.price.new} ₽</span>
          </div>
        </div>
      </li>
    `;
    }

    updateCategoryCounts() {
        const counts = {};

        this.products.forEach((product) => {
            product.type.forEach((type) => {
                counts[type] = (counts[type] || 0) + 1;
            });
        });

        Object.entries(counts).forEach(([type, count]) => {
            const checkbox = document.querySelector(`#${type}`);

            if (!checkbox) return;

            const countElement = checkbox
                .closest('.custom-checkbox')
                .querySelector('.custom-checkbox__count');

            if (countElement) {
                countElement.textContent = count;
            }
        });
    }

    update() {
        let filteredProducts = this.filterProducts();
        filteredProducts = this.sortProducts(filteredProducts);

        this.render(filteredProducts);
    }

    filterProducts() {
        let filtered = [...this.products];

        const selectedTypes = Array.from(this.checkboxes)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.value);

        if (selectedTypes.length) {
            filtered = filtered.filter((product) =>
                product.type.some((type) => selectedTypes.includes(type))
            );
        }

        const selectedStatus = document.querySelector(
            'input[name="status"]:checked'
        ).value;

        if (selectedStatus === 'instock') {
            filtered = filtered.filter((product) =>
                Object.values(product.availability).some(count => count > 0)
            );
        }

        return filtered;
    }

    render(products) {
        this.list.innerHTML = products
            .map(product => this.createCard(product))
            .join('');

        this.bindAddButtons();
    }

    bindAddButtons() {
        const buttons = document.querySelectorAll('.product-card__link[data-id]');

        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                const id = Number(button.dataset.id);

                const product = this.products.find(
                    item => item.id === id
                );

                this.cart.add(product);
            });
        });
    }
}