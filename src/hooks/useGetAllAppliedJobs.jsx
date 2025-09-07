import {  setAppliedJobs } from '@/redux/jobSlice'
import { APPLICATION_JOB_API_POINT } from '@/utils/apiPoint'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

const useGetAllAppliedJobs = () => {

    const dispatch = useDispatch()
    return (
        useEffect(() => {
            const fetchAppliedJobs = async () => {
                try {
                    const res = await axios.get(`${APPLICATION_JOB_API_POINT}/get`, { withCredentials: true })
                    console.log(res.data);

                    if (res.data.success) {
                        dispatch(setAppliedJobs(res.data.application))
                    }
                } catch (error) {
                    console.log(error);
                    toast.error(error.response.data.message)
                }
            }
            fetchAppliedJobs()
        }, [dispatch])
    )
}

export default useGetAllAppliedJobs