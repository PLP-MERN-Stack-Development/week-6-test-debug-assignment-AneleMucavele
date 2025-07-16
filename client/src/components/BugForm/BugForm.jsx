import React, { useState } from 'react';

const BugForm = ({ onSubmit, initialData = {} }) => {
  const [bug, setBug] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    status: initialData.status || 'open',
    priority: initialData.priority || 'medium'
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBug(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!bug.title.trim()) newErrors.title = 'Title is required';
    if (!bug.description.trim()) newErrors.description = 'Description is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  console.log('Submitting bug:', bug); // Debug log
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    console.log('Validation errors:', validationErrors); // Debug log
    setErrors(validationErrors);
    return;
  }
  onSubmit(bug);
};

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={bug.title}
          onChange={handleChange}
          className={`form-control ${errors.title ? 'is-invalid' : ''}`}
        />
        {errors.title && <div className="invalid-feedback">{errors.title}</div>}
      </div>
      
      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={bug.description}
          onChange={handleChange}
          className={`form-control ${errors.description ? 'is-invalid' : ''}`}
        />
        {errors.description && <div className="invalid-feedback">{errors.description}</div>}
      </div>
      
      <div className="form-group">
        <label>Status</label>
        <select
          name="status"
          value={bug.status}
          onChange={handleChange}
          className="form-control"
        >
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Priority</label>
        <select
          name="priority"
          value={bug.priority}
          onChange={handleChange}
          className="form-control"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default BugForm;