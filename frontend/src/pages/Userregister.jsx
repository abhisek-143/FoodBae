import React, { useState } from "react";
import Userlayout from "../components/Userlayout";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Userregister = () => {
        const BASE_URL = import.meta.env.VITE_BASE_URL;
        const navigate = useNavigate();
        console.log("base url",BASE_URL)

  const [formdata, setformdata] = useState({
    firstname : "",
    lastname : "",
    email : "",
    password : "",
    confirmpassword : "",
    phone : "",
    gender : "",
    pincode : "",
    profileimage : null
  })


// creating new user .....sending data to backend to create user  
const handleSubmit=async(e)=>{
  e.preventDefault()

  const data = new FormData();
  data.append("firstname" , formdata.firstname)
  data.append("lastname" , formdata.lastname)
  data.append("email" , formdata.email)
  data.append("password" , formdata.password)
  data.append("confirmpassword" , formdata.confirmpassword)
  data.append("phone" , formdata.phone)
  data.append("pincode" , formdata.pincode)
  data.append("gender" , formdata.gender)
  data.append("profile_image" , formdata.profileimage)
  

  try {
    const response= await fetch(`${BASE_URL}/api/auth/user-register/`,{
      method : "POST",
      body : data
    })

    const result = await response.json()

    if (response.status == 201){
      toast.success(result.message)
      setformdata({
            firstname : "",
    lastname : "",
    email : "",
    password : "",
    confirmpassword : "",
    phone : "",
    gender : "",
    pincode : "",
    profileimage : null


      })
      setTimeout(() => {
        navigate("/user-login")
        
      }, 1000);
    }else{
      toast.error(result.message || "Something Went Wrong!")
    }
  

    
  } catch (error) {
    toast.error("Something went wrong!")
    console.log("fetching error at user register",error)
    setformdata({
          firstname : "",
    lastname : "",
    email : "",
    password : "",
    confirmpassword : "",
    phone : "",
    gender : "",
    pincode : "",
    profileimage : null

    })
    
  }

}

  return (
    <Userlayout>
      <div className="flex p-5 lg:p-10 w-full justify-center items-center mb-20 bg-black">
        <ToastContainer autoClose={2000} position="top-center"/>
        {/* creating form to receive user inputs to create new user */}
        <form method="POST" encType="multipart/form-data" onSubmit={handleSubmit} className="border w-[90%] lg:w-[50%] shadow-2xl md:mt-20 shadow-amber-400 rounded-xl p-2  md:p-5 bg-gray-800">
          <p className="font-bold text-lg md:text-3xl mt-3 content-center text-red-600 pb-4 flex justify-center items-center">
            <span>--CREATE AN ACCOUNT--</span>
          </p>
          <div className="flex flex-col gap-2 p-1">
            <label className="font-bold pt-2 ps-1 pe-2">First Name :</label>
            <input
              type="text"
              className="px-4 py-2  cursor-pointer rounded-xl border"
              name="firstname"
              value={formdata.firstname}
              onChange={(e)=>{
                setformdata({
                  ...formdata,
                    firstname : e.target.value
                })
              }}
              required
              placeholder="firstname"
            />
            <br />
          </div>
          <div className="flex flex-col gap-2 p-1">
            <label className="font-bold pt-2 pe-2">Last Name :</label>
            <input
              type="text"
              className="px-4 py-2  cursor-pointer rounded-xl border"
              name="lastname"
              value={formdata.lastname}
              onChange={(e)=>{
                setformdata({
                  ...formdata,
                  lastname : e.target.value
                })
              }}
              placeholder="lastname"
            />
            <br />
          </div>
          <div className="flex flex-col gap-2 p-1">
            <label className="font-bold pt-2 pe-2">Email :</label>
            <input
              type="email"
              className="px-4 py-2 cursor-pointer rounded-xl border"
              name="Email"
              required
              value={formdata.email}
              onChange={(e)=>{
                setformdata({
                  ...formdata,
                  email : e.target.value
                })
              }}
              placeholder="e.g.- user@gmail.com"
            />
            <br />
          </div>
          <div className="flex flex-col gap-2 p-1">
            <label className="font-bold pt-2 pe-2">Password :</label>
            <input
              type="password"
              value={formdata.password}
              onChange={(e)=>{
                setformdata({
                  ...formdata,
                  password : e.target.value
                })
              }}
              className="px-4  py-2 cursor-pointer rounded-xl border "
              name="password"
              required
              placeholder="password"
            />
            <br />
          </div>
          <div className="flex flex-col gap-2 p-1">
            <label className="font-bold pt-2 pe-2">Confirm Password :</label>
            <input
              type="password"
              value={formdata.confirmpassword}
              onChange={(e)=>{
                setformdata({
                  ...formdata,
                  confirmpassword : e.target.value
                })
              }}
              className="px-4 py-2 cursor-pointer rounded-xl border"
              name="confirm-password"
              required
              placeholder="confirm password"
            />
            <br />
          </div>
          <div className="flex flex-col gap-2 p-1">
            <label className="font-bold pt-2 pe-2">Phone :</label>
            <input
              type="text"
              value={formdata.phone}
              onChange={(e)=>{
                setformdata({
                  ...formdata,
                  phone : e.target.value
                })
              }}
              className="px-4 py-2  cursor-pointer rounded-xl border"
              name="phone"
              required
              placeholder="phone number"
            />
            <br />
          </div>
          <div className="flex flex-col gap-2 p-1">
            <label className="font-bold pt-2 pe-2">Gender :</label>
            <select
              name="gender" value={formdata.gender} onChange={(e)=>{
                setformdata({
                  ...formdata,
                  gender : e.target.value
                })
              }}
              className="px-4 py-2 text-black cursor-pointer rounded-xl border-white border"
            >
              <option value="0">--select--</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 p-1">
            <label className="font-bold pt-2 pe-2">Pincode :</label>
            <input
              type="number"
              value={formdata.pincode}
              onChange={(e)=>{
                setformdata({
                  ...formdata,
                  pincode : e.target.value
                })
              }}
              className="px-4 py-2 cursor-pointer rounded-xl border"
              name="pincode"
              placeholder="pincode"
            />
            <br />
          </div>
          <div className="flex flex-col gap-2 p-1 pb-4">
            <label className="font-bold pt-2 pe-2">Profile Image :</label>
            <input
              type="file"
              onChange={(e)=>{
                setformdata({
                  ...formdata,
                  profileimage : e.target.files[0]
                })
              }}
              className="px-4  py-2 cursor-pointer rounded-xl border w-100 lg:w-100 max-w-73"
              accept="image/*"
            />
          </div>
          <div className="flex justify-center m-2 items-center">
            <button
              type="submit"
              name="btn"
              className="px-8 py-2 rounded-xl bg-red-600 cursor-pointer active:scale-95 text-white font-semibold"
            >
              Register
            </button>
          </div>
        </form>
        <div className='bg-[url("public/burger3.png")] hidden lg:block bg-center bg-cover rouned-xl'></div>
      </div>
    </Userlayout>
  );
};

export default Userregister;
