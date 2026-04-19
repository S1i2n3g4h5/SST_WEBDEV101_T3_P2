import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useApplications } from '../context/ApplicationContext';
import { ArrowLeft, Save } from 'lucide-react';
import './JobForm.css';

const schema = yup.object().shape({
  company: yup.string().required('Company name is required'),
  role: yup.string().required('Job role is required'),
  location: yup.string().required('Location is required'),
  salary: yup.number().typeError('Salary must be a number').required('Salary is required'),
  platform: yup.string().required('Platform is required'),
  status: yup.string().required('Status is required'),
  appliedDate: yup.string().required('Applied date is required'),
  interviewDate: yup.string().nullable(),
  notes: yup.string(),
});

const JobForm = () => {
  const { addApplication, updateApplication, applications } = useApplications();
  const { id } = useParams();
  const navigate = useNavigate();
  
  const isEdit = Boolean(id);
  const existingJob = isEdit ? applications.find(app => app.id === id) : null;

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: existingJob || {
      status: 'Applied',
      platform: 'LinkedIn',
      appliedDate: new Date().toISOString().split('T')[0]
    }
  });

  const onSubmit = async (data) => {
    if (isEdit) {
      await updateApplication(id, data);
    } else {
      await addApplication(data);
    }
    navigate('/applications');
  };

  return (
    <div className="job-form-page">
      <div className="form-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h1 className="page-title">{isEdit ? 'Edit Application' : 'Add New Application'}</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="job-form glass">
        <div className="form-grid">
          <div className="form-group">
            <label>Company Name</label>
            <input {...register('company')} placeholder="e.g. Google" className={errors.company ? 'error' : ''} />
            {errors.company && <span className="error-msg">{errors.company.message}</span>}
          </div>

          <div className="form-group">
            <label>Job Role</label>
            <input {...register('role')} placeholder="e.g. Frontend Developer" className={errors.role ? 'error' : ''} />
            {errors.role && <span className="error-msg">{errors.role.message}</span>}
          </div>

          <div className="form-group">
            <label>Location</label>
            <input {...register('location')} placeholder="e.g. Remote / New York" className={errors.location ? 'error' : ''} />
            {errors.location && <span className="error-msg">{errors.location.message}</span>}
          </div>

          <div className="form-group">
            <label>Salary Range</label>
            <input type="number" {...register('salary')} placeholder="e.g. 120000" className={errors.salary ? 'error' : ''} />
            {errors.salary && <span className="error-msg">{errors.salary.message}</span>}
          </div>

          <div className="form-group">
            <label>Platform</label>
            <select {...register('platform')}>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Indeed">Indeed</option>
              <option value="Company Website">Company Website</option>
              <option value="Referral">Referral</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select {...register('status')}>
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="form-group">
            <label>Applied Date</label>
            <input type="date" {...register('appliedDate')} className={errors.appliedDate ? 'error' : ''} />
            {errors.appliedDate && <span className="error-msg">{errors.appliedDate.message}</span>}
          </div>

          <div className="form-group">
            <label>Interview Date (Optional)</label>
            <input type="date" {...register('interviewDate')} />
          </div>
        </div>

        <div className="form-group full">
          <label>Notes</label>
          <textarea {...register('notes')} placeholder="Add any additional details or requirements..." rows="4"></textarea>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate(-1)} className="secondary-btn">Cancel</button>
          <button type="submit" className="primary-btn">
            <Save size={20} />
            <span>{isEdit ? 'Update Application' : 'Save Application'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
