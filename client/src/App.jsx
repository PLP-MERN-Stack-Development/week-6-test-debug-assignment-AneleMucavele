import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BugList from './components/BugList/BugList';
import BugForm from './components/BugForm/BugForm';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import './App.css';

const API_URL = 'http://localhost:5000/api/v1/bugs';

function App() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBugs();
  }, []);

  const fetchBugs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setBugs(response.data.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching bugs:', err);
      setError('Failed to fetch bugs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBug = async (bugData) => {
    try {
      const response = await axios.post(API_URL, bugData);
      setBugs([...bugs, response.data.data]);
    } catch (err) {
      console.error('Error creating bug:', err);
      setError('Failed to create bug. Please try again.');
    }
  };

  const handleUpdateBug = async (id, updatedData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData);
      setBugs(bugs.map(bug => bug._id === id ? response.data.data : bug));
    } catch (err) {
      console.error('Error updating bug:', err);
      setError('Failed to update bug. Please try again.');
    }
  };

  const handleDeleteBug = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setBugs(bugs.filter(bug => bug._id !== id));
    } catch (err) {
      console.error('Error deleting bug:', err);
      setError('Failed to delete bug. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Bug Tracker</h1>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <ErrorBoundary>
        <div className="row">
          <div className="col-md-6">
            <h2>Report New Bug</h2>
            <BugForm onSubmit={handleCreateBug} />
          </div>
          
          <div className="col-md-6">
            <h2>Bug List</h2>
            <BugList 
              bugs={bugs} 
              onDelete={handleDeleteBug}
              onUpdate={handleUpdateBug}
            />
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
}

export default App;