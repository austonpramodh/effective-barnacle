import { Controller, Get } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { NotificationsService } from 'src/notifications/notifications.service';
import {
  AvailableLocationsByAppoinmentType,
  PeriodicCheckerService,
} from './periodic-checker.service';

@Controller('periodic-checker')
export class PeriodicCheckerController {
  constructor(
    private readonly periodicCheckerService: PeriodicCheckerService,
    private readonly notificationsService: NotificationsService,
  ) {}

  @Get('check')
  async checkForNewAppointmentTimings(): Promise<{
    success: true;
    message: string;
    data: AvailableLocationsByAppoinmentType[];
  }> {
    const availableLocationsByAppoinmentType =
      await this.periodicCheckerService.checkForNewAppointmentTimings();

    await this.periodicCheckerService.sendAppointmentAvailabilityNotifications(
      availableLocationsByAppoinmentType,
    );

    return {
      data: availableLocationsByAppoinmentType,
      success: true,
      message: 'Successfully checked for new appointment timings',
    };
  }

  // @Cron('0 * * * * *')
  // async checkForNewAppointmentTimingsJob() {
  //   const availableLocationsByAppoinmentType =
  //     await this.periodicCheckerService.checkForNewAppointmentTimings();

  //   await this.periodicCheckerService.sendAppointmentAvailabilityNotifications(
  //     availableLocationsByAppoinmentType,
  //   );
  // }
}
