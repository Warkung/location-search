import "leaflet/dist/leaflet.css";
import type { Map as leafletMap } from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import type { Place } from "../api/Place";
import { useEffect, useRef } from "react";

interface MapProps {
  place: Place | null;
}

function Map({ place }: MapProps) {
  const mapRef = useRef<leafletMap | null>(null);
  useEffect(() => {
    if (mapRef.current && place) {
      mapRef.current.flyTo([place.latitude, place.longtitude]);
    }
  }, [place]);
  return (
    <MapContainer
      ref={mapRef}
      center={[13.7, 100.5]}
      zoom={12}
      scrollWheelZoom
      className="h-full"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {place && <Marker position={[place.latitude, place.longtitude]} />}
    </MapContainer>
  );
}

export default Map;
