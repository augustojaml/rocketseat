import { ICreateAppointmentDTO } from '@modules/appointments/dtos/ICreateAppointmentDTO';
import { IListAvailableMothProviderDTO } from '@modules/appointments/dtos/IListAvailableMothProviderDTO';
import { IListAvailableDayProviderDTO } from '@modules/appointments/dtos/ListAvailableDayProviderDTO';
import prismaClient from '@shared/infra/prisma/client';

import { Appointment } from '.prisma/client';

import { IAppointmentsRepository } from '../IAppointmentsRepository';

class PrismaAppointmentsRepository implements IAppointmentsRepository {
  public async create({ provider_id, user_id, date }: ICreateAppointmentDTO): Promise<Appointment | undefined> {
    const appointment = await prismaClient.appointment.create({
      data: {
        provider_id: provider_id,
        user_id: user_id,
        date: date,
      },
    });

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment> {
    const appointment = await prismaClient.appointment.findFirst({
      where: {
        date: date,
      },
    });

    return appointment;
  }

  public async all(): Promise<Appointment[]> {
    const appointments = await prismaClient.appointment.findMany({
      include: {
        provider: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            isHairdresser: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            isHairdresser: true,
          },
        },
      },
    });
    return appointments;
  }

  public async findAllAppointmentsProviderInMonth({ provider_id, month, year }: IListAvailableMothProviderDTO): Promise<Appointment[]> {
    const appointments = await prismaClient.appointment.findMany({
      where: {
        AND: [
          {
            provider_id: provider_id,
          },
          {
            date: {
              gte: new Date(year, month - 1, 1, 0, 0, 0),
              lte: new Date(year, month - 1, 31, 23, 59, 99),
            },
          },
        ],
      },
      include: {
        provider: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            isHairdresser: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            isHairdresser: true,
          },
        },
      },
    });

    return appointments;
  }

  public async findAllAppointmentsProviderInDay({ provider_id, day, month, year }: IListAvailableDayProviderDTO): Promise<Appointment[]> {
    const appointments = await prismaClient.appointment.findMany({
      where: {
        AND: [
          {
            provider_id: provider_id,
          },
          {
            date: {
              gte: new Date(year, month - 1, day, 0, 0, 0),
              lte: new Date(year, month - 1, day, 23, 59, 99),
            },
          },
        ],
      },
      include: {
        provider: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            isHairdresser: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            isHairdresser: true,
          },
        },
      },
    });

    return appointments;
  }
}

export { PrismaAppointmentsRepository };
