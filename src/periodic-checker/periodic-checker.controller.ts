import { Controller, Get } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AppointmentsService } from 'src/appointments/appointments.service';
import {
  AvailableLocationsByAppoinmentType,
  PeriodicCheckerService,
} from './periodic-checker.service';

@Controller('periodic-checker')
export class PeriodicCheckerController {
  constructor(
    private readonly periodicCheckerService: PeriodicCheckerService,
    private readonly appoinmentService: AppointmentsService,
  ) {}

  @Get('check')
  async checkForNewAppointmentTimings(): Promise<{
    success: true;
    message: string;
    data: AvailableLocationsByAppoinmentType[];
    unfilteredAppoinments: AvailableLocationsByAppoinmentType[];
  }> {
    const availableLocationsByAppoinmentType =
      await this.periodicCheckerService.checkForNewAppointmentTimings();

    // filter out locations that have already been notified
    const filteredAppointments =
      this.appoinmentService.filterClosestAppointmentAvailability(
        availableLocationsByAppoinmentType,
      );

    await this.periodicCheckerService.sendAppointmentAvailabilityNotifications(
      filteredAppointments,
    );

    return {
      data: filteredAppointments,
      unfilteredAppoinments: availableLocationsByAppoinmentType,
      success: true,
      message: 'Successfully checked for new appointment timings',
    };
  }

  @Cron('*/5 * * * *')
  async checkForNewAppointmentTimingsJob() {
    const availableLocationsByAppoinmentType =
      await this.periodicCheckerService.checkForNewAppointmentTimings();

    // filter out locations that have already been notified
    const filteredAppointments =
      this.appoinmentService.filterClosestAppointmentAvailability(
        availableLocationsByAppoinmentType,
      );

    await this.periodicCheckerService.sendAppointmentAvailabilityNotifications(
      filteredAppointments,
    );
  }
}
