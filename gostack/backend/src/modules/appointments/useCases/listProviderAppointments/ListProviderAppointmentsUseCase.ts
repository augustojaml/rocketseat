import { inject, injectable } from 'tsyringe';

import { IListProviderAppointmentsDTO } from '@modules/appointments/dtos/IListProviderAppointmentsDTO';
import { IAppointmentsRepository } from '@modules/appointments/repositories/IAppointmentsRepository';
import { StorageSupport } from '@support/StorageSupport';

interface IAppointmentsResponse {
  id: string;
  date: Date;
  user: {
    name: string;
    avatar_url: string;
  };
}

@injectable()
class ListProviderAppointmentsUseCase {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({ provider_id, day, month, year }: IListProviderAppointmentsDTO): Promise<IAppointmentsResponse[]> {
    const findAppointments = await this.appointmentsRepository.findAllAppointmentsProviderInDay({
      provider_id,
      day,
      month,
      year,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const appointmentsResponse = findAppointments.map((appointment: any) => {
      return {
        id: appointment.id,
        date: appointment.date,
        user: {
          name: appointment.user.name,
          avatar_url: appointment.user.avatar && `${StorageSupport.appURL}/avatar/${appointment.user.avatar}`,
        },
      };
    });

    return appointmentsResponse;
  }
}

export { ListProviderAppointmentsUseCase };
