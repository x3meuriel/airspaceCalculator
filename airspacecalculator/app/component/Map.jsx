import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = ({ coordinates }) => {
  console.log(coordinates);

  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [viewport, setViewPort] = useState({
    latitude: coordinates[0],
    longitude: coordinates[1],
    zoom: 11,
  });

  console.log(viewport, 'viewport');

  useEffect(() => {
    if (mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [viewport.latitude, viewport.longitude],
        zoom: 11,
        accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
      });

      setMap(map);

      return () => map.remove();
    }
  }, [map, viewport]);

  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  return (
    <>
      {' '}
      <div className="text-black-relative w-full h-screen ">
        <ReactMapGL
          map={map}
          onviewportChange={(nextViewport) => setViewPort(nextViewport)}
          mapboxAccessToken={accessToken}
          width="100%"
          heigth="100%"
          mapStyle={'mapbox://styles/mapbox/streets-v11'}
        />
      </div>
      <div
        className="map-container"
        ref={mapContainerRef}
        map={map}
        style={{ height: '100vh' }}
      ></div>
    </>
  );
};

export default Map;
