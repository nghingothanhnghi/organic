import React, { useState, useEffect, useTransition } from 'react';
import axios from 'axios';
import locationData from '~/mocks/location.json'
import { useTranslation } from 'react-i18next';

// Assuming your locationData has a structure like this
interface LocationData {
  VN: {
    cities: City[]; // List of cities for Vietnam
  };
}

interface LocationSelectorProps {
  values: {
    street?: string;
    country?: string;
    city?: string;
    district?: string;
    ward?: string;
    postalCode?: string;
  };
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
}

interface Country {
  name: string;
  code: string;
}

interface City {
  name: string;
  districts: District[];
}

interface District {
  name: string;
  wards: string[];
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ values, errors, touched, handleChange }) => {
  const { t } = useTranslation();
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<string[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all?fields=name,cca2");
        const mappedCountries = response.data.map((country: any) => {
          const code = country.cca2; // Country code, e.g., 'VN', 'US'
          return {
            name: t(`country.${code}`, { defaultValue: country.name.common }),
            code: code,
          };
        });
        setCountries(mappedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
        // Fallback in case of error
        setCountries([
          { code: 'VN', name: t('country.VN', { defaultValue: 'Vietnam' }) },
          { code: 'US', name: t('country.US', { defaultValue: 'United States' }) }
          // Add more fallback countries if needed
        ]);

      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    // When Vietnam is selected as country, load cities from locationData
    if (values.country === 'VN') {
      setCities(locationData.VN.cities || []);
      setDistricts([]);
      setWards([]);
    } else {
      setCities([]);
      setDistricts([]);
      setWards([]);
    }
  }, [values.country]);

  useEffect(() => {
    const selectedCity = cities.find((city) => city.name === values.city);
    setDistricts(selectedCity ? selectedCity.districts : []);
  }, [values.city, cities]);

  useEffect(() => {
    const selectedDistrict = districts.find((district) => district.name === values.district);
    setWards(selectedDistrict ? selectedDistrict.wards : []);
  }, [values.district, districts]);


  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700">{t("input.address.label")}</label>
        <input
          type="text"
          name="street"
          value={values.street || ''}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${touched.street && errors.street ? 'border-red-500' : ''
            }`}
        />
        {touched.street && errors.street && <p className="text-red-500 text-xs mt-1">{errors.street}</p>}
      </div>



      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700">{t("select.country.label")}</label>
          <select
            name="country"
            value={values.country || ''}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${touched.country && errors.country ? 'border-red-500' : ''
              }`}
          >
            <option value="">{t("select.country.placeholder")}</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
          {touched.country && errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">{t("select.city.label")}</label>
          <select
            name="city"
            value={values.city || ''}
            onChange={handleChange}
            disabled={!values.country}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${touched.city && errors.city ? 'border-red-500' : ''
              }`}
          >
            <option value="">{t("select.country.placeholder")}</option>
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
          {touched.city && errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
        </div>


      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700">{t("select.dist.label")}</label>
          <select
            name="district"
            value={values.district || ''}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${touched.district && errors.district ? 'border-red-500' : ''
              }`}
          >
            <option value="">{t("select.dist.placeholder")}</option>
            {districts.map((district) => (
              <option key={district.name} value={district.name}>
                {district.name}
              </option>
            ))}
          </select>
          {touched.district && errors.district && <p className="text-red-500 text-xs mt-1">{errors.district}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">{t("select.ward.label")}</label>
          <select
            name="ward"
            value={values.ward || ''}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${touched.ward && errors.ward ? 'border-red-500' : ''
              }`}
          >
            <option value="">{t("select.ward.placeholder")}</option>
            {wards.map((ward, index) => (
              <option key={index} value={ward}>
                {ward}
              </option>
            ))}
          </select>
          {touched.ward && errors.ward && <p className="text-red-500 text-xs mt-1">{errors.ward}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">{t("input.postalCode.label")}</label>
          <input
            type="text"
            name="postalCode"
            value={values.postalCode || ''}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${touched.postalCode && errors.postalCode ? 'border-red-500' : ''
              }`}
          />
          {touched.postalCode && errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>}
        </div>
      </div>
    </div>
  );
};

export default LocationSelector;
