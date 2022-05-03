import ContainerMongoDB from "../../containerMongoDB.js";

class CartDAOMongoDB extends ContainerMongoDB {
    constructor() {
        super("carts", {
            timestamp: {
                type: Date,
                default: Date.now
            },
            products: {
                type: Array
            }

        })
    }
}

export default CartDAOMongoDB;