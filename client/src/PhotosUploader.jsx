import React from "react";
import { CloudUpload, Trash, Star, StarOff } from "lucide-react";
import axios from "axios";
import { useState } from "react";

export default function PhotosUploader({ addedPhotos, onChange }) {
  const [photoLink, setPhotoLink] = useState("");

  async function addPhotoByLink(ev) {
    ev.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    onChange((prev) => [...prev, filename]);
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
        onChange((prev) => [...prev, ...filenames]);
      });
  }

  function removePhoto(ev, filename) {
    ev.preventDefault();
    onChange((prev) => prev.filter((file) => file !== filename));
  }

  function selectAsMainPhoto(ev, filename) {
    ev.preventDefault();
    onChange((prev) => [filename, ...prev.filter((file) => file !== filename)]);
  }
  return (
    <div>
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
            <div key={index} className="h-32 flex relative">
              <img
                className="rounded-2xl w-full object-cover"
                //   src={"http://localhost:4000/uploads/" + link}
                src={`http://localhost:4000/uploads/${link}`}
                alt=""
              />
              <button onClick={(ev) => removePhoto(ev, link)} className="absolute cursor-pointer bottom-1 right-1 bg-black opacity-50
               p-2  text-white  rounded-2xl">
                <Trash size={18} />
              </button>
              <button onClick={(ev) => selectAsMainPhoto(ev, link)} className="absolute cursor-pointer bottom-1 left-1 bg-black opacity-50
               p-2  text-white  rounded-2xl">
                {link === addedPhotos[0] && <Star size={18} />}
                {link !== addedPhotos[0] && <StarOff size={18} />}
              </button>
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
    </div>
  );
}
