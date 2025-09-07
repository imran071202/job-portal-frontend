import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/apiPoint"; // adjust path if needed
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";

const AfterLoginHome = () => {
  

  // useEffect(() => {
  //   const fetchLatestJobs = async () => {
  //     try {
  //       const res = await axios.get("/", {
  //         withCredentials: true,
  //       });
  //       // setJobs(res.data.job || []);
  //     } catch (error) {
  //       console.error("Error fetching jobs:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchLatestJobs();
  // }, []);

  return (
   <div className=""></div>
  
  );
};

export default AfterLoginHome;
