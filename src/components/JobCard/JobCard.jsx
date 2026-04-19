import { Calendar, MapPin, DollarSign, ExternalLink, Bookmark, Edit2, Trash2, Clock } from 'lucide-react';
import { useApplications } from '../../context/ApplicationContext';
import { Link } from 'react-router-dom';
import './JobCard.css';

const JobCard = ({ job }) => {
  const { deleteApplication, toggleBookmark } = useApplications();

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'applied': return 'var(--primary)';
      case 'interviewing': return 'var(--warning)';
      case 'offer': return 'var(--success)';
      case 'rejected': return 'var(--danger)';
      default: return 'var(--text-muted)';
    }
  };

  const domain = job.company?.toLowerCase().replace(/\s+/g, '') + '.com';
  const logoUrl = `https://logo.clearbit.com/${domain}`;

  return (
    <div className="job-card glass">
      <div className="job-card-header">
        <div className="company-info">
          <img 
            src={logoUrl} 
            alt={job.company} 
            className="company-logo"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=' + job.company?.charAt(0) }}
          />
          <div>
            <h3 className="job-role">{job.role}</h3>
            <p className="company-name">{job.company}</p>
          </div>
        </div>
        <button 
          className={`bookmark-btn ${job.bookmarked ? 'active' : ''}`}
          onClick={() => toggleBookmark(job.id, job.bookmarked)}
        >
          <Bookmark size={20} fill={job.bookmarked ? 'var(--secondary)' : 'none'} color={job.bookmarked ? 'var(--secondary)' : 'currentColor'} />
        </button>
      </div>

      <div className="job-card-body">
        <div className="detail-item">
          <MapPin size={16} />
          <span>{job.location}</span>
        </div>
        <div className="detail-item">
          <DollarSign size={16} />
          <span>{job.salary}</span>
        </div>
        <div className="detail-item">
          <Clock size={16} />
          <span>Applied: {new Date(job.appliedDate).toLocaleDateString()}</span>
        </div>
        {job.interviewDate && (
          <div className="detail-item highlight">
            <Calendar size={16} />
            <span>Interview: {new Date(job.interviewDate).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      <div className="job-card-footer">
        <div className="status-badge" style={{ backgroundColor: getStatusColor(job.status) + '20', color: getStatusColor(job.status) }}>
          <span className="dot" style={{ backgroundColor: getStatusColor(job.status) }}></span>
          {job.status}
        </div>
        <div className="actions">
          <Link to={`/applications/edit/${job.id}`} className="icon-btn edit">
            <Edit2 size={16} />
          </Link>
          <button 
            className="icon-btn delete" 
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this application?')) {
                deleteApplication(job.id);
              }
            }}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
