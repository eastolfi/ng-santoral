import { Test, TestingModule } from '@nestjs/testing';
import { EventReferentialController } from './event-referential.controller';
import { EventReferentialService } from './event-referential.service';

describe('EventReferentialController', () => {
  let controller: EventReferentialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventReferentialController],
      providers: [EventReferentialService],
    }).compile();

    controller = module.get<EventReferentialController>(EventReferentialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
