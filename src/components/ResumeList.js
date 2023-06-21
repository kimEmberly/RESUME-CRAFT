import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ResumeList() {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('resumeData');
    if (data) {
      setResumes(JSON.parse(data));
    }
  }, []);

  function handleDelete(resumeName) {
    const updatedResumes = resumes
    // delete updatedResumes[resumeName];
    delete updatedResumes['profile']
    localStorage.setItem('resumeData', JSON.stringify(updatedResumes));
    setResumes(updatedResumes);
  }


  return (
    <div>
      <h2>My Resumes</h2>
      <ul>
        {/* {resumes.map((resume, index) => (
          <li key={index}>
            <Link to={`/resumes/${resume}`}>{resume}</Link>
            <button onClick={() => handleDelete(resume)}>Delete</button>
          </li>
        ))} */}

          <li key={1}>
            <Link to={`/editor/${resumes.profile?.id}`}>{resumes.profile?.name}</Link>
            <button onClick={() => handleDelete(resumes)}>Delete</button>
          </li>

      </ul>
    </div>
  );
}

export default ResumeList;