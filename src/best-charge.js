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


module.exports = {
  countItems, getItem,isPromotion,

}
