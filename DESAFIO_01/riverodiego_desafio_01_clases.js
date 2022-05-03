class Usuario {
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros ? libros : []
        this.mascotas = mascotas ? mascotas : []
    }

    getFullName(){
        return `Nombre: ${this.nombre} Apellido: ${this.apellido}`
    }
    addMascota(mascota){
        this.mascotas.push(mascota);
        return "Add OK..."
    }
    countMascotas(){
        return this.mascotas.length
    }
    addBook(libro,autor){
        this.libros.push({nombre: libro, autor: autor});
        return "Add OK..."
    }
    getBookNames(){
        let nombreLibros = [];
        this.libros.map(libro => nombreLibros.push(libro.nombre))
        return nombreLibros;
    }
}

let usuario = new Usuario(
    "Diego",
    "Rivero",
    [{nombre: "El principito", autor: "Antoine de Saint-Exupery"},{nombre:"Mi Planta de Naranja Lima", autor: " Jose Mauro de Vasconcelos"}],
    ["perro","gato","canario"]
    )

console.log("\n******datos del usuario****** \n\n", usuario, "\n");
console.log("\n******getFullName****** \n\n", usuario.getFullName(), "\n");
console.log("\n******se agrego 1 mascota****** \n\n",usuario.addMascota("conejo"), "\n");
console.log("\n******La cantidad de Mascotas es****** \n\n", usuario.countMascotas(), "\n");
console.log("\n******se agrego 1 libro****** \n\n", usuario.addBook("Harry Potter y la Piedra Filosofal","J K Rowling"), "\n");
console.log("\n******Los nombres de libros son****** \n\n", usuario.getBookNames(), "\n");
