import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      axios.post("/login", { email, password });
      alert("Login Successfull");
    } catch (e) {
      alert("Login Failed");
    }
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
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
            Login
          </button>
          <div className="text-center py-2 text-gray-500">
            Don't an account yet?{" "}
            <Link to={"/register"} className="underline text-black">
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
