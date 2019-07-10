function bestCharge(selectedItems) {
  return /*TODO*/;
}

function countItems(selectedItems) {
  let items = [];
  selectedItems.forEach( item =>{
    let itemInfo = item.split("x");
    items.push({
      itemId:itemInfo[0].trim(),
      count:parseInt(itemInfo[1].trim())
    });
  });
  console.log(items);
  return items;
}
module.exports = {
  countItems,

}
