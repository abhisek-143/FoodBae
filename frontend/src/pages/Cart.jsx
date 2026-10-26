import React, { useState, useEffect ,useContext} from "react";
import Userlayout from "../components/Userlayout";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { CiCircleRemove } from "react-icons/ci";
import { FaCreditCard } from "react-icons/fa";
import { MdKeyboardBackspace } from "react-icons/md";
import { UserContext } from "../components/UserContext";

const Cart = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(0);
  const [deletation, setDeletation] = useState(false);
  const userId = localStorage.getItem("userId")
    const { cartCount, setCartCount } = useContext(UserContext);
  

  //fetching cart items in the Cart...
  useEffect(() => {
    if(!userId){
      navigate("/user-login")
    }


    fetch(`${BASE_URL}/api/user/cart/`)
      .then((res) => res.json())
      .then((data) => {
        setCart(data);
        setCartCount(data.length)
        const total = data.reduce((sum, value) => {
          const price = Number(value.total_amount);

          return sum + price;
        }, 0);
        setTotalAmount(total);
      });
  }, [deletation]);

  //remove cart item logic from Cart...
  const removeCartItemHandler = async (cartItemid) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/user/cart/cartitem/delete/${cartItemid}/`,
        {
          method: "DELETE",
        },
      );
      if (response.ok) {
        setDeletation(false);
        navigate("/user/food/cart");
      }
    } catch (error) {
      console.log("removeCartItem fetching error", error);
      setDeletation(!deletation);
    }
  };

  // handle increment and decrement of order quantity
  const quantityHandler = async (id, quantity) => {
    const response = await fetch(
      `${BASE_URL}/api/user/cart/cartitem/update/${id}/${quantity}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      },
    );
    if (response.ok) {
      setDeletation(!deletation);
    }
  };

  return (
    <Userlayout>
      <button
        onClick={() => {
          navigate("/");
        }}
        className="flex m-4 cursor-pointer active:scale-95 font-semibold"
      >
        <MdKeyboardBackspace className="m-1" size={18} />
        Back
      </button>

      {cart.length === 0 ? (

        //showing empty cart when cart do not have cart items...
        <div className="flex justify-center items-center py-4">
          <span className="font-bold text-md md:text-3xl flex text-yellow-400  px-6 py-5 rounded-xl">
            Your Cart is Empty!{" "}
            <MdOutlineShoppingCart lg:size={30} className="mt-1 ms-2" />
          </span>
        </div>
      ) : (
        <>
          <div className="flex justify-center items-center py-4 ">
            <span className="font-bold text-md md:text-3xl flex bg-red-500  px-6 py-1 rounded-xl">
              My Cart{" "}
              <MdOutlineShoppingCart lg:size={30} className="mt-1 ms-2" />
            </span>
          </div>
          <h1 className="ms-7 md:text-2xl md:ms-10 font-bold lg:ms-18">
            <span className="text-yellow-400">My</span> Cart Lists :
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 lg:p-15 p-5 md:p-10 gap-4">

            {/* mapping method to show all cart items in the Cart */}
            {cart.map((item, index) => {
              return (
                <div
                  key={item.id}
                  className="border bg-gray-800 shadow-md shadow-amber-200 grid min-h-25 lg:min-h-35 grid-cols-2 rounded-xl"
                >
                  <div>
                    <img
                      src={`${BASE_URL}/${item.food_image}`}
                      className="lg:h-40 h-36 bg-cover rounded-xl bg-center w-full"
                      alt="food image"
                    />
                  </div>

                  <div className="flex-col flex justify-center  px-3 lg:px-6">
                    <div
                      onClick={() => {
                        setDeletation(true);

                        removeCartItemHandler(item.id);
                      }}
                      className="ms-auto cursor-pointer  md:pe-0 active:scale-95"
                    >
                      <CiCircleRemove size={20} />
                    </div>
                    <h2 className="font-bold mb-3 truncate lg:mb-9">
                      {item.food_name}
                    </h2>
                    <h3 className=" text-sm text-gray-300 mb-3 flex">
                      <MdOutlineCurrencyRupee className="mt-0.5" />
                      {item.food_price}
                    </h3>

                    <div>
                      <button
                        disabled={item.order_quantity < 2}
                        name="btn"
                        value="minus"
                        onClick={() => {
                          quantityHandler(item.id, item.order_quantity - 1);
                        }}
                      >
                        <FaMinus size={14} className=" border rounded mx-2" />
                      </button>

                      {item.order_quantity}
                      <button
                        name="btn"
                        value="plus"
                        onClick={() => {
                          quantityHandler(item.id, item.order_quantity + 1);
                        }}
                      >
                        <FaPlus size={14} className=" border mx-2 rounded" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex-col flex justify-center items-end me-5 lg:me-15">
            <h2 className="pe-4 py-2 lg:py-5 font-bold">
              Total = {totalAmount}{" "}
            </h2>
            <button
              onClick={() => {
                navigate(`/user/cart/checkout/${totalAmount}`);
              }}
              className="px-4 py-2 rounded-xl bg-red-600 text-white mb-5 flex text-sm active:scale-95 cursor-pointer"
            >
              <FaCreditCard size={16} className="me-1 mt-0.5" />
              Checkout & Payment
            </button>
          </div>
        </>
      )}
    </Userlayout>
  );
};

export default Cart;
