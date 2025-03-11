import {
  MutationOptions,
  QueryOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';

import { UserService } from './user.service';

export const useCreateAccountMutation = (
  opt?: MutationOptions<
    Awaited<ReturnType<typeof UserService.createAccount>>,
    Error,
    Parameters<typeof UserService.createAccount>[0]
  >,
) => {
  return useMutation({
    ...opt,
    mutationFn: UserService.createAccount,
  });
};

export const useGetMeQuery = (
  opt?: QueryOptions<Awaited<ReturnType<typeof UserService.getMe>>>,
) =>
  useQuery({
    ...opt,
    queryFn: UserService.getMe,
    queryKey: ['UserService.getMe'],
  });
