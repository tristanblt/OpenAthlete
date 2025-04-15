import { SpaceContext } from './space-context';

type Props = {
  children: React.ReactNode;
};

export function SpaceConsumer({ children }: Props) {
  return <SpaceContext.Consumer>{() => children}</SpaceContext.Consumer>;
}
