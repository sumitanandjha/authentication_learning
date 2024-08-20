"use client"
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const SignUpPage = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "", 
    });
    const [disable, setDisable] = useState(true);

    const submitHandler = async () => {
        try {
            const res = await axios.post("/api/users/signup", user);
            console.log(res);
            router.push("/login");
            toast.success(res.data.message);
            console.log(res.data.message);
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.message);
        }
        console.log(user);
    }

    useEffect(() => {
        if (user.username.length > 0 && user.password.length > 0) {
            setDisable(false);
        } else {
            setDisable(true);
        }
    }, [user]);

    return (
        <div className='flex bg-[#669bbc] min-h-screen justify-center items-center'>
            <div className="bg-white p-10 rounded-lg shadow-lg">
                <h1 className='font-bold'>SignUp</h1>
                <div className='flex flex-col my-4'>
                    <label htmlFor="">Username</label>
                    <input
                        type="text"
                        value={user.username}
                        onChange={(e) => setUser({
                            ...user, username: e.target.value
                        })}
                        className='border-2 outline-none border-zinc-600 round-md px-2 py-1'
                    />
                </div>
                <div className='flex flex-col my-4'>
                    <label htmlFor="">Email</label>
                    <input
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({
                            ...user, email: e.target.value
                        })}
                        className='border-2 outline-none border-zinc-600 round-md px-2 py-1'
                    />
                </div>
                <div className='flex flex-col my-4'>
                    <label htmlFor="">Password</label>
                    <input
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({
                            ...user, password: e.target.value
                        })}
                        className='border-2 outline-none border-zinc-600 round-md px-2 py-1'
                    />
                </div>
                <button
                    onClick={submitHandler}
                    className={`${disable ? "bg-[#e3e3e3] cursor-not-allowed" : "bg-[#ff698f]"} w-full py-1 my-2 rounded-md text-white`}
                    disabled={disable}
                >
                    SignUp
                </button>
                <p className='mt-4'>
                    Already have an account? <Link href={"/login"} className='font-bold'>Login</Link>
                </p>
            </div>
        </div>
    );
}

export default SignUpPage;
