import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import {
  AppointmentAvailability,
  AppointmentsService,
} from 'src/appointments/appointments.service';
import { NotificationsService } from 'src/notifications/notifications.service';
import { Cache } from 'cache-manager';
import { Md5 } from 'ts-md5';

export type AvailableLocationsByAppoinmentType = {
  appointmentTypeKey: string;
  appointmentTypeName: string;
  slug: string;
  availableSlots: AppointmentAvailability[];
};

@Injectable()
export class PeriodicCheckerService {
  private readonly logger = new Logger(PeriodicCheckerService.name);

  constructor(
    private readonly appointmentsService: AppointmentsService,
    private readonly notificationsService: NotificationsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  public async checkForNewAppointmentTimings(): Promise<
    AvailableLocationsByAppoinmentType[]
  > {
    const locationsByAppointmentType =
      this.appointmentsService.getAllAppointmentTypesWithLocation();

    const availableLocationsByAppoinmentType: AvailableLocationsByAppoinmentType[] =
      [];

    for (const appoinmentType of locationsByAppointmentType) {
      const availableTimeslots: AppointmentAvailability[] = [];
      for (const location of appoinmentType.locations) {
        const latestAppointmentAvailability =
          await this.appointmentsService.getLatestAppointmentAvailability(
            appoinmentType.appointmentTypeKey,
            location.locationKey,
          );

        if (latestAppointmentAvailability) {
          availableTimeslots.push(latestAppointmentAvailability);
        }
      }

      if (availableTimeslots.length > 0) {
        availableLocationsByAppoinmentType.push({
          appointmentTypeKey: appoinmentType.appointmentTypeKey,
          appointmentTypeName: appoinmentType.name,
          slug: appoinmentType.slug,
          availableSlots: availableTimeslots,
        });
      }
    }

    return availableLocationsByAppoinmentType;
  }

  public async sendAppointmentAvailabilityNotifications(
    availableLocationsByAppoinmentType: AvailableLocationsByAppoinmentType[],
  ): Promise<void> {
    // Format the response to be more readable
    const messagesToSend: {
      message: string;
      channel: string;
    }[] = [];

    for (const appointmentLocations of availableLocationsByAppoinmentType) {
      for (const appointmentLocation of appointmentLocations.availableSlots) {
        // Cache the appointmentSlot for later use
        // Check if the appointmentSlot is already cached
        // if it is cached, then don't send a notification
        // if its not cached, then send a notification and cache it
        const appointmentSlotHash = Md5.hashStr(
          JSON.stringify(appointmentLocation),
        );

        const channelString = `${appointmentLocations.slug}-${appointmentLocation.slug}`;
        const cachedHash = await this.cacheManager.get<string>(channelString);

        if (cachedHash === appointmentSlotHash) {
          // Don't send a notification
          this.logger.log(
            `Appointment slot already cached: ${appointmentSlotHash} - ${appointmentLocation.locationName} - ${appointmentLocation.appointmentTypeName} - ${appointmentLocation.date} - ${appointmentLocation.time}`,
          );
          continue;
        }

        let message = `*Appointment type*: ${appointmentLocation.appointmentTypeName}`;
        message += `\n*Location*: ${appointmentLocation.locationName}`;
        message += `\n*Date*: ${appointmentLocation.date}`;
        message += `\n*Time*: ${appointmentLocation.time}`;
        message += `\n*Link*: <${appointmentLocation.link}|Book Now>`;

        messagesToSend.push({
          channel: channelString,
          message,
        });

        // Cache the appointmentSlot
        await this.cacheManager.set(channelString, appointmentSlotHash);
      }
    }

    for (const message of messagesToSend) {
      await this.notificationsService.sendSlackMessage(
        // '#initial-permit-${locationKey}',
        // '#non-driver-id-${locationKey}',
        // `#knowledge-test-noncdl-${locationKey}`,
        // `#auto-road-test-${locationKey}`,
        message.channel,
        message.message,
      );
    }
  }

  // Create all the channels that donot exist
  public async createSlackChannels(): Promise<void> {
    this.logger.log('Creating slack channels if they do not exist');

    const locationsByAppointmentType =
      this.appointmentsService.getAllAppointmentTypesWithLocation();

    for (const appoinmentType of locationsByAppointmentType) {
      for (const location of appoinmentType.locations) {
        const channelString = `${appoinmentType.slug}-${location.slug}`;
        await this.notificationsService.createSlackChannelIfDoesntExist(
          channelString,
        );
      }
    }

    this.logger.log('Done creating all the slack channels');
  }
}
