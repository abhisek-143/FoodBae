import React, { useState } from "react";
import Userlayout from "../components/Userlayout";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";

const PaymentCheckout = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const { totalAmount } = useParams();

  const [paymentmode, setPaymentmode] = useState("COD");
  const [formdata, setFormdata] = useState({
    locality_area_1: "",
    locality_area_2: "",
    landmark_area: "",
    city: "",
    district: "",
    state: "",
    cvv: "",
    expiry: "",
    card_number: "",
  });


  // Creating Place Order logic here...
  const submitHandler = async (e) => {
    e.preventDefault();

    // checking either user logged in or not...
    if (!userId) {
      navigate("/user-login");
    }


    const data = new FormData();

    data.append("locality_area_01", formdata.locality_area_1);
    data.append("locality_area_02", formdata.locality_area_2);
    data.append("landmark", formdata.landmark_area);
    data.append("city", formdata.city);
    data.append("district", formdata.district);
    data.append("state", formdata.state);
    data.append("payment_option", paymentmode);
    data.append("userId", userId);
    data.append("total_amount", totalAmount);
    if (formdata.card_number && formdata.cvv && formdata.expiry) {
      data.append("cvv", formdata.cvv);
      data.append("card_number", formdata.card_number);
      data.append("expiry", formdata.expiry);
    }

    try {

      // sending data to create new order
      const response = await fetch(`${BASE_URL}/api/user/order/placeorder/`, {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (response.status == 201) {
        toast.success(result.message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.error(result.message || "Something went wrong !");
      }
    } catch (error) {
      console.log("fetching error at payment checkout", error);
    }
  };

  return (
    <Userlayout>
      <button
        onClick={() => {
          navigate("/user/food/cart");
        }}
        className="flex m-4 cursor-pointer active:scale-95 font-semibold"
      >
        <MdKeyboardBackspace className="m-1" size={18} />
        Back
      </button>
      <div className="flex justify-center flex-col md:p-25 lg:px-10   md:pt-10 items-center">
        <ToastContainer autoClose={2000} position="top-center" />
        <div className="py-4">
          <div className="font-bold text-md md:text-3xl text-gray-200  px-6 py-1">
            Order Details & Payment
          </div>
        </div>

        {/* receiving all data from user */}
        <form
          method="POST"
          onSubmit={submitHandler}
          className="shadow-lg shadow-amber-50 w-80 md:w-150 lg:w-220 mb-10 lg:ps-3 bg-gray-800 text-gray-100 border rounded-xl"
        >
          <div className="grid lg:gap-1 gap-2 grid-cols-1 md:grid-cols-2 p-3">
            <div className="flex flex-col">
              <label className="font-bold py-2 px-2">Locality Area 1</label>

              <input
                type="text"
                required
                className="px-4 py-2 cursor-pointer rounded-xl border lg:w-100"
                placeholder="enter your locality area.."
                value={formdata.locality_area_1}
                onChange={(e) =>
                  setFormdata({
                    ...formdata,
                    locality_area_1: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold px-2 py-2">
                Locality Area 2 (optional)
              </label>

              <input
                required
                type="text"
                value={formdata.locality_area_2}
                onChange={(e) =>
                  setFormdata({
                    ...formdata,
                    locality_area_2: e.target.value,
                  })
                }
                className="px-4 py-2 cursor-pointer rounded-xl border lg:w-100"
                placeholder="enter your locality area.."
              />
            </div>

            <div className="flex flex-col">
              <label className="font-bold px-2 py-2">
                LandMark Area (optional)
              </label>

              <input
                type="text"
                className="px-4 py-2 cursor-pointer rounded-xl border lg:w-100"
                placeholder="enter landmark area.."
                value={formdata.landmark_area}
                onChange={(e) =>
                  setFormdata({
                    ...formdata,
                    landmark_area: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold px-2 py-2">City</label>

              <input
                type="text"
                required
                value={formdata.city}
                onChange={(e) =>
                  setFormdata({
                    ...formdata,
                    city: e.target.value,
                  })
                }
                className="px-4 py-2 cursor-pointer rounded-xl border lg:w-100"
                placeholder="city"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold px-2 py-2">District</label>

              <input
                type="text"
                required
                className="px-4 py-2 cursor-pointer rounded-xl border lg:w-100"
                placeholder="distrct"
                value={formdata.district}
                onChange={(e) =>
                  setFormdata({
                    ...formdata,
                    district: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold px-2 py-2">State</label>

              <input
                type="text"
                required
                className="px-4 py-2 cursor-pointer rounded-xl border lg:w-100"
                placeholder="State"
                value={formdata.state}
                onChange={(e) =>
                  setFormdata({
                    ...formdata,
                    state: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col ms-3 gap-5">
              <label className="font-bold px-2 py-2 ">Payment Mode :</label>

              <div>
                <input
                  type="radio"
                  name="payment_mode"
                  className="cursor-pointer"
                  value={paymentmode}
                  onChange={(e) => setPaymentmode("online")}
                />
                <label className="font-bold pt-2 px-2">Online</label>
              </div>
              <div>
                <input
                  type="radio"
                  className="cursor-pointer"
                  value={paymentmode}
                  onChange={(e) => setPaymentmode("COD")}
                  name="payment_mode"
                />
                <label className="font-bold pt-2 px-2">Cash on delivery</label>
              </div>
            </div>
            {paymentmode === "online" ? (
              <div className="">
                <h2 className="px-2 py-2 font-bold">Card Details :</h2>
                <input
                  type="number"
                  value={formdata.card_number}
                  onChange={(e) =>
                    setFormdata({
                      ...formdata,
                      card_number: e.target.value,
                    })
                  }
                  className="px-4 py-2 mb-2 cursor-pointer rounded-xl border lg:w-100"
                  placeholder="Card Number"
                />
                <input
                  type="text"
                  className="px-4 py-2 mb-2 cursor-pointer rounded-xl border lg:w-100"
                  placeholder="Expiry"
                  value={formdata.expiry}
                  onChange={(e) =>
                    setFormdata({
                      ...formdata,
                      expiry: e.target.value,
                    })
                  }
                />
                <input
                  type="number"
                  className="px-4 mb-2 py-2 cursor-pointer rounded-xl border lg:w-100"
                  placeholder="CVV"
                  value={formdata.cvv}
                  onChange={(e) =>
                    setFormdata({
                      ...formdata,
                      cvv: e.target.value,
                    })
                  }
                />
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="p-8">
            {paymentmode === "online" ? (
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-green-600 font-bold hover:shadow-sm hover:shadow-amber-50 text-white flex text-xs active:scale-95 cursor-pointer"
              >
                PAY <MdOutlineCurrencyRupee size={14} className="mt-0.5 ms-1" />
                {totalAmount} to Confirm Your Order
              </button>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-green-600 font-bold hover:shadow-sm hover:shadow-amber-50 text-white flex text-sm active:scale-95 cursor-pointer"
              >
                Place Order
              </button>
            )}
          </div>
        </form>
      </div>
    </Userlayout>
  );
};

export default PaymentCheckout;
