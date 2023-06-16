import { Test, TestingModule } from '@nestjs/testing';
import { CagegoryService } from './cagegory.service';

describe('CagegoryService', () => {
  let service: CagegoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CagegoryService],
    }).compile();

    service = module.get<CagegoryService>(CagegoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
