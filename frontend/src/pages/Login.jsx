import {useState,useEffect} from "react";
import { IoLogInOutline } from "react-icons/io5";
import { TbLockPassword } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import {toast,ToastContainer} from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/ReactToastify.css";
import "./login.css"


const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("");
  const BASE_URL = import .meta.env.VITE_BASE_URL;
  const navigate = useNavigate()


  const handleLogin = async(e)=>{
    e.preventDefault()

    try {
      const response = await fetch(`${BASE_URL}/api/admin/login/`,{
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
        },
        body : JSON.stringify({
          username : username,
          password : password
        })
      })

      const data =await response.json();

      if (response.status == 200) {
                toast.success(data.message)

        localStorage.setItem("adminId",data.id)
        localStorage.setItem("username",data.username)
        setTimeout(() => {
            navigate("/admindashboard");
          
        }, 1000);

      }else if (response.status == 400) {
        toast.error(data.message)
      }else if (response.status == 404){
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log("Login error",error)
      
    }
    
    
  }

      
        

return (
    <div className="min-h-screen w-full px-4 flex flex-col justify-center login-form items-center text-white">
      <ToastContainer autoClose={2000} position="top-right"/>
      <h1 className="font-bold text-3xl m-5 flex gap-1 text-white">
        <IoLogInOutline className="relative top-0.5 right-1" />
        LOGIN
      </h1>
      <form onSubmit={handleLogin} className="h-80 w-full max-w-150 flex flex-col justify-evenly bg-gray-800 text-white shadow-2xl shadow-amber-200 rounded-2xl">
        <div className="h-auto px-6  flex-col flex gap-1">
          <label className="font-bold px-4 flex"><FaRegUser className="relative top-1 right-1"/>Username</label>
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e)=>{
              setUsername(e.target.value)
            }}
            className="w-full ps-4 rounded-2xl border shadow-white shadow-2xl py-2"
          />
        </div>
        <div className="h-auto px-6 flex-col flex gap-1">
          <label className="flex font-bold px-4 "><TbLockPassword className="relative right-1 top-0.5"/>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
            className="w-full ps-4 rounded-2xl border shadow-white shadow-2xl py-2"
          />
        </div>
        <button type="submit" className="bg-black text-white self-center py-2 shadow shadow-amber-50 px-10 active:scale-95 cursor-pointer rounded-xl ">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
