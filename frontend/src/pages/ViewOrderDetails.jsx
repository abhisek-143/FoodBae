import React, { useEffect, useState } from "react";
import Userlayout from "../components/Userlayout";
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { CiCircleRemove } from "react-icons/ci";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { toast, ToastContainer } from "react-toastify";
import { useRef } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

const ViewOrderDetails = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [is_cancel, setIs_cancel] = useState(false);
  const [cancel_reason, setCancel_reason] = useState("");
  const [cancel_comment, setCancel_comment] = useState("");
  const cancelref = useRef(null);

  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_URL}/api/user/order/orderdetails/${id}/`)
      .then((res) => {
        if (!res.ok) {
          throw new console.error("response error", res.status);
        }
        return res.json();
      })
      .then((data) => {
        setOrder(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useGSAP(() => {
    gsap.from(cancelref.current, {
      scale: 0,
      delay: 0.2,
      opacity: 0,
      duration: 0.3,
      ease: "back.out(2)",
    });
  }, [is_cancel]);

  const cancelSubmitHandler = (e) => {
    e.preventDefault();
    try {
      fetch(`${BASE_URL}/api/user/order/cancel_order/${id}/`)
        .then((res) => res.json())
        .then((data) => {
          toast.success(data.message || "Order cancelled successfully");
          setIs_cancel(false);
          setTimeout(() => {
            navigate("/user/orders/order-lists");
          }, 1000);
        });
    } catch (error) {
      console.log("cancel submit handler error", error);
    }
  };

  return (
    <Userlayout>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="min-h-screen mb-10 md:mb-20">
          <ToastContainer autoClose={2000} position="top-center" />
          <button
            onClick={() => {
              navigate("/user/orders/order-lists");
            }}
            className="flex m-4 cursor-pointer active:scale-95 font-semibold"
          >
            <MdKeyboardBackspace className="m-1" size={18} />
            Back
          </button>

          <div className=" py-4 ">
            <span className="font-bold text-md text-yellow-400 md:text-2xl lg:text-3xl flex px-6 py-1 rounded-xl">
              ORDER #{""} Details :
            </span>
          </div>

          <div className="grid grid-cols-1  md:ps-10 lg:grid-cols-2">
            <div className="border-e-2 ms-5">
              <div className=" py-4 lg:ms-5 ">
                <span className="font-bold text-yellow-400 text-md md:text-xl flex px-2 lg:px-6 py-1 rounded-xl">
                  Customer Details :
                </span>
              </div>

              <div className="flex">
                <label className="font-bold py-2 px-2 md:min-w-60">
                  First Name :
                </label>

                <input
                  type="text"
                  readOnly
                  value={order.user.firstname}
                  className="px-4 py-2 cursor-pointer rounded-xl lg:w-100"
                />
              </div>
              <div className="flex">
                <label className="font-bold md:min-w-60 px-2 py-2">
                  Last Name :
                </label>

                <input
                  readOnly
                  type="text"
                  value={order.user.lastname}
                  className="px-4 py-2 cursor-pointer rounded-xl lg:w-100"
                />
              </div>

              <div className="flex">
                <label className="font-bold md:min-w-60 px-2 py-2">
                  Email :
                </label>

                <input
                  type="text"
                  readOnly
                  value={order.user.email}
                  className="
                px-4 py-2 cursor-pointer rounded-xl min-w-65 lg:w-100"
                />
              </div>
              <div className="flex ">
                <label className="font-bold md:min-w-60 px-2 py-2">Phone</label>

                <input
                  type="text"
                  readOnly
                  value={order.user.phone}
                  className="px-4 py-2 cursor-pointer rounded-xl  lg:w-100"
                />
              </div>
            </div>

            <div className="border-e-2 lg:ms-18 ms-5">
              <div className=" py-4 lg:ms-5 ">
                <span className="font-bold text-yellow-400 text-md md:text-xl flex px-2 lg:px-6 py-1 rounded-xl">
                  Delivery Address Details :
                </span>
              </div>

              <div className="flex">
                <label className="font-bold py-2 px-2 md:min-w-60">
                  Locality Area 1
                </label>

                <input
                  type="text"
                  readOnly
                  value={order.locality_area_01}
                  className="px-4 py-2 cursor-pointer rounded-xl  lg:w-100"
                />
              </div>
              <div className="flex">
                <label className="font-bold md:min-w-60 px-2 py-2">
                  Locality Area 2 (optional)
                </label>

                <input
                  readOnly
                  type="text"
                  value={order.locality_area_02}
                  className="px-4 py-2 cursor-pointer rounded-xl lg:w-100"
                />
              </div>

              <div className="flex">
                <label className="font-bold md:min-w-60 px-2 py-2">
                  LandMark Area (optional)
                </label>

                <input
                  type="text"
                  readOnly
                  value={order.landmark}
                  className="px-4 py-2 cursor-pointer rounded-xl lg:w-100"
                />
              </div>
              <div className="flex ">
                <label className="font-bold md:min-w-60 px-2 py-2">City</label>

                <input
                  type="text"
                  readOnly
                  value={order.city}
                  className="px-4 py-2 cursor-pointer rounded-xl lg:w-100"
                />
              </div>
              <div className="flex">
                <label className="font-bold md:min-w-60 px-2 py-2">
                  District
                </label>

                <input
                  type="text"
                  readOnly
                  value={order.district}
                  className="px-4 py-2 cursor-pointer rounded-xl lg:w-100"
                />
              </div>
              <div className="flex">
                <label className="font-bold px-2 py-2 md:min-w-60">State</label>

                <input
                  type="text"
                  readOnly
                  value={order.state}
                  className="px-4 py-2 cursor-pointer rounded-xl lg:w-100"
                />
              </div>
              <div className="flex">
                <label className="font-bold py-2 px-2 md:min-w-60">
                  Pincode
                </label>

                <input
                  type="text"
                  readOnly
                  value={order.user.pincode}
                  className="px-4 py-2 cursor-pointer rounded-xl lg:w-100"
                />
              </div>
            </div>

            <div className="border-e-2 ms-5">
              <div className=" py-4 lg:ms-5 ">
                <span className="font-bold text-yellow-400 text-md md:text-xl flex px-2 lg:px-6 py-1 rounded-xl">
                  Payemnt Details :
                </span>
              </div>

              <div className="flex">
                <label className="font-bold py-2 px-2 md:min-w-60">
                  Payment Method
                </label>

                <input
                  type="text"
                  readOnly
                  value={order.payment_option}
                  className="px-4 py-2 cursor-pointer rounded-xl lg:w-100"
                />
              </div>
              <div className="flex">
                <label className="font-bold py-2 px-2 md:min-w-60">
                  Total Amount
                </label>

                <input
                  type="text"
                  readOnly
                  value={order.total_amount}
                  className="px-4 py-2 cursor-pointer rounded-xl lg:w-100"
                />
              </div>

              <div className="flex">
                <label className="font-bold md:min-w-60 px-2 py-2">
                  Card Number
                </label>

                <input
                  type="text"
                  readOnly
                  value={order.card_number}
                  className="px-4 py-2 cursor-pointer rounded-xl lg:w-100"
                />
              </div>
              <div className="flex ">
                <label className="font-bold md:min-w-60 px-2 py-2">
                  Expiry
                </label>

                <input
                  type="text"
                  readOnly
                  value={order.expiry_date}
                  className="px-4 py-2 cursor-pointer rounded-xl lg:w-100"
                />
              </div>
              <div className="flex">
                <label className="font-bold md:min-w-60 px-2 py-2">CVV</label>

                <input
                  type="text"
                  value={order.cvv}
                  readOnly
                  className="px-4 py-2 cursor-pointer rounded-xl lg:w-100"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end pe-8 mt-5 lg:pe-20">
            <button
              onClick={() => {
                window.open(`${BASE_URL}/api/user/order/invoice/${id}/`);
              }}
              className="px-4 me-2 py-1.5 shadow-sm shadow-amber-50 rounded-xl bg-green-600 text-white flex font-bold active:scale-95 cursor-pointer"
            >
              Invoice
            </button>
            <button
              onClick={() => setIs_cancel(true)}
              className="px-4 py-1.5 shadow-sm shadow-amber-50 rounded-xl bg-red-600 text-white flex font-bold active:scale-95 cursor-pointer"
            >
              Cancel Order
            </button>
          </div>
          {is_cancel && (
            <form
              onSubmit={cancelSubmitHandler}
              ref={cancelref}
              className="grid grid-cols-1 ps-3 absolute top-110 md:left-35 lg:top-80 lg:left-100"
            >
              <div className="border rounded-xl p-5 bg-gray-300 text-black min-h-118 min-w-93 md:min-w-120 lg:h-125 lg:w-190">
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      setIs_cancel(false);
                    }}
                  >
                    <CiCircleRemove className="text-3xl text-red-700 cursor-pointer active:scale-95" />
                  </button>
                </div>

                <div className="flex flex-col justify-center items-center">
                  <h1 className="font-bold text-2xl text-red-600">
                    Cancel Order
                  </h1>
                  <p className="text-sm md:text-lg">
                    Your request will be solved in 24 hours
                  </p>

                  <p className="hidden lg:block">
                    ______________________________________________________________________________
                  </p>
                </div>
                <div className="flex flex-col gap-2 mt-3">
                  <label className="ps-2">
                    Please specify a reason for cancellation
                  </label>
                  <select
                    value={cancel_reason}
                    onChange={(e) => setCancel_reason(e.target.value)}
                    className="px-4 py-2 border rounded-xl"
                  >
                    <option>--Select a Reason--</option>
                    <option>I placed a duplicate order</option>
                    <option>Not satisfy with customers reviews</option>
                    <option>Not satisfy with delivery</option>
                    <option>others</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2 mt-5">
                  <label className="font-bold text-xl ps-2">
                    Leave a comment*
                  </label>
                  <textarea
                    value={cancel_comment}
                    onChange={(e) => setCancel_comment(e.target.value)}
                    rows={5}
                    placeholder="write your reason..."
                    className="border rounded-xl p-4"
                  ></textarea>
                </div>
                <div className="flex justify-center items-center mt-4">
                  <button
                    type="submit"
                    className="px-4 py-2 shadow-sm shadow-amber-50 rounded-xl bg-red-600 text-white flex font-bold active:scale-95 cursor-pointer"
                  >
                    Cancel Order
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      )}
    </Userlayout>
  );
};

export default ViewOrderDetails;
