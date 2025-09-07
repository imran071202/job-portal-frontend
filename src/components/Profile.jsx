import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { FaPenClip } from "react-icons/fa6";
import { Label } from './ui/label';
import { Contact2, Mail } from 'lucide-react';
import Appliedjobs from './Appliedjobs';
import { useSelector } from 'react-redux';
import UpdateProfile from './UpdateProfile';
import useGetAllAppliedJobs from '@/hooks/useGetAllAppliedJobs';

const Profile = () => {

    useGetAllAppliedJobs();
    const{appliedJobs}=useSelector(store=>store.jobs)

    const { user } = useSelector(state => state.auth);
    const [open, setopen] = useState(false)
    const skillsArray = user?.profile?.skills || [];


    const isresume = true
    return (
        <>
            <Navbar />
            <div className="border-1 border-sky-800  w-[85%] md:w-2/4 mx-auto flex flex-col  rounded-md mt-5 ">

                <div className="flex flex-col  px-5 py-5 ">
                    <Avatar className="h-25 w-25 mx-auto mt-2">
                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />

                    </Avatar>
                    <div className=" md:pl-2 py-3 mx-auto flex items-center justify-center md:justify-between ">
                        <h1 className='text-2xl font-medium pl-5'>{user?.fullname}</h1>
                        <div className="pl-5"><FaPenClip onClick={() => setopen(true)} className='text-sm md:text-md mt-1.5 cursor-pointer' /></div>
                    </div>
                    {/*  */}
                    <div className="border-b-2 w-[95%] md:w-[90%] mx-auto border-cyan-800 "></div>
                    {/*  */}
                    <div className=" w-[95%] md:w-[90%] px-1 py-4  mx-auto">
                        <Label className="text-md font-semibold">Bio</Label>
                        <h1>{user?.profile?.bio}</h1></div>
                    <div className=" flex flex-col md:flex-row  gap-5 md:gap-25 w-[95%] md:w-[90%] px-1 py-2  mx-auto">
                        <div className=" flex items-center gap-2">
                            <Mail className='' />

                            <h1>{user?.email}</h1></div>
                        <div className="flex items-center gap-2">
                            <Contact2 />
                            <h1>{user?.phoneNumber}</h1></div>

                    </div>
                    <div className="Skills flex flex-col flex-wrap w-[95%] md:w-[90%] px-1 py-2  mx-auto">
                        <Label className="text-md font-semibold mb-2">Skills</Label>
                        <div className="flex flex-wrap gap-2 ">
                            <span className='px-5 py-1 bg-slate-200 text-sky-800 rounded-sm w-fit'>{skillsArray.join(', ')}</span>

                        </div>
                    </div>
                    <div className="Skills flex flex-col flex-wrap w-[95%] md:w-[90%] px-1 py-2  mx-auto">
                        <Label className="text-md font-semibold mb-2">Resume</Label>
                        {
                            isresume ? <a target='_blankf' href={user?.profile?.resume} className='bg-slate-200 hover:bg-slate-300 w-fit px-4 py-1 underline rounded-sm'>{user?.profile?.resumeOrginalName}</a> : <div className="">NA</div>
                        }
                    </div>
                </div>

            </div>
            <div className=" w-[85%] md:w-2/4 mx-auto flex flex-col  rounded-md mt-8  ">
                <div className="">
                    <span className='text-lg font-bold '>Applied Jobs</span>
                </div>
                <Appliedjobs appliedJobs={appliedJobs} />

            </div>
            <UpdateProfile open={open} setopen={setopen} />

        </>
    )
}

export default Profile