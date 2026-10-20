import React, { useState, useEffect, useContext } from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { CiCircleRemove } from "react-icons/ci";
import { MdOutlineShoppingCart } from "react-icons/md";
import { toast } from "react-toastify";
import Userlayout from "../components/Userlayout";

import { UserContext } from "../components/UserContext";


const UserWishlist = () => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [foods, setFoods] = useState([]);
  const userId = localStorage.getItem("userId");
    const [deletation, setDeletation] = useState(false);
  const {wishlistCount,setWishlistCount} = useContext(UserContext)

  useEffect(() => {
    if (!userId) {
      navigate("/user-login");
    }
    fetch(`${BASE_URL}/api/user/foods/wishlists/`)
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
        setWishlistCount(data.length)
      });
  }, [deletation]);

    const removeCartItemHandler = async (food_id) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/user/food/wishlists/delete_wishlist/${food_id}/`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json()

      if (response.status == 204){
        toast.success(data.message)
      }

      if (response.ok) {
        setDeletation(!deletation);
      }
    } catch (error) {
      console.log("removeCartItem fetching error", error);
      setDeletation(!deletation);
    }
  };



  return (
    <Userlayout>
      <div>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="flex m-4 cursor-pointer active:scale-95 font-semibold"
        >
          <MdKeyboardBackspace className="m-1" size={18} />
          Back
        </button>
        <div className=" py-2 lg:py-4 ">
          <span className="font-bold text-lg text-yellow-400 md:text-2xl lg:text-3xl flex px-6 py-1 rounded-xl">
            #Favorite Foods (Wishlists) :
          </span>
        </div>

        <div className="min-h-100 ">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 lg:p-15 p-5 md:p-10 gap-4">
            {/* mapping method to show all cart items in the Cart */}
            {foods.map((item, index) => {
              return (
                <div
                  key={item.id}
                  className="border bg-gray-800 shadow-md shadow-amber-200 grid min-h-25 lg:min-h-35 grid-cols-2 rounded-xl"
                >
                  <div className="bg-cover">
                    <img
                      src={`${BASE_URL}/${item.food.food_image}`}
                      className="lg:h-40 h-36 bg-cover rounded-xl bg-center w-full"
                      alt="food image"
                    />
                  </div>

                  <div className="flex-col flex justify-center  ps-4 pe-2">
                    <div
                      onClick={() => {
                        setDeletation(true);

                        removeCartItemHandler(item.id);
                      }}
                      className="ms-auto cursor-pointer  md:pe-0 active:scale-95"
                    >
                      <CiCircleRemove size={20} />
                    </div>
                    <h2 className="font-bold mb-3 truncate lg:mb-3">
                      {item.food.food_name}
                    </h2>
                    <p className="text-xs truncate">
                      {item.food.food_description}
                    </p>

                    <h3 className=" text-sm text-gray-300 mb-3 mt-2 flex">
                      <MdOutlineCurrencyRupee className="mt-0.5" />
                      {item.food.food_price}
                    </h3>
                    <div>
                      {" "}
                      <span>
                        <button onClick={()=>{
                          navigate(`/user-viewproduct/${item.food.id}`)
                        }} className="px-1 py-0.5 md:px-4 md:py-1.5 md:mb-2 rounded md:rounded-xl bg-red-600 text-white flex text-xs active:scale-95 cursor-pointer">
                          <MdOutlineShoppingCart size={16} className="me-1" />
                          View Details
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Userlayout>
  );
};

export default UserWishlist;
