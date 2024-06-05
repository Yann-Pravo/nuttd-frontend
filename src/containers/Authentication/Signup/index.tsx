import React from 'react';

import nutLogo from '../../../assets/images/nut_64.png';
import googleLogo from '../../../assets/images/logos/google.svg';
import discordLogo from '../../../assets/images/logos/discord.svg';
import useLoginThirdParty from 'api/auth/loginDiscord';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import ROUTES from 'constants/paths';
import { Card, CardContent } from '@/components/ui/card';

const Signup: React.FC = () => {
  const { refetch: loginDiscord } = useLoginThirdParty();
  return (
    <div className="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm space-y-10">
        <Card>
          <CardContent>
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
                <Button variant="outline" onClick={() => loginDiscord()}>
                  <img
                    className="mr-2 h-6 w-auto"
                    src={googleLogo}
                    alt="Google logo"
                  />
                  Google
                </Button>

                <Button variant="outline" onClick={() => loginDiscord()}>
                  <img
                    className="mr-2 h-6 w-auto"
                    src={discordLogo}
                    alt="Discord logo"
                  />
                  Discord
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm leading-6 text-gray-500">
          Already have an account?
          <Button variant="link">
            <Link to={ROUTES.LOGIN}>Log in</Link>
          </Button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
