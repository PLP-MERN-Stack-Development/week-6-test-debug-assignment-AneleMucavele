import React from 'react';
import BugItem from '../BugItem/BugItem';

const BugList = ({ bugs, onDelete, onUpdate }) => {
  if (!bugs || bugs.length === 0) {
    return <div className="alert alert-info">No bugs found</div>;
  }

  return (
    <div className="bug-list">
      {bugs.map(bug => (
        <BugItem 
          key={bug._id} 
          bug={bug} 
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default BugList;