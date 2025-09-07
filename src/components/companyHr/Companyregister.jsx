import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_POINT } from '@/utils/apiPoint'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const RegisterCompany = () => {
    const [companyName, setcompanyName] = useState("")
      const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        try {
            e.preventDefault()
            const res = await axios.post(`${COMPANY_API_POINT}/registerCompany`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })

            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company))
                toast.success(res.data.message)
                const companyId = res?.data?.company?._id
                navigate(`/admin/companies/${companyId}`)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message)

        }

    }

    return (
        <>
            <Navbar />
            <div className="w-[80%] md:w-[50%] mx-auto mt-10 bg-slate-100 p-3 rounded-md">
                <div className="mt-6">
                    <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-3 text-center">
                        Register Your Company
                    </h2>
                </div>

                <form className="space-y-5 ">
                    {/* Company Name */}
                    <div className='md:mt-10 mt-4 mb-7 w-full md:w-[100%]  mx-auto px-3 md:px-10 py-2 flex flex-col'>
                        <div className="mx-auto md:w-[80%]">
                            <label className="block text-gray-700 font-medium text-lg mb-1">
                                Company Name
                            </label>
                            <input
                                onChange={(e) => setcompanyName(e.target.value)}
                                type="text"
                                name="name"


                                placeholder="Enter company name"
                                required
                                className="w-full border rounded-md px-2 py-2.5 outline-none"
                            />
                        </div>
                        <div className="mx-auto">
                            <div className="mt-5 space-x-5 md:text-lg font-semibold">
                                <button onClick={() => navigate("/admin/recruter")} className='bg-slate-300 px-5 py-2 md:px-10 md:py-2 text-black  rounded-md hover:bg-slate-400 cursor-pointer '>Cancel
                                </button>
                                <button onClick={handleRegister} className='bg-sky-700 px-5 py-2 md:px-10 md:py-2 text-white rounded-md hover:bg-sky-900 cursor-pointer'> Register
                                </button>
                            </div></div>
                    </div>
                </form>
            </div>

        </>
    )
}

export default RegisterCompany