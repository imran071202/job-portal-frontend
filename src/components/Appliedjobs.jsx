// components/AppliedJobsTable.jsx
import React from 'react';
import { ImCross } from 'react-icons/im';
import { MdPending } from 'react-icons/md';
import { TiTick } from 'react-icons/ti';

const AppliedJobsTable = ({ job, appliedJobs }) => {

    return (
        <div className="overflow-x-auto bg-white rounded-md shadow-md mt-3 mb-16 ">
            <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                    <tr>
                        <th className="py-3 px-4 text-left">Job Title</th>
                        <th className="py-3 px-4">Company</th>
                        <th className="py-3 px-4">Applied on</th>
                        <th className="py-3 px-4 text-right">Status</th>
                    </tr>
                </thead>
                <tbody>

                    {(
                        appliedJobs.length === 0 ? <><p className=" py-2 flex justify-center items-center font-medium mx-auto">Application not found</p></>
                            : appliedJobs.map((appliedJobs) => (
                                <tr
                                    key={appliedJobs._id}
                                    className="border-t  hover:bg-gray-200 transition duration-200"
                                >
                                    <td className="py-3 px-4 font-medium text-left ">{appliedJobs?.job?.title}</td>
                                    <td className="py-3 px-6 ">{appliedJobs?.job?.company?.name}</td>


                                    <td className="py-3 pr-2 text-center">
                                        {appliedJobs?.createdAt
                                            ? new Date(appliedJobs.createdAt).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric"
                                            })
                                            : "N/A"}
                                    </td>
                                    <td className="py-3 pr-2 text-right">
                                        <span
                                            className={`inline-flex items-center  px-3 py-1 rounded-full text-xs font-semibold ${appliedJobs?.status === "accepted"
                                                    ? "bg-green-100 text-green-700"
                                                    : appliedJobs?.status === "rejected"
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-yellow-100 text-yellow-700" // default = pending
                                                }`}
                                        >
                                            {appliedJobs?.status === "accepted" && (
                                                <>
                                                    <span className="text-green-700">Accepted</span>
                                                    <TiTick className="ml-1 text-green-700 text-lg" />
                                                </>
                                            )}
                                            {appliedJobs?.status === "rejected" && (
                                                <>
                                                    <span className="text-red-700">Rejected</span>
                                                    <ImCross className="ml-1 text-red-700 text-[12px] pt-0.5" />
                                                </>
                                            )}
                                            {appliedJobs?.status === "pending" && (
                                                <>
                                                    <span className="text-yellow-900">Pending</span>
                                                    <MdPending className="ml-1 text-yellow-700 text-sm" />
                                                </>
                                            )}
                                        </span>
                                    </td>

                                    {/* <td className="py-3 pr-2 text-right">
                                        <span className="px-2 py-1 rounded-full text-xs font-semibold" >  {appliedJobs?.status} </span>
                                    </td> */}
                                </tr>
                            ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AppliedJobsTable;
