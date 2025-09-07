import { Link } from "react-router-dom"
import Job from "./Job"   // 

const FeaturedJobs = ({ jobs }) => {
  return (
    <section className="md:py-16 py-6 pt-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-semibold mb-8 text-center">Featured Jobs</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <Job key={job._id} job={job} />
            ))
          ) : (
            <p className="text-center col-span-4">No jobs available</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default FeaturedJobs
