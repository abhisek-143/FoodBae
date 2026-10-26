import React, { useEffect, useState } from "react";
import Userlayout from "../components/Userlayout";
import { MdKeyboardBackspace } from "react-icons/md";
import { MdDeliveryDining } from "react-icons/md";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaTruckMoving } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useNavigate, useParams } from "react-router-dom";

const TrackOrder = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [trackDetails, setTrackDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order_number, setOrder_number] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    fetch(`${BASE_URL}/api/user/order/track_order_details/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setTrackDetails(data);
        setLoading(false);
        setOrder_number(data.order.order_number);
      });
  }, [loading]);

  const allStatus = [
    "Not Confirmed",
    "Confirmed",
    "Preparing",
    "Pick Up",
    "Delivered",
    "Cancelled",
  ];

  return (
    <Userlayout>
      {loading ? (
        <div className="flex h-screen justify-center items-center">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <button
            onClick={() => {
              navigate("/");
            }}
            className="flex m-4 cursor-pointer active:scale-95 font-semibold"
          >
            <MdKeyboardBackspace className="m-1" size={18} />
            Back
          </button>

          <div className=" lg:p-4 ">
            <span className="font-bold text-xl text-yellow-400 md:text-2xl lg:text-3xl flex px-6 py-1 rounded-xl">
              <FaTruckMoving className="mt-1 me-1" />
              Track Your Order :
            </span>
          </div>

          <div className="p-4">
            {!order_number ? (
              <div className="flex gap-2 lg:text-lg">
                <label className="font-bold py-2 px-2 lg:ps-6">
                  #ORDER NUMBER :
                </label>
                <div className="flex">
                  <input
                    value={order_number}
                    onChange={(e) => setOrder_number(e.target.value)}
                    className="border px-3  lg:px-4 py-2 shadow-md shadow-amber-50 w-[90%] md:min-w-200 rounded-s-xl "
                    placeholder="search here by food..."
                  />
                  <button
                    type="submit"
                    className={`px-6 py-2.5${order_number && "disabled opacity-40"} border rounded-e-xl bg-red-700`}
                  >
                    Search
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <label className="font-bold text-yellow-400 md:text-lg lg:text-xl py-2 px-2 lg:ps-6">
                  ORDER NUMBER : {trackDetails.order.order_number}
                </label>
              </div>
            )}
            {order_number && (
              <div className="flex flex-col">
                <div className="mt-40 flex justify-around items-center">
                  {trackDetails.tracking_status == "Confirmed" && (
                    <div className="max-w-40 max-h-10">
                      <MdDeliveryDining className="text-5xl text-green-600" />
                    </div>
                  )}

                  {trackDetails.tracking_status == "Preparing" && (
                    <div className="max-w-40 max-h-10">
                      <MdDeliveryDining className="text-5xl text-blue-700" />
                    </div>
                  )}
                  {trackDetails.tracking_status == "Pick Up" && (
                    <div className="max-w-40 max-h-10">
                      <MdDeliveryDining className="text-5xl text-yellow-500" />
                    </div>
                  )}
                  {trackDetails.tracking_status == "Delivered" && (
                    <div className="max-w-40 max-h-10">
                      <MdDeliveryDining className="text-5xl text-green-900" />
                    </div>
                  )}
                  {trackDetails.tracking_status == "Cancelled" && (
                    <div className="max-w-40 max-h-10">
                      <MdDeliveryDining className="text-5xl text-red-700" />
                    </div>
                  )}
                </div>

                <div className=" relative">
                  <div className="border absolute w-full border-dotted "></div>

                  <div className="my-7 ms-3 md:ms-13 md:text-sm  text-xs flex justify-around items-center">
                    <div className="max-w-40 max-h-30">
                      <FaRegCircleCheck className="md:text-5xl text-4xl bg-green-600  rounded-full" />
                      <p className="pt-3">confirmed</p>
                      {trackDetails.tracking_status == "Confirmed" && (
                        <p>
                          {new Date(trackDetails.created_at).toLocaleString(
                            "en-in",
                          )}
                        </p>
                      )}
                    </div>

                    <div className="max-w-40 ms-3 max-h-30">
                      <FaRegCircleCheck className="text-4xl md:text-5xl ms-2 bg-blue-700 rounded-full" />
                      <p className="pt-3">Preparing</p>
                      {trackDetails.tracking_status == "Preparing" && (
                        <p>
                          {new Date(trackDetails.created_at).toLocaleString(
                            "en-in",
                          )}
                        </p>
                      )}
                    </div>
                    <div className="max-w-40 ms-5 max-h-30">
                      <FaRegCircleCheck className="text-4xl md:text-5xl ms-4 bg-yellow-500 rounded-full" />
                      <p className="pt-3 ps-4">Pick up</p>
                      {trackDetails.tracking_status == "Pick Up" && (
                        <p>
                          {new Date(trackDetails.created_at).toLocaleString(
                            "en-in",
                          )}
                        </p>
                      )}
                    </div>
                    <div className="max-w-40 max-h-30">
                      <FaRegCircleCheck className="text-4xl md:text-5xl ms-7 bg-green-900 rounded-full" />
                      <p className="pt-3 ps-6">Delivered</p>
                      {trackDetails.tracking_status == "Delivered" && (
                        <p>
                          {new Date(trackDetails.created_at).toLocaleString(
                            "en-in",
                          )}
                        </p>
                      )}
                    </div>
                    <div className="max-w-40 max-h-30">
                      <RxCross2 className="text-4xl md:text-5xl bg-red-700 ms-10 rounded-full" />
                      <p className="pt-3 ps-8">cancelled</p>
                      {trackDetails.tracking_status == "Cancelled" && (
                        <p>
                          {new Date(trackDetails.created_at).toLocaleString(
                            "en-in",
                          )}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="text-sm  md:text-lg md:mx-5 py-10">
                    <div className=" text-yellow-400 ">
                      <span className="font-bold text-md md:text-lg lg:text-2xl flex py-1 rounded-xl">
                        <FaTruckMoving className="mt-1 me-1" />
                        Tracking details :
                      </span>
                    </div>
                    <div className="flex gap-2 md:ms-7 mt-3">
                      <label>Order number :</label>
                      <p>{trackDetails.order.order_number}</p>
                    </div>
                    <div className="flex gap-2 md:ms-7">
                      <label>Order date :</label>
                      <p>
                        {new Date(trackDetails.order.created_at).toLocaleString(
                          "en-in",
                        )}
                      </p>
                    </div>
                    <div className="flex md:gap-5 md:ms-7 mt-3">
                      <label className="font-semibold">Order Status :</label>
                      <div className="mt-3">
                        {allStatus.map((item) => {
                          return (
                            <div className="my-4">
                              <p
                                className={`border ${trackDetails.tracking_status == item ? "bg-green-600 shadow-md shadow-amber-50 scale-110" : "text-blue-500 opacity-60"} rounded-xl px-20 py-2`}
                              >
                                {item}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </Userlayout>
  );
};

export default TrackOrder;
