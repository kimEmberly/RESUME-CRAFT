import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


function ResumeDetails() {
  const { id } = useParams(); // extract the resume id from the URL
  const [resumeData, setResumeData] = useState(null);
  let address = '/editor/'+ id;
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('resumeData'));
    // MVP
    setResumeData(data);

    // TODO: improvement on MVP success
    // const resume = data?.filter((resume) => resume.id === id);
    // setResumeData(resume[0]);
  }, [id]);

  return (
    <div>
      <h2>{id}</h2>
      <Link to={address}><button>Edit</button></Link>
      <p>Profile</p>
      <ul>
        <li>Name: {resumeData?.profile?.name}</li>
        <li>Current Designation: {resumeData?.profile?.currentDesignation}</li>
        <li>Location: {resumeData?.profile?.location}</li>
        <li>E-mail ID: {resumeData?.profile?.email}</li>
        <li>Phone No.: {resumeData?.profile?.phone}</li>
        <li>Website (Optional): {resumeData?.profile?.website}</li>
      </ul>
      <p>About Me</p>
      <p>{resumeData?.aboutMe}</p>
      <p>Academics</p>
      <ul>
        {resumeData?.academics?.map((academic, index) => (
          <li key={index}>
            <ul>
              <li>Title: {academic.title}</li>
              <li>Year: {academic.year}</li>
              <li>Write-up: {academic.writeUp}</li>
            </ul>
          </li>
        ))}
      </ul>
      <p>Professional Experience</p>
      <ul>
        {resumeData?.experience?.map((experience, index) => (
          <li key={index}>
            <ul>
              <li>Designation: {experience.designation}</li>
              <li>Organization: {experience.organization}</li>
              <li>Tenure: {experience.tenure}</li>
              <li>Location: {experience.location}</li>
              <li>Write-up: {experience.writeUp}</li>
            </ul>
          </li>
        ))}
      </ul>
      <p>Projects</p>
      <ul>
        {resumeData?.projects?.map((project, index) => (
          <li key={index}>
            <ul>
              <li>Title: {project.title}</li>
              <li>Tenure: {project.tenure}</li>
              <li>URL: {project.link}</li>
              <li>Description: {project.writeUp}</li>
            </ul>
          </li>
        ))}
      </ul>
      <p>Skills</p>
      <ul>
        {resumeData?.skills?.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}

export default ResumeDetails;