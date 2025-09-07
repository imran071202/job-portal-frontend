import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaUserTie, FaBars, FaTimes } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import logo from '../../assets/image/skill-bridge.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import store from '@/redux/store';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/apiPoint';
import { setuser } from '@/redux/authSlice';
import { FaHome } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa6";
import { motion } from "motion/react"



const Navbar = () => {
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)

    const logoutHandeler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true })
            if (res.data.success) {
                dispatch(setuser(null))
                navigate("/")
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }

    return (
        <>
            <nav className="h-18 md:h-20 relative flex justify-between items-center px-4 md:px-12 bg-white shadow-md sticky top-0 z-50">

                {/* LEFT SECTION */}
                <div className="flex items-center">
                    {/* Mobile: Avatar left if logged in, else logo left */}
                    <motion.div animate={{ rotate: 360 }} className="md:hidden">
                        {user ? (
                            <Popover>
                                <PopoverTrigger>
                                    <Button variant="ghost" className="p-0 mt-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={user?.profile?.profilePhoto} />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-70 bg-slate-200 border-0 ml-4">
                                    <div className="flex flex-col items-center gap-3">
                                        <Avatar className="h-16 w-16 border-2 border-red-600">
                                            <AvatarImage src={user?.profile?.profilePhoto} />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <div className="text-center w-[80%] border-b-2 pb-3">
                                            <h1 className="text-xl font-semibold">{user?.fullname}</h1>
                                            <span className="text-sm">{user?.profile?.bio}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center pt-3">
                                        {user?.role === "student" && (
                                            <Button variant="link" className="cursor-pointer text-base">
                                                <FaUserTie />
                                                <Link to="/profile" className="ml-1">View Profile</Link>
                                            </Button>
                                        )}
                                        <Button onClick={logoutHandeler} variant="link" className="cursor-pointer text-base">
                                            <FiLogOut className="text-xl" /> Logout
                                        </Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        ) : (
                            <Link to="/">
                                <img src={logo} alt="Logo" className="h-12 md:h-18 cursor-pointer" />
                            </Link>
                        )}
                    </motion.div>

                    {/* Desktop: Logo always left */}
                    <Link to="/" className="hidden md:block">
                        <img src={logo} alt="Logo" className="h-12 md:h-16 cursor-pointer" />
                    </Link>
                </div>

                {/* MOBILE LOGO CENTER WHEN LOGGED IN */}
                {user && (
                    <div className="absolute left-1/2 transform -translate-x-1/2 md:hidden">
                        <Link to="/">
                            <img src={logo} alt="Logo" className="h-12 cursor-pointer" />
                        </Link>
                    </div>
                )}

                {/* CENTER SECTION (desktop only) */}
                <div className="hidden md:flex flex-1 justify-center">
                    <ul className="flex gap-15 items-center cursor-pointer">
                        {
                            user?.role === "student" ?<>
                                <li className="text-lg font-semibold">
                                    <Link to={user?.role === 'recruiter' ? "/admin/recruter" : "/"}><FaHome className='mx-auto text-3xl mt-2' /></Link>
                                </li>
                                <li className="text-lg font-semibold">
                                    <Link to={user?.role === 'recruiter' ? "/admin/jobs" : "/jobs"}><FaBriefcase className='mx-auto text-2xl mt-2.5' /></Link>
                                </li>
                            </> :
                                <>
                                    <li className="text-lg font-semibold">
                                        <Link to={user?.role === 'recruiter' ? "/admin/recruter" : "/"}><FaHome className='mx-auto text-3xl mt-2' /></Link>
                                    </li></>
                                    
                           
                        }
                        


                    </ul>
                </div>

                {/* RIGHT SECTION */}
                <div className="flex items-center gap-4">
                    {/* Desktop: Avatar right */}
                    {user && (
                        <div className="hidden md:block">
                            <Popover>
                                <PopoverTrigger>
                                    <Button variant="ghost" className="p-0">
                                        <Avatar className="h-12 w-12 cursor-pointer mt-8">
                                            <AvatarImage src={user?.profile?.profilePhoto} />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 bg-slate-200 border-0 mr-8">
                                    <div className="flex flex-col items-center gap-3">
                                        <Avatar className="h-16 w-16 border-2 border-red-600">
                                            <AvatarImage src={user?.profile?.profilePhoto} />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <div className="text-center w-[80%] border-b-2 pb-3">
                                            <h1 className="text-xl font-semibold">{user?.fullname}</h1>
                                            <span className="text-sm">{user?.profile?.bio}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center pt-3">
                                        {user?.role === "student" && (
                                            <Button variant="link" className="cursor-pointer text-base">
                                                <FaUserTie />
                                                <Link to="/profile" className="ml-1">View Profile</Link>
                                            </Button>
                                        )}
                                        <Button onClick={logoutHandeler} variant="link" className="cursor-pointer text-base">
                                            <FiLogOut className="text-xl" /> Logout
                                        </Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    )}

                    {/* Auth Buttons if not logged in (desktop only) */}
                    {!user && (
                        <div className="hidden md:flex items-center gap-3 pl-5">
                            <Link to="/login">
                                <button className="text-sm py-2 px-5 cursor-pointer font-semibold hover:bg-sky-500 bg-sky-100 border shadow rounded-sm">
                                    Login
                                </button>
                            </Link>
                            <Link to="/signup">
                                <button className="text-sm py-2 px-5 cursor-pointer font-semibold hover:bg-sky-800 bg-sky-600 text-white shadow rounded-sm">
                                    Sign Up
                                </button>
                            </Link>
                        </div>
                    )}

                    {/* Mobile Toggle */}
                    <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
                    </button>
                </div>
            </nav>

            {/* MOBILE MENU */}
            {isOpen && (
                <div className="md:hidden bg-slate-100 shadow-md px-6 py-10 space-y-4 absolute w-full text-center">
                    {user?.role === 'recruiter' ? (
                        <>
                            <Link to="/admin/recruter" className="block text-lg font-semibold mx-auto"><FaHome className='mx-auto text-2xl' /></Link>
                            {/* <Link to="/admin/jobs" className="block text-lg font-semibold">Jobs</Link> */}
                        </>
                    ) : (
                        <>
                            <Link to="/" className="block text-lg font-semibold">Home</Link>
                            <Link to="/jobs" className="block text-lg font-semibold">Jobs</Link>
                        </>
                    )}

                    {!user ? (
                        <div className="flex justify-center mt-10 gap-3">
                            <Link to="/login">
                                <button className="w-full py-2 px-6 shadow-lg bg-sky-100 hover:bg-sky-500 font-semibold rounded-sm">
                                    Login
                                </button>
                            </Link>
                            <Link to="/signup">
                                <button className="w-full py-2 px-6 shadow-lg bg-sky-600 hover:bg-sky-800 text-white font-semibold rounded-sm">
                                    Sign Up
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3 text-center">
                            <button
                                onClick={logoutHandeler}
                                className="flex items-center gap-2 text-base justify-center font-semibold text-red-600"
                            >
                                <FiLogOut /> Logout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default Navbar
