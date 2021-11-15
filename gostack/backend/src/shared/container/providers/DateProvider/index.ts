import { container } from 'tsyringe';

import { IDateProvider } from './IDateProvider';
import { DayJsProvider } from './implementations/DayJsProvider';

container.registerSingleton<IDateProvider>('DateProvider', DayJsProvider);
