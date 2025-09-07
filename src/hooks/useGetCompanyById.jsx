import { setSingleCompany } from "@/redux/companySlice";
import { setAllJobs } from "@/redux/jobSlice.js";
import { ALL_JOB_API_POINT, COMPANY_API_POINT } from "@/utils/apiPoint";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_POINT}/getCompany/${companyId}`, {
                    withCredentials: true,
                });
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchSingleCompany();
    }, [dispatch, companyId]);
};

export default useGetCompanyById;
