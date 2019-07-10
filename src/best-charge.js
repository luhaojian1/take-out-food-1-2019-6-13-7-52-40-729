const loadAllItems = require("./items");
const loadPromotions = require("./promotions");

function bestCharge(selectedItems) {
  return /*TODO*/;
}

//计算商品数目
function countItems(selectedItems) {
  let items = [];
  selectedItems.forEach(item => {
    let itemInfo = item.split("x");
    items.push({
      itemId: itemInfo[0].trim(),
      count: parseInt(itemInfo[1].trim())
    });
  });
  console.log(items);
  return items;
}

//获取商品
function getItem(itemId) {
  const items = loadAllItems();
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === itemId) {
      return items[i];
    }
  }
  return null;
}

function isPromotion(itemId) {
  const promotions = loadPromotions();
  const promotionItems = promotions[1].items;
  for (let i = 0; i < promotionItems.length; i++)  {
    if (promotionItems[i] === itemId)
      return true;
  }
  return false;
}

function autoGetPromotion(items) {
  let sumPrice = 0;
  let promotionItemNames = [];
  let halfPromotionPrice = 0;
  let receipt = '';
  items.forEach(itemInfo => {
    const item = getItem(itemInfo.itemId);
      let itemPrice = item.price * itemInfo.count;
      receipt += `${item.name} x ${itemInfo.count} = ${itemPrice}元\n`;
      if (isPromotion(item.id)) {
        sumPrice += itemPrice;
        halfPromotionPrice += itemPrice/2;
        promotionItemNames.push(item.name) ;
      }
      else {
        sumPrice += itemPrice;
        halfPromotionPrice += itemPrice;
      }
  });
  if (sumPrice <30 && sumPrice === halfPromotionPrice){
    return {
      promotionFlag:0,
      sumPrice:sumPrice,
      receipt:receipt,
    }
  }
  else if (sumPrice >= 30 && sumPrice <= halfPromotionPrice){
    sumPrice -= 6;
    return {
      promotionFlag:1,
      sumPrice:sumPrice,
      receipt:receipt,
      promotionType:'满30减6元',
      promotionPrice:6
    };
  }
  else if (sumPrice > halfPromotionPrice){
    return {
      promotionFlag:2,
      sumPrice:halfPromotionPrice,
      receipt:receipt,
      promotionType:'指定菜品半价('+ promotionItemNames.join(',')+')',
      promotionPrice:(sumPrice - halfPromotionPrice)
    }
  }
}

module.exports = {
  countItems, getItem,isPromotion,autoGetPromotion

}
