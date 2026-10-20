import React, { useState, useEffect } from "react";
import Userlayout from "../components/Userlayout";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Foodcard from "../components/Foodcard";
import { useNavigate } from "react-router-dom";

const FoodMenu = () => {
  let minPrice = 0;
  let maxPrice = 1000;
  const [filteredPrice, setFilteredPrice] = useState(0);
  const [category, setCategory] = useState([]);
  const [foods, setFoods] = useState([]);
  const [allFoods, setAllFoods] = useState([]);
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate();
  const [searchFood, setSearchFood] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const userId = localStorage.getItem("userId");
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [currentPage, setCurrentPage] = useState(1);
  const foodPerPage = 10;

  useEffect(() => {
    fetch(`${BASE_URL}/api/category/managecategory/`)
      .then((res) => res.json())
      .then((data) => {
        setCategory(data);
      });

    fetch(`${BASE_URL}/api/food/manage-food-items/`)
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
        setAllFoods(data);
        setLoading(false)
      });
  }, []);

  const foodLastIndex = currentPage * foodPerPage;
  const foodFirstIndex = foodPerPage - foodLastIndex;

  const maxPage = Math.ceil(foods.length / foodPerPage - 1);
  const paginate = (currentPage) => {
    return foods.slice(foodFirstIndex, foodLastIndex);
  };

  const submitHandler = (searchFood, selectCategory) => {
    if (!userId) {
      navigate("/user-login");
    }

    let result = [...allFoods];
    if (selectCategory) {
      if (selectCategory !== "All") {
        result = result.filter(
          (item) => item.category.category_name === selectCategory,
        );
      }
    }

    if (searchFood) {
      let keyword = searchFood.toLowerCase();
      result = result.filter((item) =>
        item.food_name.toLowerCase().includes(keyword),
      );
    }

    if (filteredPrice > 0) {
      result = result.filter(
        (item) =>
          Number(item.food_price) >= minPrice &&
          Number(item.food_price) <= Number(filteredPrice),
      );
      console.log(result);
    }

    if (selectCategory || searchFood || filteredPrice) {
      setFoods(result);
    }
  };

  return (
    <Userlayout>
      {loading ? (
        <div className="h-screen flex justify-center items-center">
          <p>Loading...</p>
        </div>
      ):(      <div className="lg:p-5 px-1">
        <div className="flex text-lg p-4 lg:text-3xl text-yellow-400">
          <h1 className="font-bold pt-1 lg:py-4  lg:text-3xl">
            #FOODBAE - MENU (food items)
          </h1>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitHandler(searchFood, selectCategory);
          }}
          className="lg:grid lg:grid-cols-3 p-4 lg:gap-4"
        >
          <div className="lg:col-span-2 flex">
            <input
              value={searchFood}
              onChange={(e) => setSearchFood(e.target.value)}
              className="border px-3  lg:px-4 py-2 w-[90%] rounded-s-xl "
              placeholder="search here by food..."
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-e-xl bg-red-700"
            >
              Search
            </button>
          </div>
          <select
            value={selectCategory}
            onChange={(e) => {
              setSelectCategory(e.target.value);
            }}
            className="border mt-2 lg:mt-0 px-4 py-2.5 bg-black rounded-xl lg:col-span-1"
          >
            <option value="All">All</option>
            {category.map((cat) => {
              return <option key={cat.id}>{cat.category_name}</option>;
            })}
          </select>
          <p className="lg:col-span-3 mt-3 lg:mt-0 text-yellow-400">
            Filter By Price Range : ( {minPrice} - {maxPrice} )
          </p>
          <div className="ps-2 mt-3 lg:mt-0">
            <Slider
              min={minPrice}
              max={maxPrice}
              range
              step={50}
              value={filteredPrice}
              onChange={setFilteredPrice}
            />
            {filteredPrice}
          </div>
        </form>

        <div className="grid lg:grid-cols-5 md:grid-cols-3 md:mx-4 lg:mx-0 my-10 grid-cols-2">
          {paginate(currentPage).map((item) => {
            return <Foodcard item={item} key={item.id} />;
          })}
        </div>
        <div className="flex justify-center gap-2 items-center mb-5">
          {"<<<"}
          <button
            disabled={currentPage == 1}
            onClick={() => {
              setCurrentPage(currentPage - 1);
            }}
            className={`px-4 py-2 ${currentPage < 2 && "opacity-70"}  cursor-pointer active:scale-95 bg-gray-600 text-white border rounded-xl`}
          >
            {" "}
            Prev
          </button>
          <button disabled className="font-bold mx-5">
            {currentPage}
          </button>
          <button
            disabled={maxPage == currentPage}
            onClick={() => {
              setCurrentPage(currentPage + 1);
            }}
            className={`px-4 ${currentPage == maxPage && "opacity-70"} cursor-pointer active:scale-95 bg-gray-600 text-white py-2 border rounded-xl`}
          >
            Next{" "}
          </button>
          {">>>"}
        </div>
      </div>
)}
    </Userlayout>
  );
};

export default FoodMenu;
