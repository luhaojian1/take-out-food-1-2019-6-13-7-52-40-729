const takeOutFood = require("../src/best-charge.js");
describe('Take out food', function () {
  it('should generate best charge when best is 指定菜品半价', function() {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let summary = takeOutFood.bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元
-----------------------------------
使用优惠：
指定菜品半价(黄焖鸡,凉皮)，省13元
-----------------------------------
总计：25元
===================================`.trim()
    expect(summary).toBe(expected)
  });
  it('should generate best charge when best is 满30减6元', function() {
    let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
    let summary = takeOutFood.bestCharge(inputs).trim();
    let expected = `============= 订餐明细 =============
肉夹馍 x 4 = 24元
凉皮 x 1 = 8元
-----------------------------------
使用优惠：
满30减6元，省6元
-----------------------------------
总计：26元
===================================`.trim()
    expect(summary).toEqual(expected)
  });
  
  it('should generate best charge when no promotion can be used', function() {
    let inputs = ["ITEM0013 x 4"];
    let summary = takeOutFood.bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`.trim()
    expect(summary).toEqual(expected)
  });
  
   // getItem test
  it('should return an arrangeItem when arrangeItems given an array', function () {
    //given
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    //when
    let items = takeOutFood.countItems(inputs);
    //then
    let expected = [{itemId: 'ITEM0001', count: 1},
      {itemId: 'ITEM0013', count: 2},
      {itemId: 'ITEM0022', count: 1}];
    expect(items).toEqual(expected);
  });

 
  it('should return an item Object when getItem given itemId = \'ITEM0001\'', function () {
    //given
    let inputs = 'ITEM0001';
    //when
    let items = takeOutFood.getItem(inputs);
    //then
    let expected = {
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00
    };
    expect(items).toEqual(expected);
  });

  it('should return null when getItem given itemId = \'ITEM0000\'', function () {
    //given
    let inputs = 'ITEM0000';
    //when
    let item = takeOutFood.getItem(inputs);
    //then
    expect(item).toBe(null);
  });

  // isPromotion test
  it('should return false when isPromotion given itemId = \'ITEM0000\'', function () {
    //given
    let inputs = 'ITEM0000';
    //when
    let item = takeOutFood.isPromotion(inputs);
    //then
    expect(item).toBe(false);
  });
  it('should return true when isPromotion given itemId = \'ITEM0001\'', function () {
    //given
    let inputs = 'ITEM0001';
    //when
    let item = takeOutFood.isPromotion(inputs);
    //then
    expect(item).toBe(true);
  });
  //autoGetPromotion test
  it('should return a Object that promotionFlag=2 when autoGetPromotion given items', function () {
    //given
    let inputs = [{itemId: 'ITEM0001', count: 1},
      {itemId: 'ITEM0013', count: 2},
      {itemId: 'ITEM0022', count: 1}];
    //when
    let item = takeOutFood.autoGetPromotion(inputs);
    console.log(item);
    //then
    expect(item).toEqual({
      promotionFlag:2,
      sumPrice:25,
      receipts:[{name:'黄焖鸡',count:1,price:18},{name:'肉夹馍',count:2,price:12},{name:'凉皮',count:1,price:8}],
      promotionType:`指定菜品半价(黄焖鸡,凉皮)`,
      promotionPrice:13
    });
  });
  
  it('should return a promotion Object that promotionFlag=1 when autoGetPromotion given items', function () {
    //given
    let inputs = [
      {itemId: 'ITEM0013', count: 4},
      {itemId: 'ITEM0022', count: 1}];
    //when
    let item = takeOutFood.autoGetPromotion(inputs);
    console.log(item);
    //then
    expect(item).toEqual({
      promotionFlag:1,
      sumPrice:26,
      receipts:[{name:'肉夹馍',count:4,price:24},{name:'凉皮',count:1,price:8}],
      promotionType:`满30减6元`,
      promotionPrice:6
    });
  });
  it('should return a promotion Object that promotionFlag=0 when autoGetPromotion given items', function () {
    //given
    let inputs = [{itemId: 'ITEM0013', count: 4}];
    //when
    let item = takeOutFood.autoGetPromotion(inputs);
    console.log(item);
    //then
    expect(item).toEqual({
      promotionFlag:0,
      sumPrice:24,
      receipts:[{name:'肉夹馍',count:4,price:24}]
    });
  });
});
