import React from "react";
import { MdOutlineCurrencyRupee, MdOutlineShoppingCart } from "react-icons/md";
import { IoStarSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const BASE_URL = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

// Always returns a valid URL with exactly one slash between host and path
const getImageUrl = (path) => {
  if (!path) return "/placeholder.png"; // put placeholder.png in /public
  if (/^https?:\/\//i.test(path)) return path; // already a full URL (Cloudinary etc.)
  return `${BASE_URL}/${path.replace(/^\/+/, "")}`;
};

const Foodcard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/user-viewproduct/${item.id}`)}
      className="p-2 md:w-full cursor-pointer"
    >
      <div className="w-45 md:w-55 lg:w-77 rounded shadow-2xl bg-white">
        <img
          className="w-45 md:w-55 lg:w-77 rounded-xl rounded-t-sm h-35 md:h-60 object-cover"
          src={getImageUrl(item.food_image)}
          alt={item.food_name || "Food image"}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null; // prevent infinite loop
            e.currentTarget.src = "/placeholder.png";
          }}
        />

        <div className="p-2 md:px-2 md:py-2">
          <div className="font-bold text-xs md:text-lg md:mb-2 text-black truncate">
            {item.food_name}
          </div>
          <p className="text-gray-700 text-xs md:mt-2 truncate">
            {item.food_description}
          </p>
        </div>

        <div className="md:px-2 md:pb-2 p-2 pt-0 text-xs">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <IoStarSharp key={i} />
            ))}
          </div>

          <div className="md:flex md:justify-between md:mt-1">
            <span className="text-md md:text-lg font-bold flex text-gray-700 mb-2">
              <MdOutlineCurrencyRupee className="mt-0.5 md:mt-2" size={12} />
              {item.food_price}
            </span>
            <span>
              <button className="px-1 py-0.5 md:px-4 md:py-2 rounded md:rounded-xl bg-red-600 text-white flex text-[10px] active:scale-95 cursor-pointer">
                <MdOutlineShoppingCart size={16} className="me-1" />
                View Details
              </button>
            </span>
          </div>

          <Link
            to="#"
            onClick={(e) => e.stopPropagation()}
            className="w-full md:pt-2 truncate text-green-800 flex mt-1 md:text-xs"
          >
            get extra <MdOutlineCurrencyRupee size={15} className="mt-1" />
            25 off by using paytm
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Foodcard;
