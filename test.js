let product = {
    plainBurger: {
        name: 'Гамбургер простой',
        price: 10000,
        amount: 0,
        kcall: 500,
        img: "images/product2.jpg",
        descr: 'Встречайте простой ГАМБУРГЕР. Он не сочный и не сытный за то дешевый',
        clas: 'first',
        get Summ() {
            return this.price * this.amount
        },
        get Call() {
            return this.kcall * this.amount
        }
    },
    freshBurger: {
        name: 'Гамбургер FRESH',
        price: 20500,
        amount: 0,
        kcall: 900,
        img: "images/product1.jpg",
        descr: ' Встречайте Фрешмена FAS FOOD`а. Он набрал в себя всё самое старое.',
        clas:'second',
        get Summ() {
            return this.price * this.amount
        },
        get Call() {
            return this.kcall * this.amount
        }
    },
    freshCombo: {
        name: 'Fresh Combo',
        price: 31900,
        amount: 0,
        kcall: 1200,
        img: "images/product3.jpg",
        descr: ' FRESH и Картошка фри. Тот же самый FRESH и Фри объяденились.',
        clas:'third',
        get Summ() {
            return this.price * this.amount
        },
        get Call() {
            return this.kcall * this.amount
        }
    }
}


let extraProduct = {
    doubleMayonnaise: {
        name: 'Двойной майонез',
        price: 2000,
        kcall: 50
    },
    lettuce: {
        name: 'Салатный лист',
        price: 3000,
        kcall: 10
    }, 
    cheese: {
        name: 'Сыр',
        price: 5000,
        kcall: 80
    }
}

let content = '';

function createProduct () {
    let main = document.querySelector('.main');
    for(let key in product) {
        let { name: n, price, descr, img, clas } = product[key];
        content +=  `<section class="main__product" id="${key}">
        <div class="main__product-preview">
            <div class="main__product-info ${clas}">
                <img src="${img}" alt="" class="main__product-img">
                <h2 class="main__product-title">${n}
                    <span class="main__product-many">${price} сум</span>
                </h2>
            </div>
            <p class="main__product-descr">
                ${descr}
            </p>
        </div>
        <div class="main__product-extra">
            <div class="main__product-number">
                <a class="main__product-btn fa-reg minus" data-symbol="-"></a>
                <output class="main__product-num">0</output>
                <a class="main__product-btn fa-reg plus" data-symbol="+"></a>
            </div>
            <div class="main__product-price"><span>0</span> сум</div> 
        </div>
        <div class="main__product-extraProduct">`;
        for(let newKey in extraProduct) {
            content += `<label class="main__product-label">
            <input type="checkbox"  class="main__product-checkbox" data-extra="${newKey}">
            <span class="main__product-check"></span>
                ${extraProduct[newKey].name}
            </label>`;
        }
        content += `</div>
            <div class="main__product-kcall"><span>0</span> калорий</div> 
            </section>`;
    }
    main.innerHTML = content;
    create();

}

setTimeout(() => createProduct(), 1000);



