import React from 'react';
import './Box.css';

interface BoxProps {
  title: string;
  onClick: () => void; // Define the type of the onClick prop
}

const Box: React.FC<BoxProps> = ({ title, onClick }) => {
  return (
    <div className="box" onClick={onClick}>
      <h2>{title}</h2>
      {/* Add any content you want for each box */}
    </div>
  );
};

export default Box;
