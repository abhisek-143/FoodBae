import React, { useEffect, useState } from "react";
import Userlayout from "../components/Userlayout";
import { MdKeyboardBackspace } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Orderlist = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/user/orders/orderlists/`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      });
  }, []);

  return (
    <Userlayout>
      <div className="min-h-120 pb-10 md:min-h-screen">
        <button
          onClick={() => {
            navigate("/");
          }}
          className="flex m-4 cursor-pointer active:scale-95 font-semibold"
        >
          <MdKeyboardBackspace className="m-1" size={18} />
          Back
        </button>
        <div className=" py-2 lg:py-4 lg::ms-5 md:mb-10 ">
          <span className="font-bold text-md text-yellow-400 md:text-3xl flex px-6 py-1 rounded-xl">
            My Orders{" "}
            <FaBoxOpen className="text-yellow-800 mx-2 md:mt-1" lg:size={33} />:
          </span>
        </div>

        {orders.length === 0 ? (
          <div className="flex justify-center items-center py-4">
            <span className="font-bold text-md md:text-3xl flex text-yellow-400  px-6 py-5 rounded-xl">
              You Don't Have Any Orders
            </span>
          </div>
        ) : (
          <>
            {" "}
            {orders.map((item, index) => {
              return (
                <>
                  {item.status !== "Cancelled" && (
                    <div className="grid grid-cols-1  md:pt-2 px-5 lg:px-60 md:px-20 mb-2">
                      <div className="border lg:max-w-250 grid md:grid-cols-3 lg:p-5 p-5 pb-3 rounded-xl">
                        <div className=" hidden md:block items-center lg:ps-10">
                          <FaBoxOpen className="text-yellow-800 " size={135} />
                        </div>
                        <div className="md:pt-4">
                          <p className="font-bold pb-1 lg:text-xl text-yellow-400">
                            ORDER # {item.order_number}
                          </p>
                          <div className="text-sm lg:text-lg pb-2 lg:pb-4">
                            {new Date(item.created_at).toLocaleString()}
                          </div>
                          {item.status === "Not_Confirmed" ? (                          <p className="lg:px-2 px-1 py-1  lg: truncate text-xs rounded-xl ">
                            Waiting for restaurant's confirmations...
                          </p>
):(                          <p className="lg:px-2 px-1 py-1  lg: truncate text-xs rounded-xl ">
                            {item.status}...
                          </p>
)}
                        </div>
                        <div className="flex items-center justify-start lg:justify-center pt-2 gap-2">
                          <button
                            onClick={() => {
                              navigate(`/user/orders/track-order/${item.id}`);
                            }}
                            className="px-2 lg:px-4  lg:py-1.5 py-1 shadow-sm shadow-amber-50  rounded-xl bg-red-600 text-white flex text-xs lg:text-sm active:scale-95 cursor-pointer"
                          >
                            Track Order
                          </button>
                          <button
                            onClick={() => {
                              navigate(
                                `/user/orders/view-order-detail/${item.id}`,
                              );
                            }}
                            className="px-2 py-1 shadow-sm lg:px-4  lg:py-1.5 shadow-amber-50 lg:text-sm rounded-xl bg-red-600 text-white flex text-xs active:scale-95 cursor-pointer"
                          >
                            View Details
                          </button>
                        </div>
                      </div>

                      <div></div>
                    </div>
                  )}
                </>
              );
            })}
          </>
        )}
      </div>
    </Userlayout>
  );
};

export default Orderlist;
