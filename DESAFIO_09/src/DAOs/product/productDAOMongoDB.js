import ContainerMongoDB from "../../containers/containerMongoDB.js";

class ProductDAOMongoDB extends ContainerMongoDB {
    constructor() {
        super(
            'productos', 
            {
                timestamp: {type: Date, require: true},
                nombre: {type: String, require: true},
                descripcion: {type: String, require: true},
                codigo: {type: String, require: true},
                foto_url: {type: String, require: true},
                precio: {type: Number, require: true},
                stock: {type: Number, require: true}
            }
        ) 
    }
}

export default ProductDAOMongoDB;

/*
    Testing
*/
// const objPrd = new ProductosDAO();
// console.log(await objPrd.listarAll());
//db.productos.insert([{timestamp: ISODate(), nombre: "Mochila", descripcion: "color azul", codigo:"AZ-01", precio: 1234.12, foto_url: "https://cdn4.iconfinder.com/data/icons/to-cool-for-school/512/backpack-256.png", stock: 100},{timestamp: ISODate(), nombre: "Calculadora", descripcion: "color rojo", codigo:"AZ-02", precio: 234.56, foto_url: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png", stock: 100}])