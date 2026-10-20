import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { RiAddLine } from "react-icons/ri";
import Adminlayout from "../components/Adminlayout";
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Addfooditem = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    foodname: "",
    foodprice: "",
    foodquantity: "",
    fooddescription: "",
    foodcategory: "",
    foodimage: null,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        setCategory(data);
      });
  }, []);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const inputFileHandler = (e) => {
    setFormdata((prev) => ({
      ...prev,
      foodimage: e.target.files[0],
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("food_name", formdata.foodname);
      data.append("food_price", formdata.foodprice);
      data.append("food_quantity", formdata.foodquantity);
      data.append("food_description", formdata.fooddescription);
      data.append("category", formdata.foodcategory);
      data.append("food_image", formdata.foodimage);

      const response = await fetch(`${BASE_URL}/api/food/add-food-item/`, {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (result) {
        setFormdata({
          foodname: "",
          foodprice: "",
          foodquantity: "",
          fooddescription: "",
          foodcategory: "",
          foodimage: null,
        });
      }

      if (response.status == 201) {
        toast.success(result.message);
      } else if (response.status == 404) {
        toast.error(result.message);
      } else if (response.status == 400) {
        toast.error(result.message);
      } else {
        toast.error("Something went wrong !");
      }
    } catch (error) {
      console.log("add food item fetching error", error);
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

      <div className="min-h-screen min-w-full flex flex-col">
        <ToastContainer position="top-center" autoClose={2000} />

        <div className="lg:flex">
          <main className="md:min-w-178 max-w-100 ps-4 md:ps-8 pt-5 lg:p-10">
            <div className="flex text-yellow-400 items-center text-2xl sm:text-3xl mb-3 font-bold">
              <RiAddLine className="pe-1" size={42} />
              <h1>Add Food Item</h1>
            </div>
            <form
              onSubmit={submitHandler}
              className="p-2 flex flex-col"
              encType="multipart/form-data"
            >
              <label className="font-bold">--Category--</label>
              <br />
              <select
                name="foodcategory"
                value={formdata.foodcategory}
                onChange={inputHandler}
                className="border rounded-xl bg-black px-4 py-2 cursor-pointer"
              >
                <option value="0">--select category--</option>
                {category.map((cat) => {
                  return (
                    <option key={cat.id} value={cat.id}>
                      {cat.category_name}
                    </option>
                  );
                })}
              </select>
              <br />
              <label className="font-bold ">--Food Name--</label>
              <br />
              <input
                type="text"
                name="foodname"
                value={formdata.foodname}
                onChange={inputHandler}
                className="border rounded-xl px-4 py-2"
                placeholder="e.g. enter food name"
              />
              <br />
              <label className="font-bold px-2 ">--Food Price--</label>
              <br />

              <input
                type="number"
                name="foodprice"
                step={0.1}
                value={formdata.foodprice}
                onChange={inputHandler}
                className="border rounded-xl px-4 py-2"
                placeholder="e.g. enter food price"
              />
              <br />
              <label className="font-bold px-2 ">--Food Quantity--</label>
              <br />
              <input
                type="text"
                name="foodquantity"
                className="border rounded-xl px-4 py-2"
                placeholder="e.g. 1 plate / 2pcs / regular"
                value={formdata.foodquantity}
                onChange={inputHandler}
              />
              <br />
              <label className="font-bold px-2 ">--Food Descriptions--</label>
              <br />
              <textarea
                name="fooddescription"
                value={formdata.fooddescription}
                onChange={inputHandler}
                placeholder="descriptions..."
                className="border rounded-xl px-4 py-2"
              ></textarea>
              <br />
              <label className="font-bold px-2 ">--Food Image--</label>
              <br />
              <input
                type="file"
                name="foodimage"
                accept="image/*"
                onChange={inputFileHandler}
                className="border bg-gray-800 cursor-pointer rounded-xl px-4 py-2"
              />
              <br />

              <button
                type="submit"
                className="px-4 py-1 mt-5 font-bold rounded-2xl cursor-pointer active:scale-95 shadow-[5px_0_6px_rgba(0,0,0,0.3)] bg-blue-700"
              >
                Add Food
              </button>
            </form>
          </main>
          <div className="flex justify-center items-center">
            <img
              src="public/burger3.png"
              className="bg-cover bg-center my-10 lg:h-120 h-100 px-4"
              alt="food image"
            />
          </div>
        </div>
      </div>
    </Adminlayout>
  );
};

export default Addfooditem;
