import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import * as Cheerio from 'cheerio';
import * as dayjs from 'dayjs';
import {
  locationsByAppointmentType,
  LocationsByAppointmentType,
} from './dataConstants';

export type AppointmentAvailability = {
  locationKey: string;
  locationName: string;
  appointmentTypeKey: string;
  appointmentTypeName: string;
  date: string;
  time: string;
  link: string;
  slug: string;
};

@Injectable()
export class AppointmentsService {
  constructor(private readonly httpService: HttpService) {}

  getAllAppointmentTypesWithLocation(): LocationsByAppointmentType[] {
    return locationsByAppointmentType;
  }

  async getLatestAppointmentAvailability(
    appointmentTypeKey: string,
    locationKey: string,
  ): Promise<AppointmentAvailability | null> {
    // Validate all the appointment types we want to check

    const appointmentLocations = locationsByAppointmentType.find(
      (appoinmentType) =>
        appoinmentType.appointmentTypeKey === appointmentTypeKey,
    );

    if (!appointmentLocations) {
      throw new BadRequestException(
        `Invalid appointment type key: ${appointmentTypeKey}. Valid keys are: ${locationsByAppointmentType
          .map((appType) => `${appType.appointmentTypeKey} - ${appType.name}`)
          .join(', ')}`,
      );
    }

    const appoinmentLocation = appointmentLocations.locations.find(
      (l) => l.locationKey === locationKey,
    );

    if (!appoinmentLocation) {
      throw new BadRequestException(
        `Invalid location key: ${locationKey}. Valid keys are: ${appointmentLocations.locations
          .map((l) => `${l.locationKey} - ${l.locationName}`)
          .join(', ')}`,
      );
    }

    const url = `https://telegov.njportal.com/njmvc/AppointmentWizard/${appointmentTypeKey}/${locationKey}`;

    const request = this.httpService.get(url);
    const response = await firstValueFrom(request);

    // get the details from resopnse.data
    const $ = Cheerio.load(response.data);
    const timeOfAppointment = $('.control-label[for!=holdDate]').text(); // ie. "Time of Appointment for March 06, 2021: "
    const date = timeOfAppointment
      .replace('Time of Appointment for ', '')
      .replace(': ', '');
    const firstTimeSlotAvailable = $('#timeslots .availableTimeslot')
      .first()
      .text()
      .trim(); // ie. "9:00 AM"
    const navItem = $('.setup-panel li.nav-item'); // ie. "West Deptford - License or Non Driver ID Renewal"
    const navItemValues: Record<string, string> = {};
    const navItemKeys = ['appointmentType', 'location'];
    navItem.each((i, el) => {
      if (i > 1) return;

      navItemValues[navItemKeys[i]] = `${$(el).text().trim()} `;
    });

    const appointmentType = $('.setup-panel li.nav-item:nth-child(1)')
      .text()
      .trim(); // ie. "West Deptford - License or Non Driver ID Renewal"
    const location = $('.setup-panel li.nav-item:nth-child(2)').text().trim();

    const formatedDate = dayjs(date).format('MM-DD-YYYY');

    if (!firstTimeSlotAvailable) {
      return null;
    }

    return {
      date: formatedDate,
      appointmentTypeKey: appointmentTypeKey,
      locationKey: locationKey,
      locationName: location,
      time: firstTimeSlotAvailable,
      appointmentTypeName: appointmentType,
      link: url,
      slug: appoinmentLocation.slug,
    };
  }
}
