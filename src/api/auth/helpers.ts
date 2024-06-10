import { LocationIP } from './getLocation';

export const buildLocationNuttd = (location: LocationIP) => ({
  city: location.city,
  country: location.country_name,
  countryCode: location.country_code3,
  countryFlag: location.country_flag,
  region: location.state_code,
  regionName: location.state_prov,
  zip: location.zipcode,
});
