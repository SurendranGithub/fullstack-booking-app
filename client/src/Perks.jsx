import React from "react";
import { Wifi, Car, TvMinimalPlay, PawPrint, LogIn, Radio } from "lucide-react";

export default function Perks({ selected, onChange }) {
  function handleCBClick(ev) {
    const { checked, name } = ev.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange([...selected.filter((selectedName) => selectedName !== name)]);
    }
  }
  return (
    <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes("wifi")}
          name="wifi"
          onChange={handleCBClick}
        />
        <Wifi />
        <span>Wifi</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes("parking")}
          name="parking"
          onChange={handleCBClick}
        />
        <Car />
        <span>Free parking spot</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes("tv")}
          name="tv"
          onChange={handleCBClick}
        />
        <TvMinimalPlay />
        <span>TV</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes("radio")}
          name="radio"
          onChange={handleCBClick}
        />
        <Radio />
        <span>Radio</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes("pets")}
          name="pets"
          onChange={handleCBClick}
        />
        <PawPrint />
        <span>Pets</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes("entrance")}
          name="entrance"
          onChange={handleCBClick}
        />
        <LogIn />
        <span>Private entrance</span>
      </label>
    </div>
  );
}
