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

export const MAX_DAYS_TO_APPOINTMENT = 30;

const testData: LocationsByAppointmentType[] = [
  {
    appointmentTypeKey: '252',
    name: 'AUTO ROAD TEST',
    slug: 'auto-road-test',
    locations: [
      {
        locationName: 'NEWARK - NON-CDL ROAD TEST',
        slug: 'newark-testing-dev',
        locationKey: '420',
      },
    ],
  },
];

export const locationsByAppointmentType: LocationsByAppointmentType[] =
  process.env.NODE_ENV !== 'production'
    ? testData
    : [
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
            {
              locationName: 'NEWARK - NON-DRIVER ID',
              slug: 'newark',
              locationKey: '223',
            },
            {
              locationName: 'PATERSON - NON-DRIVER ID',
              slug: 'paterson',
              locationKey: '227',
            },
            {
              locationName: 'ELIZABETH - NON-DRIVER ID',
              slug: 'elizabeth',
              locationKey: '262',
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
