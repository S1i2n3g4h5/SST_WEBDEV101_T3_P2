import React from 'react';
import { useApplications } from '../context/ApplicationContext';
import SummaryCards from '../components/SummaryCards/SummaryCards';
import JobCard from '../components/JobCard/JobCard';
import { Link } from 'react-router-dom';
import { ChevronRight, Plus } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const { applications, loading } = useApplications();
  console.log("Dashboard Render - Loading:", loading, "Apps count:", applications.length);

  const recentApps = (applications || []).slice(0, 4);

  if (loading) return <div className="loading">Checking for updates...</div>;

  return (
    <div className="dashboard-page">
      <header className="page-header">
        <div>
          <h1 className="page-title">Welcome Back! 👋</h1>
          <p className="page-subtitle">Here's what's happening with your job search today.</p>
        </div>
        <Link to="/applications/new" className="primary-btn">
          <Plus size={20} />
          <span>New Application</span>
        </Link>
      </header>

      <SummaryCards applications={applications} />

      <section className="recent-section">
        <div className="section-header">
          <h2 className="section-title">Recent Applications</h2>
          <Link to="/applications" className="text-btn">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        
        {recentApps.length > 0 ? (
          <div className="job-grid">
            {recentApps.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="empty-state glass">
            <h3>No applications yet</h3>
            <p>Start your journey by adding your first job application!</p>
            <Link to="/applications/new" className="primary-btn">Add Now</Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
