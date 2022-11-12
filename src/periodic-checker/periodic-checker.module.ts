import { Module, OnModuleInit } from '@nestjs/common';
import { PeriodicCheckerService } from './periodic-checker.service';
import { PeriodicCheckerController } from './periodic-checker.controller';
import { AppointmentsModule } from 'src/appointments/appointments.module';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [AppointmentsModule, NotificationsModule],
  controllers: [PeriodicCheckerController],
  providers: [PeriodicCheckerService],
})
export class PeriodicCheckerModule implements OnModuleInit {
  constructor(
    private readonly periodicCheckerService: PeriodicCheckerService,
  ) {}

  async onModuleInit() {
    // TODO: Analyze if this is the best place to call this
    await this.periodicCheckerService.createSlackChannels();
  }
}
