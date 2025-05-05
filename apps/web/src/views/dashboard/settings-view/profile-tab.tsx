import { FormProvider, RHFTextField } from '@/components/hook-form';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/contexts/auth';
import { m } from '@/paraglide/messages';
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
      toast.success(m.account_updated_successfully());
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
        {m.update_profile_information()}
      </div>
      <div className="flex flex-col gap-4 w-fit">
        <RHFTextField
          name="firstName"
          type="text"
          placeholder={m.first_name_placeholder()}
          label={m.first_name()}
          required
        />
        <RHFTextField
          name="lastName"
          type="text"
          placeholder={m.last_name_placeholder()}
          label={m.last_name()}
          required
        />
        <Button
          type="submit"
          className="w-fit"
          isLoading={updateAccountMutation.isPending}
        >
          {m.update()}
        </Button>
      </div>
    </FormProvider>
  );
}
