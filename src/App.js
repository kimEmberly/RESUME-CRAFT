import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createStore } from 'redux';  // or use the Context API
import { Provider } from 'react-redux';
import { resumeReducer } from './reducers'; // or your own reducer function
import Header from './components/Header';
import Home from './components/Home';
import ResumeList from './components/ResumeList';
import ResumeDetails from './components/ResumeDetails';
import ResumeEditor from './components/ResumeEditor';
import './App.css';

const store = createStore(resumeReducer); // create your own store using the reducer

function App() {
  return (
    <Provider store={store}> // provide the store to the app
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" exact component={Home} />
            <Route path="/resumes" exact component={ResumeList} />
            <Route path="/resumes/:id" exact component={ResumeDetails} />
            <Route path="/resumes/:id/edit" exact component={ResumeEditor} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;