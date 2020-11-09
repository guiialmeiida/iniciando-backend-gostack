import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/fakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(fakeAppointmentsRepository);
  })

  it('should be able to list the day availability from provider', async() => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2030, 4, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2030, 4, 20, 10, 0, 0),
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      year: 2030,
      month: 5,
      day: 20,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { houer: 8, available: false },
        { houer: 9, available: true },
        { houer: 10, available: false },
        { houer: 11, available: true },
      ]),
    );
  });
});
