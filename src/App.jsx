import { useState } from 'react'
import Navbar from './components/shared/Navbar'


import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/auth/Login'
import SignUp from './components/auth/SignUp'
import Jobs from './components/Jobs'
import Browes from './components/Browes'
import Profile from './components/Profile'
import Detailsjob from './components/Detailsjob'
import Companies from './components/companyHr/Companies'
import CompanyHomePage from "./components/companyHr/CompanyHomePage";
import Companyregister from './components/companyHr/Companyregister'
import CompanySetUpr from './components/companyHr/CompanySetUp'
import JobsAdminPage from './components/companyHr/JobsAdminPage'
import CompanyNewJob from './components/companyHr/CompanyNewJobRegister'
import CompanyJobApplications from './components/companyHr/CompanyJobApplications'
import RecruiterHome from './components/companyHr/RecruiterHome'
import Footer from './components/shared/Footer'


const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
    
  },
  {
    path:'/signup',
    element:<SignUp/>
  },
  {
    path:'/jobs',
    element:<Jobs/>
  },
  {
    path:'/details/:id',
    element:<Detailsjob/>
  },
  {
    path:'/browes',
    element:<Browes/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },
  
  {
    path:'/admin/recruter',
    element:<RecruiterHome/>
  },
  {
    path:'/admin/companies',
    element:<CompanyHomePage/>
  },
   {
    path:'/registerCompany',
    element:<Companyregister/>
  },
  {
    path:'/companies',
    element:<Companies/>
  },
  {
    path:'/admin/companies/:id',
    element:<CompanySetUpr/>
  },
  {
    path:'/admin/jobs',
    element:<JobsAdminPage/>
  },
  {
    path:'/admin/newjob',
    element:<CompanyNewJob/>
  },
  {
    path:'/admin/jobs/:id/applicants',
    element:<CompanyJobApplications/>
  },
])

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
     <RouterProvider router={appRouter}/>
    
     
    </>
  )
}

export default App
