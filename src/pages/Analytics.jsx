import React, { useMemo } from 'react';
import { useApplications } from '../context/ApplicationContext';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { getStatusStats } from '../utils/helpers';
import './Analytics.css';

const Analytics = () => {
  const { applications, loading } = useApplications();
  
  const stats = useMemo(() => getStatusStats(applications), [applications]);

  const pieData = [
    { name: 'Applied', value: stats.applied, color: '#6366f1' },
    { name: 'Interviewing', value: stats.interviewing, color: '#f59e0b' },
    { name: 'Offers', value: stats.offers, color: '#10b981' },
    { name: 'Rejected', value: stats.rejected, color: '#ef4444' },
  ].filter(d => d.value > 0);

  const platformData = useMemo(() => {
    const counts = {};
    applications.forEach(app => {
      counts[app.platform] = (counts[app.platform] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [applications]);

  if (loading) return <div className="loading">Loading analytics...</div>;

  return (
    <div className="analytics-page">
      <header className="page-header">
        <div>
          <h1 className="page-title">Analytics Dashboard</h1>
          <p className="page-subtitle">Visual overview of your application pipeline and performance.</p>
        </div>
      </header>

      <div className="charts-grid">
        <div className="chart-container glass">
          <h3 className="chart-title">Application Status</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--text)' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-container glass">
          <h3 className="chart-title">Applications by Platform</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={platformData}>
                <XAxis dataKey="name" stroke="var(--text-muted)" />
                <YAxis stroke="var(--text-muted)" />
                <Tooltip 
                  cursor={{ fill: 'var(--surface-hover)' }}
                  contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--text)' }}
                />
                <Bar dataKey="value" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="stats-detail-grid">
        <div className="stat-detail-card glass">
          <h4>Success Rate</h4>
          <p className="highlight">
            {stats.total > 0 ? ((stats.offers / stats.total) * 100).toFixed(1) : 0}%
          </p>
          <span>Offer to Application ratio</span>
        </div>
        <div className="stat-detail-card glass">
          <h4>Interview Rate</h4>
          <p className="highlight">
            {stats.total > 0 ? ((stats.interviewing / stats.total) * 100).toFixed(1) : 0}%
          </p>
          <span>Interview to Application ratio</span>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
