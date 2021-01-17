import { Test, TestingModule } from '@nestjs/testing';
import { ToDoAggregateService } from './to-do-aggregate.service';

describe('ToDoAggregateService', () => {
  let service: ToDoAggregateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ToDoAggregateService],
    }).compile();

    service = module.get<ToDoAggregateService>(ToDoAggregateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