function create() {


let btnPlusOrMinus = document.querySelectorAll('.main__product-btn'),
    checkExtraProduct = document.querySelectorAll('.main__product-checkbox'),
    addCart = document.querySelector('.addCart'),
    receipt = document.querySelector('.receipt'),
    receiptWindow = document.querySelector('.receipt__window'),
    receiptOut = document.querySelector('.receipt__window-out'),
    receiptBtn = document.querySelector('.receipt__window-btn');



btnPlusOrMinus.forEach(function(btn) {
    btn.addEventListener('click', function() {
        plusOrMinus(this)
    })
})

function plusOrMinus(el) {
    // closest() - делает подключение к ближайщему родительскому элементу
    // getAttribute() - берет значение у указаного атрибута
    let parentId = el.closest('.main__product').getAttribute('id'),
        out = el.closest('.main__product').querySelector('.main__product-num'),
        price = el.closest('.main__product').querySelector('.main__product-price span'),
        kcall = el.closest('.main__product').querySelector('.main__product-kcall span');

        if(el.getAttribute('data-symbol') == '+') {
            product[parentId].amount++
        }else if(el.getAttribute('data-symbol') == '-' && product[parentId].amount > 0) {
            product[parentId].amount--
        }

        out.innerHTML = product[parentId].amount;
        price.innerHTML = product[parentId].Summ;
        kcall.innerHTML = product[parentId].Call;
}


checkExtraProduct.forEach(function(product) {
    product.addEventListener('click', function() {
        addExtraProduct(this)
    })
})


function addExtraProduct(el) {
    let parentId = el.closest('.main__product').getAttribute('id');

    product[parentId][el.getAttribute('data-extra')] = el.checked

    let price = el.closest('.main__product').querySelector('.main__product-price span'),
        kcall = el.closest('.main__product').querySelector('.main__product-kcall span'),
        elDataExtra = el.getAttribute('data-extra');

    if(product[parentId][elDataExtra] == true) {
        product[parentId].price += extraProduct[elDataExtra].price;
        product[parentId].kcall = product[parentId].kcall + extraProduct[elDataExtra].kcall;
    }else {
        product[parentId].price -= extraProduct[elDataExtra].price;
        product[parentId].kcall = product[parentId].kcall - extraProduct[elDataExtra].kcall;
    }
    
    price.innerHTML = product[parentId].Summ;
    kcall.innerHTML = product[parentId].Call;

}


let korzina = [],
    totalName = '',
    totalPrice = 0,
    totalKcall = 0;

addCart.addEventListener('click', function() {
    for(let key in product) {
        let burgersName = product[key];
        if(burgersName.amount > 0) {
            korzina.push(burgersName)
            for(let newKey in burgersName) {
                if(burgersName[newKey] === true) {
                    burgersName.name += ` и ${extraProduct[newKey].name}`
                }
            }
            burgersName.price = burgersName.Summ;
            burgersName.kcall = burgersName.Call;
        }
    }

    for(let i = 0; i < korzina.length;i++) {
        let item = korzina[i];
        totalPrice += item.price;
        totalKcall += item.kcall;
        totalName += '\n' + item.name + '\n';
        // \n - экранирование - наше след значение будет появляться с новой строки
    }

    receipt.style.display = 'flex';
    setTimeout(() => {
        receipt.style.opacity = '1';
        receiptWindow.style.top = '0';
    }, 200)

    receiptOut.innerHTML = `Ваш заказ: \n ${totalName} \nКаллорийность ${totalKcall} Общая сумма ${totalPrice}сумм`;

    let outNum = document.querySelectorAll('.main__product-num'),
        outPrice = document.querySelectorAll('.main__product-price span'),
        outKcall = document.querySelectorAll('.main__product-kcall span');

        for(let i = 0; i < outNum.length;i++) {
            outNum[i].innerHTML = 0;
            outPrice[i].innerHTML = 0;
            outKcall[i].innerHTML = 0;
        }
})


/////////////////дз////////////////

let first = document.querySelector('.first'),
    second = document.querySelector('.second'),
    third = document.querySelector('.third'),
    view = document.querySelector('.view'),
    viewClose = document.querySelector('.view__close');

first.addEventListener('dblclick', () => {
    view.classList.remove('viewAdd');
    document.getElementById('myImage').src = "images/product2.jpg";
    view.classList.add('active');
})
second.addEventListener('dblclick', () => {
    view.classList.remove('viewAdd');  
    document.getElementById('myImage').src = "images/product1.jpg";
    view.classList.add('active');
})
third.addEventListener('dblclick', () => {
    view.classList.remove('viewAdd');
    document.getElementById('myImage').src = "images/product3.jpg";
    view.classList.add('active');
})


viewClose.addEventListener('click', () => {
    view.classList.add('viewAdd');
    view.classList.remove('active');
})









receiptBtn.addEventListener('click', function() {
    location.reload();
})

}













