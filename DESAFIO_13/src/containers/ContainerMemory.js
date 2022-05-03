
class ContainerMemory {
    constructor() {
      this.products = [];
      this.id = 0;
    }
  
    listById(id) {
      const product = this.products.find((item) => item.id == id);
      return product || { error: `elemento no encontrado` };
    }
  
    listAll() {
      return [...this.products];
    }
  
    save(product) {
      const newProduct = { ...product, id: ++this.id };
      this.products.push(newProduct);
      return newProduct;
    }
  
    update(product, id) {
      const newProduct = { id: Number(id), ...product };
      const index = this.products.findIndex((item) => item.id == id);
  
      if (index !== -1) {
        this.products[index] = newProduct;
        return newProduct;
      } else {
        return { error: `producto no encontrado` };
      }
    }
  
    eraseById(id) {
      const index = this.products.findIndex((item) => item.id == id);
      if (index !== -1) {
        return this.products.splice(index, 1);
      } else {
        return { error: `producto no encontrado` };
      }
    }
  
    eraseAll() {
      this.products = [];
    }
  }
  
  module.exports = ContainerMemory;