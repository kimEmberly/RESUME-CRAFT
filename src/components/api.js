/**
 * Creates a new resume for the logged-in user
 * @param {object} resumeData - an object containing the resume data
 * @returns {Promise} a Promise that resolves with the created resume or rejects with an error
 */
export function createResume(resumeData) {
    function getUserId() {
        // Replace this with your own logic to get the ID of the logged-in user
        return 'user123';
      }
      
    const userId = getUserId(); // Assuming you have a function to get the ID of the logged-in user
    
    return fetch(`/api/users/${userId}/resumes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(resumeData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to create resume');
        }
        return response.json();
      })
      .then(data => {
        // Add an ID to the created resume before returning it
        const createdResume = { ...data.resume, id: uuidv4() };
        return createdResume;
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  }
  
  // Add a function to generate a unique ID for the newly created resume
  function uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0,
              v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
      });
  }