import { Controller, Get, Param } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get(':appointmentTypeKey/:locationKey')
  getLatestAvailableAppointmentSlot(
    @Param('appointmentTypeKey') appointmentTypeKey: string,
    @Param('locationKey') locationKey: string,
  ): Promise<Record<string, any>> {
    return this.appointmentsService.getLatestAppointmentAvailability(
      appointmentTypeKey,
      locationKey,
    );
  }
}
