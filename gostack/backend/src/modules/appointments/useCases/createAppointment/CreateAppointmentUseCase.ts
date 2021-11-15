import { inject, injectable } from 'tsyringe';

import { ICreateAppointmentDTO } from '@modules/appointments/dtos/ICreateAppointmentDTO';
import { IAppointmentsRepository } from '@modules/appointments/repositories/IAppointmentsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/infra/middlewares/errors/AppError';

import { Appointment } from '.prisma/client';

@injectable()
class CreateAppointmentUseCase {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, provider_id, date }: ICreateAppointmentDTO): Promise<Appointment | undefined> {
    const findUser = await this.usersRepository.findById(provider_id);

    if (!findUser) {
      throw new AppError('Provider does not exist');
    }

    if (user_id === provider_id) {
      throw new AppError('You cannot create a schedule with yourself');
    }

    if (this.dateProvider.startHours(date).getHours() < 8 || this.dateProvider.startHours(date).getHours() > 17) {
      throw new AppError('You cant create appointment before 8am ou after 17');
    }
    const findAppointment = await this.appointmentsRepository.findByDate(this.dateProvider.startHours(date));

    if (findAppointment) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: this.dateProvider.startHours(date),
    });

    return appointment;
  }
}

export { CreateAppointmentUseCase };
