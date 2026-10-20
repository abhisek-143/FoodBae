import React, { useEffect, useState } from "react";
import { RiAddLine } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Adminlayout from "../components/Adminlayout";
import { MdKeyboardBackspace } from "react-icons/md";

const Addcategory = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [category_name, setCategory_name] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const syncSidebar = () => setSidebarOpen(window.innerWidth >= 768);
    syncSidebar();
    window.addEventListener("resize", syncSidebar);
    return () => window.removeEventListener("resize", syncSidebar);
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await fetch(`${BASE_URL}/api/category/addcategory/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category_name: category_name,
      }),
    });

    const data = await response.json();

    if (response.status == 201) {
      toast.success(data.message);
      navigate("/addcategory");
      setCategory_name("");
    } else if (response.status == 404) {
      toast.error(data.message);
    } else if (response.status == 400) {
      toast.error(data.message);
    } else {
      toast.error("Something went wrong !");
    }
  };

  return (
    <Adminlayout>
      <button
        onClick={() => {
          navigate("/admindashboard");
        }}
        className="flex m-4 cursor-pointer active:scale-95 font-semibold"
      >
        <MdKeyboardBackspace className="m-1" size={18} />
        Back
      </button>

      <div className="min-h-screen flex flex-col">
        <ToastContainer position="top-center" autoClose={2000} />

        <div className="flex">
          <main className="p-4 sm:p-6 lg:p-10">
            <div className="flex text-yellow-400 items-center text-2xl sm:text-3xl font-bold">
              <RiAddLine className="pe-1" size={42} />
              <h1 className="">Add Category</h1>
            </div>
            <form onSubmit={submitHandler} className="p-2 sm:p-5">
              <input
                type="text"
                className="border rounded-2xl px-4 py-2 w-full max-w-xl"
                placeholder="Add Category... "
                value={category_name}
                onChange={(e) => setCategory_name(e.target.value)}
              />
              <br />
              <button
                type="submit"
                className="px-4 py-1 mt-5 font-bold rounded-2xl cursor-pointer active:scale-95 shadow-[5px_0_6px_rgba(0,0,0,0.3)] bg-blue-700 text-white"
              >
                Add Category
              </button>
            </form>

            <div className="flex flex-col gap-5 ps-2 sm:ps-5 pt-12 sm:pt-20 max-w-xl">
              <ol>
                <li>
                  <p className="font-bold">Starters & Snacks</p>
                  <p>
                    Kick off your meal with crispy, flavorful bites — perfect
                    for sharing or enjoying solo.
                  </p>
                </li>
                <li>
                  <p className="font-bold">Desserts</p>
                  <p>
                    Indulge in sweet treats that melt in your mouth and end your
                    meal on a delightful note.
                  </p>
                </li>
                <li>
                  <p className="font-bold">Beverages </p>
                  <p>
                    Refreshing drinks, from coolers to hot brews, to complement
                    every dish.
                  </p>
                </li>
                <li>
                  <p className="font-bold">Healthy Options </p>
                  <p>
                    Nutritious and delicious meals designed to balance taste
                    with wellness.
                  </p>
                </li>
                <li>
                  <p className="font-bold">Chef’s Specials </p>
                  <p>
                    Unique creations and seasonal favorites, hand‑picked by our
                    chefs just for you.
                  </p>
                </li>
              </ol>
            </div>
          </main>
        </div>
      </div>
    </Adminlayout>
  );
};

export default Addcategory;
