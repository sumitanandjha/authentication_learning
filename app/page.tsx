"use client"
import axios from "axios";
import { log } from "console";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Home() {

     const router = useRouter();
    const logoutHandler= async()=>{
        try{
          const res = await axios.get("/api/users/logout")
          router.push("/login");
          toast.success(res.data.message)
        }catch(error:any)
        {
            toast.error(error.response.data.message)
            console.log(error)
        }
    }
 return(
  <div className="bg-blue-500">
  <h1>I am home</h1>
  <button onClick={logoutHandler} className="bg-zinc-800 px-2 py-1 rounded-md text-white">Logout</button>
  </div>
 )
}
