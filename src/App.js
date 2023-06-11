import React from 'react';
import { BrowserRouter as Router, Routes, Route,  Link  } from 'react-router-dom';
import { createStore,  applyMiddleware } from 'redux';  // or use the Context API
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
// import rootReducer from './reducers';
import { resumeReducer } from './reducers'; // or your own reducer function
import Header from './components/Header';
import Home from './components/Home';
import ResumeList from './components/ResumeList';
import ResumeDetails from './components/ResumeDetails';
import ResumeEditor from './components/ResumeEditor';
import './App.css';

// const store = createStore(resumeReducer); // create your own store using the reducer
const store = createStore(resumeReducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
        <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/resumes">Resumes</Link>
              </li>
              <li>
                <Link to="/editor">Editor</Link>
              </li>
              <li>
                <Link to="/details">Details</Link>
              </li>
            </ul>
          </nav>
          <Routes>
          <Route path="/resumes" element={<ResumeList />} />
           
            <Route path="/editor/:id" element={<ResumeEditor />} />
            <Route path="/detail/:id" element={<ResumeDetails />} />
            <Route path="/" element={<Home />} />
          
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;