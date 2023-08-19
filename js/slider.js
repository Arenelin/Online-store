'use strict'


//Создание первоначального вида страницы при загрузке
let tabActiveId = "goods";
let activeTab = findActiveBtnTab();
activeTab.classList.add('active');

//Нахождение и присвоение обработчика для табов
const arrayOfBtnsTabs = document.querySelectorAll('.tabs > button');
addListenerForBtns(arrayOfBtnsTabs, clickHandler);

//Создание табов
function clickHandler(event) {
   activeTab = findActiveBtnTab();
   activeTab.classList.remove('active');
   event.target.classList.add('active');
   tabActiveId = event.target.dataset.id;
   removeNotActiveTab();
   createActiveTab(tabActiveId);
}


//Заполнение HTML при переключении табов
function createActiveTab(tabId) {
   if (tabId === "goods") {
      const html = renderGoods();
      tabs.after(html);
   } else {
      const html = renderCart();
      tabs.insertAdjacentHTML("afterend", html)
   }
}

//Удаление переключенного таба
function removeNotActiveTab() {
   const activeTabContent = document.querySelector('[data-active-tab-content="true"]');
   activeTabContent.remove();
}

const tabs = document.querySelector('.tabs');
tabs.after(renderGoods());

function findActiveBtnTab() {
   return document.querySelector(`button[data-id="${tabActiveId}"]`);
}

//Цикл для добавления слушателя к кнопкам
function addListenerForBtns(elements, callback) {
   for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener('click', callback);
   }
}

//Создание массива для заполнения корзины
const arrayOfProductsInCart = [];
const tabWithCounter = document.querySelector('button[data-goods-count]');
function addProductsInCart(product) {
   return () => {
      arrayOfProductsInCart.push(product);
      console.log(arrayOfProductsInCart);
      tabWithCounter.dataset.goodsCount = arrayOfProductsInCart.length;
   }

}
function createProductItem(product) {
   return {
      name: product.name ? product.name : 'Имя неизвестно',
      price: product.price ? product.price : '0',
      imgSrc: product.imgSrc ? product.imgSrc : '/img/01.png',
   }
}

//Контент товаров
function renderGoods() {
   const div = document.createElement('div');
   div.dataset.activeTabContent = 'true';
   div.className = "product-items";

   for (let i = 0; i < goods.length; i++) {
      const product = createProductItem(goods[i]);

      const clickHandler = addProductsInCart(product);

      const button = document.createElement('button');
      button.className = "item__btn";
      button.textContent = 'В корзину';
      button.addEventListener('click', clickHandler);

      const productBlock = document.createElement('div');
      productBlock.className = "item";
      productBlock.innerHTML = `
      <img src="${product.imgSrc}" class= "item__img" alt ="t-shirt one">
      <div class="item__descr">
         <p class="item__name">${product.name}</p>
         <p class="item__price">${product.price}</p>
      </div>
      `;
      productBlock.querySelector('.item__descr').append(button);
      div.append(productBlock);
   }
   return div;
}

//Контент корзины
function renderCart() {
   return `
   <div data-active-tab-content="true" class="cart-items cart">
        <div class="cart-item">
          <div class="cart__name">Серая футболка</div>
          <div class="cart__count">2 шт.</div>
          <div class="cart__full-price">3600 рублей</div>
        </div>
        <div class="cart-item">
          <div class="cart__name">Голубая футболка</div>
          <div class="cart__count">3 шт.</div>
          <div class="cart__full-price">3600 рублей</div>
        </div>
        <div class="cart-item">
          <div class="cart__name">Майка на выбор</div>
          <div class="cart__count">1 шт.</div>
          <div class="cart__full-price">800 рублей</div>
        </div>
      </div>
   `;
}