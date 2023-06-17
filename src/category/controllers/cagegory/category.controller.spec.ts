import { Test, TestingModule } from '@nestjs/testing';
import { categoryController } from './category.controller';

describe('categoryController', () => {
  let controller: categoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [categoryController],
    }).compile();

    controller = module.get<categoryController>(categoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
