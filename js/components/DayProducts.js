export default class DayProducts {
    constructor(products, cart) {
        this.products = products;
        this.cart = cart;
        this.list = document.querySelector('.day-products__list');
    }

    init() {
        this.render();
        this.initSlider();
    }

    getGoodsOfDay() {
        return this.products.filter(product => product.goodsOfDay);
    }

    createCard(product) {
        return `
            <li class="day-products__item swiper-slide">
                <div class="product-card product-card--small">
                    <div class="product-card__visual">
                        <img
                            class="product-card__img"
                            src="${product.image}"
                            alt="${product.name}"
                            width="290"
                            height="344"
                        >

                        <div class="product-card__more">
                            <a
                                href="#"
                                class="product-card__link btn btn--icon"
                                data-id="${product.id}"
                            >
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

                        <span class="product-card__old">
                            ${product.price.old} ₽
                        </span>

                        <span class="product-card__price">
                            ${product.price.new} ₽
                        </span>
                    </div>
                </div>
            </li>
        `;
    }

    render() {
        const goods = this.getGoodsOfDay();

        this.list.innerHTML = goods
            .map(product => this.createCard(product))
            .join('');

        this.bindAddButtons();
    }

    bindAddButtons() {
        const buttons = this.list.querySelectorAll(
            '.product-card__link[data-id]'
        );

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

    initSlider() {
        new Swiper('.day-products__slider', {
            slidesPerView: 4,
            spaceBetween: 20,

            navigation: {
                nextEl: '.day-products__navigation-btn--next',
                prevEl: '.day-products__navigation-btn--prev',
            },

            breakpoints: {
                320: {
                    slidesPerView: 1
                },
                768: {
                    slidesPerView: 2
                },
                1024: {
                    slidesPerView: 4
                }
            }
        });
    }
}