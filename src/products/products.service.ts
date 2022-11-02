import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./products.model";

@Injectable()
export class ProductsService{
    private products: Product[] = [];

    insertProduct(title: string, desc: string, price: number) {
        const prodId = Math.random().toString();
        const newProduct = new Product(prodId, title, desc, price);
        
        this.products.push(newProduct);

        return prodId;
    }

    getProducts(){
        return [...this.products];
    }

    getProductById(id : string){
        const product = this.findProduct(id)[0];
        return { ... product };
    }

    updateProductById(id : string, title: string, desc: string, price: number){
        const [product, index] = this.findProduct(id);
        const updatedProduct = {... product};
        if(title){
            updatedProduct.title = title;
        }
        if(desc){
            updatedProduct.description = desc;
        }
        if(price){
            updatedProduct.price = price;
        }

        this.products[index] = updatedProduct;
    }

    deleteProductById(id: string){
        const productIndex = this.findProduct(id)[1];
        this.products.splice(productIndex, 1);
    }

    private findProduct(id: string): [Product, number] {
        const productIndex = this.products.findIndex(x => x.id === id);
        const product = this.products[productIndex];
        if(!product){
            throw new NotFoundException();
        }
        return [product, productIndex];
    }
}