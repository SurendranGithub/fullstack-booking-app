import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Plus, CloudUpload } from "lucide-react";
import Perks from "../Perks";
import axios from "axios";

export default function PlacesPage() {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function addPhotoByLink(ev) {
    ev.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    setAddedPhotos((prev) => [...prev, filename]);
    setPhotoLink("");
  }

  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        setAddedPhotos((prev) => [...prev, ...filenames]);
      });
  }
  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="bg-[#fe375c] text-white py-2 px-6 rounded-full inline-flex gap-1"
            to={"/account/places/new"}
          >
            <Plus />
            Add new places
          </Link>
        </div>
      )}
      {action === "new" && (
        <div className="h-full w-[85vw] mx-auto">
          <form>
            {preInput(
              "Title",
              "Title for your place, shoul be short and catchy as in advertisement."
            )}
            <input
              className="my-2 py-2 px-3 border w-full rounded-2xl"
              type="text"
              placeholder="title"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
            />

            {preInput("Address", "Address to this place.")}
            <input
              className="my-2 py-2 px-3 border w-full rounded-2xl"
              type="text"
              placeholder="address"
              value={address}
              onChange={(ev) => setAddress(ev.target.value)}
            />

            {preInput("Photos", "More = better")}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add using a link .....jpg,png,jpeg"
                className="my-2 py-2 px-3 border w-full rounded-2xl"
                value={photoLink}
                onChange={(ev) => setPhotoLink(ev.target.value)}
              />
              <button
                onClick={addPhotoByLink}
                className="bg-gray-300 px-3 rounded-2xl cursor-pointer"
              >
                Add&nbsp;photos
              </button>
            </div>
            <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {addedPhotos.length > 0 &&
                addedPhotos.map((link, index) => (
                  <div key={index} className="h-32 flex">
                    <img
                      className="rounded-2xl w-full object-cover"
                      //   src={"http://localhost:4000/uploads/" + link}
                      src={`http://localhost:4000/uploads/${link}`}
                      alt=""
                    />
                  </div>
                ))}
              <label className="h-32 flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600 cursor-pointer">
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={uploadPhoto}
                />
                <CloudUpload size={32} />
                Upload
              </label>
            </div>

            {preInput("Description", "Description of the places.")}
            <textarea
              className="my-2 py-2 px-3 border w-full rounded-2xl"
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            />

            {preInput("Perks", "Select all the perks of your places.")}
            <Perks selected={perks} onChange={setPerks} />

            {preInput("Extra info", "House rules,etc.")}
            <textarea
              className="my-2 py-2 px-3 border w-full rounded-2xl"
              value={extraInfo}
              onChange={(ev) => setExtraInfo(ev.target.value)}
            />

            {preInput(
              "Check in & out times",
              "Add check in and out times, remember to have some time window for cleaning the rooms between guests."
            )}
            <div className="grid gap-2 sm:grid-cols-3 ">
              <div>
                <h3 className="mt-2 -mb-1">Check in time</h3>
                <input
                  type="text"
                  className="my-2 py-2 px-3 border w-full rounded-2xl"
                  placeholder="14.00"
                  value={checkIn}
                  onChange={(ev) => setCheckIn(ev.target.value)}
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check out time</h3>
                <input
                  type="text"
                  className="my-2 py-2 px-3 border w-full rounded-2xl"
                  placeholder="11.00"
                  value={checkOut}
                  onChange={(ev) => setCheckOut(ev.target.value)}
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Max number of guests</h3>
                <input
                  type="number"
                  className="my-2 py-2 px-3 border w-full rounded-2xl"
                  value={maxGuests}
                  onChange={(ev) => setMaxGuests(ev.target.value)}
                />
              </div>
            </div>

            <button className="bg-[#fe375c] my-4 w-full text-white py-2 px-6 rounded-full">
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
