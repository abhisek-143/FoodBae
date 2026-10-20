import React, { useState, useEffect } from "react";
import { MdOutlineManageSearch } from "react-icons/md";
import { TbEditFilled } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { LuFolderPlus } from "react-icons/lu";
import Adminlayout from "../components/Adminlayout";
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";

const Managefooditems = () => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [foodlist, setFoodlist] = useState([]);
  const [deletation, setDeletation] = useState(false);
  const [allfoodlist, setAllfoodlist] = useState([]);
  //to handle sidebar open and close option...
  useEffect(() => {
    const syncSidebar = () => setSidebarOpen(window.innerWidth >= 768);
    syncSidebar();
    window.addEventListener("resize", syncSidebar);
    return () => window.removeEventListener("resize", syncSidebar);
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/api/food/manage-food-items/`)
      .then((res) => res.json())
      .then((data) => {
        setFoodlist(data);
        setAllfoodlist(data);
      });
  }, [deletation]);

  const deleteHandler = async (id) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/admin/food/manage_food_item/delete/${id}/`,{
          method : "DELETE",
        })

      const data = await response.json();
            if (data) {
        setDeletation(prev=>!prev);
        console.log(deletation)
      }


      if (response.status == 204) {
        toast.success(data.message);
      }
      if (response.status == 401) {
        toast.error(data.message);
      }

    } catch (error) {
      console.log("delete category error", error);
    }
  };

  const searchInputHandler = (s) => {
    const keyword = s.toLowerCase();
    if (!keyword) {
      setAllfoodlist(foodlist);
    }
    const filtered = foodlist.filter((food) =>
      food.food_name.toLowerCase().includes(keyword),
    );
    setAllfoodlist(filtered);
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

      <main className="text-xs md:text-sm lg:text-lg p-2 md:p-8 lg:p-15 mb-20">
        <ToastContainer autoClose={2000} position="top-center" />
        <div className="md:min-w-174 lg:min-w-300 rounded-xl flex flex-col">
          <div className="flex text-lg lg:text-3xl p-2 text-yellow-400">
            <MdOutlineManageSearch
              className="md:pt-1.5 lg:pt-0 lg:pb-1"
              size={37}
            />
            <h1 className="font-bold pt-1 lg:pt-0 text-3xl">
              Manage Food Items
            </h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2  p-2 mb-6 items-center">
            <input
              type="text"
              onChange={(e) => searchInputHandler(e.target.value)}
              className="border rounded-xl lg:min-w-120 px-4 py-2"
              placeholder="Search"
            />
            <h3 className="text-sm lg:text-lg font-bold flex lg:justify-center lg:ps-10 justify-end py-4 lg:py-5 pe-2">
              <LuFolderPlus className="lg:pt-1 pe-1" size={20} />
              Total Food Items -{" "}
              <span className="font-bold border rounded px-2 ms-2 text-yellow-400">
                {allfoodlist.length}
              </span>
            </h3>
          </div>

          <table className="">
            <thead className="lg:text-xl md:text-sm text-xs">
              <tr>
                <th>Sl No</th>
                <th>Food Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Creation Date</th>
              </tr>
            </thead>
            <tbody>
              {allfoodlist.map((item, index) => (
                <tr key={item.id}>
                  <td className="text-center p-3">{index + 1}</td>
                  <td className="text-center">{item.food_name}</td>
                  <td className="text-center">{item.food_quantity}</td>
                  <td className="text-center">{item.food_price}</td>
                  <td className="text-center">
                    {new Date(item.created_at).toLocaleDateString("en-in")}
                  </td>

                  <td>
                    <form
                      onSubmit={(e) => e.preventDefault()}
                      className="flex gap-2"
                    >
                      <input value={item.id} readOnly type="text" hidden />

                      <button
                        type="submit"
                        onClick={() => {
                          navigate(`/admin/food/manage-food-item/${item.id}`);
                        }}
                        className="px-2 py-1 cursor-pointer active:scale-95 rounded-lg bg-blue-800 text-white flex"
                      >
                        <TbEditFilled className=" pt-1 pe-1" size={18} />
                      </button>
                      <button
                        type="submit"
                        onClick={(e)=>{
                          deleteHandler(item.id);
                        }}
                        className="px-2 py-1 cursor-pointer active:scale-95 rounded-xl bg-red-700 text-white flex"
                      >
                        <MdDelete className="pe-1 " size={20} />
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </Adminlayout>
  );
};

export default Managefooditems;
