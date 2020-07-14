const productsArr = [
    {id: 1, title: 'Laptop', price: 2000, imgAddres: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6374/6374329_sd.jpg"},
    {id: 2, title: 'Mouse', price: 20, imgAddres:"https://avatars.mds.yandex.net/get-mpic/331398/img_id6574751331277772217/9hq"},
    {id: 3, title: 'Keyboard', price: 200, imgAddres:"https://images-na.ssl-images-amazon.com/images/I/81wRXdAOmkL._SL1500_.jpg"},
    {id: 4, title: 'Gamepad', price: 50, imgAddres:"https://www.speedlink.com/out/pictures/master/product/1/sl-650100-bk-01_rgb_001.jpg"},
];
//Сокращенный и без запятых
const renderProductNew = () => {
    for(let i = 0; i < productsArr.length; i++){
        document.querySelector('.products').insertAdjacentHTML("beforeend",  
        `<div class="product-item product">
                <h3 class="product-name">${productsArr[i].title}</h3>
                <img class="product-img" src="${productsArr[i].imgAddres}" alt="">
                <p class="price">${productsArr[i].price} </p>
                <button class="btn btn-buy">Купить</button>
            </div>`);
    }
};


/* Начальный вариант
const renderProduct = (title, price) => {
    return `<div class="product-item">
                <h3>${title}</h3>
                <p>${price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item.title, item.price));
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList;
};
*/

renderProductNew();

//For BASKET

"use strict";
let closeBasket = document.querySelector(".close-basket"); 
let basketBtn = document.querySelector(".basket")
let basket = document.querySelector(".basket-window");
let basketProducts = document.querySelector(".products-in-basket");
let sumPay = document.querySelector(".sum");
let prodAll = document.querySelector(".products");
let products = document.querySelectorAll(".product");
let productsName = document.querySelectorAll(".product-name");
let productsImage = document.querySelectorAll(".product-img");
let productsPrice = document.querySelectorAll(".price");
let clearBasket = document.querySelector(".clear-basket");

let prodArr = [];

basketBtn.addEventListener("click", function(){
    basket.style.display = "block";
})

closeBasket.addEventListener("click", function(){
    basket.style.display = "none";
})

prodAll.addEventListener("click", () => {
    addProd(event);
    console.log(prodArr);
});

clearBasket.addEventListener("click", function(){
    basketProducts.innerHTML = "";
    sumPay.innerHTML = "0";
    prodArr = [];
})

function getDiscount(){
    let productCollect = basket.querySelectorAll(".product-basket");
    productCollect.forEach((el, i) => {
        if(i >= 1){
            prodArr.splice(prodArr.length - 1);
        }
        prodArr.push(el);
    })
}

//добаляет продукт в корзину
function addProd(event){
    let target = event.target.parentNode;
    let targetBtn = event.target;
    if(targetBtn == target.querySelector(".btn-buy")){
        let productDiv = document.createElement('div');
        productDiv.classList.add("product-basket");
        //название товара
        let productName = target.querySelector(".product-name").cloneNode(true);
        productName.classList.add("product-basket-name");
        productDiv.append(productName);
        //картинка
        let productImg = target.querySelector(".product-img").cloneNode(true);
        productImg.classList.add("products-img-for-buing")
        productImg.classList.remove("product-img")
        productDiv.append(productImg);
        //цена
        let productPrice = target.querySelector(".price").cloneNode(true);
        productPrice.classList.add("product-basket-price");
        productDiv.append(productPrice);

        basketProducts.append(productDiv);
    }

    getIdEl();
    getDiscount();
    // Чтобы при записи суммы товаров не возникало конкатинации чисел 
    if(sumPay.innerHTML != ""){
        sumPay.innerHTML = "";
        sumPay.append(getSumProd());
    } else {
        sumPay.append(getSumProd());
    }
}


//Добавляет номер товара в корзине
function getIdEl(){
    let IdElements = basketProducts.querySelectorAll(".product-basket");
    IdElements.forEach(function(idEl, key){
        let idElDiv = document.createElement('div');
        idElDiv.classList.add('id-el');
        if(idEl.querySelector("div") && 
        idEl.querySelector("div").classList.contains("id-el")){
            return;
        } else{
            idElDiv.innerHTML = key + 1;
            idEl.prepend(idElDiv);
        }
    })
}


//считает сумму цен товаров
function getSumProd(){
    let prodCollection = basketProducts.querySelectorAll(".product-basket-price");
    let sum = 0;
    prodCollection.forEach(function(item, key){
        sum = Number(item.innerHTML) + sum
    })
    console.log(sum);
    return sum;
}

//For BASKET


