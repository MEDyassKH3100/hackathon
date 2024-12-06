import { Test, TestingModule } from '@nestjs/testing';
import { PointventeService } from './pointvente.service';

describe('PointventeService', () => {
  let service: PointventeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PointventeService],
    }).compile();

    service = module.get<PointventeService>(PointventeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
