const ContainerMemory = require("../containers/ContainerMemory.js")
const randomProducts = require("../utils/randomProducts.js")

class ProductsMock extends ContainerMemory {
  constructor() {
    super();
  }

  random() {
    let items = [];
    for (let index = 1; index <= 5; index++) {
      let randomItems = randomProducts();
      items.push(randomItems);
    }
    console.log(items)
    return items;
  }
}

module.exports = ProductsMock
