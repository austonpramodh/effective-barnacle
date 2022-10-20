import { Test, TestingModule } from '@nestjs/testing';
import { PeriodicCheckerService } from './periodic-checker.service';

describe('PeriodicCheckerService', () => {
  let service: PeriodicCheckerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PeriodicCheckerService],
    }).compile();

    service = module.get<PeriodicCheckerService>(PeriodicCheckerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
