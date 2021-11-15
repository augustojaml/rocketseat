import Cookies from 'js-cookie';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { api } from '../services/api';
import { StorageToken } from '../_support/StorageToken';
import { ToastMessage } from '../_support/ToastMessage';
import { useAccounts } from './useAccounts';

interface IAppointmentsProvider {
  children: ReactNode;
}

export interface IAppointments {
  id: string;
  date: Date;
  user: {
    name: string;
    avatar_url: string;
  };
}

interface IMonthAvailable {
  day: number;
  available: boolean;
}

interface AppointmentsContext {
  isLoading: boolean;
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
  currentMonth: Date;
  setCurrentMonth: Dispatch<SetStateAction<Date>>;
  currentAppointment: IAppointments;
  appointmentMorning: IAppointments[];
  appointmentAfternoon: IAppointments[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  monthAvailable: IMonthAvailable[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setMonthAvailable: Dispatch<SetStateAction<IMonthAvailable[]>>;
  disabledDay: Date[];
}

const AppointmentsContext = createContext<AppointmentsContext>(
  {} as AppointmentsContext,
);

function AppointmentsProvider({ children }: IAppointmentsProvider) {
  const { user } = useAccounts();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentAppointment, setCurrentAppointment] = useState<IAppointments>();
  const [appointmentMorning, setAppointmentMorning] =
    useState<IAppointments[]>();
  const [appointmentAfternoon, setAppointmentAfternoon] =
    useState<IAppointments[]>();

  const [monthAvailable, setMonthAvailable] = useState<IMonthAvailable[]>([]);

  const disabledDay = useMemo(() => {
    const dates = monthAvailable
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentMonth, monthAvailable]);

  useEffect(() => {
    (async () => {
      const token = Cookies.get(StorageToken.value);
      if (token) {
        api.defaults.headers.common.authorization = `Bearer ${token}`;
        try {
          setIsLoading(true);
          const { data } = await api.get<IAppointments[]>('appointments/me', {
            params: {
              day: selectedDate.getDate(),
              month: selectedDate.getMonth() + 1,
              year: selectedDate.getFullYear(),
            },
          });
          setAppointmentMorning(
            data.filter(
              appointment => new Date(appointment.date).getHours() < 12,
            ),
          );

          setAppointmentAfternoon(
            data.filter(
              appointment => new Date(appointment.date).getHours() >= 12,
            ),
          );
          setCurrentAppointment(data[0]);
        } catch (err) {
          ToastMessage.show(err, 'error');
        } finally {
          setIsLoading(false);
        }
      }
    })();
  }, [selectedDate]);

  useEffect(() => {
    (async () => {
      if (user) {
        const response = await api.get(
          `/providers/${user?.id}/available-month`,
          {
            params: {
              month: currentMonth.getMonth() + 1,
              year: currentMonth.getFullYear(),
            },
          },
        );
        setMonthAvailable(response.data);
      }
    })();
  }, [currentMonth, user, user?.id]);

  return (
    <>
      <AppointmentsContext.Provider
        value={{
          isLoading,
          selectedDate,
          setSelectedDate,
          currentMonth,
          setCurrentMonth,
          currentAppointment,
          appointmentMorning,
          appointmentAfternoon,
          monthAvailable,
          setMonthAvailable,
          disabledDay,
        }}
      >
        {children}
      </AppointmentsContext.Provider>
    </>
  );
}

function useAppointments() {
  return useContext(AppointmentsContext);
}

export { AppointmentsProvider, useAppointments };
