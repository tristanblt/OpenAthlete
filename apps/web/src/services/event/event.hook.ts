import {
  MutationOptions,
  QueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { EventService } from './event.service';

export const useCreateEventMutation = (
  opt?: MutationOptions<
    Awaited<ReturnType<typeof EventService.createEvent>>,
    Error,
    Parameters<typeof EventService.createEvent>[0]
  >,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    ...opt,
    mutationFn: EventService.createEvent,
    onSuccess: (data, variables, context) => {
      if (opt?.onSuccess) opt.onSuccess(data, variables, context);
      queryClient.invalidateQueries({ queryKey: ['EventService.getMyEvents'] });
    },
  });
};

export const useGetMyEventsQuery = (
  opt?: QueryOptions<Awaited<ReturnType<typeof EventService.getMyEvents>>>,
) =>
  useQuery({
    ...opt,
    queryFn: EventService.getMyEvents,
    queryKey: ['EventService.getMyEvents'],
  });
