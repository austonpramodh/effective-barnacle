import { Test, TestingModule } from '@nestjs/testing';
import { PeriodicCheckerController } from './periodic-checker.controller';
import { PeriodicCheckerService } from './periodic-checker.service';

describe('PeriodicCheckerController', () => {
  let controller: PeriodicCheckerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeriodicCheckerController],
      providers: [PeriodicCheckerService],
    }).compile();

    controller = module.get<PeriodicCheckerController>(
      PeriodicCheckerController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
