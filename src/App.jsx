import { Routes, Route } from "react-router-dom";
import './App.css';

import CandidateModule from "./Candidate/CandidateModule";
import Loginsec from "./Candidate/Pages/login/Loginsec";
import Register from "./Candidate/Pages/register/Register";
import HeroSection from "./Candidate/Pages/Home/Subsection/HeroSection";
import Home from "./Candidate/Pages/Home/Home";

import Profile from "./Candidate/Pages/profile/Profile";
import Preferences from "./Candidate/Pages/profile/Preferences";
import Culture from "./Candidate/Pages/profile/Culture";
import Resume from "./Candidate/Pages/profile/Resume";

import Dashboard from "./Candidate/Pages/Dashboard/Dashboard";
import DashboardHome from "./Candidate/Pages/Dashboard/Homes";
import Jobs from "./Candidate/Pages/Dashboard/Job";
import Applied from "./Candidate/Pages/Dashboard/Applied";
import Messages from "./Candidate/Pages/Dashboard/Messages";
import Discover from "./Candidate/Pages/Dashboard/Discover";
import Demand from "./Candidate/Pages/Dashboard/Demand";

import DashboardGuard from "./Candidate/Pages/DashboardGuard/DashboardGuard";
import ProtectedRoutes from "./Candidate/components/ProtectedRoutes";

import RecruiterLogin from "./Recruiter/Pager/Logins/RecruiterLogin";
import RecruiterRegister from "./Recruiter/Pager/Registration/RecruiterRegister";
import MyJobs from "./Recruiter/Pager/RecruiterDashboard/MyJobs";
import Applicants from "./Recruiter/Pager/RecruiterDashboard/Applicants";
import ReDashboardHome from "./Recruiter/Pager/RecruiterDashboard/ReDashboardHome";
import RecruiterDashboard from "./Recruiter/Pager/RecruiterDashboard/RecruiterDashboard";
import CreateJob from "./Recruiter/Pager/RecruiterDashboard/CreateJob";
import CompanyProfile from "./Recruiter/Pager/RecruiterDashboard/CompanyProfile";
import UserOnboarding from "./Candidate/Pages/Dashboard/UserOnboarding";
import NotificationPanel from "./Candidate/Pages/Dashboard/Messages";
import RecruiterNotifications from "./Recruiter/Pager/RecruiterDashboard/RecruiterNotifications";

function App() {
  return (
    <Routes>

      {/* ================= Candidate Public ================= */}
      <Route path="/" element={<CandidateModule />}>
        <Route index element={<><HeroSection /><Home /></>} />
        <Route path="login" element={<Loginsec />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* ================= Candidate Profile ================= */}
      <Route path="profile" element={<Profile />} />
      <Route path="preferences" element={<Preferences />} />
      <Route path="culture" element={<Culture />} />
      <Route path="resume" element={<Resume />} />

      {/* ================= Candidate Dashboard ================= */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoutes>
            <DashboardGuard>
              <Dashboard />
            </DashboardGuard>
          </ProtectedRoutes>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="jobs" element={<Jobs />} />



        <Route path="applied" element={<Applied />} />
        <Route path="onprofile" element={<UserOnboarding/>} />
        <Route path="messages" element={<NotificationPanel/>} />
        <Route path="discover" element={<Discover />} />
        <Route path="demand" element={<Demand />} />

      </Route>

      {/* ================= Recruiter Auth ================= */}
      <Route path="/recruiter/login" element={<RecruiterLogin />} />
      <Route path="/recruiter/register" element={<RecruiterRegister />} />

      {/* ================= Recruiter Module ================= */}




     {/* ================= Recruiter Module ================= */}

<Route
  path="/recruiter/RecruiterDashboard"
  element={<RecruiterDashboard />}
>
  <Route index element={<ReDashboardHome />} />

  <Route path="jobs" element={<MyJobs />} />

  {/* 👇 JOB WISE APPLICANTS (CORRECT) */}
 <Route path="applicants/:jobId" element={<Applicants />} />

  <Route path="create-job" element={<CreateJob />} />
  <Route path="Companyprofile" element={<CompanyProfile />} />
    <Route path="recruiterNotifications" element={<RecruiterNotifications />} />

</Route>



    </Routes>
  );
}

export default App;
