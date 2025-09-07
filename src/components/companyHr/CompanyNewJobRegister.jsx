import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useSelector } from 'react-redux'
import axios from 'axios'
import { ALL_JOB_API_POINT } from '@/utils/apiPoint'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'


const CompanyNewJobRegister = () => {

    const navigate = useNavigate()

    const [input, setinput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        exprience: "",
        position: "",
        companyId: ""
    })

    const { companies } = useSelector(store => store.company)

    const handleChange = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangehandle = (value) => {
        const selectedCompany = companies.find((company) => company._id === value)
        setinput({ ...input, companyId: selectedCompany._id })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        // console.log("🚀 Sending payload:", input);
        try {
            const res = await axios.post(`${ALL_JOB_API_POINT}/post`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/admin/jobs")
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message)
        }



    }

    return (
        <>

            <Navbar />

            <div className="flex justify-center items-center  bg-gray-100 p-4">
                <form
                    onSubmit={submitHandler}

                    className="bg-white p-6 md:p-8 rounded-2xl mt-2 shadow-lg w-full max-w-5xl"
                >
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                        Create New Job
                    </h2>

                    {

                        companies.length === 0 && <span className=' flex justify-center text-sm p-1.5 px-10 w-fit mx-auto mb-2 bg-red-500 text-white font-bold rounded-full animate-pulse '> *Please register company first*</span>
                    }

                    {/* Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {/* Title */}
                        <div>
                            <label className="block text-gray-700 mb-1">Job Title</label>
                            <input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Enter job title"
                            />
                        </div>

                        
                        {/* Salary */}
                        <div>
                            <label className="block text-gray-700 mb-1">Salary</label>
                            <input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Enter salary"
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-gray-700 mb-1">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Enter location"
                            />
                        </div>

                        {/* Job Type */}
                        <div>
                            <label className="block text-gray-700 mb-1 ">Job Type</label>
                            <select
                                name="jobType"
                                value={input.jobType}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-sky-700 outline-none cursor-pointer"
                                required
                            >
                                <option value="">Select Job Type</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Internship">Internship</option>
                                <option value="Contract">Contract</option>
                            </select>
                        </div>
                        {/* Position */}
                        <div>
                            <label className="block text-gray-700 mb-1">Position</label>
                            <input
                                type="text"
                                name="position"
                                value={input.position}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Enter position"
                            />
                        </div>


                        {/* Experience */}
                        <div>
                            <label className="block text-gray-700 mb-1">Experience</label>
                            <input
                                type="text"
                                name="exprience"
                                value={input.exprience}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Enter experience required"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 mb-1">Requirements</label>
                            <input
                                name="requirements"
                                value={input.requirements}
                                onChange={handleChange}
                                rows="3"
                                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Enter job requirements"
                            />
                        </div>



                        {/* Company ID
                        <div>
                            <label className="block text-gray-700 mb-1">Company ID</label>
                            <input
                                type="text"
                                name="companyId"
                                value={formData.companyId}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Enter company ID"
                            />
                        </div> */}

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 mb-1">Description</label>
                            <textarea
                                name="description"
                                value={input.description}
                                onChange={handleChange}
                                rows="3"
                                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Enter job description"
                            />
                        </div>

                        <div className=" my-auto">
                            {

                                companies.length > 0 && <Select onValueChange={(value) => setinput({ ...input, companyId: value })}>
                                    <SelectTrigger className="md:w-[350px] w-full cursor-pointer">
                                        <SelectValue placeholder="Select Company" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-100 cursor-pointer ">
                                        {companies.map((company) => (
                                            <SelectItem value={company._id} key={company._id} className="hover:bg-slate-400 cursor-pointer">
                                                {company.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                            }
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-between">
                      
                        <button onClick={()=>navigate("/admin/recruter")} className='md:w-[10%] w-[20%] cursor-pointer font-medium bg-slate-300 hover:bg-slate-400  rounded-md '> Back</button>
                        <button
                            type="submit"
                            className="md:w-[89%] w-[78%] cursor-pointer bg-sky-700  font-medium text-white p-3 rounded-md hover:bg-sky-800 transition"
                        >
                            Submit
                        </button>

                    </div>
                </form>
            </div>




        </>
    )
}

export default CompanyNewJobRegister