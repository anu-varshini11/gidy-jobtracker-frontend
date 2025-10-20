import React from 'react';

function ViewJobModal({ closeModal, job }) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Job Details</h3>
        <p><strong>Company:</strong> {job.companyName}</p>
        <p><strong>Job Title:</strong> {job.jobTitle}</p>
        <p><strong>Application Date:</strong> {new Date(job.applicationDate).toLocaleDateString()}</p>
        <p><strong>Status:</strong> {job.status}</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
          <button onClick={closeModal}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default ViewJobModal;
