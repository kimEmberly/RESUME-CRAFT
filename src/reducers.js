const initialState = {
    resumes: [],
    error: null
  };
  
  export function resumeReducer (state = initialState, action) {
    switch (action.type) {
      case 'FETCH_RESUMES_REQUEST':
        return {
          ...state,
          error: null
        };
      case 'FETCH_RESUMES_SUCCESS':
        return {
          ...state,
          resumes: action.payload,
          error: null
        };
      case 'FETCH_RESUMES_FAILURE':
        return {
          ...state,
          resumes: [],
          error: action.payload
        };
      case 'ADD_RESUME':
        return {
          ...state,
          resumes: [...state.resumes, action.payload],
          error: null
        };
      case 'UPDATE_RESUME':
        const updatedResumes = state.resumes.map((resume) => {
          if (resume.id === action.payload.id) {
            return { ...resume, ...action.payload };
          } else {
            return resume;
          }
        });
        return {
          ...state,
          resumes: updatedResumes,
          error: null
        };
      case 'DELETE_RESUME':
        const filteredResumes = state.resumes.filter((resume) => resume.id !== action.payload.id);
        return {
          ...state,
          resumes: filteredResumes,
          error: null
        };
      default:
        return state;
    }
  };
  
