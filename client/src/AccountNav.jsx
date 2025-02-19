import React from "react";
import { Link, useLocation } from "react-router-dom";
import { User, Logs, MapPinHouse } from "lucide-react";

export default function AccountNav() {
  const { pathname } = useLocation();
  let subpage = pathname.split("/")?.[2];
  console.log(location);
  if (subpage === undefined) {
    subpage = "profile";
  }
  function linkClasses(type = null) {
    let classes = "inline-flex gap-1 py-2 px-6 rounded-full";
    if (type === subpage) {
      classes += " bg-[#FE375C] text-white";
    } else {
      classes += " bg-gray-200";
    }
    return classes;
  }
  return (
    <nav className="w-full flex justify-center mt-8 gap-4 mb-8">
      <Link className={linkClasses("profile")} to="/account">
        <User />
        My Profile
      </Link>
      <Link className={linkClasses("bookings")} to="/account/bookings">
        <Logs />
        My bookings
      </Link>
      <Link className={linkClasses("places")} to="/account/places">
        <MapPinHouse />
        My accommodations
      </Link>
    </nav>
  );
}
