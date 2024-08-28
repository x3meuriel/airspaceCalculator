'use client';

import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Estimate from '../component/estimate';
import { useAppContext } from '@/app/context';

function Modal() {
  const [address, setAddress] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [showEstimateModal, setShowEstimateModal] = useState(false);
  const { setCoordinates } = useAppContext();

  const [apidata, setApiData] = React.useState({
    estPrice: '',
    estPriceAnnual: '',
  }); // new object from skytrade api
  const timeNow = Date.now();
  const handleChangeAddress = (value) => {
    setAddress(value);
    setShowOptions(true);
  };

  const handleSelectAddress = async (address) => {
    setAddress(address);
    setShowOptions(false);
    setCoordinates(addresses[0].center);
  };

  const getSkyTradeData = async () => {
    try {
      const encodedAddress = encodeURIComponent(address);
      const skyTradeApiUrl = `https://dev-api.sky.trade/api/proxy/${timeNow}`;
      const skyTradeUrl = `/air-rights/search/address?address=${encodedAddress}`;

      const apidata = await axios.get(skyTradeApiUrl, {
        headers: {
          'Content-Type': 'application/json',
          uri: skyTradeUrl,
          api_key: 'XXX',
        },
      });

      setApiData(apidata.data);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (!address) return setShowOptions(false);

    let timeoutId;

    const getAddresses = async () => {
      timeoutId = setTimeout(async () => {
        try {
          const mapboxGeocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`;

          const response = await fetch(mapboxGeocodingUrl);

          if (!response.ok) throw new Error('Error while getting addresses');

          const data = await response.json();
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
  }, [address, showEstimateModal]);

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  return (
    <>
      {' '}
      {!showEstimateModal ? (
        <div className="bg-white shadow-md rounded-[12px] md:p-12 p-5  mx-auto my-auto  w-full min-w-[600px]">
          <h2 className="text-[2.625rem] text-center text-[campton] text-[#0E2B56] font-medium mb-4 tracking-[-.1rem]">
            How much is my airspace worth?
          </h2>
          <p className="text-center text-gray-600 mb-12 h-[60px] leading-[30px]">
            Use our airspace value estimator to get a free, instant
            airspace-value estimate, see nearby airspaces and market trends.
          </p>
          <div className="relative w-full md:w-[90%] my-auto mx-auto flex flex-col gap-[10px]">
            <input
              required
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
                      onClick={() => handleSelectAddress(item.place_name)}
                      className="w-full rounded-xl p-5 text-left text-[#222222] hover:bg-gray-500 cursor-pointer hover:text-white mb-2"
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

            <button
              onClick={() => {
                getSkyTradeData();
                setShowEstimateModal(true);
              }}
              className="block w-full text-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:border-[#ECECEC]"
            >
              Estimate my Airspace
            </button>
          </div>
        </div>
      ) : (
        showEstimateModal && <Estimate address={address} apidata={apidata} />
      )}
    </>
  );
}

export default Modal;
