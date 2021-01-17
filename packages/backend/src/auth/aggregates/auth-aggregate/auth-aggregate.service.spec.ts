import { Test, TestingModule } from '@nestjs/testing';
import { AuthAggregateService } from './auth-aggregate.service';

describe('AuthAggregateService', () => {
  let service: AuthAggregateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthAggregateService],
    }).compile();

    service = module.get<AuthAggregateService>(AuthAggregateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
