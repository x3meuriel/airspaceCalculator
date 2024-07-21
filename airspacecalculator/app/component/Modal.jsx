import Link from 'next/link';
import React from 'react';
import ReactDOM from 'react-dom';
import { AddressAutofill } from '@mapbox/search-js-react';

export default function Modal() {
  // const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN;
  const [address, setAddress] = React.useState('');
  const [addresses, setAddresses] = React.useState([]);
  const [showOptions, setShowOptions] = React.useState(false);
  const [coordinates, setCoordinates] = React.useState({
    longitude: '',
    latitude: '',
  });

  const handleSelectAddress = (address) => {
    setAddress(address);
    setShowOptions(false);
  };

  console.log({ address });

  React.useEffect(() => {
    if (!address) return setShowOptions(false);

    let timeoutId;

    const getAddresses = async () => {
      setCoordinates({ longitude: '', latitude: '' });

      timeoutId = setTimeout(async () => {
        try {
          const mapboxGeocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`;

          const response = await fetch(mapboxGeocodingUrl);

          if (!response.ok) throw new Error('Error while getting addresses');

          const data = await response.json();
          console.log({ data });
          if (data.features && data.features.length > 0) {
            setAddresses(data.features);
          } else {
            setAddresses([]);
          }
        } catch (error) {
          console.error(error);
        }
      }, 500);
    };

    getAddresses();

    return () => clearTimeout(timeoutId);
  }, [address]);

  const handleChangeAddress = (value) => {
    setAddress(value);
    setShowOptions(true);
    console.log({ value });
  };

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  return (
    <div className="flex h-screen items-center justify-between md:p-24 p-7 ">
      <div className="bg-white shadow-md rounded-[12px] md:p-12 p-5 max-w-[735px] mx-auto w-full">
        <h2 className="text-[2.625rem] text-center text-[campton] text-[#0E2B56] font-medium mb-4 tracking-[-.1rem]">
          How much is my airspace worth?
        </h2>
        <p className="text-center text-gray-600 mb-12 h-[60px] leading-[30px]">
          Use our airspace value estimator to get a free, instant airsapce-value
          estimate, see nearby airspaces and market trends.
        </p>
        <div className="relative w-full md:w-[90%] mx-auto flex flex-col gap-[10px]">
          <input
            type="text"
            autoComplete="off"
            value={address}
            onChange={(e) => handleChangeAddress(e.target.value)}
            placeholder="search airspace"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-[#ECECEC] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {showOptions && (
            <div className="absolute left-0 top-[55px] w-full flex-col bg-white max-h-[250px] overflow-auto ">
              {addresses.map((item) => {
                return (
                  <div
                    key={item.id}
                    // value={item.place_name}
                    onClick={() => handleSelectAddress(item.place_name)}
                    className="w-full rounded-xl p-5 text-left text-[#222222] hover:bg-gray-500 cursor-pointer hover:text-white"
                    style={{
                      borderTop: '0.2px solid #222222',
                    }}
                  >
                    {item.place_name}
                  </div>
                );
              })}
            </div>
          )}

          <Link href="/estimate">
            <button className="block w-full text-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:border-[#ECECEC]">
              Estimate my Airspace
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
