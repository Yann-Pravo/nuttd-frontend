import React, { useCallback, useMemo, useState } from 'react';
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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Maps = () => {
  const { user } = useAuth();
  const [zoom, setZoom] = useState(9);
  const [geoScope, setGeoScope] = useState('countries');
  const { data, isFetching } = useGetNutCountByLocation({ geoScope });

  const cities = data ? data.cities : [];
  const countries = data
    ? Object.keys(data?.countries || {})
        .map((key) => data.countries[key])
        .filter(Boolean)
        .sort((countryA, countryB) =>
          countryB.nutCount > countryA.nutCount ? 1 : -1,
        )
    : [];

  const nutsCountCities = cities.map((city) => city.nutCount) || [];
  const nutsCountCountries = countries.map((country) => country.nutCount) || [];

  const maxCount =
    geoScope === 'cities'
      ? Math.max(...nutsCountCities)
      : Math.max(...nutsCountCountries);

  const popScale = useMemo(
    () => scaleLinear().domain([0, maxCount]).range([0, 3]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [maxCount],
  );

  const scale = useCallback(
    (value: number) => {
      const scaleFct = scaleLinear()
        .domain([0, maxCount])
        .range([
          '#EAEAEC' as unknown as number,
          '#db2777' as unknown as number,
        ]);
      return scaleFct(value) as unknown as string;
    },
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
                      <div>
                        {geoScope === 'cities' ? 'Cities' : 'Countries'}
                      </div>
                      <div>Nuts in {format(new Date(), 'yyyy')}</div>
                    </div>
                    <div className="mt-2 text-sm">
                      {geoScope === 'cities'
                        ? cities.map((city) => (
                            <div
                              key={city.id}
                              className=" flex items-center justify-between"
                            >
                              <div className="font-medium">{`${city.city}, ${city.country}`}</div>
                              <div>{city.nutCount}</div>
                            </div>
                          ))
                        : countries.map((country) => (
                            <div
                              key={country.countryCode}
                              className=" flex items-center justify-between"
                            >
                              <div className="font-medium">
                                {country.country}
                              </div>
                              <div>{country.nutCount}</div>
                            </div>
                          ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card className="lg:col-span-3">
              <CardContent>
                <Tabs defaultValue={geoScope} className="w-60">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger
                      value="countries"
                      onClick={() => setGeoScope('countries')}
                    >
                      Countries
                    </TabsTrigger>
                    <TabsTrigger
                      value="cities"
                      onClick={() => setGeoScope('cities')}
                    >
                      Cities
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="relative mt-4">
                  <div className="absolute flex size-full items-center justify-center">
                    {isFetching && (
                      <span className="relative flex size-6 items-center justify-center">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-pink-400 opacity-75"></span>
                        <span className="relative inline-flex size-3 rounded-full bg-pink-500"></span>
                      </span>
                    )}
                  </div>
                  <ComposableMap height={500}>
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
                            <Geography
                              key={geo.rsmKey}
                              geography={geo}
                              fill={
                                geoScope === 'countries'
                                  ? scale(
                                      data?.countries[geo.id]?.nutCount || 0,
                                    )
                                  : undefined
                              }
                            />
                          ))
                        }
                      </Geographies>
                      {geoScope === 'cities' &&
                        cities.map((city) => (
                          <Marker
                            key={city.id}
                            coordinates={[city.longitude, city.latitude]}
                          >
                            <circle
                              r={popScale(city.nutCount)}
                              fill="#db2777"
                            />
                          </Marker>
                        ))}
                    </ZoomableGroup>
                  </ComposableMap>
                  <div className="absolute right-4 top-4 flex flex-col space-y-2">
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
