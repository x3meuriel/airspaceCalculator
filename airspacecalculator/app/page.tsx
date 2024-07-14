import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex h-screen items-center justify-between md:p-24 p-7 ">
      <div className="bg-white shadow-md rounded-[12px] md:p-12 p-5 max-w-[735px] mx-auto w-full">
        <h2 className="text-[40px] text-center text-[campton] text-[#0E2B56] font-medium mb-4 tracking-[-.1rem]">
          How much is my airspace worth?
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Use our airspace value estimator to get a free, instant airsapce-value
          estimate, see nearby airspaces and market trends.
        </p>
        <div className="w-full md:w-[90%] mx-auto">
          <input
            type="text"
            placeholder="search airspace"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Link href="/estimate">
            <button className="mt-4 block w-full text-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Estimate my Airspace
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
