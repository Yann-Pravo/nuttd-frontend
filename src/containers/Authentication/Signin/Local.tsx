import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import useLoginLocal from 'api/auth/loginLocal';
import { z } from 'zod';

const Local = () => {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validatorAdapter: zodValidator,
    onSubmit: async ({ value }) => {
      console.log(value);
      login();
    },
  });

  const {
    isError,
    isFetching,
    refetch: login,
  } = useLoginLocal('login', {
    email: form.state.values.email,
    password: form.state.values.password,
    rememberMe: form.state.values.rememberMe,
  });

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
                <label
                  htmlFor={field.name}
                  className="block text-sm leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="text-xs text-red-600">
                  {field.state.meta.errors[0]?.toString().split(',')[0]}
                </div>
              </div>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                autoComplete="email"
                className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
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
                <label
                  htmlFor={field.name}
                  className="block text-sm leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-xs text-red-600">
                  {field.state.meta.errors[0]?.toString().split(',')[0]}
                </div>
              </div>

              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                type="password"
                className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
              />
            </>
          )}
        </form.Field>
      </div>

      <div className="flex items-center justify-between">
        <form.Field name="rememberMe">
          {(field) => (
            <div className="flex items-center">
              <input
                id={field.name}
                name={field.name}
                checked={field.state.value}
                onChange={(e) => field.handleChange(e.target.checked)}
                type="checkbox"
                className="size-4 rounded border-gray-300 text-pink-600 focus:ring-pink-600"
              />
              <label
                htmlFor={field.name}
                className="ml-3 block text-sm leading-6 text-gray-900"
              >
                Remember me
              </label>
            </div>
          )}
        </form.Field>

        <div className="text-sm leading-6">
          <a
            href="#"
            className="font-semibold text-pink-600 hover:text-pink-500"
          >
            Forgot password?
          </a>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
        >
          {isFetching ? (
            <span className="relative flex size-6 items-center justify-center">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-pink-500"></span>
            </span>
          ) : (
            <span className="text-sm font-semibold leading-6 text-white">
              Sign in
            </span>
          )}
        </button>
      </div>
    </form>
  );
};

export default Local;
