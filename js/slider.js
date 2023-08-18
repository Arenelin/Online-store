'use strict'

const arrayOfBtnsTabs = document.querySelectorAll('.tabs > button');



let tabActiveId = "goods";
let activeTab = search();
activeTab.classList.add('active');

const tabs = document.querySelector('.tabs');
tabs.insertAdjacentHTML("afterend", renderGoods());





const arrayOfBtnsCart = document.querySelectorAll('button[data-count="true"]');

for (let i = 0; i < arrayOfBtnsCart.length; i++){
   arrayOfBtnsCart[i].addEventListener('click', arrayCount);
}

let array = [];
const tabWithCounter = document.querySelector('button[data-goods-count]');
console.log(tabWithCounter);
function arrayCount() {
   let product = productItem();
   array.push(product);
   tabWithCounter.dataset.goodsCount = array.length;
}
function productItem() {
   return {
      name: "Серая футболка",
      price: 1800,
   }
}



for (let i = 0; i < arrayOfBtnsTabs.length; i++) {
   arrayOfBtnsTabs[i].addEventListener('click', clickHandler);
}




function clickHandler(event) {
   activeTab = search();
   activeTab.classList.remove('active');
   event.target.classList.add('active');
   tabActiveId = event.target.dataset.id;
   remove();
   create(tabActiveId);
}

function search() {
   return document.querySelector(`button[data-id="${tabActiveId}"]`);
}



function create(tabId) {
   let html = '';
   if (tabId === "goods") {
      html = renderGoods();
   } else {
      html = renderCart();
   }
   tabs.insertAdjacentHTML("afterend", html)
}


function remove() {
   const activeTabContent = document.querySelector('[data-active-tab-content="true"]');
   activeTabContent.remove();
}

















function renderGoods() {
   return `
   <div data-active-tab-content="true" class="product-items item">
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