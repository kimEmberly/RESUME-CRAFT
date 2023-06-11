import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to ResumeCraftr</h1>
      <Link to="/editor">
        <button>Create Resume</button>
      </Link>
    </div>
  );
}

export default Home;