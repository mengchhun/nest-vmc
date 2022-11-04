import * as mongoose from 'mongoose'

export const ProductSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    soldout: {type: Number, required: false}
});

export interface Product extends mongoose.Document {
    id: string;
    title: string;
    description: string;
    price: number;
    soldout: boolean
}