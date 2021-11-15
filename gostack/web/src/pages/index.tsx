import { GetServerSideProps } from 'next';
import { useAppointments } from '../hooks/useAppointments';

import {
  CalendarContent,
  Container,
  Content,
  ContentScroll,
  ScheduleContent,
} from './styled';
import { Calendar } from './_dashboard/Calendar';
import { CurrentSchedule } from './_dashboard/CurrentSchedule';
import { Header } from './_dashboard/Header';
import { ScheduleByShift } from './_dashboard/ScheduleByShift';

export default function Home(): JSX.Element {
  const {
    selectedDate,
    isLoading,
    currentAppointment,
    appointmentAfternoon,
    appointmentMorning,
  } = useAppointments();

  return (
    <>
      <Container>
        <Header />
        <ContentScroll>
          <Content>
            <ScheduleContent>
              <h1>Scheduled times</h1>
              <div className="currentDay">
                {selectedDate.getDate() === new Date().getDate() && (
                  <span>Today</span>
                )}
                <span>
                  Day{' '}
                  {selectedDate.toLocaleString('en-us', {
                    month: 'long',
                    day: '2-digit',
                  })}
                </span>
                <span>
                  {selectedDate.toLocaleString('en-us', { weekday: 'long' })}
                </span>
              </div>
              {!isLoading && (
                <>
                  {currentAppointment && (
                    <CurrentSchedule currentSchedule={currentAppointment} />
                  )}

                  {appointmentMorning && (
                    <ScheduleByShift
                      title="morning"
                      appointments={appointmentMorning}
                    />
                  )}

                  {appointmentAfternoon && (
                    <ScheduleByShift
                      title="afternoon"
                      appointments={appointmentAfternoon}
                    />
                  )}
                </>
              )}
            </ScheduleContent>
            <CalendarContent>
              <Calendar />
            </CalendarContent>
          </Content>
        </ContentScroll>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { AppGoBarber } = ctx.req.cookies;

  if (!AppGoBarber) {
    return {
      redirect: {
        destination: '/accounts/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
