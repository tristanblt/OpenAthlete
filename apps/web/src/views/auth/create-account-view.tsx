import { FormProvider, RHFTextField } from '@/components/hook-form';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/contexts/auth';
import { getPath } from '@/routes/paths';
import { useLoginMutation } from '@/services/auth';
import { useCreateAccountMutation } from '@/services/user';
import { cn } from '@/utils/shadcn';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import z from 'zod';

import { createAccountDtoSchema } from '@openathlete/shared';

export function CreateAccountView({ className }: React.ComponentProps<'form'>) {
  const { initialize } = useAuthContext();
  const navigate = useNavigate();
  const loginMutation = useLoginMutation({
    onSuccess: async () => {
      await initialize();
      navigate(getPath(['dashboard']));
    },
  });
  const createAccountMutation = useCreateAccountMutation({
    onSuccess: async (_, variables) => {
      loginMutation.mutate(variables);
    },
  });
  const methods = useForm<z.infer<typeof createAccountDtoSchema>>({
    resolver: zodResolver(createAccountDtoSchema),
    defaultValues: { email: '', password: '', firstName: '', lastName: '' },
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) =>
    createAccountMutation.mutate(data),
  );

  return (
    <FormProvider
      methods={methods}
      onSubmit={onSubmit}
      className={cn('flex flex-col gap-6', className)}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your details below to create an account
        </p>
      </div>
      <div className="grid gap-6">
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
        <RHFTextField
          name="email"
          type="email"
          placeholder="m@example.com"
          label="Email"
          required
        />
        <RHFTextField
          name="password"
          type="password"
          required
          label="Password"
        />
        <Button
          type="submit"
          className="w-full"
          onClick={onSubmit}
          isLoading={createAccountMutation.isPending}
        >
          Create Account
        </Button>
        {/* <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full">
          <StravaIcon />
          Sign up with Strava
        </Button> */}
      </div>
      <div className="text-center text-sm">
        Already have an account?{' '}
        <Link to="/auth/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </FormProvider>
  );
}
