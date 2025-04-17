import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import RoleRoute from './RoleRoute';
import Layout from '../components/layout/Layout';
import LoadingScreen from '../components/common/LoadingScreen';

// Lazy loaded components
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const Profile = lazy(() => import('../pages/auth/Profile'));
const Resumes = lazy(() => import('../pages/resumes/Resumes'));
const ResumeDetail = lazy(() => import('../pages/resumes/ResumeDetail'));
const ResumeUpload = lazy(() => import('../pages/resumes/ResumeUpload'));
const ResumeAnalysis = lazy(() => import('../pages/resumes/ResumeAnalysis'));
const Jobs = lazy(() => import('../pages/jobs/Jobs'));
const JobDetail = lazy(() => import('../pages/jobs/JobDetail'));
const JobCreate = lazy(() => import('../pages/jobs/JobCreate'));
const JobApplications = lazy(() => import('../pages/jobs/JobApplications'));
const MyApplications = lazy(() => import('../pages/jobs/MyApplications'));
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const RecruiterDashboard = lazy(() => import('../pages/dashboard/RecruiterDashboard'));
const AdminDashboard = lazy(() => import('../pages/dashboard/AdminDashboard'));
const NotFound = lazy(() => import('../pages/NotFound'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public routes */}
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          
          {/* Protected routes for all authenticated users */}
          <Route element={<PrivateRoute />}>
            <Route path="profile" element={<Profile />} />
            <Route path="dashboard" element={<Dashboard />} />
            
            {/* Job seeker specific routes */}
            <Route path="resumes" element={<Resumes />} />
            <Route path="resumes/upload" element={<ResumeUpload />} />
            <Route path="resumes/:id" element={<ResumeDetail />} />
            <Route path="resumes/:id/analysis" element={<ResumeAnalysis />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="jobs/:id" element={<JobDetail />} />
            <Route path="applications" element={<MyApplications />} />
            
            {/* Recruiter specific routes */}
            <Route element={<RoleRoute allowedRoles={['recruiter', 'admin']} />}>
              <Route path="recruiter/dashboard" element={<RecruiterDashboard />} />
              <Route path="jobs/create" element={<JobCreate />} />
              <Route path="jobs/:id/edit" element={<JobCreate />} />
              <Route path="jobs/:id/applications" element={<JobApplications />} />
            </Route>
            
            {/* Admin specific routes */}
            <Route element={<RoleRoute allowedRoles={['admin']} />}>
              <Route path="admin/dashboard" element={<AdminDashboard />} />
            </Route>
          </Route>
          
          {/* Fallback routes */}
          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;