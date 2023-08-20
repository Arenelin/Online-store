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
let  arrayOfProductsInCart = [];
const tabWithCounter = document.querySelector('button[data-goods-count]');
function addProductsInCart(product) {
   return () => {
      let hasProduct = false;
      let index = null;
      let count = 1;
      for (let i = 0; i < arrayOfProductsInCart.length; i++) {
         const productInCart = arrayOfProductsInCart[i];
         if (product.id === productInCart.id) {
            hasProduct = true;
            index = i;
            count = productInCart.count;
         }
      }
      if (hasProduct) {
         arrayOfProductsInCart[index].count = count + 1;

      } else {
         const productWithCount = product;
         productWithCount.count = count;
         arrayOfProductsInCart.push(productWithCount);
      }
      let fullSize = 0;

      for (let i = 0; i < arrayOfProductsInCart.length; i++) {
         const productInCart = arrayOfProductsInCart[i];
         fullSize += productInCart.count;
      }

      tabWithCounter.dataset.goodsCount = fullSize;
   }

}

function removeProductInCart(productId) {
   return () => {
      let newArrayOfProductsInCart = [];
      for (let i = 0; i < arrayOfProductsInCart.length; i++) {
         const product = arrayOfProductsInCart[i];
         if (productId === product.id) {
            if (product.count > 1) {
               newArrayOfProductsInCart.push({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  imgSrc: product.imgSrc,
                  count: product.count - 1,
               })
            } updateCartItem(product.id, product.count);
         }
         else {
            newArrayOfProductsInCart.push(product);
         }
      }

      arrayOfProductsInCart = newArrayOfProductsInCart;

      let fullSize = 0;

      for (let i = 0; i < arrayOfProductsInCart.length; i++) {
         const productInCart = arrayOfProductsInCart[i];
         fullSize += productInCart.count;
      }

      tabWithCounter.dataset.goodsCount = fullSize;
   }
}

function createProductItem(product) {
   return {
      id: product.id,
      name: product.name ? product.name : 'Имя неизвестно',
      price: product.price ? product.price : null,
      imgSrc: product.imgSrc ? product.imgSrc : '/img/01.png',
   }
}


function updateCartItem(id, count) {
   const cartItem = document.querySelector(`[data-element-id="${id}"]`);
   if (count > 1) {
      const countElement = cartItem.querySelector('.cart__count');
      countElement.textContent = `${count - 1} шт.`;
   } else {
      cartItem.remove();
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
      productOfCartBlock.dataset.elementId = productOfCart.id;
      productOfCartBlock.className = "cart-item";
      productOfCartBlock.innerHTML = `
         <div class="cart__name">${productOfCart.name}</div>
         <div class="cart__count">${productOfCart.count} шт.</div>
         <div class= "cart__view-price" >${productOfCart.price} рублей</div>
         `;
      const clickHandler = removeProductInCart(productOfCart.id);
      button.addEventListener('click', clickHandler);
      productOfCartBlock.append(button);
      fullPriceOfCart += productOfCart.price;
      div.append(productOfCartBlock);
   }

   div.insertAdjacentHTML('beforeend', `
   <div class="cart__full-price">Итоговая стоимость всех товаров в корзине: ${fullPriceOfCart} рублей.</div>
   `);

   return div;
}