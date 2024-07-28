import Image from 'next/image';
import Modal from './Modal';
import { useState } from 'react';

export default function Estimate({ apidata, address, showEstimateModal }) {
  const [startAffresh, setStartAffresh] = useState(false);
  const [closeEstimateModal, setCloseEstimateModal] =
    useState(showEstimateModal);

  console.log(apidata, 'apidata');

  if (!apidata.estPrice) {
    apidata.estPrice = 'Price not available';
    apidata.estPriceAnnual = 'Price not available';
  }

  const handleClick = () => {
    setStartAffresh(true);
    setCloseEstimateModal(false);
    showEstimateModal = false;
  };

  const addressLine1 = address.split(',').shift();
  [, ...address] = address.split(',');

  return !startAffresh ? (
    <div className="container flex flex-wrap items-start my-16">
      <div className="mx-8">
        <div className="bg-[#FFFFFF] rounded-xl px-10 h-[512px] gap-4 flex flex-col items-center justify-center">
          <div className="flex items-center">
            <Image
              src={'/location-point.svg'}
              alt="circle"
              width={39}
              height={39}
              className=" mx-4"
            />
            <div className="p-2">
              <h2 className="font-bold mb-2 text-[2rem] tracking-[-4]">
                {addressLine1}
              </h2>
              <p className="text-sm whitespace-nowrap text-[1rem] text-gray-500 w-full">
                {address}
              </p>
            </div>
          </div>
          <div className="flex items-center  border bg-[#DEE9F8] p-2 rounded-xl square-foot w-full">
            <Image
              src={'/building.svg'}
              alt="building"
              width={39}
              height={39}
              className=" mx-4 "
            />
            <div className="0">
              <h2 className="font-bold mb-2 text-[20px]">
                Est. Price Per Square Foot
              </h2>
              <h2 className="font-bold">{`$${apidata.estPrice}`}</h2>
            </div>
          </div>
          <div className="flex items-center  bg-[#DEE9F8]  p-2 rounded-xl annual-income w-full">
            <Image
              src={'/circle-dollar.svg'}
              alt="circle"
              width={39}
              height={39}
              className=" mx-4"
            />
            <div>
              <h2 className="font-bold mb-2"> Est.Annual Passive Income </h2>
              <h2 className="font-bold">{`$${apidata.estPriceAnnual}`}</h2>
            </div>
          </div>
          <button className="w-full bg-[#1470FF] text-[15px] rounded-lg py-2 text-[#ffffff]">
            Join Trading waitlist
          </button>
          <button className="w-full bg-[#0E2B56] text-[15px] rounded-lg py-2 text-[#ffffff]">
            Claim My Airspace
          </button>

          <button
            onClick={() => handleClick()}
            className="w-full border-[2px] text-[15px] text-[#1470FF] rounded-lg border border-[#1470FF] py-2"
          >
            Estimate Another Airspace
          </button>
        </div>
      </div>
    </div>
  ) : (
    startAffresh && <Modal showEstimateModal={showEstimateModal} />
  );
}
