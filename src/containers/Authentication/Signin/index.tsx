import React from 'react';

import nutLogo from '../../../assets/images/nut_64.png';
import googleLogo from '../../../assets/images/logos/google.svg';
import discordLogo from '../../../assets/images/logos/discord.svg';
import Local from './Local';
import useLoginThirdParty from 'api/auth/loginDiscord';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import ROUTES from 'constants/paths';

const Signin = () => {
  const { refetch: loginDiscord } = useLoginThirdParty();
  return (
    <>
      <div className="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm space-y-10">
          <div>
            <img
              className="mx-auto h-16 w-auto"
              src={nutLogo}
              alt="Nuttd logo"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Let‘s crack some nuts
            </h2>
          </div>
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <Local />

            <div>
              <div className="relative mt-10">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="bg-white px-6 text-gray-900">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <a
                  href="#"
                  className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                >
                  <img
                    className="h-6 w-auto"
                    src={googleLogo}
                    alt="Google logo"
                  />
                  <span className="text-sm font-semibold leading-6">
                    Google
                  </span>
                </a>

                <Button variant="outline" onClick={() => loginDiscord()}>
                  <img
                    className="mr-2 h-6 w-auto"
                    src={discordLogo}
                    alt="Discord logo"
                  />
                  <span className="text-sm font-semibold leading-6">
                    Discord
                  </span>
                </Button>
              </div>
            </div>
          </div>

          <p className="text-center text-sm leading-6 text-gray-500">
            Not a nutter?
            <Button variant="link">
              <Link to={ROUTES.SIGNUP}>Sign up</Link>
            </Button>
            {/* <a
              href="#"
              className="ml-1 font-semibold text-pink-600 hover:text-pink-500"
            >
              Sign up
            </a> */}
          </p>
        </div>
      </div>
    </>
  );
};

export default Signin;
