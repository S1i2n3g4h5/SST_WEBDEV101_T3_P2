import React, { useState, useMemo } from 'react';
import { useApplications } from '../context/ApplicationContext';
import SearchFilter from '../components/SearchFilter/SearchFilter';
import JobCard from '../components/JobCard/JobCard';
import useDebounce from '../hooks/useDebounce';
import './Applications.css';

const Applications = () => {
  const { applications, loading } = useApplications();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [activeTab, setActiveTab ] = useState('All');

  const debouncedSearch = useDebounce(searchTerm, 500);
  console.log("Applications.jsx: Raw apps count:", applications.length, "Loading:", loading);

  const tabs = ['All', 'Applied', 'Interviewing', 'Offer', 'Rejected', 'Bookmarked'];

  const filteredApplications = useMemo(() => {
    let result = [...applications];

    // Tab filter
    if (activeTab === 'Bookmarked') {
      result = result.filter(app => app.bookmarked);
    } else if (activeTab !== 'All') {
      result = result.filter(app => app.status?.toLowerCase() === activeTab.toLowerCase());
    }

    // Search filter
    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase();
      result = result.filter(
        app => 
          app.company?.toLowerCase().includes(query) || 
          app.role?.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (filterStatus !== 'all') {
      result = result.filter(app => app.status?.toLowerCase() === filterStatus);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.appliedDate) - new Date(a.appliedDate);
      if (sortBy === 'oldest') return new Date(a.appliedDate) - new Date(b.appliedDate);
      if (sortBy === 'salary-high') return b.salary - a.salary;
      if (sortBy === 'salary-low') return a.salary - b.salary;
      if (sortBy === 'company') return a.company?.localeCompare(b.company);
      return 0;
    });

    console.log("Applications.jsx: Filtered count:", result.length, "ActiveTab:", activeTab, "Term:", debouncedSearch);
    return result;
  }, [applications, debouncedSearch, filterStatus, sortBy, activeTab]);

  if (loading) return <div className="loading">Loading applications...</div>;

  return (
    <div className="applications-page">
      <header className="page-header">
        <div>
          <h1 className="page-title">My Applications</h1>
          <p className="page-subtitle">Track and manage all your job leads in one place.</p>
        </div>
      </header>

      <div className="tabs-container">
        {tabs.map(tab => (
          <button 
            key={tab} 
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <SearchFilter 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div className="results-info">
        <span>Showing {filteredApplications.length} applications</span>
      </div>

      <div className="job-grid">
        {filteredApplications.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {filteredApplications.length === 0 && (
        <div className="empty-state glass">
          <h3>No applications found</h3>
          <p>Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default Applications;
