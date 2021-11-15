import { ICreateAppointmentDTO } from '@modules/appointments/dtos/ICreateAppointmentDTO';

import { Appointment } from '.prisma/client';

import { IListAvailableMothProviderDTO } from '../dtos/IListAvailableMothProviderDTO';
import { IListAvailableDayProviderDTO } from '../dtos/ListAvailableDayProviderDTO';

interface IAppointmentsRepository {
  create({ provider_id, user_id, date }: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment>;
  all(): Promise<Appointment[]>;
  findAllAppointmentsProviderInMonth({ provider_id, month, year }: IListAvailableMothProviderDTO): Promise<Appointment[]>;
  findAllAppointmentsProviderInDay({ provider_id, day, month, year }: IListAvailableDayProviderDTO): Promise<Appointment[]>;
}

export { IAppointmentsRepository };
