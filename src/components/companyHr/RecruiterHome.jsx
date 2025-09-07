import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/button"
import { Briefcase, Users, ClipboardList, PlusCircle } from "lucide-react"
import Navbar from "../shared/Navbar"
import { FaBuildingColumns } from "react-icons/fa6";
import { motion } from "motion/react"


const RecruiterHome = () => {
  const { user } = useSelector((state) => state.auth)

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ x: "100%" }}
        
        animate={{ x: "0" }}
         className="min-h-screen bg-gray-50 p-4 md:p-10">
        {/* Welcome Section */}
        <div className="text-center mb-8 mt-3">
          <h1 className="text-xl md:text-4xl font-bold text-gray-800">
            Welcome back, {user?.fullname || "Recruiter"} 👋
          </h1>
          <p className="text-gray-600 mt-2 px-9 md:px-0 md:pr-3 text-xs md:text-sm">
            Manage jobs, review applicants, and grow your company with ease.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-[90%] md:w-[80%] mx-auto">
          {/* Post New Job */}
          <Card className="hover:shadow-lg transition">
            <CardContent className="flex flex-col items-center text-center space-y-4">
              <PlusCircle className="text-sky-600 w-10 h-10" />
              <h2 className="text-lg md:text-xl font-semibold">Post New Job</h2>
              <p className="text-gray-500 text-sm">
                Create and publish new job listings to attract candidates.
              </p>
              <Link to="/admin/newjob">
                <Button className="bg-sky-600 hover:bg-sky-700  text-white font-medium cursor-pointer">Post Job</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Manage Jobs */}
          <Card className="hover:shadow-lg transition">
            <CardContent className="flex flex-col items-center text-center space-y-4">
              <Briefcase className="text-green-600 w-10 h-10" />
              <h2 className="text-lg md:text-xl font-semibold">Manage Jobs</h2>
              <p className="text-gray-500 text-sm">
                Edit, update, or close your active job postings.
              </p>
              <Link to="/admin/jobs">
                <Button className="bg-green-600 hover:bg-green-700 text-white font-medium cursor-pointer">
                  View Jobs
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition sm:col-span-2 lg:col-span-1">
            <CardContent className="flex flex-col items-center text-center space-y-4">
             <PlusCircle className="text-pink-500 w-10 h-10" />
              <h2 className="text-lg md:text-xl font-semibold">Register New Company</h2>
              <p className="text-gray-500 text-sm">
                Analyze hiring performance and recruitment trends.
              </p>
              <Link to="/registerCompany">
                <Button className="bg-pink-500 hover:bg-pink-700 text-white font-medium cursor-pointer">
                  Register Company
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* View Applicants */}
          <Card className="hover:shadow-lg transition">
            <CardContent className="flex flex-col items-center text-center space-y-4">
              <FaBuildingColumns  className="text-purple-600 w-10 h-10" />
              <h2 className="text-lg md:text-xl font-semibold">Manage Companies</h2>
              <p className="text-gray-500 text-sm">
                Check applications and manage the hiring process.
              </p>
              <Link to="/admin/companies">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white font-medium cursor-pointer">
                  View Comapanies
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* jon create Section */}

        </div>
      </motion.div>
    </>

  )
}

export default RecruiterHome
