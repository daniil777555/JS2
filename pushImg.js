const fs = require('fs');
let imgArr = ['https://www.dateks.lv/images/pic/400/400/640/68.jpg','https://i1.imged.com/steelseries-69001ss-3g-pc-game-controller-shipping-is-free.jpg','https://www.teknolojipazar.com/cougar-vantar-q-isikli-oyn-klavyergbsswitchli-klavye-cougar-88908-38-O.jpg','https://opt-1151948.ssl.1c-bitrix-cdn.ru/upload/resize_cache/iblock/b00/400_400_2/1102559_v02_b.jpg?158565520559193'];

fs.readFile('db/products.json','utf-8',(err,data) => {
    let objProd= JSON.parse(data)
    for(let i = 0; i < imgArr.length; i++){
        objProd[i].img = imgArr[i];
    }
    fs.writeFile('db/products.json', JSON.stringify(objProd), (err) => {
        if (err)
            console.log(err);
    });
    console.log(objProd);
})
