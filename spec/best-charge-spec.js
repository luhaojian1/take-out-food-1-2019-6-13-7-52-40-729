const takeOutFood = require("../src/best-charge.js");
describe('Take out food', function () {

  it('should return an arrangeItem when arrangeItems given an array', function() {
    //given
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    //when
    let items = takeOutFood.countItems(inputs);
    //then
    let expected = [ { itemId: 'ITEM0001', count: 1 },
      { itemId: 'ITEM0013', count: 2 },
      { itemId: 'ITEM0022', count: 1 } ];
    expect(items).toEqual(expected);
  });

  // getItem test
  it('should return an item Object when getItem given itemId = \'ITEM0001\'', function() {
    //given
    let inputs = 'ITEM0001';
    //when
    let items = takeOutFood.getItem(inputs);
    //then
    let expected ={
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00
    };
    expect(items).toEqual(expected);
  });

  it('should return null when getItem given itemId = \'ITEM0000\'', function() {
    //given
    let inputs = 'ITEM0000';
    //when
    let item = takeOutFood.getItem(inputs);
    //then
    expect(item).toBe(null);
  });
});
