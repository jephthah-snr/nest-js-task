import { Test, TestingModule } from '@nestjs/testing';
import { CagegoryController } from './cagegory.controller';

describe('CagegoryController', () => {
  let controller: CagegoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CagegoryController],
    }).compile();

    controller = module.get<CagegoryController>(CagegoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
