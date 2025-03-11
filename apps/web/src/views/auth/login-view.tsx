import { StravaIcon } from '@/assets/icons';
import { FormProvider, RHFTextField } from '@/components/hook-form';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAuthContext } from '@/contexts/auth';
import { getPath } from '@/routes/paths';
import { useLoginMutation } from '@/services/auth';
import { cn } from '@/utils/shadcn';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import z from 'zod';

import { loginDtoSchema } from '@openathlete/shared';

export function LoginView({ className }: React.ComponentProps<'form'>) {
  const { initialize } = useAuthContext();
  const navigate = useNavigate();
  const loginMutation = useLoginMutation({
    onSuccess: async () => {
      await initialize();
      navigate(getPath(['dashboard']));
    },
  });
  const methods = useForm<z.infer<typeof loginDtoSchema>>({
    resolver: zodResolver(loginDtoSchema),
    defaultValues: { email: '', password: '' },
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => loginMutation.mutate(data));

  return (
    <FormProvider
      methods={methods}
      onSubmit={onSubmit}
      className={cn('flex flex-col gap-6', className)}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
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
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <RHFTextField name="password" type="password" required />
        </div>
        <Button type="submit" className="w-full" onClick={onSubmit}>
          Login
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full">
          <StravaIcon />
          Login with Strava
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link
          to="/auth/create-account"
          className="underline underline-offset-4"
        >
          Sign up
        </Link>
      </div>
    </FormProvider>
  );
}
