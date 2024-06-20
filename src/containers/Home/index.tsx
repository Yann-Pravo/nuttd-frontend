import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import useGetNutsCount from 'api/nut/getNutsCount';
import useGetNutsRank from 'api/nut/getNutsRank';
import CreateNut from 'containers/shared/CreateNut';
import { useAuth } from 'contexts/auth';
import NutsFeed from './NutsFeed';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';

function Home() {
  const { user } = useAuth();
  const { data: nutsCount, isFetching: isLoadingCount } = useGetNutsCount();
  const { data: nutsRank, isFetching: isLoadingRank } = useGetNutsRank();

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (nutsCount) {
      const percent = (100 * nutsCount.nutCountForLast21Days) / 21;
      setProgress(Math.min(percent, 100));
    }
  }, [nutsCount]);

  return (
    <div className="py-10">
      {/* <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header> */}
      <main className="pb-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="sr-only">Stats</h1>
          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-4 lg:gap-8">
            <div className="grid grid-cols-1 gap-4">
              <Card>
                <CardContent>
                  <dt className="text-sm font-medium text-gray-500">
                    Current month
                  </dt>
                  <dd className="mt-1 flex md:block lg:flex">
                    <div className="flex text-4xl font-semibold text-pink-600">
                      {isLoadingCount ? (
                        <Skeleton className="h-10 w-6 rounded-sm" />
                      ) : (
                        nutsCount?.currentMonthCount
                      )}
                    </div>

                    {isLoadingRank ? (
                      <div className="ml-2 space-y-1">
                        <Skeleton className="h-4 w-20 rounded-sm" />
                        <Skeleton className="h-4 w-20 rounded-sm" />
                      </div>
                    ) : (
                      <div className="ml-2 text-sm font-normal text-gray-900">
                        <div>
                          <span className="font-medium">
                            #{nutsRank?.monthRankCountry}
                          </span>{' '}
                          in{' '}
                          <span className="font-medium">
                            {user?.location?.country}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium">
                            #{nutsRank?.monthRankCity}
                          </span>{' '}
                          in{' '}
                          <span className="font-medium">
                            {user?.location?.city}
                          </span>
                        </div>
                      </div>
                    )}
                  </dd>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <dt className="text-sm font-medium text-gray-500">
                    Current year
                  </dt>
                  <dd className="mt-1 flex md:block lg:flex">
                    <div className="flex text-4xl font-semibold text-pink-600">
                      {isLoadingCount ? (
                        <Skeleton className="h-10 w-9 rounded-sm" />
                      ) : (
                        nutsCount?.currentYearCount
                      )}
                    </div>

                    {isLoadingRank ? (
                      <div className="ml-2 space-y-1">
                        <Skeleton className="h-4 w-20 rounded-sm" />
                        <Skeleton className="h-4 w-20 rounded-sm" />
                      </div>
                    ) : (
                      <div className="ml-2 text-sm font-normal text-gray-900">
                        <div>
                          <span className="font-medium">
                            #{nutsRank?.yearRankCountry}
                          </span>{' '}
                          in{' '}
                          <span className="font-medium">
                            {user?.location?.country}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium">
                            #{nutsRank?.yearRankCity}
                          </span>{' '}
                          in{' '}
                          <span className="font-medium">
                            {user?.location?.city}
                          </span>
                        </div>
                      </div>
                    )}
                  </dd>
                </CardContent>
              </Card>
              <CreateNut>
                <Button>Post a nut</Button>
              </CreateNut>
            </div>

            {/* Middle column */}
            <div className="grid grid-cols-1 gap-4 lg:col-span-2">
              <section aria-labelledby="section-1-title">
                <h2 className="sr-only" id="section-1-title">
                  Section title
                </h2>
                <div className="overflow-hidden rounded-lg bg-white shadow">
                  <div className="p-6">
                    <NutsFeed />
                  </div>
                </div>
              </section>
            </div>

            {/* Right column */}
            <div className="grid grid-cols-1 gap-4">
              <Card>
                <CardContent>
                  <div className="mb-2 flex items-baseline">
                    {nutsCount ? (
                      <span className="text-2xl font-semibold text-pink-600">
                        {nutsCount.nutCountForLast21Days}
                      </span>
                    ) : (
                      <Skeleton className="h-7 w-6" />
                    )}
                    <span className="ml-1 text-sm font-normal text-gray-900">
                      nuts on the last
                    </span>
                    <span className="ml-1 text-sm font-medium text-gray-900">
                      21 days
                    </span>
                  </div>
                  <Progress value={progress} />
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <div className="mb-2 text-sm font-normal text-gray-900">
                    Avg. nuts per day for this quarter
                  </div>
                  <div className="flex items-baseline">
                    {nutsCount ? (
                      <>
                        <span className="text-4xl font-semibold text-pink-600">
                          {nutsCount.currentQuarter}
                        </span>
                        {nutsCount.lastQuarter > 0 && (
                          <p
                            className={cn(
                              nutsCount.currentQuarter > nutsCount.lastQuarter
                                ? 'text-green-600'
                                : 'text-red-600',
                              'ml-2 flex items-baseline text-sm font-medium',
                            )}
                          >
                            {nutsCount.currentQuarter >
                            nutsCount.lastQuarter ? (
                              <ArrowUpIcon
                                className="size-4 shrink-0 self-center text-green-500"
                                aria-hidden="true"
                              />
                            ) : (
                              <ArrowDownIcon
                                className="size-4 shrink-0 self-center text-red-500"
                                aria-hidden="true"
                              />
                            )}
                            <span className="sr-only">
                              {' '}
                              {nutsCount.currentQuarter > nutsCount.lastQuarter
                                ? 'Increased'
                                : 'Decreased'}{' '}
                              by{' '}
                            </span>
                            {Math.abs(
                              (100 *
                                (nutsCount.currentQuarter -
                                  nutsCount.lastQuarter)) /
                                nutsCount.lastQuarter,
                            ).toFixed()}
                            %
                          </p>
                        )}
                      </>
                    ) : (
                      <Skeleton className="h-10 w-16" />
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
