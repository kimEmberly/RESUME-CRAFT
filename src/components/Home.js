import React from 'react';
import { Link } from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';

let newUUID = uuidv4();
let address = '/editor/'+ newUUID;
function Home() {
  return (
    <div>
      <h1>Welcome to ResumeCraftr</h1>
      <Link to={address}>
        <button>Create Resume</button>
      </Link>
    </div>
  );
}

export default Home;