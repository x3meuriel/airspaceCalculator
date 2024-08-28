'use client';
import { useEffect, useRef, useState, useCallback, useContext } from 'react';
import mapboxgl from 'mapbox-gl';
import { Map } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useAppContext } from '@/app/context/index';

const Mapper = () => {
  const { coordinates, setCoordinates } = useAppContext();
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [viewport, setViewPort] = useState({
    latitude: coordinates[0],
    longitude: coordinates[1],
    zoom: 10,
  });

  console.log(coordinates, 'coordinates');
  console.log(viewport);

  const mapRef = useRef(null);
  // useEffect(() => {
  //   // Update the viewport or marker position based on any logic or state change
  //   setViewPort({
  //     ...viewport,
  //     latitude: coordinates.latitude,
  //     longitude: coordinates.longitude,
  //     zoom: 10,
  //   });

  //   return () => map.remove();
  // }, [viewport, coordinates]);

  return (
    <>
      {' '}
      <div className="w-full h-screen m-[1rem]  ">
        <Map
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          initialViewState={{
            longitude: viewport.longitude,
            latitude: viewport.latitude,
            zoom: 10,
            bearing: 0,
          }}
          style={{ height: '100vh' }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          onViewportChange={(nextViewport) => setViewPort(nextViewport)}
        />
      </div>
      {() => console.log(viewport, 'vp')}
      <div
        className="map-container"
        ref={mapContainerRef}
        map={map}
        style={{ height: '100vh' }}
      ></div>
    </>
  );
};

export default Mapper;
