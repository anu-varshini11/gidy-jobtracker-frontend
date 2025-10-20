import React, { useState } from 'react';

function AddJobModal({ closeModal, refreshJobs, token }) {
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [applicationDate, setApplicationDate] = useState('');
  const [status, setStatus] = useState('Applied');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!companyName.trim() || companyName.trim().length < 3) {
      setError('Company name must be at least 3 characters.');
      return;
    }

    if (!jobTitle.trim()) {
      setError('Job title is required.');
      return;
    }

    if (!applicationDate) {
      setError('Application date is required.');
      return;
    }

    const today = new Date();
    const inputDate = new Date(applicationDate);
    if (inputDate > today) {
      setError('Application date cannot be in the future.');
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/jobs`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ companyName, jobTitle, applicationDate, status }),
});

      const data = await res.json();

      if (res.ok) {
        refreshJobs();
        closeModal();
      } else {
        setError(data.message || 'Error adding job');
      }
    } catch (err) {
      console.error(err);
      setError('Server error');
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Add New Job</h3>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <small style={{ color: '#666' }}>Minimum 3 characters</small>
          </div>

          <div>
            <input
              type="text"
              placeholder="Job Title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
            <small style={{ color: '#666' }}>Required</small>
          </div>

          <div>
            <input
              type="date"
              value={applicationDate}
              onChange={(e) => setApplicationDate(e.target.value)}
            />
            <small style={{ color: '#666' }}>Cannot be a future date</small>
          </div>

          <div>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button type="submit">Add</button>
            <button type="button" onClick={closeModal} style={{ marginLeft: '8px' }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddJobModal;
