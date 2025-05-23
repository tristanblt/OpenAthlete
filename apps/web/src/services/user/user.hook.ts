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

export const useUpdateAccountMutation = (
  opt?: MutationOptions<
    Awaited<ReturnType<typeof UserService.updateAccount>>,
    Error,
    Parameters<typeof UserService.updateAccount>[0]
  >,
) => {
  return useMutation({
    ...opt,
    mutationFn: UserService.updateAccount,
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

export const usePasswordResetRequestMutation = (
  opt?: MutationOptions<
    Awaited<ReturnType<typeof UserService.passwordResetRequest>>,
    Error,
    Parameters<typeof UserService.passwordResetRequest>[0]
  >,
) => {
  return useMutation({
    ...opt,
    mutationFn: UserService.passwordResetRequest,
  });
};

export const usePasswordResetMutation = (
  opt?: MutationOptions<
    Awaited<ReturnType<typeof UserService.passwordReset>>,
    Error,
    Parameters<typeof UserService.passwordReset>[0]
  >,
) => {
  return useMutation({
    ...opt,
    mutationFn: UserService.passwordReset,
  });
};
