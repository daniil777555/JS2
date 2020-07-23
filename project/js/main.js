const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];//массив товаров
        this.allProducts = [];//массив объектов
        this.getProducts()
            .then(data => {
                this.goods = [...data];
                this.render()
            });
    }
    // _fetchProducts(cb){
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.goods = JSON.parse(data);
    //         console.log(this.goods);
    //         cb();
    //     })
    // }
    getProducts(){
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    calcSum(){
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}

class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150'){
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render(){
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p class="price">${this.price}</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

class Basket {
    constructor(){
        this.goods = [];
        this.goodsIdInBasket= [];
        list.getProducts()
            .then(data => {
                this.goods = [...data];
            });//По другому сделать не получалось, передавая в конструктор массив goods из объекта list, новый массив не приравнивался к старому, иначе говоря значения не передовались в новый массив
    }
    addGoods(el) {
        const block = document.querySelector(".main-basket");
        for (let product of this.goods){
            //Сверяет id элемента из рендера и того который нужно добавить, чтобы в карзине не появлялось 2 элемента.
            if(product.id_product == el.parentNode.parentNode.dataset.id){
                //Если в массиве с id элементов уже есть такой id, то увеличивается количество, иначе добавляется в карзину
                if(this.goodsIdInBasket.includes(product.id_product)){
                    let priceBasket = document.querySelector(".main-basket").querySelector(`*[data-id="${product.id_product}"]`).querySelector(".product-in-basket-quantity");
                    priceBasket.innerHTML = +priceBasket.innerHTML + 1;

                }
                else{
                    const productObj = new ElemBasket(product);
                    this.goodsIdInBasket.push(product.id_product);
                    block.insertAdjacentHTML('beforeend', productObj.render());
                }
            }
            
        }
    }
    removeGoods(el) {
        let quantity = Number(el.parentNode.querySelector(".product-in-basket-quantity").innerHTML);
        //проверяет количество, если больше 1 то уменьшает число, если 1 то удаляет из карзины
        if(quantity > 1){
            el.parentNode.querySelector(".product-in-basket-quantity").innerHTML = quantity - 1;
        } else{
            el.parentNode.remove();
            this.goodsIdInBasket.forEach((item,i) => {
                if(item == el.parentNode.dataset.id){
                    this.goodsIdInBasket = this.goodsIdInBasket.splice(i+1, i+1);
                }

            })
        }


    }
    removeAllGoods() {
        document.querySelector(".main-basket").innerHTML = "";
        this.goodsIdInBasket = this.goodsIdInBasket.splice(this.goodsIdInBasket.length, this.goodsIdInBasket.length)
        console.log(this.goodsIdInBasket);
    }

    getPrice(el){
        document.querySelectorAll(".product-in-basket").forEach((item)=>{
            item.querySelector(".product-in-basket-price").innerHTML = Number(item.dataset.price) * Number(item.querySelector(".product-in-basket-quantity").innerHTML);
        })
       
    }
}

class ElemBasket {
    constructor(product){
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
    }
    render(){
        return `<div class="product-in-basket" data-id="${this.id}" data-price="${this.price}">
                    <span class="product-in-basket-name">${this.title}</span>
                    <span class="product-in-basket-quantity">${1}</span>
                    <span class="product-in-basket-price">${this.price}</span>
                    <button class="btn-basket-remove">-</button>
                </div>`
    }
}

let list = new ProductsList();
let basket = new Basket();


document.querySelector(".basket").addEventListener('click', ()=>{
    document.querySelectorAll(".btn-basket-remove").forEach((el) => {
        if(event.target == el){
            basket.removeGoods(el);
            basket.getPrice();
        }
       
    })
})

document.querySelector(".products").addEventListener('click', ()=>{
    document.querySelectorAll(".buy-btn").forEach((el) => {
        if(event.target == el){
            basket.addGoods(el);
            basket.getPrice();
        }
    })
})

document.querySelector(".remove-goods").addEventListener('click',()=>{
    basket.removeAllGoods();
} );

document.querySelector(".btn-cart").addEventListener('click', ()=>{
    if(document.querySelector(".basket").style.display == 'block')
    document.querySelector(".basket").style.display = 'none';
    else{
        document.querySelector(".basket").style.display = 'block';
    }
})
    
console.log(list)

