import React from 'react';
import { Link } from 'react-router-dom';

function ResumeList() {
  const resumes = ['resume1', 'resume2', 'resume3']; // assume we have three resumes for now
  return (
    <div>
      <h2>My Resumes</h2>
      <ul>
        {resumes.map((resume, index) => (
          <li key={index}>
            <Link to={`/resumes/${resume}`}>{resume}</Link>
            <button>Delete</button> // add a delete button for each resume
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResumeList;