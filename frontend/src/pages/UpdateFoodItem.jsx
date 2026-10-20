import React from "react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Adminlayout from "../components/Adminlayout";
import { RiAddLine } from "react-icons/ri";
import { MdKeyboardBackspace } from "react-icons/md";

const UpdateFoodItem = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [food, setFood] = useState([]);
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
  const { id } = useParams();

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

  useEffect(() => {
    fetch(`${BASE_URL}/api/admin/foods/food_item_details/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFood(data);
        setFormdata({
          foodname: data.food_name || "",
          foodprice: data.food_price || "",
          foodquantity: data.food_quantity || "",
          fooddescription: data.food_description || "",
          foodcategory: data.category.category_name || "",
          foodimage: null,
        });
      });
  }, [id]);

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
    const data = new FormData();

    data.append("food_name", formdata.foodname);
    data.append("food_price", formdata.foodprice);
    data.append("food_quantity", formdata.foodquantity);
    data.append("food_description", formdata.fooddescription);
    data.append("category", formdata.foodcategory);

    if (formdata.foodimage) {
      data.append("food_image", formdata.foodimage);
    }

    try {
      const response = await fetch(
        `${BASE_URL}/api/admin/food/manage_food_item/${id}/`,
        {
          method: "PUT",
          body: data,
        },
      );

      const result = await response.json();

      if (response.status == 200) {
        toast.success(result.message);
      } else if (response.status == 400) {
        toast.error(result.message);
      }
      setTimeout(() => {
        navigate("/manage-food-items");
      }, 1000);
    } catch (error) {
      console.log("fetching error in updatecategory", error);
    }
  };

  console.log(formdata.foodprice);

  return (
    <Adminlayout>
      <div className="min-h-screen flex flex-col overflow-x-hidden">
        <button
          onClick={() => {
            navigate("/manage-food-items");
          }}
          className="flex m-4 cursor-pointer active:scale-95 font-semibold"
        >
          <MdKeyboardBackspace className="m-1" size={18} />
          Back
        </button>

        <ToastContainer position="top-center" autoClose={2000} />

        <div className="flex flex-1 min-w-0 text-white">
          <main className="w-full min-w-0 max-w-3xl p-4 sm:p-6 lg:p-10">
            <div className="flex items-center text-2xl sm:text-3xl font-bold">
              <h1>Update Food Item</h1>
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
                Update
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

export default UpdateFoodItem;
