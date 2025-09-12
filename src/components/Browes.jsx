import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { setSearchQuery } from '@/redux/jobSlice'
import Footer from './shared/Footer'

const Browse = () => {

    useGetAllJobs()

    const { allJobs } = useSelector(store => store.jobs)
   

    return (

        <>
            <Navbar />

            <div className="w-[80%] mx-auto mt-10 text-center">
                <h1 className="text-md md:text-xl font-semibold">
                    Search Result ({allJobs.length})
                </h1>
            </div>

            <div className="w-full px-4 md:px-10 py-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {allJobs.map((job) => (
                        <Job key={job._id} job={job} />
                    ))}
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Browse
