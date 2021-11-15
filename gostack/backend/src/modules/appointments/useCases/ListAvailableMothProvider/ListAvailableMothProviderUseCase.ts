import { inject, injectable } from 'tsyringe';

import { IListAvailableDaysInMonthDTO } from '@modules/appointments/dtos/IListAvailableDaysInMonthDTO';
import { IListAvailableMothProviderDTO } from '@modules/appointments/dtos/IListAvailableMothProviderDTO';
import { IAppointmentsRepository } from '@modules/appointments/repositories/IAppointmentsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/infra/middlewares/errors/AppError';

@injectable()
class ListAvailableMothProviderUseCase {
  constructor(
    @inject('DateProvider')
    private dateProvider: IDateProvider,

    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({ provider_id, month, year }: IListAvailableMothProviderDTO): Promise<IListAvailableDaysInMonthDTO[]> {
    const findAppointments = await this.appointmentsRepository.findAllAppointmentsProviderInMonth({
      provider_id,
      month,
      year,
    });

    // if (findAppointments.length === 0) {
    //   throw new AppError('Provider or appointment not found');
    // }

    const daysInMonth = this.dateProvider.listAvailableDaysInMonth(month, year);

    const availableDaysInMonth = daysInMonth.map(available => {
      this.dateProvider.IsMonthAfter({ day: available.day, month, year });

      const filteredDateAppointment = findAppointments.filter(appointment => new Date(appointment.date).getDate() === available.day);
      return {
        day: available.day,
        available: this.dateProvider.IsMonthAfter({ day: available.day, month, year }) && filteredDateAppointment.length < 10,
      };
    });

    return availableDaysInMonth;
  }
}

export { ListAvailableMothProviderUseCase };
