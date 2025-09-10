import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { FaPenClip } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import { GiTireIronCross } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import axios, { Axios } from "axios";
import { APPLICATION_JOB_API_POINT } from "@/utils/apiPoint";
import { useDispatch, useSelector } from "react-redux";
import { setApplicant } from "@/redux/applicationSlice";
import { toast } from "sonner";
import { setSingleCompany } from "@/redux/companySlice";



const CompanyJobApplications = ({ jobs }) => {
    // Example applications data (replace with API data later)
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()
    const applicant = useSelector((store) => store.application?.applicant) || [];
    // const shortlistingStatus = ["Accepted", "Rejected"]
    const shortlistingStatus = [
        {
            label: "Accepted",
            value: "accepted",
            icon: <TiTick className="text-green-600 text-lg" />,
            textClass: "text-green-600"
        },
        {
            label: "Rejected",
            value: "rejected",
            icon: <ImCross className="text-red-600 text-sm" />,
            textClass: "text-red-600"
        }
    ];



    const { singleCompany } = useSelector(store => store.company)
    const [job, setJob] = useState(null);


    useEffect(() => {
        const fetchApplication = async () => {
            try {
                const res = await axios.get(
                    `${APPLICATION_JOB_API_POINT}/${params.id}/applications`,
                    { withCredentials: true }
                );

                dispatch(setApplicant(res.data.job.applications));
                setJob(res.data.job)
                setCompany(res.data.company)
            } catch (error) {
                toast.error(error.response.data.message)
            }
        };

        fetchApplication();
    }, [params.id, dispatch]);



    const [search, setSearch] = useState("");

    // Filter applications by studentName or jobTitle
    const filteredApplications = applicant.filter(
        (app) =>
            app?.applicant?.fullname?.toLowerCase().includes(search.toLowerCase()) ||
            app?.applicant?.email?.toLowerCase().includes(search.toLowerCase())
    );

    const handleStatusChange = async (status, id) => {
        try {
            const res = await axios.put(`${APPLICATION_JOB_API_POINT}/status/${id}/update`, { status }, { withCredentials: true })
            console.log(res.data);
            if (res.data.success) {
                toast.success(res.data.message)
                dispatch(setApplicant(
                    applicant.map(app =>
                        app._id === id ? { ...app, status: status.toLowerCase() } : app
                    )
                ));

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }

    return (

        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                        {job && (
                            <div className=" flex justify-center items-center gap-1">
                                <img className="w-8 h-8 md:h-12 md:w-12 " src={job?.company?.logo} alt="" />
                                <p className="text-xl text-gray-800 font-bold">
                                    {job?.company?.name}
                                </p>
                            </div>

                        )}
                    </h2>

                    {/* Search Bar */}
                    <div className="mb-3 flex justify-between flex-col md:flex-row gap-2">
                        <div className=" flex justify-evenly md:block items-center md:flex-col">
                            <button onClick={() => navigate('/admin/jobs')} className="cursor-pointer  text-sky-700 font-bold rounded-md hover:text-sky-900 flex items-center text-lg"><IoIosArrowBack className="text-2xl font-bold " />Back</button>
                            {job && (
                                <p className="text-lg font-bold md:mt-2">{job?.title} • ({applicant?.length})</p>
                            )}
                        </div>
                        <input
                            type="text"
                            placeholder="Search by name or job title..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full md:w-1/3 px-5 py-2 md:h-11 border rounded-md focus:ring-2 focus:ring-blue-600 outline-none"
                        />
                    </div>

                    {/* Applications Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse ">
                            <thead>
                                <tr className="bg-slate-300 text-black">
                                    <th className="p-3 text-left"> Name</th>
                                    <th className="p-3 text-left">Email</th>
                                    <th className="p-3 text-left">Contact</th>
                                    <th className="p-3 text-left">Applied On</th>
                                    <th className="p-3 text-left">Resume</th>
                                    <th className="p-3 text-left">Status</th>
                                    <th className="p-3 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    applicant && filteredApplications.length > 0 ? (
                                        filteredApplications.map((app) => (
                                            <tr
                                                key={app._id}
                                                className="border-b hover:bg-gray-200 transition"
                                            >
                                                <td className="p-3">{app?.applicant?.fullname}</td>
                                                <td className="p-3">{app?.applicant?.email}</td>
                                                <td className="p-3">{app?.applicant?.phoneNumber}</td>
                                                <td className="p-3">{new Date(app.createdAt).toLocaleDateString()}</td>
                                                <td className="p-3">
                                                    <a className="text-blue-600 font-semibold underline" href={app?.applicant?.profile?.resume} target="_blank" rel="nooener noreferrer"> {app?.applicant?.profile?.resumeOrginalName || "N/A"}</a>
                                                </td>
                                                <td className="p-3">
                                                    <span
                                                        className={`inline-flex items-center gap-1 px-3 py-1 pb-2 rounded-md font-semibold text-sm ${app.status === "pending"
                                                            ? "bg-gray-200 text-violet-900"
                                                            : app.status === "accepted"
                                                                ? "bg-green-100 text-green-700"
                                                                : "bg-red-100 text-red-700"
                                                            }`}
                                                    >
                                                        {app.status === "accepted" && (
                                                            <>
                                                                <span className="text-green-700">Accepted</span>
                                                                <TiTick className="ml-1 text-green-700" />
                                                            </>
                                                        )}
                                                        {app.status === "rejected" && (
                                                            <>
                                                                <span className="text-red-700">Rejected</span>
                                                                <ImCross className="ml-1 text-red-700 text-xs" />
                                                            </>
                                                        )}
                                                        {app.status === "pending" && <span>Pending</span>}
                                                    </span>
                                                </td>


                                                <th className="p-3 text-center"><Popover>
                                                    <PopoverTrigger className="cursor-pointer"><FaPenClip /></PopoverTrigger>

                                                    <PopoverContent className="w-fit px-6 py-3 bg-slate-100 border border-slate-300 shadow-lg rounded-md text-center">
                                                        {shortlistingStatus.map((status, index) => (
                                                            <div
                                                                key={index}
                                                                onClick={() => handleStatusChange(status.value, app?._id)}
                                                                className="flex items-center justify-center gap-2 py-1.5 px-2 cursor-pointer hover:font-bold  rounded-md"
                                                            >{status.label}

                                                                <span>{status.icon}</span>
                                                            </div>
                                                        ))}
                                                    </PopoverContent>

                                                    {/* <PopoverContent className="bg-slate-100 flex w-fit items-center flex-col gap-3 text-md font-bold text-center px-8 py-3 rounded-sm border-slate-300 ">
                                                        <p onClick={() => handleStatusChange(status, app._id)} className="flex items-center gap-1 cursor-pointer hover:text-green-600 mb-2">Accept<TiTick className="text-2xl text-green-600 cursor-pointer" /> </p>
                                                        <p onClick={() => handleStatusChange(status, app._id)} className="flex items-center gap-2 pb- cursor-pointer hover:text-red-500">Reject<ImCross className="text-sm pt-0 text-red-500 cursor-pointer" /></p>
                                                    </PopoverContent> */}


                                                </Popover></th>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="7"
                                                className=" text-center py-10 animate-pulse text-gray-500 font-medium"
                                            >
                                                No applications found
                                            </td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CompanyJobApplications;
