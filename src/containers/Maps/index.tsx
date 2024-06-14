import React, { useMemo, useState } from 'react';
import { scaleLinear } from 'd3-scale';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';
import world from './world-100m.json';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from 'contexts/auth';
import useGetNutCountByLocation from 'api/location/getNutCountByLocation';
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

const Maps = () => {
  const { user } = useAuth();
  const { data: cities, isFetching } = useGetNutCountByLocation();

  const [zoom, setZoom] = useState(9);

  const maxCount = Math.max(...(cities?.map((city) => city.nutCount) || []));
  const popScale = useMemo(
    () => scaleLinear().domain([0, maxCount]).range([0, 3]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [maxCount],
  );

  return (
    <div className="py-10">
      <main className="pb-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-4 lg:gap-8">
            <div className="grid grid-cols-1 gap-4 lg:sticky lg:top-[104px]">
              <Card>
                <CardContent>
                  <div>
                    <div className=" flex items-center justify-between text-sm font-medium text-gray-500">
                      <div>Cities</div>
                      <div>Nuts in {format(new Date(), 'yyyy')}</div>
                    </div>
                    <div className="mt-2 text-sm">
                      {cities?.map((city) => (
                        <div
                          key={city.id}
                          className=" flex items-center justify-between"
                        >
                          <div className="font-medium">{`${city.city}, ${city.country}`}</div>
                          <div>{city.nutCount}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card className="lg:col-span-3">
              <CardContent className="relative">
                <div className="absolute flex size-full items-center justify-center">
                  {isFetching && (
                    <span className="relative flex size-6 items-center justify-center">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-pink-400 opacity-75"></span>
                      <span className="relative inline-flex size-3 rounded-full bg-pink-500"></span>
                    </span>
                  )}
                </div>
                <ComposableMap>
                  <ZoomableGroup
                    center={[
                      Number(user?.location?.longitude) || 5.5,
                      Number(user?.location?.latitude) || 43,
                    ]}
                    zoom={zoom}
                  >
                    <Geographies
                      geography={world}
                      fill="#EAEAEC"
                      stroke="#D6D6DA"
                      strokeWidth={0.1}
                    >
                      {({ geographies }) =>
                        geographies.map((geo) => (
                          <Geography key={geo.rsmKey} geography={geo} />
                        ))
                      }
                    </Geographies>
                    {cities?.map((city) => (
                      <Marker
                        key={city.id}
                        coordinates={[city.longitude, city.latitude]}
                      >
                        <circle r={popScale(city.nutCount)} fill="#db2777" />
                      </Marker>
                    ))}
                  </ZoomableGroup>
                </ComposableMap>
                <div className="absolute right-12 top-12 flex flex-col space-y-2">
                  <Button
                    onClick={() => setZoom(zoom + 4)}
                    disabled={zoom === 33}
                    variant="outline"
                    size="icon"
                  >
                    <PlusIcon className="size-4" />
                  </Button>
                  <Button
                    onClick={() => setZoom(zoom - 4)}
                    disabled={zoom === 5}
                    variant="outline"
                    size="icon"
                  >
                    <MinusIcon className="size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Maps;
