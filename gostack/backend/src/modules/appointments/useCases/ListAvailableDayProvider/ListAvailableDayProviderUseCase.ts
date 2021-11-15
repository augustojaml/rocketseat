import { inject, injectable } from 'tsyringe';

import { IListAvailableHoursInDayDTO } from '@modules/appointments/dtos/IListAvailableHoursInDayDTO';
import { IListAvailableDayProviderDTO } from '@modules/appointments/dtos/ListAvailableDayProviderDTO';
import { IAppointmentsRepository } from '@modules/appointments/repositories/IAppointmentsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/infra/middlewares/errors/AppError';

@injectable()
class ListAvailableDayProviderUseCase {
  constructor(
    @inject('DateProvider')
    private dateProvider: IDateProvider,

    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({ provider_id, day, month, year }: IListAvailableDayProviderDTO): Promise<IListAvailableHoursInDayDTO[]> {
    const findAppointments = await this.appointmentsRepository.findAllAppointmentsProviderInDay({ provider_id, day, month, year });
    // if (findAppointments.length === 0) {
    //   throw new AppError('Provider or appointment not found');
    // }

    const hoursInDay = this.dateProvider.listAvailableHoursInDay(8);

    const availableHoursInDay = hoursInDay.map(available => {
      const filteredProvider = findAppointments.find(appointment => new Date(appointment.date).getHours() === available.hour);
      return {
        hour: available.hour,
        available: !filteredProvider && this.dateProvider.IsDayAfter({ hour: available.hour, day, month, year }),
      };
    });

    return availableHoursInDay;
  }
}

export { ListAvailableDayProviderUseCase };
