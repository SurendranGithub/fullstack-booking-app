import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import { User, Logs, MapPinHouse } from "lucide-react";

export default function AccountPage() {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  if (!ready) {
    return <div>Loading!...</div>;
  }

  if (ready && !user && !redirect) {
    return <Navigate to="/login" />;
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

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
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
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})
          <br />
          <button
            onClick={logout}
            className="bg-[#f5385d] p-2 w-full text-white rounded-2xl max-w-sm mt-2"
          >
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
}
