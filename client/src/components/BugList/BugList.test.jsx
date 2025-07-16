import React from 'react';
import { render, screen } from '@testing-library/react';
import BugList from './BugList';

describe('BugList', () => {
  const mockBugs = [
    { _id: '1', title: 'Bug 1', description: 'Description 1', status: 'open' },
    { _id: '2', title: 'Bug 2', description: 'Description 2', status: 'in-progress' }
  ];

  it('renders a list of bugs', () => {
    render(<BugList bugs={mockBugs} />);
    
    expect(screen.getByText('Bug 1')).toBeInTheDocument();
    expect(screen.getByText('Bug 2')).toBeInTheDocument();
  });

  it('displays a message when no bugs are found', () => {
    render(<BugList bugs={[]} />);
    
    expect(screen.getByText('No bugs found')).toBeInTheDocument();
  });
});