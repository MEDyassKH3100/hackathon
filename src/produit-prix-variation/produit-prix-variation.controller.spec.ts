import { Test, TestingModule } from '@nestjs/testing';
import { ProduitPrixVariationController } from './produit-prix-variation.controller';
import { ProduitPrixVariationService } from './produit-prix-variation.service';

describe('ProduitPrixVariationController', () => {
  let controller: ProduitPrixVariationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProduitPrixVariationController],
      providers: [ProduitPrixVariationService],
    }).compile();

    controller = module.get<ProduitPrixVariationController>(ProduitPrixVariationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
