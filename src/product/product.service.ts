import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/Product';
import { ProductType } from './types/ProductoType';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async index(): Promise<ProductType[]> {
    return await this.productModel.find();
  }

  async create(product: ProductType): Promise<ProductType> {
    const newProduct = new this.productModel(product);
    return await newProduct.save();
  }

  async show(id: string): Promise<ProductType> {
    return await this.productModel.findById(id);
  }

  async update(id: string, product: ProductType): Promise<ProductType> {
    return await this.productModel.findByIdAndUpdate(id, product, {
      new: true,
    });
  }

  async delete(id: string): Promise<ProductType> {
    return await this.productModel.findByIdAndRemove(id);
  }
}
