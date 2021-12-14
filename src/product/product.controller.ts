import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Req,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProductType } from './types/ProductoType';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async index(@Res() res): Promise<JSON> {
    const data = await this.productService.index();

    return res.status(HttpStatus.OK).json({
      data,
    });
  }

  @Post()
  async create(
    @Req() req,
    @Body() body: ProductType,
    @Res() res,
  ): Promise<JSON> {
    // console.log(req.body);
    // console.log(body);
    await this.productService.create(body);
    return res.status(HttpStatus.CREATED).json({
      message: 'Product create',
    });
  }

  @Get('/:id')
  async show(@Req() req, @Param('id') id, @Res() res): Promise<JSON> {
    const data = await this.productService.show(id);

    if (!data) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Product not found',
      });
    }

    return res.status(HttpStatus.OK).json({
      data,
    });
  }

  @Delete('/:id')
  async delete(@Req() req, @Param('id') id, @Res() res): Promise<JSON> {
    const data = await this.productService.delete(id);

    if (!data) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Product not found',
      });
    }

    return res.status(HttpStatus.OK).json({
      message: 'Product Deleted',
    });
  }

  @Put('/:id')
  async update(
    @Req() req,
    @Body() product: ProductType,
    @Param('id') id,
    @Res() res,
  ): Promise<JSON> {
    const data = await this.productService.update(id, product);

    return res.status(HttpStatus.OK).json({
      message: 'Producto Updated',
      data,
    });
  }
}
