import { FiClock } from 'react-icons/fi';
import { IAppointments } from '../../../hooks/useAppointments';
import { FormatDate } from '../../../_support/FormatDate';
import { Container } from './styled';

interface ICurrentSchedule {
  currentSchedule: IAppointments;
}

export function CurrentSchedule({ currentSchedule }: ICurrentSchedule) {
  return (
    <>
      <Container>
        <span>Service to follow</span>
        <div className="content">
          <div>
            <img
              src={
                currentSchedule
                  ? currentSchedule?.user.avatar_url
                  : '/assets/default-user.png'
              }
              alt="Augusto Monteiro"
            />
            <strong>{currentSchedule?.user.name}</strong>
          </div>
          <div>
            <FiClock />
            <span>{FormatDate.hours(currentSchedule?.date)}</span>
          </div>
        </div>
      </Container>
    </>
  );
}
