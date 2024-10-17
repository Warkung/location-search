import { Place } from "./Place";

interface SearchResponse {
  features: Features[];
}
interface Features {
  geometry: Geometry;
  properties: Properties;
}

interface Geometry {
  coordinates: number[];
}

interface Properties {
  place_id: number;
  display_name: string;
}

export const search = async (term: string) => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${term}&format=geojson&addressdetails=1&layer=address&limit=5`
  );
  const data: SearchResponse = await res.json();
  const places: Place[] = data.features.map((feature) => {
    return {
      id: feature.properties.place_id,
      name: feature.properties.display_name,
      longtitude: feature.geometry.coordinates[0],
      latitude: feature.geometry.coordinates[1],
    };
  });
  return places;
};
