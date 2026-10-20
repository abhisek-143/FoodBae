import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Adminlayout from "../components/Adminlayout";

const Updatecategory = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [category_name, setCategory_name] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const syncSidebar = () => setSidebarOpen(window.innerWidth >= 768);
    syncSidebar();
    window.addEventListener("resize", syncSidebar);
    return () => window.removeEventListener("resize", syncSidebar);
  }, []);

  const submitHandler =async(e) => {
    e.preventDefault();
  
          try {
      const response = await fetch(
        `${BASE_URL}/api/category/updatecategory/${id}/`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            category_name : category_name,
          }),
        },
      );

      const data = await response.json();

      if (response.status == 200) {
        toast.success(data.message)
      }else if (response.status == 400){
          toast.error(data.message)
      }
      setTimeout(()=>{
                        navigate("/managecategory")

      },1000)


    } catch (error) {
      console.log("fetching error in updatecategory", error);
    }

    
  };

  return (
    <Adminlayout>
          <div className="min-h-screen flex flex-col overflow-x-hidden">
      <ToastContainer position="top-center" autoClose={2000} />

      <div className="flex flex-1 min-w-0 bg-[url('/public/add_category_image.jpeg')] bg-cover bg-center text-white">
        <main className="w-full min-w-0 max-w-3xl p-4 sm:p-6 lg:p-10">
          <div className="flex items-center text-2xl sm:text-3xl font-bold">
            <h1>Update Category</h1>
          </div>
          <form onSubmit={submitHandler} className="p-2 sm:p-5">
            <input
              type="text"
              value={category_name}
              onChange={(e) => {
                setCategory_name(e.target.value);
              }}
              className="border rounded-2xl px-4 py-2 w-full max-w-xl"
              placeholder="Update Category... "
            />
            <br />
            <button
              type="submit"
              className="px-4 py-1 mt-5 font-bold rounded-2xl cursor-pointer active:scale-95 shadow-[5px_0_6px_rgba(0,0,0,0.3)] bg-blue-700 text-white"
            >
              Update
            </button>
          </form>

          <div className="flex flex-col gap-5 ps-2 sm:ps-5 pt-12 sm:pt-20 max-w-xl">
            <ol>
              <li>
                <p className="font-bold">Starters & Snacks</p>
                <p>
                  Kick off your meal with crispy, flavorful bites — perfect for
                  sharing or enjoying solo.
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
                  Nutritious and delicious meals designed to balance taste with
                  wellness.
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

export default Updatecategory;
