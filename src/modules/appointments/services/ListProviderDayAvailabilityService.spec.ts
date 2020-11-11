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
      date: new Date(2020, 11, 20, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 11, 20, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 11, 20, 11).getTime();
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 12,
      day: 20,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { houer: 8, available: false },
        { houer: 9, available: false },
        { houer: 10, available: false },
        { houer: 13, available: true },
        { houer: 14, available: false },
        { houer: 15, available: false },
        { houer: 16, available: true },
      ]),
    );
  });
});
