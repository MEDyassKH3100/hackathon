import { Test, TestingModule } from '@nestjs/testing';
import { ProduitPrixVariationService } from './produit-prix-variation.service';

describe('ProduitPrixVariationService', () => {
  let service: ProduitPrixVariationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProduitPrixVariationService],
    }).compile();

    service = module.get<ProduitPrixVariationService>(ProduitPrixVariationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
