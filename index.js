import fs from 'fs';

class ProductManager {
    
constructor(path){
    this.path = path;
}

    getProducts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const products = JSON.parse(data);
                return products;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }


    addProduct = async (
        title,
        description,
        price,
        thumbnail,
        code,
        stock
        ) => {
        
        try {

        const products = await this.getProducts()

        if(!title || !description || !price || !thumbnail || !code || !stock) {
            console.log(`Todos los campos son obligatorios.`)
            return
        }

        const producto = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        
        const Code = products.find(p => p.code === producto.code)

        if(!Code){
            
            if (products.length === 0){
                producto.id = 1
            } else{
                producto.id = products[products.length - 1].id + 1
            }
            products.push(producto)
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))
        } else{
            console.log(`El código de producto ${producto.code} coincide con uno existente, coloque otro por favor.`)
        }

        } catch (error) {
            console.log(error)
        }

    }


    getProductById = async (productId) => {
        try {
            const products = await this.getProducts()

            const found = products.find( prodId => prodId.id === productId)
            
            if(!found){
                console.log(`Not Found`)
            } else {
                console.log(`El producto elegido es -${found.title}-`)
                return found
            }
        } catch (error) {
            console.log(error)
        }

    }


    updateProduct = async (id, updates) => {
        try{
            let products = await this.getProducts()
            products = products.map(prod => {
                if(prod.id === id){
                prod = {...prod, ...updates}
                }
                return prod
            })
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))
        }
        catch(error){
            console.log(error)
        }
    }


    deleteProduct = async (id) => {
        try {
            let products = await this.getProducts()
            
            const found = products.find((prod) => prod.id === id)
            const index = products.indexOf(found)
            if (found) {
            products.splice(index, 1)
            }else{
                console.log(`El producto no existe`)
            }
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))
        } catch (error) {
            console.log(error)
        }

    }
}

const manager = new ProductManager('./products.json')

console.log(await manager.getProducts())



/* ========= AGREGAR PRODUCTOS ========= */
//await manager.addProduct('Producto 3', 'Descripcion 3', 350, 'sin imagen', 'CD090', 5)
//await manager.addProduct('Producto 4', 'Descripcion 4', 550, 'sin imagen', 'CD091', 6)
//await manager.addProduct('Producto 5', 'Descripcion 5', 150, 'sin imagen', 'CD092', 3)

//console.log(await manager.getProducts())


/* =========  PRODUCTOS POR ID ========== */
//console.log(await manager.getProductById(3))


/* ========== ACTUALIZAR PRODUCTO ========= */
//await manager.updateProduct(1, {title: 'Producto prueba 1 - Modificado'})

//console.log(await manager.getProducts())

/* ==========  ELIMINAR PRODUCTO ========= */
//await manager.deleteProduct(3)//Deleted prodcuct
//await manager.deleteProduct(4)//Error - Producto no existe

//console.log(await manager.getProducts())

/* ==========  AGREGANDO OTRO PRODUCTO ========= */
//await manager.addProduct('Producto 9', 'Descripcion 9', 850, 'sin imagen', 'CD099', 12)