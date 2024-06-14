import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import useGetNutsCount from 'api/nut/getNutsCount';
import useGetNutsRank from 'api/nut/getNutsRank';
import CreateNut from 'containers/shared/CreateNut';
import { useAuth } from 'contexts/auth';
import NutsFeed from './NutsFeed';

function Home() {
  const { user } = useAuth();
  const { data: nutsCount, isFetching: isLoadingCount } = useGetNutsCount();
  const { data: nutsRank, isFetching: isLoadingRank } = useGetNutsRank();

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
                  <div>
                    <div className="text-sm font-medium text-gray-500">
                      This month
                    </div>
                    <div className="mt-2 grid grid-cols-3 space-x-4 text-sm">
                      <div className="flex flex-col items-center text-center">
                        <div className="mb-1">Nuts</div>
                        {isLoadingCount ? (
                          <Skeleton className="h-9 w-4 rounded-sm" />
                        ) : (
                          <div className="text-3xl font-semibold tracking-tight text-gray-900">
                            {nutsCount?.currentMonthCount}
                          </div>
                        )}
                      </div>
                      <div className="text-center">
                        <div className="mb-1 truncate">
                          {user?.location?.city}
                        </div>
                        <div className="flex items-center justify-center">
                          <span>#</span>
                          {isLoadingRank ? (
                            <Skeleton className="h-9 w-4 rounded-sm" />
                          ) : (
                            <span className="text-3xl font-semibold tracking-tight text-gray-900">
                              {nutsRank?.monthRankCity}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="mb-1 truncate">
                          {user?.location?.country}
                        </div>
                        <div className="flex items-center justify-center">
                          <span>#</span>
                          {isLoadingRank ? (
                            <Skeleton className="h-9 w-4 rounded-sm" />
                          ) : (
                            <span className="text-3xl font-semibold tracking-tight text-gray-900">
                              {nutsRank?.monthRankCountry}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div>
                    <div className="text-sm font-medium text-gray-500">
                      This year
                    </div>
                    <div className="mt-2 grid grid-cols-3 items-center space-x-4 text-sm">
                      <div className="flex flex-col items-center text-center">
                        <div className="mb-1">Nuts</div>
                        {isLoadingCount ? (
                          <Skeleton className="h-9 w-4 rounded-sm" />
                        ) : (
                          <div className="text-3xl font-semibold tracking-tight text-gray-900">
                            {nutsCount?.currentYearCount}
                          </div>
                        )}
                      </div>
                      <div className="grow text-center">
                        <div className="truncate">{user?.location?.city}</div>
                        <div className="mt-1 flex items-center justify-center">
                          <span>#</span>
                          {isLoadingRank ? (
                            <Skeleton className="h-9 w-4 rounded-sm" />
                          ) : (
                            <span className="text-3xl font-semibold tracking-tight text-gray-900">
                              {nutsRank?.yearRankCity}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="grow text-center">
                        <div className="truncate">
                          {user?.location?.country}
                        </div>
                        <div className="mt-1 flex items-center justify-center">
                          <span>#</span>
                          {isLoadingRank ? (
                            <Skeleton className="h-9 w-4 rounded-sm" />
                          ) : (
                            <span className="text-3xl font-semibold tracking-tight text-gray-900">
                              {nutsRank?.yearRankCountry}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
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
            {/* <div className="grid grid-cols-1 gap-4">
              <section aria-labelledby="section-2-title">
                <h2 className="sr-only" id="section-2-title">
                  Section title
                </h2>
                <div className="overflow-hidden rounded-lg bg-white shadow">
                  <div className="p-6">{/* Your content </div>
                </div>
              </section>
            </div>*/}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
