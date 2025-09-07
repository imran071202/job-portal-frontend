import React, { useState } from "react"

const Filter = ({ onFilterChange }) => {
  const [search, setSearch] = useState("")
  const [jobType, setJobType] = useState("")
  const [experience, setExperience] = useState("")

  const handleFilter = () => {
    onFilterChange({ search, jobType, experience })
  }

  return (
    <div className="w-full md:w-[95%] mx-auto my-2 bg-slate-100 shadow-md rounded-md p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

      {/* 🔍 Search */}
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-600"
        />
      </div>

      {/* 🕒 Job Type */}
      {/* Job Type */}
      <select
        value={jobType}
        onChange={(e) => setJobType(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-600"
      >
        <option value="">All Job Types</option>
        <option value="Fulltime">Fulltime</option>
        <option value="Parttime">Parttime</option>
        <option value="Internship">Internship</option>
        <option value="Remote">Remote</option>
      </select>

      {/* Experience */}
      <select
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-600"
      >
        <option value="">All Experience Levels</option>
        <option value="Fresher">Fresher</option>
        <option value="1-2 years">1–2 years</option>
        <option value="3-5 years">3–5 years</option>
        <option value="5+ years">5+ years</option>
      </select>

      {/* 🔎 Apply Button */}
      <button
        onClick={handleFilter}
        className="bg-sky-700 text-white cursor-pointer px-5 py-2 rounded-md font-semibold text-sm hover:bg-sky-900"
      >
        Search
      </button>
    </div>
  )
}

export default Filter
