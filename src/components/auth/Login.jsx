import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/apiPoint'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import { setloading, setuser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
const Login = () => {

    const [input, setinput] = useState({
        email: "",
        password: "",
        role: "",
    })
    const { loading } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const changeEventHandler = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value })
    }
    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            dispatch(setloading(true))
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            if (res.data.success) {
                dispatch(setuser(res.data.foundUser))
                navigate("/")
                toast.success(res.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
            // console.error("Login Error:", error);
            // const errorMessage =
            //     error?.response?.data?.message || "Login failed. Please try again.";
            // toast.error(errorMessage)
        } finally {
            dispatch(setloading(false))
        }

    }

    return (
        <>

            <Navbar />
            <div className=" flex justify-center items-center w-[100%]  ">
                <form onSubmit={submitHandler} className='md:border-1 border-cyan-700 shadow-2xl rounded-sm mt-10 md:mt-18  py-10 px-10 md:py-10 md:px-20 flex flex-col gap-3 md:w-1/3 bg-slate-100'>
                    <h1 className='text-center text-2xl font-semibold mb-5'>Login</h1>

                    <div className="">
                        <Label>Email </Label>
                        <Input type="Email" placeholder="Enter your full email" className="mt-1 rounded-sm" value={input.email} name="email" onChange={changeEventHandler} />
                    </div>

                    <div className="">
                        <Label>Password </Label>
                        <Input type="password" placeholder="Enter your password" className="mt-1 rounded-sm" value={input.password} name="password" onChange={changeEventHandler} />
                    </div>
                    <div className=" flex gap-6 mt-3">
                        <div className="flex gap-2">
                            <input type="radio" value="student" name='role' className='cursor-pointer' checked={input.role === "student"} onChange={changeEventHandler} />
                            <Label>Student</Label>
                        </div>
                        <div className="flex gap-2">
                            <input type="radio" value="recruiter" name='role' className='cursor-pointer' checked={input.role === 'recruiter'} onChange={changeEventHandler} />
                            <Label>Recruiter</Label>
                        </div></div>
                    {
                        loading ? <Button type="submit" className=" my-4 hover:bg-sky-700 mx-auto border-1 w-full cursor-pointer bg-sky-500 text-white font-bold"><Loader2 />Wait</Button> : <div className="">
                            <Button type="submit" className=" my-4 hover:bg-sky-700 mx-auto border-1 w-full cursor-pointer bg-sky-500 text-white font-bold">Login</Button>
                        </div>
                    }

                    <span className='text-sm'>Don't have any account ? <Link to="/signup"><span className='text-blue-400 cursor-pointer font-bold '> Sign up</span></Link></span>
                </form>

            </div>




        </>
    )
}

export default Login