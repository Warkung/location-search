import { Fragment, useState } from "react";
import { Place } from "../api/Place";
import { search } from "../api/search";

interface LocationSearchProps {
  onPlaceClick: (place: Place) => void;
}

function LocationSearch({ onPlaceClick }: LocationSearchProps) {
  const [places, setPlaces] = useState<Place[]>([]);
  const [term, setTerm] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await search(term);
    setPlaces(result);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className="font-bold" htmlFor="term">
          Location Search
        </label>
        <input
          className="border border-gray-400 rounded-md shadow-sm focus:border-indigo-800 px-4 py-2 w-full"
          id="term"
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </form>

      <h1 className="font-bold mt-6">Found Location</h1>
      <div className="grid grid-cols-[1fr_40px] gap-2 mt-2 items-center">
        {places.map((place) => {
          return (
            <Fragment key={place.id}>
              <p className="text-sm">{place.name}</p>
              <button
                className="bg-blue-500 text-xs text-white font-bold py-1 px-1 rounded"
                onClick={() => onPlaceClick(place)}
              >
                Go
              </button>
              <div className="border-b col-span-2" />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default LocationSearch;
