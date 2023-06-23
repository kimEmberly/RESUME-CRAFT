import React, { useState, useEffect } from "react";
import { createResume } from "./api"; // import the createResume function from your API file
import { useParams, useNavigate } from "react-router-dom";

function ResumeEditor() {
  const { id } = useParams(); // extract the resume id from the URL
  
  const [profile, setProfile] = useState({
    id: id,
    name: "",
    currentDesignation: "",
    location: "",
    email: "",
    phone: "",
    website: "",
  });
  const currentlySavedResumes = JSON.parse(localStorage.getItem("resumeData")) || [];
  const resumes = [...currentlySavedResumes]
  const [aboutMe, setAboutMe] = useState("");
  const [academics, setAcademics] = useState([]);
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const history = useNavigate();

  // initialize the resume data state using data from local storage
  const [resumeData, setResumeData] = useState(() => {
    const data = localStorage.getItem("resumeData");
    const parsedData = JSON.parse(data);
    if (data) {
    parsedData.forEach((resume) => {
    if (resume?.profile?.id === id) {
    return resume
      ? resume
      : {
          profile: {},
          academics: [],
          experience: [],
          projects: [],
          skills: [],
        };
      } else 
      return {
        profile: {},
        academics: [],
        experience: [],
        projects: [],
        skills: [],
      };
    })
  }
  else 
      return {
        profile: {},
        academics: [],
        experience: [],
        projects: [],
        skills: [],
      };
  });

  useEffect(() => {
    // update the state using data from local storage
    const data = localStorage.getItem("resumeData");
    const parsedData = JSON.parse(data);
    if (data) {
    parsedData.forEach((resume) => {
    if ((resume?.profile?.id === id)) {
console.log(resume)
      const resumeInfo = resume;
      setProfile(resumeInfo.profile || {});
      setAboutMe(resumeInfo.aboutMe || "");
      setAcademics(resumeInfo.academics || []);
      setExperience(resumeInfo.experience || []);
      setProjects(resumeInfo.projects || []);
      setSkills(resumeInfo.skills || []);
    }
  })
}
  }, []);

  function handleSave() {

    resumes.push(resumeData)
    // resumeData.forEach((resume) => {
    // });
    // console.log(resumes)
    localStorage.setItem("resumeData", JSON.stringify(resumes));
    createResume(resumeData)
      .then((createdResume) => {
        history(`/resumes/${createdResume.id}`);
      })
      .catch((error) => {
        console.error("Failed to create resume:", error);
        // Handle error appropriately, e.g. show an error message to the user
      });
  }

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
    setResumeData((prevResumeData) => ({
      ...prevResumeData,
      profile: { ...prevResumeData?.profile, id: id, [name]: value },
    }));
  };

  const handleAboutMeChange = (event) => {
    setAboutMe(event.target.value);
    setResumeData((prevResumeData) => ({
      ...prevResumeData,
      aboutMe: event.target.value,
    }));
  };

  const handleAcademicsChange = (event, index) => {
    const { name, value } = event.target;
    const newAcademics = [...academics];
    newAcademics[index] = { ...newAcademics[index], [name]: value };
    setAcademics(newAcademics);

    const newAcademicsData = [...resumeData?.academics];
    newAcademicsData[index] = { ...newAcademicsData[index], [name]: value };
    setResumeData((prevResumeData) => ({
      ...prevResumeData,
      academics: newAcademicsData,
    }));
  };

  const handleAddAcademics = () => {
    setAcademics([...academics, { title: "", year: "", writeUp: "" }]);
    setResumeData((prevResumeData) => ({
      ...prevResumeData,
      academics: [
        ...prevResumeData?.academics,
        { title: "", year: "", writeUp: "" },
      ],
    }));
  };

  const handleDeleteAcademics = (index) => {
    const newAcademics = [...academics];
    newAcademics.splice(index, 1);
    setAcademics(newAcademics);

    const newAcademicsData = [...resumeData.academics];
    newAcademicsData.splice(index, 1);
    setResumeData((prevResumeData) => ({
      ...prevResumeData,
      academics: newAcademicsData,
    }));
  };

  const handleExperienceChange = (event, index) => {
    const { name, value } = event.target;
    const newExperience = [...experience];
    newExperience[index] = { ...newExperience[index], [name]: value };
    setExperience(newExperience);

    const newExperienceData = [...resumeData.experience];
    newExperienceData[index] = { ...newExperienceData[index], [name]: value };
    setResumeData((prevResumeData) => ({
      ...prevResumeData,
      experience: newExperienceData,
    }));
  };

  const handleAddExperience = () => {
    setExperience([
      ...experience,
      {
        designation: "",
        organization: "",
        tenure: "",
        location: "",
        writeUp: "",
      },
    ]);
    setResumeData((prevResumeData) => ({
      ...prevResumeData,
      experience: [
        ...prevResumeData?.experience,
        {
          designation: "",
          organization: "",
          tenure: "",
          location: "",
          writeUp: "",
        },
      ],
    }));
  };

  const handleDeleteExperience = (index) => {
    const newExperience = [...experience];
    newExperience.splice(index, 1);
    setExperience(newExperience);

    const newExperienceData = [...resumeData.experience];
    newExperienceData.splice(index, 1);
    setResumeData((prevResumeData) => ({
      ...prevResumeData,
      experience: newExperienceData,
    }));
  };

  const handleProjectsChange = (event, index) => {
    const { name, value } = event.target;
    const newProjects = [...projects];
    newProjects[index] = { ...newProjects[index], [name]: value };
    setProjects(newProjects);

    const newProjectsData = [...resumeData.projects];
    newProjectsData[index] = { ...newProjectsData[index], [name]: value };
    setResumeData((prevResumeData) => ({
      ...prevResumeData,
      projects: newProjectsData,
    }));
  };
  const handleAddProjects = () => {
    setProjects([...projects, { title: "", link: "", writeUp: "" }]);
    setResumeData((prevResumeData) => ({
      ...prevResumeData,
      projects: [
        ...prevResumeData?.projects,
        { title: "", link: "", writeUp: "" },
      ],
    }));
  };

  const handleDeleteProjects = (index) => {
    const newProjects = [...projects];
    newProjects.splice(index, 1);
    setProjects(newProjects);

    const newProjectsData = [...resumeData.projects];
    newProjectsData.splice(index, 1);
    setResumeData((prevResumeData) => ({
      ...prevResumeData,
      projects: newProjectsData,
    }));
  };

  // const newProjectsData = [...resumeData.projects];
  // newProjectsData.splice(index, 1);
  // setResumeData(prevResumeData => ({ ...prevResumeData, projects: newProjectsData }));
  // };

  const handleSkillsChange = (event, index) => {
    const {  name, value } = event.target;
    const newSkills = [...skills];
    newSkills[index] =  { ...newSkills[index], [name]: value };
    setSkills(newSkills);

  
  
    const newSkillsData = [...resumeData.skills];
    newSkillsData[index] = { ...newSkillsData[index], [name]: value };;
    setResumeData((prevResumeData) => ({
      ...prevResumeData,
      skills: newSkillsData,
    }));
  };

  


  const handleAddSkills = () => {
    setSkills([...skills,  {
      notes: "",
      rating: "",
    },]);
    // setResumeData((prevResumeData) => ({
    //   ...prevResumeData,
    //   skills: [...prevResumeData?.skills,  {
    //     notes: "",
    //     rating: "",
    //   }],
    // }));
  };

  const handleDeleteSkills = (index) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);

    const newSkillsData = [...resumeData.skills];
    newSkillsData.splice(index, 1);
    setResumeData((prevResumeData) => ({
      ...prevResumeData,
      skills: newSkillsData,
    }));
  };
  return (
    <div>
      <h2>Editor</h2>{" "}
      <form>
        {" "}
        <label htmlFor="name">Name</label>{" "}
        <input
          type="text"
          name="name"
          id="name"
          value={profile.name}
          onChange={handleProfileChange}
        />
        <label htmlFor="currentDesignation">Current Designation</label>
        <input
          type="text"
          name="currentDesignation"
          id="currentDesignation"
          value={profile.currentDesignation}
          onChange={handleProfileChange}
        />
        <label htmlFor="location">Location</label>
        <input
          type="text"
          name="location"
          id="location"
          value={profile.location}
          onChange={handleProfileChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={profile.email}
          onChange={handleProfileChange}
        />
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          value={profile.phone}
          onChange={handleProfileChange}
        />
        <label htmlFor="website">Website</label>
        <input
          type="url"
          name="website"
          id="website"
          value={profile.website}
          onChange={handleProfileChange}
        />
        <label htmlFor="aboutMe">About Me</label>
        <textarea
          name="aboutMe"
          id="aboutMe"
          value={aboutMe}
          onChange={handleAboutMeChange}
        ></textarea>
        <label htmlFor="academics">Academics</label>
        {academics.map((academics, index) => (
          <div key={index}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={academics.title}
              onChange={(event) => handleAcademicsChange(event, index)}
            />
            <input
              type="text"
              name="year"
              placeholder="Year"
              value={academics.year}
              onChange={(event) => handleAcademicsChange(event, index)}
            />
            <textarea
              name="writeUp"
              placeholder="Write up"
              value={academics.writeUp}
              onChange={(event) => handleAcademicsChange(event, index)}
            ></textarea>
            <button type="button" onClick={() => handleDeleteAcademics(index)}>
              Delete
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddAcademics}>
          Add Academic
        </button>
        <label htmlFor="experience">Experience</label>
        {experience.map((exp, index) => (
          <div key={index}>
            <label>Designation:</label>
            <input
              type="text"
              name="designation"
              value={exp.designation}
              onChange={(event) => handleExperienceChange(event, index)}
            />
            <label>Organization:</label>
            <input
              type="text"
              name="organization"
              value={exp.organization}
              onChange={(event) => handleExperienceChange(event, index)}
            />
            <label>Tenure:</label>
            <input
              type="text"
              name="tenure"
              value={exp.tenure}
              onChange={(event) => handleExperienceChange(event, index)}
            />
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={exp.location}
              onChange={(event) => handleExperienceChange(event, index)}
            />
            <label>Write-up:</label>
            <input
              type="text"
              name="writeUp"
              value={exp.writeUp}
              onChange={(event) => handleExperienceChange(event, index)}
            />
            <button type="button" onClick={() => handleDeleteExperience(index)}>
              Delete
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddExperience}>
          Add Experience
        </button>
        <h3>Projects</h3>
        {projects.map((project, index) => (
          <div key={index}>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={project.title}
              onChange={(event) => handleProjectsChange(event, index)}
            />
            <label>Tenure:</label>
            <input
              type="text"
              name="tenure"
              value={project.tenure}
              onChange={(event) => handleProjectsChange(event, index)}
            />
            <label>URL:</label>
            <input
              type="url"
              name="url"
              value={project.url}
              onChange={(event) => handleProjectsChange(event, index)}
            />
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={project.description}
              onChange={(event) => handleProjectsChange(event, index)}
            />
            <button type="button" onClick={() => handleDeleteProjects(index)}>
              Delete
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddProjects}>
          Add Project
        </button>
        <h3>Skills</h3>
        {skills.map((skill, index) => (
          <div key={index}>
            <label>Skill:</label>
            <input
              type="text"
              name="name"
              value={skill.name}
              onChange={(event) => handleSkillsChange(event, index)}
            />
            <label>Rating:</label>
            <input
              type="range"
              min="0"
              max="10"
              name="rating"
              value={skill.rating}
              onChange={(event) => handleSkillsChange(event, index)}
            />
            <span>{skill.rating}</span>
            <button type="button" onClick={() => handleDeleteSkills(index)}>
              Delete
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddSkills}>
          Add Skill
        </button>
        <button type="submit" onClick={handleSave}>
          Save
        </button>
      </form>
    </div>
  );
}

export default ResumeEditor;
