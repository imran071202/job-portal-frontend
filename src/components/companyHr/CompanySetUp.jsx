import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from "axios";
import { COMPANY_API_POINT } from "@/utils/apiPoint";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import { setloading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

export default function CompanySetUpr() {
    const params = useParams()
    useGetCompanyById(params.id)
    const navigate = useNavigate()
    const { singleCompany } = useSelector(store => store.company)
    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.auth)


    const [input, setinput] = useState({
        name: "",
        website: "",
        location: "",
        description: "",
        file: null,
    });

    const handleChangeEven = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value })
    };

    const changeFileHandle = (e) => {
        const file = e.target.files?.[0];  // <-- should be .files not .file
        setinput({ ...input, file });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append("name", input.name)
        formData.append("description", input.description)
        formData.append("location", input.location)
        formData.append("website", input.website)
        if (input.file) {
            formData.append("file", input.file)
        }
        try {
            dispatch(setloading(true))
            const res = await axios.put(`${COMPANY_API_POINT}/profile/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/admin/companies")

            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        } finally {
            dispatch(setloading(false))
        }
    };

    useEffect(() => {
        setinput({
            name: singleCompany.name || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            description: singleCompany.description || "",
            file: singleCompany.file || null,
        })

    }, [singleCompany])




    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4 text-base">
                <div className="bg-white w-full max-w-2xl shadow-lg rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        Register Your Company
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Company Name */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Company Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={handleChangeEven}
                                placeholder="Enter company name"
                                required
                                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        {/* Website */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Website
                            </label>
                            <input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={handleChangeEven}
                                placeholder="https://example.com"
                                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>



                        {/* Location */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={handleChangeEven}
                                placeholder="City, Country"
                                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={input.description}
                                onChange={handleChangeEven}
                                placeholder="Write about your company..."
                                rows="4"
                                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            ></textarea>
                        </div>

                        {/* Logo Upload */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Company Logo
                            </label>
                            <input
                                type="file"
                                name="file"
                                accept="image/*"
                                onChange={changeFileHandle}
                                className="w-full border rounded-xl p-2 bg-gray-50"
                            />
                        </div>

                        {/* Submit */}
                        <div className="flex gap-2">

                            <button
                                className="w-[20%] bg-sky-100 hover:bg-sky-200 cursor-pointer  text-black font-semibold py-3 rounded-xl shadow-md transition"
                            > <Link to="/admin/companies" className="flex justify-center items-center gap-1"><FaArrowLeftLong className="text-3xl hover:text-red-900 pl-1" /><p className="hover:text-red-600 pb"></p></Link>

                            </button>
                           { 
                            loading ? <button type="submit" className="w-full bg-linear-to-t from-sky-400 to-indigo-500 cursor-pointer  text-white font-semibold py-3 rounded-xl shadow-md transition flex justify-center items-center"><Loader2 />Wait</button> : <button
                                type="submit"
                                className="w-full bg-linear-to-t from-sky-400 to-indigo-500 cursor-pointer  text-white font-semibold py-3 rounded-xl shadow-md transition"
                            ><p className="hover:text-slate-900">Update </p>

                            </button>}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
