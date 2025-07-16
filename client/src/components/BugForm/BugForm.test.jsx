import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BugForm from './BugForm';

describe('BugForm', () => {
  const mockSubmit = jest.fn();

  beforeEach(() => {
    mockSubmit.mockClear();
  });

  it('renders form fields', () => {
    render(<BugForm onSubmit={mockSubmit} />);
    
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Status')).toBeInTheDocument();
    expect(screen.getByLabelText('Priority')).toBeInTheDocument();
  });

  it('submits form with valid data', () => {
    render(<BugForm onSubmit={mockSubmit} />);
    
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'New Bug' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Bug description' } });
    fireEvent.click(screen.getByText('Submit'));
    
    expect(mockSubmit).toHaveBeenCalledWith({
      title: 'New Bug',
      description: 'Bug description',
      status: 'open',
      priority: 'medium'
    });
  });

  it('shows validation errors', () => {
    render(<BugForm onSubmit={mockSubmit} />);
    
    fireEvent.click(screen.getByText('Submit'));
    
    expect(screen.getByText('Title is required')).toBeInTheDocument();
    expect(screen.getByText('Description is required')).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });
});