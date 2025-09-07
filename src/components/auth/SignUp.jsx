import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/apiPoint'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { Loader2 } from 'lucide-react'
import { setloading } from '@/redux/authSlice'


const SignUp = () => {
        const { loading } = useSelector((state) => state.auth)

    const dispatch = useDispatch()

    const [input, setinput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    })
    const navigate = useNavigate()
    const changeEventHandler = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e) => {
        setinput({ ...input, file: e.target.files?.[0] })
    }
    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("fullname", input.fullname)
        formData.append("email", input.email)
        formData.append("phoneNumber", input.phoneNumber)
        formData.append("password", input.password)
        formData.append("role", input.role)
        if (input.file) {
            formData.append("file", input.file)
        }
        try {
            dispatch(setloading(true))
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            })
            if (res.data.success) {
                navigate("/login")
                toast.success(res.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }finally{
            dispatch(setloading(false))
        }

    }


    return (
        <>
            <Navbar />
            <div className=" flex justify-center items-center w-[100%]  ">
                <form onSubmit={submitHandler} className='md:border-1 border-cyan-700 shadow-xl rounded-sm mt-4 md:mt-7  py-5 px-10 md:py-5 md:px-20 flex flex-col gap-3 w-4/5 md:w-1/3 bg-slate-100 '>
                    <h1 className='text-center text-2xl font-semibold mb-5'>Sign Up</h1>
                    <div className="">
                        <Label>Full Name  </Label>
                        <Input type="text" placeholder="Enter your full name" className="mt-1 rounded-sm" value={input.fullname} name="fullname" onChange={changeEventHandler} />

                    </div>
                    <div className="">
                        <Label>Email </Label>
                        <Input type="Email" placeholder="Enter your full email" className="mt-1 rounded-sm" value={input.email} name="email" onChange={changeEventHandler} />
                    </div>
                    <div className="">
                        <Label>Phone Number </Label>
                        <Input type="text" placeholder="Enter your full number" className="mt-1 rounded-sm" value={input.phoneNumber} name="phoneNumber" onChange={changeEventHandler} />
                    </div>
                    <div className="">
                        <Label>Password </Label>
                        <Input type="password" placeholder="Enter your full name" className="mt-1 rounded-sm" value={input.password} name="password" onChange={changeEventHandler} />
                    </div>
                    <div className=" flex gap-6 mt-2">
                        <div className="flex gap-1">
                            <input type="radio" value="student" name='role' className='cursor-pointer' checked={input.role === "student"} onChange={changeEventHandler} />
                            <Label>Student</Label>
                        </div>
                        <div className="flex gap-1">
                            <input type="radio" value="recruiter" name='role' className='cursor-pointer' checked={input.role === 'recruiter'} onChange={changeEventHandler} />
                            <Label>Recruiter</Label>
                        </div></div>
                    <div className=" flex items-center mt-2 gap-1">
                        <Label className="text-base">Profile</Label>
                        <input className='border-1 text-xs w-2/3  rounded-xs px-1 py-1 cursor-pointer' type="file"
                            accept='image/*'
                            onChange={changeFileHandler} />
                    </div>
                    <div className="">
                        {
                            loading ? <Button type="submit" className=" my-4 hover:bg-sky-700 mx-auto border-1 w-full cursor-pointer bg-sky-500 text-white font-bold"><Loader2 />Wait</Button> : <div className="">
                                <Button type="submit" className=" my-4 hover:bg-sky-700 mx-auto border-1 w-full cursor-pointer bg-sky-500 text-white font-bold">Sign Up</Button>
                            </div>
                        }
                    </div>
                    <span className='text-sm mt-2 mb-3'>Already have an account ?<Link to="/login"><span className='text-blue-400 cursor-pointer font-bold  '> Login</span></Link></span>
                </form>

            </div>




        </>
    )
}

export default SignUp