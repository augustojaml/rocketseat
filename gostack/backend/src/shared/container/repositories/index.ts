import { container } from 'tsyringe';

import { IAppointmentsRepository } from '@modules/appointments/repositories/IAppointmentsRepository';
import { PrismaAppointmentsRepository } from '@modules/appointments/repositories/prisma/PrismaAppointmentsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/users/repositories/IUsersTokensRepository';
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/PrismaUsersRepository';
import { PrismaUsersTokensRepository } from '@modules/users/repositories/prisma/PrismaUsersTokensRepository';

// USERS
container.registerSingleton<IUsersRepository>('UsersRepository', PrismaUsersRepository);
container.registerSingleton<IUsersTokensRepository>('UsersTokensRepository', PrismaUsersTokensRepository);

// APPOINTMENTS
container.registerSingleton<IAppointmentsRepository>('AppointmentsRepository', PrismaAppointmentsRepository);
