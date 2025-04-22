import { FormProvider, RHFTextField } from '@/components/hook-form';
import { Button } from '@/components/ui/button';
import { getPath } from '@/routes/paths';
import { usePasswordResetMutation } from '@/services/user';
import { cn } from '@/utils/shadcn';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import z from 'zod';

import { passwordResetSchema } from '@openathlete/shared';

export function PasswordResetView({ className }: React.ComponentProps<'form'>) {
  const nav = useNavigate();
  const passwordResetMutation = usePasswordResetMutation({
    onSuccess: async () => {
      nav(getPath(['auth', 'login']));
      toast.success('Password updated successfully');
    },
    onError: () => {
      toast.error('Error updating password');
    },
  });
  const methods = useForm<z.infer<typeof passwordResetSchema>>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: { token: '', password: '' },
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) =>
    passwordResetMutation.mutate(data),
  );

  return (
    <FormProvider
      methods={methods}
      onSubmit={onSubmit}
      className={cn('flex flex-col gap-6', className)}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Reset your password</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your new password and we will update it for you.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <RHFTextField
            name="password"
            type="password"
            placeholder="********"
            label="New password"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          onClick={onSubmit}
          isLoading={passwordResetMutation.isPending}
        >
          Update password
        </Button>
      </div>
    </FormProvider>
  );
}
