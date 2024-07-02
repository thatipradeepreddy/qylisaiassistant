import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from './../components/Box';
import './InitializationScreen.css';

const InitializationScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleBoxClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="initialization-screen">
      <h1>Welcome to Qylis Services</h1>
      <div className="box-container">
        <Box title="Chat Bot" onClick={() => handleBoxClick('/chat')} />
        <Box title="Object Detection" onClick={() => handleBoxClick('/objectDetection')} />
        <Box title="Box 3" onClick={() => handleBoxClick('')} />
        <Box title="Box 4" onClick={() => handleBoxClick('')} />
      </div>
    </div>
  );
};

export default InitializationScreen;
