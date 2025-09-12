import React from "react"
import { Link } from "react-router-dom"
import {
    FaFacebook,
    FaTwitter,
    FaLinkedin,
    FaInstagram,
} from "react-icons/fa"
import logo from "../../assets/image/skill-bridge.png"

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-10 mt-15 shadow-lg">
            <div className="max-w-7xl mx-auto px-20  md:pr-30 grid-cols-1 md:grid-cols-4 gap-8 flex flex-col text-center md:text-left md:flex-row justify-between">
                {/* Logo + About */}
                <div className="flex flex-col justify-center items-center ">
                    <Link to="/" className="flex items-center gap-4">
                        <img src={logo} alt="Logo" className="h-12 w-auto" />
                        <span className="text-xl font-bold text-white">Skill Bridge</span>
                    </Link>
                    <p className="mt-4 text-xs leading-relaxed">
                        Connecting students, professionals, and recruiters with the right <br />
                        opportunities. Grow your career or hire top talent with ease.
                    </p>
                </div>

                {/* Quick Links */}
                {/* <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link to="/" className="hover:text-sky-400">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/jobs" className="hover:text-sky-400">
                                Jobs
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="hover:text-sky-400">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:text-sky-400">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div> */}

                {/* Recruiter Section */}
                {/* <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                        For Recruiters
                    </h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link to="/admin/jobs" className="hover:text-sky-400">
                                Post a Job
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/companies" className="hover:text-sky-400">
                                Manage Jobs
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/applicants" className="hover:text-sky-400">
                                View Applicants
                            </Link>
                        </li>
                    </ul>
                </div> */}

                {/* Social Media */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4 mx-auto">Follow Us</h3>
                    <div className="flex gap-4 text-xl justify-center items-center">
                        <a href="#" className="hover:text-sky-400">
                            <FaFacebook />
                        </a>
                        <a href="#" className="hover:text-sky-400">
                            <FaTwitter />
                        </a>
                        <a href="#" className="hover:text-sky-400">
                            <FaLinkedin />
                        </a>
                        <a href="#" className="hover:text-sky-400">
                            <FaInstagram />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
                © {new Date().getFullYear()} Skill Bridge. All Rights Reserved.
            </div>
        </footer>
    )
}

export default Footer
