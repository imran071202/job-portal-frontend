import React, { useEffect, useState } from "react";
import axios from "axios";
import { COMPANY_API_POINT } from "@/utils/apiPoint";
import Navbar from "../shared/Navbar";
import { IoCreate } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCompanies } from "@/redux/companySlice";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { BsThreeDotsVertical } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { AiTwotoneDelete } from "react-icons/ai";
import Footer from "../shared/Footer";

export default function CompanyHomePage() {

  // useGetAllCompanies();


  // const [companies, setCompanies] = useState([]);
  const dispatch = useDispatch();
  const navigate= useNavigate()
  const params= useParams()

  const [search, setSearch] = useState("");
  const { companies } = useSelector(store => store.company)

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_POINT}/getCompany`, { withCredentials: true });
        dispatch(setCompanies(res.data.companies))
        console.log("API response:", res.data);

      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, []);

  // search filter
  const filteredCompanies = companies.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white rounded-xl shadow-md p-4 mb-10 mt-3 md:w-[80%] mx-auto ">
          <div className="flex w-full md:w-2/4 gap-2">
            <input
              type="text"
              placeholder="Search company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-lg px-3 py-1 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => { }}
              className="bg-sky-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-sky-800"
            >
              Search
            </button>
          </div>

          <Link to="/registercompany">
            <button

              className="mt-3 md:mt-0 bg-green-600 text-white px-5 py-2 rounded-xl font-medium hover:bg-green-700 flex items-center gap-1 cursor-pointer"
            >
              <IoCreate className="text-xl " />Create New Company
            </button></Link>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-md overflow-x-auto md:w-[80%] mx-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3">Logo</th>
                <th className="p-3">Name</th>
                <th className="p-3">Created At</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                filteredCompanies?.length <= 0 ? <tr>
                  <td colSpan="4" className="text-center p-6 text-gray-500">
                    Companies not found.
                  </td>
                </tr>
                  :
                  (
                    <>{
                      filteredCompanies?.map((company) => {
                        return (
                          <tr key={company._id}
                            className="border-t hover:bg-gray-200 transition "
                          >
                            <td className="pl-3 py-3">
                              {company.logo ? (
                                <img
                                  src={company?.logo}
                                  alt={company?.name}
                                  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border"
                                />
                              ) : (
                                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 text-gray-500">
                                  N/A
                                </div>
                              )}
                            </td>
                            <td className="p-3 font-medium">{company?.name}</td>
                            <td className="p-3 text-gray-600">
                              {new Date(company?.createdAt).toLocaleDateString()}
                            </td>
                            <td className="p-3 flex justify-center gap-3">

                              <Popover className="">
                                <PopoverTrigger className="pt-3 pl-5 text-right my-auto"><BsThreeDotsVertical className="text-2xl cursor-pointer" /></PopoverTrigger>
                                <PopoverContent className="border-0 shadow-xl flex justify-between w-fit px-5 py-2 gap-5 bg-slate-100">
                                  <button onClick={()=>navigate(`/admin/companies/${company._id}`)} className="cursor-pointer  text-green-600 hover:text-green-500 font-semibold rounded-xl hover:Text-yellow-600 flex justify-center items-center gap-0.5">
                                   <CiEdit className="text-xl font-bold hover:text-green-500" /> Edit
                                  </button>
                                  <button className="cursor-pointer  text-red-600 rounded-xl hover:text-red-500 font-semibold flex justify-center items-center gap-0.5">
                                   <AiTwotoneDelete className="text-xl text-red-500 hover:text-red-500 font-bold" /> Delete
                                  </button></PopoverContent>


                              </Popover>

                            </td>
                          </tr>


                        )

                      })
                    }

                    </>
                  )
              }
              {/* {companies.length > 0 ? (
                companies.map((company) => (   
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-6 text-gray-500">
                    No companies found.
                  </td>
                </tr>
              )} */}
            </tbody>
          </table>
        </div>
      </div>
      <Footer/>
    </>
  );
}
