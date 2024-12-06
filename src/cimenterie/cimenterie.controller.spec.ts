import { Test, TestingModule } from '@nestjs/testing';
import { CimenterieController } from './cimenterie.controller';
import { CimenterieService } from './cimenterie.service';

describe('CimenterieController', () => {
  let controller: CimenterieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CimenterieController],
      providers: [CimenterieService],
    }).compile();

    controller = module.get<CimenterieController>(CimenterieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
