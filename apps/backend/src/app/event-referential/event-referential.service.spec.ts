import { Test, TestingModule } from '@nestjs/testing';
import { EventReferentialService } from './event-referential.service';

describe('EventReferentialService', () => {
  let service: EventReferentialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventReferentialService],
    }).compile();

    service = module.get<EventReferentialService>(EventReferentialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
