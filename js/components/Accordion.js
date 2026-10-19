export default class Accordion {
  constructor() {
    this.items = document.querySelectorAll('.accordion__element');
  }

  init() {
    if (!this.items.length) return;

    this.items.forEach(item => {
      const button = item.querySelector('.accordion__btn');
      const content = item.querySelector('.accordion__content');

      content.style.maxHeight = '0px';
      content.style.overflow = 'hidden';
      content.style.transition = 'max-height 0.3s ease';

      button.addEventListener('click', () => {
        const isActive = item.classList.contains('accordion__element--active');

        this.closeAll();

        if (!isActive) {
          item.classList.add('accordion__element--active'); 
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });
  }

  closeAll() {
    this.items.forEach(item => {
      const content = item.querySelector('.accordion__content');

      item.classList.remove('accordion__element--active'); 
      content.style.maxHeight = '0px';
    });
  }
}