import React from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import { IoBookmarkOutline, IoLocationSharp } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
    const navigate = useNavigate()

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // days
    }

    return (
        <div className="border shadow-md rounded-md p-4 flex flex-col justify-between h-[200px] w-full">
            {/* Top Section */}
            <div className="flex-1">
                <div className="flex items-center justify-between border-b pb-1 border-sky-800">
                    <div className="flex items-center">
                        <Avatar>
                            <AvatarImage src={job?.company?.logo} />
                        </Avatar>
                        <div className="pl-2">
                            <h1 className="font-semibold text-sm">{job?.company?.name}</h1>
                            <p className="text-xs flex items-center">
                                <IoLocationSharp className="text-red-500 text-xs mr-1" />
                                <span>{job?.location}</span>
                            </p>
                        </div>
                    </div>
                    <IoBookmarkOutline className="cursor-pointer text-xl" />
                </div>

                {/* Job Title */}
                <p className="mt-2 font-medium text-sky-800 text-sm line-clamp-1">{job?.title}</p>

                {/* Job Description (clamped) */}
                <p className="text-xs mt-1 text-gray-600 line-clamp-2">{job?.description}</p>

                {/* Show More navigates to job details */}
                {job?.description?.length > 80 && (
                    <button
                        onClick={() => navigate(`/details/${job?._id}`)}
                        className="text-sky-700 text-xs mt-1 hover:underline"
                    >
                        Show More
                    </button>
                )}
            </div>

            {/* Bottom Section */}
            <div className="mt-2 flex items-center justify-between">
                <div>
                    <button className="bg-sky-700 text-xs px-4 py-1 mr-2 rounded-md text-white font-bold hover:bg-sky-900">
                        Save
                    </button>
                    <Link
                        to={`/details/${job?._id}`}
                        className="text-xs font-semibold hover:underline"
                    >
                        Details
                    </Link>
                </div>
                <p className="text-xs text-gray-500">
                    {daysAgoFunction(job?.createdAt) === 0
                        ? "Today"
                        : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
            </div>
        </div>
    )
}

export default Job
