import { Module } from '@nestjs/common';
import { PeriodicCheckerService } from './periodic-checker.service';
import { PeriodicCheckerController } from './periodic-checker.controller';
import { AppointmentsModule } from 'src/appointments/appointments.module';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [AppointmentsModule, NotificationsModule],
  controllers: [PeriodicCheckerController],
  providers: [PeriodicCheckerService],
})
export class PeriodicCheckerModule {}
