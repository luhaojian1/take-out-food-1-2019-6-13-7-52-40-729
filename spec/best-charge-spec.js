const takeOutFood = require("../src/best-charge.js");
describe('Take out food', function () {

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

  // getItem test
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
  it('should return a promotion Object when autoGetPromotion given items', function () {
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
      receipt:`黄焖鸡 x 1 = 18元\n肉夹馍 x 2 = 12元\n凉皮 x 1 = 8元`,
      promotionType:`指定菜品半价(黄焖鸡,凉皮)`,
      promotionPrice:13
    });
  });
});
