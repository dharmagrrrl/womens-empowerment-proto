import React from 'react';
import { useRouter } from 'next/navigation';
import styled from '@emotion/styled';

const ResetButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;

  &:hover {
    background-color: #ff5252;
    transform: translateY(-2px);
  }
`;

const ResetProgressButton = () => {
  const router = useRouter();

  const handleReset = async () => {
    try {
      // Call the reset API endpoint
      const response = await fetch('/api/progress/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Redirect to the map page
        router.push('/');
      } else {
        console.error('Failed to reset progress');
      }
    } catch (error) {
      console.error('Error resetting progress:', error);
    }
  };

  return (
    <ResetButton onClick={handleReset}>
      Reset Progress
    </ResetButton>
  );
};

export default ResetProgressButton; 