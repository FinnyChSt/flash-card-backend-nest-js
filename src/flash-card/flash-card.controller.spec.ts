import { Test, TestingModule } from '@nestjs/testing';
import { FlashCardController } from './flash-card.controller';

describe('FlashCardController', () => {
  let controller: FlashCardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlashCardController],
    }).compile();

    controller = module.get<FlashCardController>(FlashCardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
