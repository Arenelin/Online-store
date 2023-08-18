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
   let html = '';
   if (tabId === "goods") {
      html = renderGoods();
   } else {
      html = renderCart();
   }
   tabs.insertAdjacentHTML("afterend", html)
}

//Удаление переключенного таба
function removeNotActiveTab() {
   const activeTabContent = document.querySelector('[data-active-tab-content="true"]');
   activeTabContent.remove();
}

const tabs = document.querySelector('.tabs');
tabs.insertAdjacentHTML("afterend", renderGoods());

function findActiveBtnTab() {
   return document.querySelector(`button[data-id="${tabActiveId}"]`);
}

//Нахождение и присвоение обработчика для кнопок "В корзину"
const arrayOfBtnsCart = document.querySelectorAll('button[data-count="true"]');
addListenerForBtns(arrayOfBtnsCart, addProductsInCart);

//Цикл для добавления слушателя к кнопкам
function addListenerForBtns(elements, callback) {
   for (let i = 0; i < elements.length; i++){
      elements[i].addEventListener('click', callback);
   }
}

//Создание массива для заполнения корзины
const arrayOfProductsInCart = [];
const tabWithCounter = document.querySelector('button[data-goods-count]');
function addProductsInCart() {
   let product = createProductItem();
   arrayOfProductsInCart.push(product);
   tabWithCounter.dataset.goodsCount = arrayOfProductsInCart.length;
}
function createProductItem() {
   return {
      name: "Серая футболка",
      price: 1800,
   }
}

//Контент товаров
function renderGoods() {
   return `
   <div data-active-tab-content="true" class="product-items">
   <div class="item">
     <img src="/img/01.png" class= "item__img" alt ="t-shirt one">
     <div class="item__descr">
       <p class="item__name">Серая футболка</p>
       <p class="item__price">1800 рублей</p>
       <button data-count="true" class="item__btn">В корзину</button>
     </div>
   </div>
   <div class="item">
     <img src="/img/02.png" class= "item__img" alt ="t-shirt one">
     <div class="item__descr">
       <p class="item__name">Голубая футболка</p>
       <p class="item__price">1200 рублей</p>
       <button data-count="true" class="item__btn">В корзину</button>
     </div>
   </div>
   <div class="item">
     <img src="/img/03.png" class= "item__img" alt ="t-shirt one">
     <div class="item__descr">
       <p class="item__name">Майка на выбор</p>
       <p class="item__price">800 рублей</p>
       <button data-count="true" class="item__btn">В корзину</button>
     </div>
   </div>
 </div>
   `;
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