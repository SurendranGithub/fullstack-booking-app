import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Plus } from "lucide-react";
import AccountNav from "../AccountNav";
import axios from "axios";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link
          className="bg-[#fe375c] text-white py-2 px-6 rounded-full inline-flex gap-1"
          to={"/account/places/new"}
        >
          <Plus />
          Add new places
        </Link>
      </div>
      <div className="mt-4 mx-auto md:w-[55vw]">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={"/account/places/" + place._id}
              className="bg-gray-100 p-4 cursor-pointer rounded-2xl flex gap-4"
            >
              <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                {place.photos.length > 0 && (
                  <img className="object-cover" src={'http://localhost:4000/uploads/' + place.photos[0]} alt="" />
                )}
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl ">{place.title}</h2>
                <p className="text-sm mt-2">{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
