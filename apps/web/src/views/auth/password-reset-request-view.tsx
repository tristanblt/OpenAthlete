import { FormProvider, RHFTextField } from '@/components/hook-form';
import { Button } from '@/components/ui/button';
import { usePasswordResetRequestMutation } from '@/services/user';
import { cn } from '@/utils/shadcn';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import z from 'zod';

import { passwordResetRequestSchema } from '@openathlete/shared';

export function PasswordResetRequestView({
  className,
}: React.ComponentProps<'form'>) {
  const passwordResetRequestMutation = usePasswordResetRequestMutation({
    onSuccess: async () => {
      toast.success('Password reset email sent');
    },
    onError: () => {
      toast.error('Error sending password reset email');
    },
  });
  const methods = useForm<z.infer<typeof passwordResetRequestSchema>>({
    resolver: zodResolver(passwordResetRequestSchema),
    defaultValues: { email: '' },
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) =>
    passwordResetRequestMutation.mutate(data),
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
          Enter your email address and we will send you a link to reset your
          password.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <RHFTextField
            name="email"
            type="email"
            placeholder="m@example.com"
            label="Email"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          onClick={onSubmit}
          isLoading={passwordResetRequestMutation.isPending}
        >
          Send password reset email
        </Button>
      </div>
      <div className="text-center text-sm">
        Remembered your password?{' '}
        <Link to="/auth/login" className="underline underline-offset-4">
          Log in
        </Link>
      </div>
    </FormProvider>
  );
}
