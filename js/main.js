window.addEventListener('DOMContentLoaded', () => {

});

import CatalogMenu from "./components/CatalogMenu.js";
import FormValidation from './components/FormValidation.js';
import LocationSwitcher from './components/LocationSwitcher.js';
import Products from './components/Products.js';
import Cart from './components/Cart.js';
import DayProducts from './components/DayProducts.js';
import Accordion from './components/Accordion.js';

const catalogMenu = new CatalogMenu();
catalogMenu.init();

const locationSwitcher = new LocationSwitcher();
locationSwitcher.init();

const cart = new Cart();

const products = new Products(cart);
await products.init();

const dayProducts = new DayProducts(products.products, cart);
dayProducts.init();

const formValidation = new FormValidation();
formValidation.init();

const accordion = new Accordion();
accordion.init();