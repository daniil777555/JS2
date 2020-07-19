'use strict'

class CalcTotalPrice{
    constructor(price=".price"){
        this.price = document.querySelectorAll(".price");
        this.inputCheck = document.querySelectorAll(".input-check");
        document.querySelector(".container").addEventListener('click', this.selectedCheckbox.bind(this));
    }

    getPriceArr(){
        let priceArr = [];
        let i = null;
        this.price.forEach(el => {
            priceArr.push(Number(el.innerHTML));
        });
        priceArr.forEach(el => {
            i += el;
         });
        return i
    }

    selectedCheckbox(){//Принцип подсчета цены заключается в том, что изначально якобы выбраны все пункты, а когда ставиться галочка, то цена не отмеченных вычитается из стоимости всех продуктов, метод getPriceArr() собирает и складывает все цены, чтобы при добавлении новых элементов в меню, вручную не менять общую стоимость.
        let i = this.getPriceArr();
        if(document.getElementById("big-burger").checked){//Если отмечн нужный элемент выпадет меню
            document.querySelector(".list").style.display = "block";
        }
        if(document.getElementById("big-burger").checked == false){//Если не отмечн нужный элемент меню скроется
            document.querySelector(".list").style.display = "none";
        }
        this.inputCheck.forEach(el => {

            if(el.checked == false){
                i = i - Number(el.parentNode.nextElementSibling.innerHTML);
            }
        })
        document.querySelector(".total-price").innerHTML = `Total price = ${i}р.`;
        console.log(i)

    }
}
let list = new CalcTotalPrice();