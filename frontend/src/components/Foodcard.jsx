import React,{useState} from "react";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { IoStarSharp } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";



const Foodcard = ({ item }) => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  return (
    <div
      onClick={() => {
        navigate(`/user-viewproduct/${item.id}`);
      }}
      className="p-2 md:w-full"
    >
      <div className=" w-45 md:w-55 lg:w-77 rounded shadow-2xl bg-white">
        <img
          className="w-45 md:w-55 lg:w-77 rounded-xl bg-cover bg-center rounded-t-sm h-35 md:h-60"
          src={`${BASE_URL}${item.food_image}`}
          alt="Card image"
        />
        <div className="p-2  md:px-2 md:py-2">
          <div className="font-bold text-xs md:text-lg md:mb-2 text-black truncate">
            {item.food_name}
          </div>
          <p className="text-gray-700 text-xs md:mt-2 truncate">
            {item.food_description}
          </p>
        </div>
        <div className="md:px-2 md:pb-2 p-2 pt-0 text-xs">
          <div className="flex text-yellow-400">
            <IoStarSharp />
            <IoStarSharp />
            <IoStarSharp />
            <IoStarSharp />
            <IoStarSharp />
          </div>
          <div className="nd:flex md:justify-between md:mt-1">
            <span className="2 text-md md:text-lg font-bold flex text-gray-700 mb-2">
              <MdOutlineCurrencyRupee className="mt-0.5 md:mt-2" size={12} />
              {item.food_price}
            </span>
            <span>
              <button className="px-1 py-0.5 md:px-4 md:py-2 rounded md:rounded-xl bg-red-600 text-white flex text-xxs active:scale-95 cursor-pointer">
                <MdOutlineShoppingCart size={16} className="me-1" />
                View Details
              </button>
            </span>
          </div>
          <Link className=" w-full md:pt-2 truncate text-green-800 flex mt-1 md:text-xs">
            get extra <MdOutlineCurrencyRupee size={15} className="mt-1" />
            25 off by using paytm
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Foodcard;
