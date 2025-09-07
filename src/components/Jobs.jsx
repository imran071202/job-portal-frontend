import React, { useState, useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import Filter from './Filter'
import { useSelector } from 'react-redux'

const Jobs = () => {
    const { allJobs } = useSelector(store => store.jobs)
    const [filteredJobs, setFilteredJobs] = useState(allJobs)

    const handleFilterChange = ({ search, jobType, experience }) => {
        let jobs = [...allJobs]

        // 🔍 Search (only if user typed something)
        if (search && search.trim() !== "") {
            jobs = jobs.filter(job =>
                job.title.toLowerCase().includes(search.toLowerCase()) ||
                job.description.toLowerCase().includes(search.toLowerCase()) ||
                job.company?.name.toLowerCase().includes(search.toLowerCase()) ||
                job.location?.toLowerCase().includes(search.toLowerCase())

            )
        }
        // 🕒 Job type filter
        if (jobType) {
            jobs = jobs.filter(job => job.jobType === jobType)
        }

        // 🎓 Experience filter
        if (experience) {
            jobs = jobs.filter(job => job.exprience === experience)
        }


        setFilteredJobs(jobs)
    }

    // keep filteredJobs updated if allJobs changes
    useEffect(() => {
        setFilteredJobs(allJobs)
    }, [allJobs])

    return (
        <>
            <Navbar />
            <Filter onFilterChange={handleFilterChange} />

            <div className="w-full px-4 md:px-10 py-6">
                {filteredJobs.length <= 0 ? (
                    <span className="text-gray-500">No jobs found</span>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredJobs.map((job) => (
                            <Job key={job?._id} job={job} />
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default Jobs
