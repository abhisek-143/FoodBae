import React, { useState } from "react";
import Userlayout from "../components/Userlayout";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Userlogin = () => {
  const [emailorphone, setEmailorPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(false);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();


  // sending data to backend... user is logged in or not ...
  const submitHandler = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("emailorphone", emailorphone);
    data.append("password", password);

    try {
      const response = await fetch(`${BASE_URL}/api/auth/user-login/`, {
        method: "POST",
        body: data,
      });
      const result = await response.json();

      if (result) {
        setLoggedInUser(true);
        // set data in localStorage ... 
        localStorage.setItem("userId", result.userId);
        localStorage.setItem("username", result.name);
        localStorage.setItem("loggedInUser", loggedInUser);
      }

      if (response.status === 200) {
        setEmailorPhone("");
        setPassword("");

        toast.success(result.message);

        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.error(result.message || "Something Went Wrong!");
      }
    } catch (error) {
      console.log("fetching error at user login", error);
      setEmailorPhone("");
      setPassword("");
    }
  };

  return (
    <Userlayout>
      <div className="flex justify-center items-start pt-20 md:p-10 md:h-screen bg-black mb-20">
        <ToastContainer position="top-center" autoClose={2000} />
        {/* creating form to receive user inputs */}
        <form
          onSubmit={submitHandler}
          method="POST"
          className="w-[90%] md:w-[80%] lg:w-[50%] rounded-xl md:ps-20 shadow-2xl shadow-amber-400 p-5 md:mt-20  md:pt-20 h-77 md:h-100 md:pe-50  border border-white"
        >
          <p className="font-bold text-3xl content-center text-yellow-400  pb-4 flex justify-start italic items-center">
            <span>Login</span>
          </p>
          <div className="flex relative w-full pb-2">
            <input
              type="text"
              value={emailorphone}
              onChange={(e) => {
                setEmailorPhone(e.target.value);
              }}
              className="px-4 py-2 cursor-pointer rounded-xl bg-white text-black border w-100"
              name="Email"
              required
              placeholder="Email or Phone"
            />
            <br />
          </div>
          <div className="flex relative pb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 bg-white text-black py-2 cursor-pointer rounded-xl border w-100"
              name="password"
              required
              placeholder="password"
            />
            <br />
          </div>
          <p className="text-sm font-semibold pe-10  text-white flex justify-end">
            <Link
              to="#"
              className="cursor-pointer active:scale-95 text-yellow-400"
            >
              Forgot password ?
            </Link>
          </p>
          <div className="flex justify-start m-2  items-center">
            <button
              type="submit"
              name="btn"
              className="px-8 py-2 rounded-xl bg-red-600 cursor-pointer active:scale-95 text-white font-semibold"
            >
              Login
            </button>
          </div>
          <div className="text-white text-sm flex justify-center mt-5">
            <p>
              Don't have an account?{" "}
              <Link
                to="/user-register"
                className="text-yellow-400 cursor-pointer"
              >
                Register for free
              </Link>
            </p>
          </div>
        </form>
        <div className="h-120 ps-30 w-[50%] hidden lg:block">
          <img
            src="/burger3.png"
            className=" bg-cover bg-center h-full"
            alt="food image"
          />
        </div>
      </div>
    </Userlayout>
  );
};

export default Userlogin;
