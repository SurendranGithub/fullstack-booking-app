import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registration Successfull!");
    } catch (e) {
      alert("Registration Falied");
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto0" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="John"
            className="my-2 py-2 px-3 border w-full rounded-2xl"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            type="email"
            placeholder="example@email.com"
            className="my-2 py-2 px-3 border w-full rounded-2xl"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            className="my-2 py-2 px-3 border w-full rounded-2xl"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="bg-[#f5385d] p-2 w-full text-white rounded-2xl">
            Register
          </button>
          <div className="text-center py-2 text-gray-500">
            Already a member?{" "}
            <Link to={"/login"} className="underline text-black">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
