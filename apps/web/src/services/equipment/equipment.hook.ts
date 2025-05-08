import {
  MutationOptions,
  QueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { EquipmentService } from './equipment.service';

export const useGetMyEquipmentQuery = (
  opt?: QueryOptions<
    Awaited<ReturnType<typeof EquipmentService.getMyEquipment>>
  >,
) => {
  return useQuery({
    ...opt,
    queryKey: ['getMyEquipment'],
    queryFn: EquipmentService.getMyEquipment,
  });
};

export const useCreateEquipmentMutation = (
  opt?: MutationOptions<
    Awaited<ReturnType<typeof EquipmentService.createEquipment>>,
    Error,
    Parameters<typeof EquipmentService.createEquipment>[0]
  >,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    ...opt,
    mutationFn: EquipmentService.createEquipment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getMyEquipment'] });
    },
  });
};

export const useUpdateEquipmentMutation = (
  opt?: MutationOptions<
    Awaited<ReturnType<typeof EquipmentService.updateEquipment>>,
    Error,
    Parameters<typeof EquipmentService.updateEquipment>[0]
  >,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    ...opt,
    mutationFn: EquipmentService.updateEquipment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getMyEquipment'] });
    },
  });
};

export const useDeleteEquipmentMutation = (
  opt?: MutationOptions<
    Awaited<ReturnType<typeof EquipmentService.deleteEquipment>>,
    Error,
    Parameters<typeof EquipmentService.deleteEquipment>[0]
  >,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    ...opt,
    mutationFn: EquipmentService.deleteEquipment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getMyEquipment'] });
    },
  });
};
