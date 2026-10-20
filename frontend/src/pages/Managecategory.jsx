import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { MdOutlineManageSearch } from "react-icons/md";
import { TbEditFilled } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { LuFolderPlus } from "react-icons/lu";
import Adminlayout from "../components/Adminlayout";
import { MdKeyboardBackspace } from "react-icons/md";

const Managecategory = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [deletaion, setDeletaion] = useState(false);
  const [category, setCategory] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const navigate = useNavigate();

  //to handle sidebar open and close option...
  useEffect(() => {
    const syncSidebar = () => setSidebarOpen(window.innerWidth >= 768);
    syncSidebar();
    window.addEventListener("resize", syncSidebar);
    return () => window.removeEventListener("resize", syncSidebar);
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/api/category/managecategory/`)
      .then((res) => res.json())
      .then((data) => {
        setAllCategories(data);
        setCategory(data);
      });
  }, [deletaion]);

  const deleteHandler = async (id) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/category/updatecategory/${id}/`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (response.status == 204) {
        toast.success(data.message);
      }
      if (response.status == 401) {
        toast.error(data.message);
      }

      if (data) {
        setDeletaion(!deletaion);
      }
    } catch (error) {
      console.log("delete category error", error);
    }
  };

  const searchInputHandler = (s) => {
    const keyword = s.toLowerCase();
    if (!keyword) {
      setAllCategories(category);
    }
    const filtered = category.filter((cat) =>
      cat.category_name.toLowerCase().includes(keyword),
    );
    setAllCategories(filtered);
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

      <ToastContainer position="top-center" autoClose={2000} />
      <div className=" flex flex-col  lg:m-20 lg:mt-15 mt-5 md:p-8 lg:p-0 text-xs md:text-sm">
        <div className="flex text-lg lg:text-3xl p-2 text-yellow-400">
          <MdOutlineManageSearch className=" pb-1" size={37} />
          <h1 className="font-bold pt-1 lg:pt-0">Manage Category</h1>
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
            Total Categories -{" "}
            <span className="font-bold border rounded px-2 ms-2 text-yellow-400">
              {allCategories.length}
            </span>
          </h3>
        </div>
        <table>
          <thead className="lg:text-lg text-sm">
            <tr>
              <th className=" w-15">Sl No</th>
              <th className="ps-5 md:ps-15">Category</th>
              <th className="ps-5 md:ps-15">Creation Date</th>
            </tr>
          </thead>
          <tbody>
            {allCategories.map((item, index) => (
              <tr key={item.id}>
                <td className="text-center p-3 ps-5">{index + 1}</td>
                <td className="text-center lg:text-lg lg:ps-20 ps-5 md:ps-15 ">
                  {item.category_name}
                </td>
                <td className="text-center truncate lg:ps-20 ps-5 md:ps-15">
                  {new Date(item.created_at).toLocaleDateString("en-IN")}
                </td>

                <td>
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="flex gap-2 md:ps-25"
                  >
                    <input value={item.id} readOnly type="text" hidden />

                    <button
                      type="submit"
                      onClick={() => {
                        navigate(`/category/updatecategory/${item.id}/`);
                      }}
                      className="px-4 py-1 cursor-pointer active:scale-95 rounded-lg bg-blue-800 text-white flex"
                    >
                      <TbEditFilled className="pt-0.5 md:pt-1 pe-1" size={18} />
                      <span className="pt-0.5">Edit</span>
                    </button>
                    <button
                      type="submit"
                      onClick={(e) => {
                        deleteHandler(item.id);
                      }}
                      className="px-4 py-1 cursor-pointer active:scale-95 rounded-xl bg-red-700 text-white flex"
                    >
                      <MdDelete className="pe-1 " size={22} />
                      <span className="pt-0.5">Delete</span>
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Adminlayout>
  );
};

export default Managecategory;
