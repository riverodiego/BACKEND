const {faker} = require("@faker-js/faker")

function randomProducts() {
    return {
        nombre: faker.commerce.productName(),
        precio: faker.commerce.price(),
        foto_url: faker.image.food(50, 50, true)
    }
}

module.exports = randomProducts;