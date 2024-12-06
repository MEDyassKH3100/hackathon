import { Test, TestingModule } from '@nestjs/testing';
import { CimenterieService } from './cimenterie.service';

describe('CimenterieService', () => {
  let service: CimenterieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CimenterieService],
    }).compile();

    service = module.get<CimenterieService>(CimenterieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
