export const SlackBotToken =
  // 'xoxb-4017857211505-4221108883874-fuuPQeGHl8NqY4FKRUCUh0Uv'; // Testing
  'xoxb-4251155139108-4234167679575-AWkJtjgYdVwhJhT6lmSapqT6'; // Production

if (SlackBotToken === undefined)
  throw new Error('SlackBotToken is undefined, please set it in .env');

export type Location = {
  locationKey: string;
  locationName: string;
  slug: string;
};

export type LocationsByAppointmentType = {
  appointmentTypeKey: string;
  name: string;
  slug: string;
  locations: Location[];
};

export const locationsByAppointmentType: LocationsByAppointmentType[] = [
  {
    appointmentTypeKey: '15',
    name: 'INITIAL PERMIT (BEFORE KNOWLEDGE TEST)',
    slug: 'initial-permit',
    locations: [
      {
        locationName: 'Edison - Permits/License',
        slug: 'edison',
        locationKey: '194',
      },
      {
        locationName: 'BAYONNE - PERMITS/LICENSE',
        slug: 'bayonne',
        locationKey: '187',
      },
      {
        locationName: 'ELIZABETH - PERMITS/LICENSE',
        slug: 'elizabeth',
        locationKey: '264',
      },
      {
        locationName: 'Newark - Permits/License',
        slug: 'newark',
        locationKey: '200',
      },
      {
        locationName: 'North Bergen - Permits/License',
        slug: 'north-bergen',
        locationKey: '201',
      },
      {
        locationName: 'Oakland - Permits/License',
        slug: 'oakland',
        locationKey: '203',
      },
      {
        locationName: 'PATERSON - PERMITS/LICENSE',
        slug: 'paterson',
        locationKey: '204',
      },
      {
        locationName: 'RAHWAY - PERMITS/LICENSE',
        slug: 'rahway',
        locationKey: '206',
      },
      {
        locationName: 'SOUTH PLAINFIELD - PERMITS/LICENSE',
        slug: 'south-plainfield',
        locationKey: '193',
      },
      {
        locationName: 'WAYNE - PERMITS/LICENSE',
        slug: 'wayne',
        locationKey: '202',
      },
    ],
  },
  {
    appointmentTypeKey: '19',
    name: 'KNOWLEDGE TEST (NOT CDL)',
    slug: 'knowledge-test-not-cdl',
    locations: [
      {
        locationName: 'BAYONNE - NON-CDL KNOWLEDGE TEST',
        slug: 'bayonne',
        locationKey: '268',
      },
      {
        locationName: 'EDISON - NON-CDL KNOWLEDGE TEST',
        slug: 'edison',
        locationKey: '275',
      },
      {
        locationName: 'ELIZABETH - NON-CDL KNOWLEDGE TEST',
        slug: 'elizabeth',
        locationKey: '290',
      },
      {
        locationName: 'NEWARK - NON-CDL KNOWLEDGE TEST',
        slug: 'newark',
        locationKey: '281',
      },
      {
        locationName: 'PATERSON - NON-CDL KNOWLEDGE TEST',
        slug: 'paterson',
        locationKey: '285',
      },
      {
        locationName: 'NORTH BERGEN - NON-CDL KNOWLEDGE TEST',
        slug: 'north-bergen',
        locationKey: '282',
      },
      {
        locationName: 'RAHWAY - NON-CDL KNOWLEDGE TEST',
        slug: 'rahway',
        locationKey: '287',
      },
      {
        locationName: 'SOUTH PLAINFIELD - NON-CDL KNOWLEDGE TEST',
        slug: 'south-plainfield',
        locationKey: '274',
      },
      {
        locationName: 'WAYNE - NON-CDL KNOWLEDGE TEST',
        slug: 'wayne',
        locationKey: '283',
      },
    ],
  },
  {
    appointmentTypeKey: '16',
    name: 'NON-DRIVER ID',
    slug: 'non-driver-id',
    locations: [
      {
        locationName: 'BAYONNE - NON-DRIVER ID',
        slug: 'bayonne',
        locationKey: '210',
      },
    ],
  },
  {
    appointmentTypeKey: '252',
    name: 'AUTO ROAD TEST',
    slug: 'auto-road-test',
    locations: [
      {
        locationName: 'NEWARK - NON-CDL ROAD TEST',
        slug: 'newark',
        locationKey: '420',
      },
      {
        locationName: 'RAHWAY - NON-CDL ROAD TEST',
        slug: 'rahway',
        locationKey: '421',
      },
      {
        locationName: 'WAYNE - NON-CDL ROAD TEST',
        slug: 'wayne',
        locationKey: '424',
      },
    ],
  },
];
