import React, { useState, useEffect } from "react";
import Adminlayout from "../components/Adminlayout";
import { useNavigate, useParams } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";

const OrderDetails = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trackingDetails, setTrackingDetails] = useState([])
  const [orderItems, setOrderItems] = useState([]);
  const [remark, setRemark] = useState("")
  const [orderStatus, setOrderStatus] = useState("")
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_URL}/api/admin/order/orderdetails/${id}/`)
      .then((res) => {
        if (!res.ok) {
          throw new console.error("response error", res.status);
        }
        return res.json();
      })
      .then((data) => {
        if (data){
                  fetch(`${BASE_URL}/api/admin/order/tracking_order_details/${id}/`)
          .then((res) => res.json())
          .then((result) => {
            setTrackingDetails(result);
          });

          console.log(trackingDetails)

        }
        setOrder(data);
        fetch(`${BASE_URL}/api/admin/order/orderdetails/orderitems/${id}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((result) => {
            setOrderItems(result);
          });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [orderStatus]);



  const submitHandler=(e)=>{
    e.preventDefault();
    fetch(`${BASE_URL}/api/admin/order/tracking_order/${id}/`,{
      method : "POST",
      headers : {
        "Content-Type" :"application/json",
      },
      body : JSON.stringify({orderStatus:orderStatus
        ,remark:remark})
    }).then((res)=>res.json())
    .then((data)=>{setTrackingDetails(data)
      setRemark("")
      setOrderStatus("")
    })
    .catch((err)=>{
      console.log("tracking order error :",err)
    })
  }


  const allStatus = [
    "Not Confirmed",
    "Confirmed",
    "Preparing",
    "Pick Up",
    "Delivered",
    "Cancelled"
  ]


  const getStatusOptions =()=>{
    const order_status = allStatus.indexOf(order.status)
    const result = allStatus.filter((item,index)=>{
      return index >= order_status
    })
    return result
  }
  


  return (
    <Adminlayout>
      
      {loading ? (
        <div className="flex items-center justify-center ">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="min-h-screen lg:m-5 mb-10 md:mb-20 text-sm lg:text-lg">
                <button
                  onClick={() => {
                    navigate("/admindashboard");
                  }}
                  className="flex m-4 cursor-pointer active:scale-95 font-semibold"
                >
                  <MdKeyboardBackspace className="m-1" size={18} />
                  Back
                </button>
          
          <div className=" py-4 ">
            <span className="font-bold text-lg text-yellow-400 md:text-2xl lg:text-3xl flex px-6 py-1 rounded-xl">
              ORDER # {order.order_number} Details :
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="grid grid-cols-1  md:ps-10">
              <div className="ms-5">
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
                  <label className="font-bold md:min-w-60 px-2 py-2">
                    Phone
                  </label>

                  <input
                    type="text"
                    readOnly
                    value={order.user.phone}
                    className="px-4 py-2 cursor-pointer rounded-xl  lg:w-100"
                  />
                </div>
              </div>

              <div className="ms-5">
                <div className=" py-4 lg:ms-5 ">
                  <span className="font-bold text-yellow-400 text-md md:text-xl flex px-2 lg:px-6 py-1 rounded-xl">
                    Delivery Address Details :
                  </span>
                </div>

                <div className="flex">
                  <label className="font-bold py-2 px-2 md:min-w-60">
                    Locality Area 1 :
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
                    Locality Area 2 (optional) :
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
                    LandMark Area (optional) :
                  </label>

                  <input
                    type="text"
                    readOnly
                    value={order.landmark}
                    className="px-4 py-2 cursor-pointer rounded-xl lg:w-100"
                  />
                </div>
                <div className="flex ">
                  <label className="font-bold md:min-w-60 px-2 py-2">
                    City :
                  </label>

                  <input
                    type="text"
                    readOnly
                    value={order.city}
                    className="px-4 py-2 cursor-pointer rounded-xl lg:w-100"
                  />
                </div>
                <div className="flex">
                  <label className="font-bold md:min-w-60 px-2 py-2">
                    District :
                  </label>

                  <input
                    type="text"
                    readOnly
                    value={order.district}
                    className="px-4 py-2 cursor-pointer rounded-xl lg:w-100"
                  />
                </div>
                <div className="flex">
                  <label className="font-bold px-2 py-2 md:min-w-60">
                    State :
                  </label>

                  <input
                    type="text"
                    readOnly
                    value={order.state}
                    className="px-4 py-2 cursor-pointer rounded-xl lg:w-100"
                  />
                </div>
                <div className="flex">
                  <label className="font-bold py-2 px-2 md:min-w-60">
                    Pincode :
                  </label>

                  <input
                    type="text"
                    readOnly
                    value={order.user.pincode}
                    className="px-4 py-2 cursor-pointer rounded-xl lg:w-100"
                  />
                </div>
              </div>

              {order.payment_option == "online" ? (
                <div className="ms-5">
                  <div className=" py-4 lg:ms-5 ">
                    <span className="font-bold text-yellow-400 text-md md:text-xl flex px-2 lg:px-6 py-1 rounded-xl">
                      Payemnt Details :
                    </span>
                  </div>

                  <div className="flex">
                    <label className="font-bold py-2 px-2 md:min-w-60">
                      Payment Method :
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
                      Total Amount -
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
                      Card Number :
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
                      Expiry :
                    </label>

                    <input
                      type="text"
                      readOnly
                      value={order.expiry_date}
                      className="px-4 py-2 cursor-pointer rounded-xl lg:w-100"
                    />
                  </div>
                  <div className="flex">
                    <label className="font-bold md:min-w-60 px-2 py-2">
                      CVV :
                    </label>

                    <input
                      type="text"
                      value={order.cvv}
                      readOnly
                      className="px-4 py-2 cursor-pointer rounded-xl lg:w-100"
                    />
                  </div>
                </div>
              ) : (
                <div className="ms-5">
                  <div className=" py-4 lg:ms-5 ">
                    <span className="font-bold text-yellow-400 text-md md:text-xl flex px-2 lg:px-6 py-1 rounded-xl">
                      Payemnt Details :
                    </span>
                  </div>

                  <div className="flex">
                    <label className="font-bold py-2 px-2 md:min-w-60">
                      Payment Method :
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
                      Total Amount -
                    </label>

                    <input
                      type="text"
                      readOnly
                      value={order.total_amount}
                      className="px-4 py-2 cursor-pointer rounded-xl lg:w-100"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 gap-3 mt-15 p-5 md:ms-10 lg:me-15 max-h-130 overflow-y-auto scrollbar-none">
              {orderItems.map((item) => {
                return (
                  <div className="border shadow-md shadow-amber-50 flex md:min-w-155 lg:min-w-0 max-h-31 rounded-xl gap-6">
                    <div className="">
                      <img
                        src={`${BASE_URL}/${item.food.food_image}`}
                        className="lg:h-30 h-23 lg:w-30 w-23 rounded-xl bg-cover bg-center"
                      />
                    </div>
                    <div key={item.id} className="m-2">
                      <div>
                        {" "}
                        <p className="font-bold mb-4">{item.food.food_name}</p>
                        <p>{item.food.food_price}</p>
                      </div>
                      <div className="flex">
                        <p>Quantity : {item.order_quantity}</p>

                        <p className="ps-5">total - {item.total_amount}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div></div>
            <div className="font-bold text-yellow-400 text-end mx-10 me-7 md:me-0 text-lg lg:me-15">
              <p className="lg:me-5 my-4">
                Total Amount - {order.total_amount}
              </p>
            </div>
          </div>

          <div className="flex justify-end pe-8 md:pe-0 mt-5 lg:pe-20">
            <button
              onClick={() => {
                window.open(`${BASE_URL}/api/user/order/invoice/${id}/`);
              }}
              className="px-4 me-2 md:me-0 py-1.5 lg:text-lg shadow-sm shadow-amber-50 rounded-xl bg-green-600 text-white flex font-bold active:scale-95 cursor-pointer"
            >
              Invoice
            </button>
          </div>

          <div className="p-7 mt-5">
            <p className="font-bold text-lg py-4 text-yellow-400">Update Status</p>

            <form onSubmit={submitHandler} className="md:max-w-150">
              <div className="flex flex-col gap-0.5">
                <label className="px-2 py-1 font-bold">Status</label>

                <select
                  name="order_status"
                  value={orderStatus}
                  onChange={(e)=>setOrderStatus(e.target.value)}
                  className="border cursor-pointer min-w-full rounded-xl px-4 py-2 md:py-2.5 bg-gray-800"
                >
                  {getStatusOptions().map((item)=>{
                    return <option key={item.id}>{item}</option>
                  })}
                </select>
              </div>
              <div className="flex flex-col gap-0.5 my-3">
                <label className="px-2 py-1 font-bold">Remarks</label>
                <textarea rows={5} value={remark} onChange={(e)=>{setRemark(e.target.value)}} className="border p-2 rounded-lg"></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="md:px-4 md:py-2 px-6 py-1.5 cursor-pointer font-bold active:scale-95 mt-2 mb-6 md:mt-8 bg-red-700 rounded-xl"
                >
                  Update Status
                </button>
              </div>
            </form>
            <p className="font-bold text-lg py-4 text-yellow-400">#Tracking History</p>
            {trackingDetails.length > 0 ? (            <table className="w-full">
              <thead className="lg:text-xl md:text-sm text-xs">
                <tr>
                  <th className="pb-2">Sl No</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2">Remarks</th>
                  <th className="pb-2">Date</th>
                </tr>
              </thead>
              <tbody className="md:text-sm">
                {trackingDetails.map((item, index) => (
                <tr key={item.id}>
                  <td className="text-center lg:pt-4 pb-4">{index+1}</td>
                  <td className="text-center lg:pt-4 pb-4">
                    {item.tracking_status}
                  </td>
                  <td className="text-center pb-4 truncate lg:pt-4">
                    {item.remark}
                  </td>
                  <td className="text-center pb-4 lg:pt-4">{new Date(item.updated_at).toLocaleDateString("en-in")}</td>
                </tr>
                ))}
              </tbody>
            </table>
):(<div className="flex md:justify-start justify-center items-center font-semibold">
  <p className="text-red-700">No tracking histrory found !</p>
</div>)}
          </div>
        </div>
      )}
    </Adminlayout>
  );
};

export default OrderDetails;
