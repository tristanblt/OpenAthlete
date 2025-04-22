import { FormProvider, RHFTextField } from '@/components/hook-form';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/contexts/auth';
import { useUpdateAccountMutation } from '@/services/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { updateAccountDtoSchema } from '@openathlete/shared';

interface P {}

export function ProfileTab({}: P) {
  const { user } = useAuthContext();
  const updateAccountMutation = useUpdateAccountMutation({
    onSuccess: async () => {
      toast.success('Account updated successfully');
    },
  });
  const methods = useForm<z.infer<typeof updateAccountDtoSchema>>({
    resolver: zodResolver(updateAccountDtoSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) =>
    updateAccountMutation.mutate(data),
  );
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="text-muted-foreground text-sm text-balance my-4">
        Update your profile information below
      </div>
      <div className="flex flex-col gap-4 w-fit">
        <RHFTextField
          name="firstName"
          type="text"
          placeholder="John"
          label="First Name"
          required
        />
        <RHFTextField
          name="lastName"
          type="text"
          placeholder="Doe"
          label="Last Name"
          required
        />
        <Button
          type="submit"
          className="w-fit"
          isLoading={updateAccountMutation.isPending}
        >
          Update
        </Button>
      </div>
    </FormProvider>
  );
}
