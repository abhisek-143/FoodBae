import React, { useState, useEffect, useContext } from "react";
import Userlayout from "../components/Userlayout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoStarSharp } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { MdKeyboardBackspace } from "react-icons/md";
import { TiHeart } from "react-icons/ti";
import { UserContext } from "../components/UserContext";
import { FaStar } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";

const ViewProduct = () => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [foodItem, setFoodItem] = useState("");
  const { id } = useParams();
  const [review, setReview] = useState("");
  const [ratings, setRatings] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const { wishlistCount, setWishlistCount } = useContext(UserContext);
  const { cartCount, setCartCount } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");
  const [quantity, setQuantity] = useState(1);

  // fetching the selected food item in the page.....
  useEffect(() => {
    fetch(`${BASE_URL}/api/user/food/view-food-item/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setFoodItem(data);
        setLoading(false);
      });
  }, []);

  // adding cart item in the cart....
  const addToCartHandler = async () => {
    //logic or not -- checking...
    if (!userId) {
      navigate("/user-login");
    }

    try {
      // creating cart item...
      const response = await fetch(
        `${BASE_URL}/api/user/cart/cartitem/${id}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            order_quantity: quantity,
          }),
        },
      );
      const data = await response.json();

      if (response.status == 201) {
        setCartCount(cartCount + 1);
        toast.success(data.message);
        setTimeout(() => {
          navigate("/user/food/cart");
        }, 1000);
      } else {
        toast.error(data.message || "Something Went Wrong!");
      }
    } catch (error) {
      console.log("fetching error at viewproduct", error);
    }
  };

  const wishlistHandler = async () => {
    const response = await fetch(
      `${BASE_URL}/api/user/food/add_to_wishlist/${id}/`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
        }),
      },
    );
    const data = await response.json();

    if (response.status == 201) {
      setWishlist(true);
      setWishlistCount(wishlistCount + 1);
      toast.success(data.message);
    } else if (response.status == 200) {
      setWishlist(false);
      toast.success(data.message);
    } else {
      setWishlist(false);
      toast.error(data.message || "Something Went Wrong!");
    }
  };

  return (
    <Userlayout>
      {loading ? (
        <div className="h-screen flex justify-center items-center">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          {" "}
          <button
            onClick={() => {
              navigate("/");
            }}
            className="flex m-4 cursor-pointer active:scale-95 font-semibold"
          >
            <MdKeyboardBackspace className="m-1" size={18} />
            Back
          </button>
          <div className="flex justify-center items-center min-h-140 p-8">
            <ToastContainer autoClose={2000} position="top-center" />
            <div className=" border grid grid-cols-2 h-60 md:min-w-160 lg:h-80 rounded-xl p-2 shadow-lg shadow-amber-400">
              <div className="">
                <img
                  className="w-full  rounded-t-sm h-56 lg:h-76 bg-center bg-cover rounded-xl"
                  src={`${BASE_URL}/${foodItem.food_image}`}
                  alt="Card image"
                />
              </div>

              <div className="lg:ps-3 ps-1 text-sm md:ps-5">
                <div
                  onClick={wishlistHandler}
                  className="cursor-pointer active:scale-98 relative"
                >
                  {wishlist ? (
                    <TiHeart size={25} className="absolute right-1  top-1" />
                  ) : (
                    <FiHeart size={20} className="absolute right-1  top-1" />
                  )}
                </div>

                <div className="lg:px-4 p-1  lg:py-6">
                  <div className="font-bold text-md pt-3 md:text-xl mb-2">
                    {foodItem.food_name}
                  </div>
                  <p className="text-sm truncate lg:text-base ">
                    {foodItem.food_description}
                  </p>
                </div>
                <div className="lg:px-6 lg:pb-2 p-1 pt-1 md:pt-5">
                  <div className="flex text-yellow-400">
                    <IoStarSharp />
                    <IoStarSharp />
                    <IoStarSharp />
                    <IoStarSharp />
                    <IoStarSharp />
                  </div>
                  <div className="flex font-bold text-md lg:text-lg mt-4 lg:mt-4 gap-1">
                    Quantity :{" "}
                    {quantity > 1 ? (
                      <button onClick={() => setQuantity(quantity - 1)}>
                        <FaMinus size={15} className=" border rounded ms-2" />
                      </button>
                    ) : (
                      <button>
                        <FaMinus size={15} className=" border rounded ms-2" />
                      </button>
                    )}
                    {quantity}
                    <button
                      name="btn"
                      value="plus"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <FaPlus size={14} className=" border rounded" />
                    </button>
                  </div>
                  <div className="lg:my-4">
                    <span className=" rounded-full text-md lg:text-lg font-bold flex mb-2">
                      <MdOutlineCurrencyRupee className="mt-1" size={15} />
                      {foodItem.food_price}
                    </span>
                    <span className="flex justify-center items-center">
                      <button
                        onClick={addToCartHandler}
                        className="px-4 py-2 rounded-xl bg-red-600 text-white flex text-sm active:scale-95 cursor-pointer"
                      >
                        <MdOutlineShoppingCart size={16} className="me-1" />
                        Add to cart
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-5">
            <div className=" py-4 ">
              <span className="font-bold underline text-md text-yellow-400 md:text-2xl lg:text-3xl flex px-6 py-1 rounded-xl">
                #Food Item{""} Details :
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3">
              <div className="lg:col-span-1 me-10">
                <div className="flex gap-2 ms-7 mt-3">
                  <label>Food name :</label>
                  <p>{foodItem.food_name}</p>
                </div>
                <div className="flex gap-2 ms-7 mt-3">
                  <label>Food Quantity :</label>
                  <p>{foodItem.food_quantity}</p>
                </div>
                <div className="flex gap-2 ms-7 mt-3">
                  <label>Food Price :</label>
                  <p>{foodItem.food_price}</p>
                </div>
                <div className="flex gap-2 ms-7 mt-3">
                  <label>Food descriptions :</label>
                  <p>{foodItem.food_description}</p>
                </div>
                <div className="flex gap-2 ms-7 mt-3">
                  <label>Food category :</label>
                  <p>{foodItem.category.category_name}</p>
                </div>
                <div className="flex gap-2 ms-7 mt-3">
                  <label>Food Ratings :</label>
                  <p></p>
                </div>

                <div className="m-7">
                  <span className="font-bold text-md mb-2 md:text-2xl lg:text-xl text-yellow-400 flex px-2 py-1 rounded-xl">
                    Write a review <FaPen className="text-sm mt-2 ms-2"/>
                  </span>

                  <textarea
                    rows={5}
                    className="border rounded-xl text-black bg-gray-200 p-3 w-full"
                    placeholder="write a review..."
                  ></textarea>

                  <div className="flex gap-2 mt-3">
                    <span className="font-bold text-md mb-2 text-yellow-400 flex px-2 text-lg py-1 rounded-xl">
                      Ratings :
                    </span>

                    {[1, 2, 3, 4, 5].map((star) => {
                      return (
                        <FaStar
                          key={star}
                          values={ratings}
                          onChange={(e) => {
                            setRatings(e.target.value);
                          }}
                          className="mt-1.5 text-xl hover:text-yellow-500"
                        />
                      );
                    })}
                  </div>
                                  <button className="px-4 w-full py-2 rounded-xl border bg-red-600 text-white inline-block">Submit</button>

                </div>
              </div>

              <div className="border rounded-xl p-5 lg:col-span-2 lg:max-h-133 overflow-auto my-5 me-10 bg-gray-300 text-black ">
                                  <span className="font-bold text-md mb-2 md:text-2xl lg:text-2xl flex px-2 py-1 rounded-xl">
                    Customers reviews <FaPen className="text-sm mt-2 ms-2"/>
                  </span>

                      <div className="">
                                           <label className="font-extrabold mb-3 text-lg mx-4 ms-4">Total Reviews (515)</label>
 
                                          <div className="mx-4 flex flex-col gap-2">
                    <label className="font-bold ms-2">User01</label>
                    <p className="border rounded-lg p-3 bg-gray-200">delicious food...taste was amazing....everyone go for it...</p>

                  </div>
                  <div className="mx-4 flex flex-col gap-2">
                    <label className="font-bold ms-2">User01</label>
                    <p className="border rounded-lg p-3 bg-gray-200">delicious food...taste was amazing....everyone go for it...</p>

                  </div>
                  <div className="mx-4 flex flex-col gap-2">
                    <label className="font-bold ms-2">User01</label>
                    <p className="border rounded-lg p-3 bg-gray-200">delicious food...taste was amazing....everyone go for it...</p>

                  </div>
                  <div className="mx-4 flex flex-col gap-2">
                    <label className="font-bold ms-2">User01</label>
                    <p className="border rounded-lg p-3 bg-gray-200">delicious food...taste was amazing....everyone go for it...</p>

                  </div>
                  <div className="mx-4 flex flex-col gap-2">
                    <label className="font-bold ms-2">User01</label>
                    <p className="border rounded-lg p-3 bg-gray-200">delicious food...taste was amazing....everyone go for it...</p>

                  </div>
                  <div className="mx-4 flex flex-col gap-2">
                    <label className="font-bold ms-2">User01</label>
                    <p className="border rounded-lg p-3 bg-gray-200">delicious food...taste was amazing....everyone go for it...</p>

                  </div>
                  <div className="mx-4 flex flex-col gap-2">
                    <label className="font-bold ms-2">User01</label>
                    <p className="border rounded-lg p-3 bg-gray-200">delicious food...taste was amazing....everyone go for it...</p>

                  </div>
                  <div className="mx-4 flex flex-col gap-2">
                    <label className="font-bold ms-2">User01</label>
                    <p className="border rounded-lg p-3 bg-gray-200">delicious food...taste was amazing....everyone go for it...</p>

                  </div>
                  <div className="mx-4 flex flex-col gap-2">
                    <label className="font-bold ms-2">User01</label>
                    <p className="border rounded-lg p-3 bg-gray-200">delicious food...taste was amazing....everyone go for it...</p>

                  </div>
                  <div className="mx-4 flex flex-col gap-2">
                    <label className="font-bold ms-2">User01</label>
                    <p className="border rounded-lg p-3 bg-gray-200">delicious food...taste was amazing....everyone go for it...</p>

                  </div>
                  <div className="mx-4 flex flex-col gap-2">
                    <label className="font-bold ms-2">User01</label>
                    <p className="border rounded-lg p-3 bg-gray-200">delicious food...taste was amazing....everyone go for it...</p>

                  </div>
                  <div className="mx-4 flex flex-col gap-2">
                    <label className="font-bold ms-2">User01</label>
                    <p className="border rounded-lg p-3 bg-gray-200">delicious food...taste was amazing....everyone go for it...</p>

                  </div>
                  <div className="mx-4 flex flex-col gap-2">
                    <label className="font-bold ms-2">User01</label>
                    <p className="border rounded-lg p-3 bg-gray-200">delicious food...taste was amazing....everyone go for it...</p>

                  </div>
                  <div className="mx-4 flex flex-col gap-2">
                    <label className="font-bold ms-2">User01</label>
                    <p className="border rounded-lg p-3 bg-gray-200">delicious food...taste was amazing....everyone go for it...</p>

                  </div>
                  <div className="mx-4 flex flex-col gap-2">
                    <label className="font-bold ms-2">User01</label>
                    <p className="border rounded-lg p-3 bg-gray-200">delicious food...taste was amazing....everyone go for it...</p>

                  </div>

                      </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Userlayout>
  );
};

export default ViewProduct;
