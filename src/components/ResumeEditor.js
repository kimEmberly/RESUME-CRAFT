import React, { useState } from 'react';
import { createResume } from './api'; // import the createResume function from your API file
import { useParams} from 'react-router-dom';

function ResumeEditor() {
  const { id } = useParams(); // extract the resume id from the URL
  const [profile, setProfile] = useState({
    name: '',
    currentDesignation: '',
    location: '',
    email: '',
    phone: '',
    website: ''
  });
  const [aboutMe, setAboutMe] = useState('');
  const [academics, setAcademics] = useState([]);
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
//   const history = useHistory();
  const [resumeData, setResumeData] = useState({
    // ... initialize the resume data ...
  });

  function handleSave() {
    createResume(resumeData)
      .then(createdResume => {
        // Redirect to the newly created resume page
        // history.push(`/resumes/${createdResume.id}`);
      })
      .catch(error => {
        console.error('Failed to create resume', error);
        // Handle error appropriately, e.g. show an error message to the user
      });
  }


  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleAboutMeChange = (event) => {
    setAboutMe(event.target.value);
  };

  const handleAcademicsChange = (event, index) => {
    const { name, value } = event.target;
    const newAcademics = [...academics];
    newAcademics[index] = { ...newAcademics[index], [name]: value };
    setAcademics(newAcademics);
  };

  const handleAddAcademics = () => {
    setAcademics([...academics, { title: '',     year: '', writeUp: '' }]);
};

const handleDeleteAcademics = (index) => {
  const newAcademics = [...academics];
  newAcademics.splice(index, 1);
  setAcademics(newAcademics);
};

const handleExperienceChange = (event, index) => {
  const { name, value } = event.target;
  const newExperience = [...experience];
  newExperience[index] = { ...newExperience[index], [name]: value };
  setExperience(newExperience);
};

const handleAddExperience = () => {
  setExperience([...experience, {
    designation: '', organization: '', tenure: '', location: '', writeUp: ''
  }]);
};

const handleDeleteExperience = (index) => {
  const newExperience = [...experience];
  newExperience.splice(index, 1);
  setExperience(newExperience);
};

const handleProjectsChange = (event, index) => {
  const { name, value } = event.target;
  const newProjects = [...projects];
  newProjects[index] = { ...newProjects[index], [name]: value };
  setProjects(newProjects);
};

const handleAddProjects = () => {
  setProjects([...projects, { title: '', tenure: '', url: '', description: '' }]);
};

const handleDeleteProjects = (index) => {
  const newProjects = [...projects];
  newProjects.splice(index, 1);
  setProjects(newProjects);
};

const handleSkillsChange = (event, index) => {
  const { name, value } = event.target;
  const newSkills = [...skills];
  newSkills[index] = { ...newSkills[index], [name]: value };
  setSkills(newSkills);
};

const handleAddSkills = () => {
  setSkills([...skills, { name: '', rating: 0 }]);
};

const handleDeleteSkills = (index) => {
  const newSkills = [...skills];
  newSkills.splice(index, 1);
  setSkills(newSkills);
};

const handleSubmit = () => {
  // TODO: submit the form data to the backend API
};

return (
  <div>
    <h2>Edit {id}</h2>
    <form onSubmit={handleSubmit}>
      <h3>Profile</h3>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={profile.name} onChange={handleProfileChange} />
      </div>
      <div>
        <label>Current Designation:</label>
        <input type="text" name="currentDesignation" value={profile.currentDesignation} onChange={handleProfileChange} />
      </div>
      <div>
        <label>Location:</label>
        <input type="text" name="location" value={profile.location} onChange={handleProfileChange} />
      </div>
      <div>
        <label>E-mail ID:</label>
        <input type="email" name="email" value={profile.email} onChange={handleProfileChange} />
      </div>
      <div>
        <label>Phone No.:</label>
        <input type="tel" name="phone" value={profile.phone} onChange={handleProfileChange} />
      </div>
      <div>
        <label>Website (Optional):</label>
        <input type="url" name="website" value={profile.website} onChange={handleProfileChange} />
      </div>
      <h3>About Me</h3>
      <div>
        <textarea value={aboutMe} onChange={handleAboutMeChange} />
      </div>
      <h3>Academics</h3>
      {academics.map((academic, index) => (
        <div key={index}>
          <label>Title:</label>
          <input type="text" name="title" value={academic.title} onChange={(event) => handleAcademicsChange(event, index)} />
          <label>Year:</label>
          <input type="text" name="year" value={academic.year} onChange={(event) => handleAcademicsChange(event, index)} />
          <label>Write-up:</label>
          <input type="text" name="writeUp" value={academic.writeUp} onChange={(event) => handleAcademicsChange(event, index)} />
          <button type="button" onClick={() => handleDeleteAcademics(index)}>Delete</button>
        </div>
      ))}
      <button type="button" onClick={handleAddAcademics}>Add Academic</button>
      <h3>Professional Experience</h3>
      {experience.map((exp, index) => (
          <div key={index}>
            <label>Designation:</label>
            <input type="text" name="designation" value={exp.designation} onChange={(event) => handleExperienceChange(event, index)} />
            <label>Organization:</label>
            <input type="text" name="organization" value={exp.organization} onChange={(event) => handleExperienceChange(event, index)} />
            <label>Tenure:</label>
            <input type="text" name="tenure" value={exp.tenure} onChange={(event) => handleExperienceChange(event, index)} />
            <label>Location:</label>
            <input type="text" name="location" value={exp.location} onChange={(event) => handleExperienceChange(event, index)} />
            <label>Write-up:</label>
            <input type="text" name="writeUp" value={exp.writeUp} onChange={(event) => handleExperienceChange(event, index)} />
            <button type="button" onClick={() => handleDeleteExperience(index)}>Delete</button>
          </div>
        ))}
        <button type="button" onClick={handleAddExperience}>Add Experience</button>
        <h3>Projects</h3>
        {projects.map((project, index) => (
          <div key={index}>
            <label>Title:</label>
            <input type="text" name="title" value={project.title} onChange={(event) => handleProjectsChange(event, index)} />
            <label>Tenure:</label>
            <input type="text" name="tenure" value={project.tenure} onChange={(event) => handleProjectsChange(event, index)} />
            <label>URL:</label>
            <input type="url" name="url" value={project.url} onChange={(event) => handleProjectsChange(event, index)} />
            <label>Description:</label>
            <input type="text" name="description" value={project.description} onChange={(event) => handleProjectsChange(event, index)} />
            <button type="button" onClick={() => handleDeleteProjects(index)}>Delete</button>
          </div>
        ))}
        <button type="button" onClick={handleAddProjects}>Add Project</button>
        <h3>Skills</h3>
        {skills.map((skill, index) => (
          <div key={index}>
            <label>Skill:</label>
            <input type="text" name="name" value={skill.name} onChange={(event) => handleSkillsChange(event, index)} />
            <label>Rating:</label>
            <input type="range" min="0" max="10" name="rating" value={skill.rating} onChange={(event) => handleSkillsChange(event, index)} />
            <span>{skill.rating}</span>
            <button type="button" onClick={() => handleDeleteSkills(index)}>Delete</button>
          </div>
        ))}
        <button type="button" onClick={handleAddSkills}>Add Skill</button>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default ResumeEditor;