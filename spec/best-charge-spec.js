const takeOutFood = require("../src/best-charge.js");
describe('Take out food', function () {

  it('should return an arrangeItem when arrangeItems given an array', function() {
    //given
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];;
    //when
    let items = takeOutFood.countItems(inputs);
    //then
    let expected = [ { itemId: 'ITEM0001', count: 1 },
      { itemId: 'ITEM0013', count: 2 },
      { itemId: 'ITEM0022', count: 1 } ];
    expect(items).toEqual(expected);
  });
});
