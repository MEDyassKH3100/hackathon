import { Test, TestingModule } from '@nestjs/testing';
import { PointventeController } from './pointvente.controller';
import { PointventeService } from './pointvente.service';

describe('PointventeController', () => {
  let controller: PointventeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PointventeController],
      providers: [PointventeService],
    }).compile();

    controller = module.get<PointventeController>(PointventeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
