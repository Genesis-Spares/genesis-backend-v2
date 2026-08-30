import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './controllers/product.controller';
import { ProductService } from './services/product.service';

describe('ProductsController', () => {
  let productServiceController: ProductsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductService],
    }).compile();

    productServiceController = app.get<ProductsController>(ProductsController);
  });

});
