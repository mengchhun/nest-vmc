import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "./product.model";

@Injectable()
export class ProductsService{
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

    async insertProduct(title: string, desc: string, price: number, soldout: boolean) {
        const newProduct = new this.productModel(
            {
                title,
                description: desc,
                price,
                soldout
            });
        
        const result = await newProduct.save();
        return result;
        // return result.id as string;
    }

    async getProducts(){
        const products = await this.productModel.find().exec();
        return products.map(x =>({
                id: x.id,
                title: x.title,
                description: x.description,
                price: x.price,
                soldout: x.soldout
            }));
    }

    async getProductById(id : string){
        const product = await this.findProduct(id);
        return {
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
            soldout: product.soldout
        };
    }

    async updateProductById(id : string, title: string, desc: string, price: number, soldout: boolean){
        const updatedProduct = await this.findProduct(id);
        if(title){
            updatedProduct.title = title;
        }
        if(desc){
            updatedProduct.description = desc;
        }
        if(price){
            updatedProduct.price = price;
        }
        if(soldout){
            updatedProduct.soldout = soldout;
        }
        updatedProduct.save();
        return {
            id: updatedProduct.id,
            title: updatedProduct.title,
            description: updatedProduct.description,
            price: updatedProduct.price,
            soldout: updatedProduct.soldout
        };
    }

    async deleteProductById(id: string){
        const result =  await this.productModel.deleteOne({_id: id}).exec();
        if(result.deletedCount === 0){
            throw new NotFoundException("Could not find product.");
        }
    }

    private async findProduct(id: string): Promise<Product> {
        let product;

        try{
            product = await this.productModel.findById(id).exec();
        }catch(error){
            throw new NotFoundException("Could not find product.");
        }
        
        if(!product){
            throw new NotFoundException("Could not find product.");
        }

        return product;
    }
}