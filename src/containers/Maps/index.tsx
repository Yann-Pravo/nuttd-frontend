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

const Maps = () => {
  const { user } = useAuth();
  const { data: cities } = useGetNutCountByLocation();

  const [zoom, setZoom] = useState(9);

  const maxCount = Math.max(...(cities?.map((city) => city.nutCount) || []));
  const popScale = useMemo(
    () => scaleLinear().domain([0, maxCount]).range([0, 4]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [maxCount],
  );

  return (
    <div className="py-10">
      <main className="pb-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-4 lg:gap-8">
            <Card className="lg:col-span-3">
              <CardContent className="relative">
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
                      style={{
                        fill: '#fbcfe8',
                      }}
                    >
                      {({ geographies }) =>
                        geographies.map((geo) => (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            style={{
                              default: {
                                fill: '#fbcfe8',
                                stroke: '#fdf2f8',
                                strokeWidth: 0.1,
                                outline: 'none',
                              },
                            }}
                          />
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
                    onClick={() => setZoom(zoom + 1)}
                    disabled={zoom === 14}
                    variant="outline"
                    size="icon"
                  >
                    <PlusIcon className="size-4" />
                  </Button>
                  <Button
                    onClick={() => setZoom(zoom - 1)}
                    disabled={zoom === 4}
                    variant="outline"
                    size="icon"
                  >
                    <MinusIcon className="size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="sticky top-[104px] grid grid-cols-1 gap-4">
              <Card>
                <CardContent></CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Maps;