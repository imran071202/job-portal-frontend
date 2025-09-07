import Navbar from "../shared/Navbar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ALL_JOB_API_POINT } from "@/utils/apiPoint";
import { useSelector, useDispatch } from "react-redux";
import { setAdminJobs } from "@/redux/jobSlice";
import { Link, useNavigate } from "react-router-dom";
import { IoIosCreate } from "react-icons/io";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { CiEdit } from "react-icons/ci";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEye } from "react-icons/fa6";



const JobsAdminPage = () => {
    const dispatch = useDispatch();
    const { adminJobs } = useSelector((store) => store.jobs);

    const navigate = useNavigate()

    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const [filterType, setFilterType] = useState("all"); // jobType filter

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get(`${ALL_JOB_API_POINT}/admin/jobs`, {
                    withCredentials: true,
                });
                dispatch(setAdminJobs(res.data.jobs));
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [dispatch]);

    // Apply search + filter
    const filteredJobs = adminJobs?.filter((job) => {
        const matchesSearch =
            job.title.toLowerCase().includes(search.toLowerCase()) ||
            job.company?.name?.toLowerCase().includes(search.toLowerCase()) ||
            job.location?.toLowerCase().includes(search.toLowerCase());

        const matchesType =
            filterType === "all" || job.jobType?.toLowerCase() === filterType.toLowerCase();

        return matchesSearch && matchesType;
    });
    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100 p-6">
                {/* Header + Filters */}
                <div className="flex flex-col md:flex-row justify-between items-center bg-white rounded-xl shadow-md p-4 mb-10 mt-3 md:w-[90%] mx-auto gap-4">
                    <h1 className="text-lg font-bold">All Job Postings</h1>

                    {/* Search + Filter */}
                    <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="Search by title, company, location..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full md:w-72 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Job Types</option>
                            <option value="full-time">Full-Time</option>
                            <option value="part-time">Part-Time</option>
                            <option value="internship">Internship</option>
                            <option value="remote">Remote</option>
                        </select>
                    </div>

                    {/* Create Button */}
                    <Link to="/admin/newjob">
                        <button className=" flex justify-center items-center gap-1 mt-3 md:mt-0 bg-green-600 text-white px-5 py-2 rounded-xl font-medium hover:bg-green-700 cursor-pointer">
                            <IoIosCreate /> Create New Job
                        </button>
                    </Link>
                </div>

                {/* Jobs Table */}
                <div className="bg-white rounded-md shadow-md overflow-x-auto md:w-[90%] mx-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-3">Title</th>
                                <th className="p-3">Company</th>
                                <th className="p-3">Location</th>
                                <th className="p-3">Type</th>
                                <th className="p-3">Posted At</th>
                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="7" className="text-center p-6 text-gray-500">
                                        Loading jobs...
                                    </td>
                                </tr>
                            ) : filteredJobs?.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center p-6 text-gray-500">
                                        No jobs found.
                                    </td>
                                </tr>
                            ) : (
                                filteredJobs?.map((jobs) => (
                                    <tr key={jobs._id} className="border-t hover:bg-gray-50 transition">
                                        <td className="p-3 font-medium">{jobs.title}</td>
                                        <td className="p-3">{jobs?.company?.name || "N/A"}</td>
                                        <td className="p-3">{jobs.location || "N/A"}</td>
                                        <td className="p-3">{jobs.jobType || "N/A"}</td>
                                        <td className="p-3 text-gray-600">
                                            {new Date(jobs.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-3 flex justify-center gap-3">

                                            <Popover className=" flex justify-center ">
                                                <PopoverTrigger className="pt-3 md:pt-1 pl-5 text-right my-auto"><BsThreeDotsVertical className="text-2xl cursor-pointer" /></PopoverTrigger>

                                                <PopoverContent className="border-1 border-slate-600 rounded-md shadow-xl flex justify-between w-fit px-5 py-2 gap-5 bg-slate-100">
                                                    
                                                    <button onClick={() => navigate(`/admin/jobs/${jobs._id}/applicants`)} className="cursor-pointer  text-blue-600 rounded-xl hover:text-blue-800 font-semibold flex justify-center items-center gap-1">
                                                        <FaEye className="text-base  text-blue-600 hover:text-blue-800 font-bold" />Applications
                                                    </button></PopoverContent>


                                            </Popover>

                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default JobsAdminPage
