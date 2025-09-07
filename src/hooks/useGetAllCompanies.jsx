import { setCompanies } from "@/redux/companySlice";
import { COMPANY_API_POINT } from "@/utils/apiPoint";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllCompanies = (companyId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_POINT}/getCompany`, {
                    withCredentials: true,
                });
                if (res.data.success) {
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchAllCompany();
    }, []);
};

export default useGetAllCompanies;
