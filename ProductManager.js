import fs from 'fs';

export default class ProductManager {

    constructor(path) {
        this.path = path;
    }

//VER PRODUCTOS
getProducts = async () =>{
        try{
            if(fs.existsSync(this.path)){
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const products = JSON.parse(data);
                return products;
            }else{
                return [];
            }
        }catch(error){
            console.log(error);
        }
    }

//AGREGAR PRODUCTO
addProduct = async(product)=>{
try{
    const products = await this.getProducts();
    if ( !products.title || !products.description || !products.price || !products.thumbail || !products.code || !products.stock ){
        console.log('No se pudo agregar el producto. Complete todos los campos.')
        return;
    }
}catch(error){
    console.log(error)
}
}

//BUSCAR EL PRODUCTO POR ID
getProductById = async (id) => {
try{
    const products = await this.getProducts();
    const productById = products.find((p) => p.id === id)
    productById ? console.log(productById) : console.log("No se encontró el producto.")
}catch(error){
    console.log(error)
}
}

//ELIMINAR PRODUCTO
deleteProduct = async (deleteId) => {
    try{
    const products = await this.getProducts();
    const productByIndex = products.findIndex((p)=> p.id === deleteId);
    if(productByIndex === -1){
        console.log("No hay producto")
    }else{
        const deleted = products.splice(productByIndex, 1);
        await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "/t")
        );
    }
    }catch(error){
    console.log(error)
    }
}

//ACTUALIZAR PRODUCTO
updateProduct = async (updateId, productUpdate) => { 
    try{
    const products = await this.getProducts();
    const Originalproduct = products.findIndex((p)=> p.id === updateId);
    if(Originalproduct === -1){
        console.log("No se encuenta el producto");
    }else{
        products[Originalproduct] = {
            ...products[Originalproduct],
            ...productUpdate,
        };
        await fs.promises.writeFile(
            this.path,
            JSON.stringify(products, null, "/t")
        );
    }
    }catch(error){
        console.log(error)
    }
}

}
