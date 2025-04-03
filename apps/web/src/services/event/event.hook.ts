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

export const useGetEventQuery = (
  eventId: number,
  opt?: QueryOptions<Awaited<ReturnType<typeof EventService.getEvent>>>,
) =>
  useQuery({
    ...opt,
    queryFn: () => EventService.getEvent(eventId),
    queryKey: ['EventService.getEvent', eventId],
  });

export const useGetEventStreamQuery = (
  eventId: number,
  resolution: number,
  keys?: string[],
  opt?: QueryOptions<Awaited<ReturnType<typeof EventService.getEventStream>>>,
) =>
  useQuery({
    ...opt,
    queryFn: () => EventService.getEventStream(eventId, resolution, keys),
    queryKey: ['EventService.getEventStream', eventId, resolution, keys],
  });

export const useDeleteEventMutation = (
  opt?: MutationOptions<
    Awaited<ReturnType<typeof EventService.deleteEvent>>,
    Error,
    Parameters<typeof EventService.deleteEvent>[0]
  >,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    ...opt,
    mutationFn: EventService.deleteEvent,
    onSuccess: (data, variables, context) => {
      if (opt?.onSuccess) opt.onSuccess(data, variables, context);
      queryClient.invalidateQueries({ queryKey: ['EventService.getMyEvents'] });
    },
  });
};

export const useSetRelatedActivityMutation = (
  opt?: MutationOptions<
    Awaited<ReturnType<typeof EventService.setRelatedActivity>>,
    Error,
    Parameters<typeof EventService.setRelatedActivity>[0]
  >,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    ...opt,
    mutationFn: EventService.setRelatedActivity,
    onSuccess: (data, variables, context) => {
      if (opt?.onSuccess) opt.onSuccess(data, variables, context);
      queryClient.invalidateQueries({
        queryKey: ['EventService.getEvent', variables.eventId],
      });
    },
  });
};

export const useUnsetRelatedActivityMutation = (
  opt?: MutationOptions<
    Awaited<ReturnType<typeof EventService.unsetRelatedActivity>>,
    Error,
    Parameters<typeof EventService.unsetRelatedActivity>[0]
  >,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    ...opt,
    mutationFn: EventService.unsetRelatedActivity,
    onSuccess: (data, variables, context) => {
      if (opt?.onSuccess) opt.onSuccess(data, variables, context);
      queryClient.invalidateQueries({
        queryKey: ['EventService.getEvent', variables],
      });
    },
  });
};
