import React from 'react';

function JobCard({ job, setJobs, token }) {
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleDelete = async () => {
    if (window.confirm('Delete this job?')) {
      try {
        const res = await fetch(`${API_URL}/api/jobs/${job._id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) setJobs((prev) => prev.filter((j) => j._id !== job._id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="job-card">
      <h3>{job.companyName}</h3>
      <p>{job.jobTitle}</p>
      <p>{new Date(job.applicationDate).toLocaleDateString()}</p>
      <p>
        Status:{' '}
        <span className={`status-badge ${job.status.toLowerCase()}`}>
          {job.status}
        </span>
      </p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default JobCard;
