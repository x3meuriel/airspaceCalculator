import { MapPinIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className="container mx-auto flex flex-wrap items-start my-16">
      <div className="lg:w-1/4 w-full lg:pr-3">
        <div className="bg-gray-200 rounded-xl p-10">
          <div className="flex">
            <MapPinIcon className="h-10 w-10 mx-4" />
            <div>
              <h2 className="text-2xl text- font-bold mb-2">
                {' '}
                111 Sixth Avenue{' '}
              </h2>
              <p> Woolgoolga New South Wales 2456, Australia</p>
            </div>
          </div>
          <div className="container">
            <div className="square-foot"></div>
            <div className="annual-income"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
