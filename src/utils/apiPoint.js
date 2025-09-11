// export const USER_API_END_POINT= "http://localhost:8000/api/v1/user"

// export const ALL_JOB_API_POINT="http://localhost:8000/api/v1/job"

// export const APPLICATION_JOB_API_POINT="http://localhost:8000/api/v1/application"

// export const COMPANY_API_POINT="http://localhost:8000/api/v1/company"



const API_BASE_URL = import.meta.env.VITE_API_URL;
// Your .env file: VITE_API_URL=https://job-portal-backend-78er.onrender.com

export const USER_API_END_POINT = `${API_BASE_URL}/api/v1/user`;
export const ALL_JOB_API_POINT = `${API_BASE_URL}/api/v1/job`;
export const APPLICATION_JOB_API_POINT = `${API_BASE_URL}/api/v1/application`;
export const COMPANY_API_POINT = `${API_BASE_URL}/api/v1/company`;
