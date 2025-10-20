import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddJobModal from '../components/AddJobModal';
import EditJobModal from '../components/EditJobModal';
import ViewJobModal from '../components/ViewJobModal';

function Home() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editJob, setEditJob] = useState(null);
  const [viewJob, setViewJob] = useState(null);

  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('userName');

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    if (!token) navigate('/login');
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, navigate]);

  const fetchJobs = async () => {
    try {
      const res = await fetch(`${API_URL}/api/jobs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.jobs) setJobs(data.jobs);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    window.location.href = '/login';
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    try {
      const res = await fetch(`${API_URL}/api/jobs/${jobId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setJobs(jobs.filter(job => job._id !== jobId));
      else alert('Failed to delete job');
    } catch (err) {
      console.error(err);
      alert('Server error while deleting job');
    }
  };

  const filteredJobs = filter === 'All' ? jobs : jobs.filter(job => job.status === filter);

  return (
    <div className="home-container">
      <header>
        <h2>Welcome, {userName}</h2>
        <button onClick={handleLogout}>Logout</button>
      </header>

      <div style={{ margin: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <label>Status Filter: </label>
          <select value={filter} onChange={e => setFilter(e.target.value)}>
            <option>All</option>
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
        </div>
       <button className="btn-primary" onClick={() => setShowAddModal(true)}>
  Add Job
</button>

      </div>

      <div className="jobs-list">
        {filteredJobs.length === 0 && <p>No jobs found.</p>}
        {filteredJobs.map(job => (
          <div key={job._id} className="job-card">
            <h3>{job.companyName}</h3>
            <p>Job Title: {job.jobTitle}</p>
            <p>Date: {new Date(job.applicationDate).toLocaleDateString()}</p>
            <span className={`status-badge ${job.status.toLowerCase()}`}>{job.status}</span>

            <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap' }}>
              <button onClick={() => setEditJob(job)}>Edit</button>
              <button style={{ marginLeft: '5px' }} onClick={() => handleDelete(job._id)}>Delete</button>
              <button style={{ marginLeft: '5px' }} onClick={() => setViewJob(job)}>View</button>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && <AddJobModal closeModal={() => setShowAddModal(false)} refreshJobs={fetchJobs} token={token} />}
      {editJob && <EditJobModal job={editJob} closeModal={() => setEditJob(null)} refreshJobs={fetchJobs} token={token} />}
      {viewJob && <ViewJobModal job={viewJob} closeModal={() => setViewJob(null)} />}
    </div>
  );
}

export default Home;
