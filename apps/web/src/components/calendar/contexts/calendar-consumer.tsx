import { CalendarContext } from './calendar-context';

type Props = {
  children: React.ReactNode;
};

export function CalendarConsumer({ children }: Props) {
  return <CalendarContext.Consumer>{() => children}</CalendarContext.Consumer>;
}
