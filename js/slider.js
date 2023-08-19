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
   let html = null;
   if (tabId === "goods") {
      html = renderGoods();
   } else {
      html = renderCart();
   }
   tabs.after(html)
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
      product.current++;
      arrayOfProductsInCart.push(product);
      console.log(product);
      tabWithCounter.dataset.goodsCount = arrayOfProductsInCart.length;
   }

}
function createProductItem(product) {
   return {
      name: product.name ? product.name : 'Имя неизвестно',
      price: product.price ? product.price : null,
      imgSrc: product.imgSrc ? product.imgSrc : '/img/01.png',
      current: product.current++,
   }
}

//Контент товаров
function renderGoods() {
   const div = document.createElement('div');
   div.dataset.activeTabContent = 'true';
   div.className = "product-items";

   for (let i = 0; i < goods.length; i++) {
      const product = createProductItem(goods[i]);
      product.current = 0;

      const clickHandler = addProductsInCart(product);

      const button = document.createElement('button');
      button.className = "item__btn";
      button.textContent = 'В корзину';
      button.addEventListener('click', clickHandler);

      const productBlock = document.createElement('div');
      productBlock.className = "item";
      const price = product.price === null ? 'Товар закончился' : `${product.price} рублей`;
      productBlock.innerHTML = `
      <img src="${product.imgSrc}" class= "item__img" alt ="t-shirt one">
      <div class="item__descr">
         <p class="item__name">${product.name}</p>
         <p class="item__price">${price}</p>
      </div>
      `;
      if (product.price !== null) {
         productBlock.querySelector('.item__descr').append(button);
      }
      div.append(productBlock);
   }
   return div;
}


//Контент корзины
function renderCart() {
   const div = document.createElement('div');
   div.dataset.activeTabContent = 'true';
   div.className = "cart-items cart";
   let fullPriceOfCart = 0;
   
   for (let i = 0; i < arrayOfProductsInCart.length; i++) {
      let productOfCart = arrayOfProductsInCart[i];

      const button = document.createElement('button');
      button.className = 'cart-item-delete';
      button.textContent = 'x';

      const productOfCartBlock = document.createElement('div');
      productOfCartBlock.className = "cart-item";
      productOfCartBlock.innerHTML = `
         <div class="cart__name">${productOfCart.name}</div>
         <div class="cart__count">${productOfCart.current} шт.</div>
         <div class= "cart__view-price" >${productOfCart.price} рублей</div>
         `;
      productOfCartBlock.append(button);
      fullPriceOfCart += productOfCart.price;
      div.append(productOfCartBlock);
   }

   div.insertAdjacentHTML('beforeend', `
   <div class="cart__full-price">Итоговая стоимость всех товаров в корзине: ${fullPriceOfCart} рублей.</div>
   `);

   return div;
}