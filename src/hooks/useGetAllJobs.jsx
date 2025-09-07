import { setAllJobs } from "@/redux/jobSlice.js";
import { ALL_JOB_API_POINT } from "@/utils/apiPoint";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchQuery } = useSelector(store => store.jobs)

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${ALL_JOB_API_POINT}/get?keyword=${searchQuery}`, {
                    withCredentials: true,
                });
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchAllJobs();
    }, [dispatch]);
};

export default useGetAllJobs;
