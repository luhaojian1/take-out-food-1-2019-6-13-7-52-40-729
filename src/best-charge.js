const loadAllItems = require("./items");
const loadPromotions = require("./promotions");

function bestCharge(selectedItems) {
  const items = countItems(selectedItems);
  const promotion = autoGetPromotion(items);
  return createCharge(promotion);
}

function countItems(selectedItems) {
  let items = [];
  selectedItems.forEach(item => {
    let itemInfo = item.split("x");
  items.push({
    itemId: itemInfo[0].trim(),
    count: parseInt(itemInfo[1].trim())
  });
})
  ;
  console.log(items);
  return items;
}

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
  for (let i = 0; i < promotionItems.length; i++) {
    if (promotionItems[i] === itemId)
      return true;
  }
  return false;
}

function autoGetPromotion(items) {
  let sumPrice = 0;
  let promotionItemNames = [];
  let halfPromotionPrice = 0;
  let receipts = [];
  let finalSumPrice = 0;
  items.forEach(itemInfo => {
    const item = getItem(itemInfo.itemId);
  let itemPrice = item.price * itemInfo.count;
  receipts.push({
    name: item.name,
    count: itemInfo.count,
    price: itemPrice
  })
  sumPrice += itemPrice;
  if (isPromotion(item.id)) {

    halfPromotionPrice += itemPrice / 2;
    promotionItemNames.push(item.name);
  } else {
    halfPromotionPrice += itemPrice;
  }
})
  ;

  if (sumPrice >= 30) {
    finalSumPrice = sumPrice - 6;
  } 
  else finalSumPrice = sumPrice;

  if (finalSumPrice <= halfPromotionPrice && finalSumPrice < sumPrice)
    return {
      promotionFlag: 1,
      sumPrice: finalSumPrice,
      receipts: receipts,
      promotionType: '满30减6元',
      promotionPrice: 6
    };

  else if (finalSumPrice > halfPromotionPrice) {
    return {
      promotionFlag: 2,
      sumPrice: halfPromotionPrice,
      receipts: receipts,
      promotionType: `指定菜品半价(${promotionItemNames.join(',').trim()})`,
      promotionPrice: (sumPrice - halfPromotionPrice)
    }
  } else if (halfPromotionPrice == sumPrice){
    return {
      promotionFlag: 0,
      sumPrice: finalSumPrice,
      receipts: receipts,
    };
  } 

}
function createCharge(promotion){
  let report = `============= 订餐明细 =============\n`;
  promotion.receipts.forEach(receipt =>{
    report += `${receipt.name} x ${receipt.count} = ${receipt.price}元\n`;
});
  report += `-----------------------------------\n`;
  if (promotion.promotionFlag === 1 || promotion.promotionFlag === 2 ){
    report += `使用优惠：\n${promotion.promotionType}，省${promotion.promotionPrice}元\n-----------------------------------\n`;
  }
  report += `总计：${promotion.sumPrice}元\n===================================`;
  return report.trim();
}
module.exports = {
  countItems, getItem, isPromotion, autoGetPromotion,bestCharge

}
