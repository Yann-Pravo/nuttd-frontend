import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { z } from 'zod';
import { useEffect } from 'react';
import ROUTES from 'constants/paths';
import { useAuth } from 'contexts/auth';
import { Route } from 'routes/login';
import { Link, useRouter } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputPassword } from '@/components/ui/input-password';

const Form = () => {
  const router = useRouter();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const { login, isLoading, isAuthenticated } = useAuth();
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validatorAdapter: zodValidator,
    onSubmit: ({ value }) => login(value),
  });

  useEffect(() => {
    const redirect = async () => {
      await router.invalidate();
      await navigate({ to: search.redirect || ROUTES.HOME });
    };

    if (isAuthenticated) {
      redirect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div>
        <form.Field
          name="email"
          validators={{
            onChangeAsyncDebounceMs: 1500,
            onChangeAsync: z
              .string()
              .min(1, { message: 'Email has to be filled' })
              .email('Not a valid email'),
          }}
        >
          {(field) => (
            <>
              <div className="flex items-center justify-between">
                <Label htmlFor={field.name}>Email address</Label>
                <div className="text-xs text-red-600">
                  {field.state.meta.errors[0]?.toString().split(',')[0]}
                </div>
              </div>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                autoComplete="email"
              />
            </>
          )}
        </form.Field>
      </div>
      <div>
        <form.Field
          name="password"
          validators={{
            onChangeAsyncDebounceMs: 1500,
            onChangeAsync: z
              .string()
              .min(8, { message: 'Minimum 8 characters required' }),
          }}
        >
          {(field) => (
            <>
              <div className="flex items-center justify-between">
                <Label htmlFor={field.name}>Password</Label>
                <div className="text-xs text-red-600">
                  {field.state.meta.errors[0]?.toString().split(',')[0]}
                </div>
              </div>

              <InputPassword
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </>
          )}
        </form.Field>
      </div>

      <div className="flex items-center justify-between">
        <form.Field name="rememberMe">
          {(field) => (
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={field.name}
                name={field.name}
                checked={field.state.value}
                onChange={(e) => field.handleChange(e.target.checked)}
                className="size-4 rounded border-gray-300 text-pink-600 focus:ring-pink-600"
              />
              <Label htmlFor={field.name}>Remember me</Label>
            </div>
          )}
        </form.Field>

        <Button variant="link">
          <Link to={ROUTES.LOGIN}>Forgot password?</Link>
        </Button>
      </div>

      <div>
        <Button disabled={isLoading} type="submit" width="full">
          {isLoading ? (
            <span className="relative flex size-6 items-center justify-center">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-pink-500"></span>
            </span>
          ) : (
            'Sign in'
          )}
        </Button>
      </div>
    </form>
  );
};

export default Form;
