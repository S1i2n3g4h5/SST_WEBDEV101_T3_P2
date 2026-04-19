import React from 'react';
import { Briefcase, Calendar, CheckCircle2, XCircle } from 'lucide-react';
import { getStatusStats } from '../../utils/helpers';
import './SummaryCards.css';

const SummaryCards = ({ applications }) => {
  const stats = getStatusStats(applications);

  const cardData = [
    { title: 'Total Apps', value: stats.total, icon: <Briefcase />, color: 'var(--primary)' },
    { title: 'Interviews', value: stats.interviewing, icon: <Calendar />, color: 'var(--warning)' },
    { title: 'Offers', value: stats.offers, icon: <CheckCircle2 />, color: 'var(--success)' },
    { title: 'Rejected', value: stats.rejected, icon: <XCircle />, color: 'var(--danger)' },
  ];

  return (
    <div className="summary-grid">
      {cardData.map((card, index) => (
        <div key={index} className="summary-card glass">
          <div className="card-icon" style={{ backgroundColor: card.color + '20', color: card.color }}>
            {card.icon}
          </div>
          <div className="card-info">
            <p className="card-title">{card.title}</p>
            <h2 className="card-value">{card.value}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
