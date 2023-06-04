import React from 'react';
import { useParams } from 'react-router-dom';

function ResumeDetails() {
  const { id } = useParams(); // extract the resume id from the URL
  return (
    <div>
      <h2>{id}</h2>
      <button>Edit</button>
      <p>Profile</p>
      <ul>
        <li>Name:</li>
        <li>Current Designation:</li>
        <li>Location:</li>
        <li>E-mail ID:</li>
        <li>Phone No.:</li>
        <li>Website (Optional):</li>
      </ul>
      <p>About Me</p>
      <p>Academics</p>
      <ul>
        <li>Title:</li>
        <li>Year:</li>
        <li>Write-up:</li>
      </ul>
      <p>Professional Experience</p>
      <ul>
        <li>Designation:</li>
        <li>Organization:</li>
        <li>Tenure:</li>
        <li>Location:</li>
        <li>Write-up:</li>
      </ul>
      <p>Projects</p>
      <ul>
        <li>Title:</li>
        <li>Tenure:</li>
        <li>URL:</li>
        <li>Description:</li>
      </ul>
      <p>Skills</p>
      <ul>
        <li>Skill 1:</li>
        <li>Skill 2:</li>
        <li>Skill 3:</li>
      </ul>
    </div>
  );
}

export default ResumeDetails;