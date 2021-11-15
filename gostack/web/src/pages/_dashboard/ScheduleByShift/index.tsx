import { FiClock } from 'react-icons/fi';
import { IAppointments } from '../../../hooks/useAppointments';
import { FormatDate } from '../../../_support/FormatDate';
import { Container, Content } from './styled';

interface IScheduleByShift {
  title: string;
  appointments: IAppointments[];
}

export function ScheduleByShift({ title, appointments }: IScheduleByShift) {
  return (
    <>
      <Container>
        <span>{title}</span>

        {appointments?.map(appointment => (
          <Content key={appointment?.id}>
            <FiClock /> <span>{FormatDate.hours(appointment?.date)}</span>
            <div>
              <img
                src={appointment?.user.avatar_url}
                alt={appointment?.user.name}
              />
              <strong>{appointment?.user.name}</strong>
            </div>
          </Content>
        ))}
      </Container>
    </>
  );
}
