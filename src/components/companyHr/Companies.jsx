import React, { useState } from "react";
import Navbar from "../shared/Navbar";

export default function Companiesr() {
    const [formData, setFormData] = useState({
        name: "",
        website: "",
        location: "",
        description: "",
        logo: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "logo") {
            setFormData({ ...formData, logo: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Company Registered:", formData);
        // You can call API here with formData
    };

    return (
        <>
        <Navbar/>
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
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
                            value={formData.name}
                            onChange={handleChange}
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
                            type="url"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
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
                            value={formData.location}
                            onChange={handleChange}
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
                            value={formData.description}
                            onChange={handleChange}
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
                            name="logo"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full border rounded-xl p-2 bg-gray-50"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-sky-700 hover:bg-sky-800 cursor-pointer  text-white font-semibold py-3 rounded-xl shadow-md transition"
                    >
                        Register Company
                    </button>
                </form>
            </div>
        </div>
        </>
    );
}
