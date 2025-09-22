import React from 'react';

interface Props {
  message: string;
}

const Toast: React.FC<Props> = ({ message }) => {
  if (!message) return null;
  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: '#444',
      color: '#fff',
      padding: '10px',
      borderRadius: '5px',
      zIndex: 1000
    }}>
      {message}
    </div>
  );
};

export default Toast;