import { 
    Controller, 
    Get, 
    Post, 
    Patch, 
    Delete, 
    Body, 
    Param
} from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    async addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number,
        @Body('soldout') prodSoldeOut: boolean,
    ) {
        const newProduct = await this.productsService.insertProduct(prodTitle, prodDesc, prodPrice,prodSoldeOut);
        return {newProduct};

        // const generatedId = await this.productsService.insertProduct(prodTitle, prodDesc, prodPrice,prodSoldeOut);
        // return {id: generatedId};
    }

    @Get()
    async getAllProducts() {
        const products = await this.productsService.getProducts();
        return products;
    }

    @Get(':id')
    async getProduct(@Param('id') prodId: string) {
        return await this.productsService.getProductById(prodId);
    }

    @Patch(':id')
    async updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number,
        @Body('soldout') prodSoldeOut: boolean,
    ) {
        const updProduct = await this.productsService.updateProductById(prodId, prodTitle, prodDesc, prodPrice, prodSoldeOut);
        return updProduct;
    }

    @Delete(':id')
    async deleteProduct(@Param('id') prodId: string) {
        await this.productsService.deleteProductById(prodId);
        return null;
    }
}