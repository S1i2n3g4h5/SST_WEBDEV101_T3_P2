import React from 'react';
import { Search, Filter, SortAsc } from 'lucide-react';
import './SearchFilter.css';

const SearchFilter = ({ searchTerm, setSearchTerm, filterStatus, setFilterStatus, sortBy, setSortBy }) => {
  return (
    <div className="search-filter-container glass">
      <div className="search-box">
        <Search size={20} className="search-icon" />
        <input 
          type="text" 
          placeholder="Search by company or role..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="controls">
        <div className="filter-group">
          <Filter size={18} />
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="select-input"
          >
            <option value="all">All Status</option>
            <option value="applied">Applied</option>
            <option value="interviewing">Interviewing</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="filter-group">
          <SortAsc size={18} />
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="select-input"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="salary-high">Salary: High to Low</option>
            <option value="salary-low">Salary: Low to High</option>
            <option value="company">Company Name</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
