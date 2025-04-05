'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from '@emotion/styled';
import dynamic from 'next/dynamic';

// Dynamically import Confetti to avoid SSR issues
const Confetti = dynamic(() => import('react-confetti'), { ssr: false });

const LevelContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a2a 0%, #1a1a3a 100%);
  padding: 2rem;
  position: relative;
  overflow: hidden;
`;

const GalaxyBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, #4a90e2 0%, #2d1b4d 100%);
  opacity: 0.8;
  z-index: 1;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('/nebula.jpg');
    background-size: cover;
    background-position: center;
    opacity: 0.3;
    animation: nebulaFloat 20s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, transparent 50%, rgba(0, 0, 0, 0.8) 100%);
  }

  @keyframes nebulaFloat {
    0%, 100% { transform: scale(1) rotate(0deg); }
    50% { transform: scale(1.1) rotate(5deg); }
  }
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 4rem;
`;

const Title = styled.h1`
  color: #ffffff;
  font-size: 3rem;
  margin: 0 0 2rem;
  text-align: center;
  font-family: 'Nunito', sans-serif;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
`;

const Description = styled.p`
  color: #ffffff;
  font-size: 1.2rem;
  line-height: 1.6;
  margin: 0 0 3rem;
  text-align: center;
  font-family: 'Nunito', sans-serif;
  background: rgba(45, 27, 77, 0.8);
  padding: 2rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const ColumnsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
`;

const Column = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const ColumnTitle = styled.h2`
  color: #ffffff;
  font-size: 1.8rem;
  margin: 0 0 1.5rem;
  text-align: center;
  font-family: 'Nunito', sans-serif;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.8rem;
  border: 2px solid #4a90e2;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 1rem;
  font-family: 'Nunito', sans-serif;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
    border-color: #6ba4e7;
    box-shadow: 0 0 10px rgba(74, 144, 226, 0.3);
  }
`;

const AddButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: #4a90e2;
  border: none;
  border-radius: 10px;
  color: #ffffff;
  font-size: 1rem;
  font-family: 'Nunito', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #6ba4e7;
    transform: translateY(-2px);
  }
`;

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  margin-bottom: 0.8rem;
  color: #ffffff;
  font-family: 'Nunito', sans-serif;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #ff6b6b;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    color: #ff8e8e;
    transform: scale(1.1);
  }
`;

const BackButton = styled.button`
  position: fixed;
  top: 2rem;
  left: 2rem;
  padding: 0.8rem 1.5rem;
  background: #2d1b4d;
  border: none;
  border-radius: 10px;
  color: #ffffff;
  font-size: 1rem;
  font-family: 'Nunito', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 3;

  &:hover {
    background: #3d2b5d;
    transform: translateY(-2px);
  }
`;

const NextLevelButton = styled.button<{ visible: boolean }>`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%) ${props => props.visible ? 'translateY(0)' : 'translateY(100px)'};
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #4a90e2 0%, #6ba4e7 100%);
  border: none;
  border-radius: 10px;
  color: #ffffff;
  font-size: 1.2rem;
  font-family: 'Nunito', sans-serif;
  cursor: pointer;
  transition: all 0.5s ease;
  z-index: 3;
  opacity: ${props => props.visible ? 1 : 0};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    background: linear-gradient(135deg, #6ba4e7 0%, #4a90e2 100%);
    transform: translateX(-50%) translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }
`;

interface LevelData {
  gainItems: Array<{ text: string; timestamp: number }>;
  loseItems: Array<{ text: string; timestamp: number }>;
}

const LevelPage = () => {
  const router = useRouter();
  const [levelData, setLevelData] = useState<LevelData>({ gainItems: [], loseItems: [] });
  const [newGainText, setNewGainText] = useState('');
  const [newLoseText, setNewLoseText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [levelId, setLevelId] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    // Get level ID from URL
    const path = window.location.pathname;
    const match = path.match(/\/level\/(\d+)/);
    if (match) {
      const id = match[1];
      setLevelId(id);
      
      // Update progress when entering a new level
      fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ level: parseInt(id) }),
      }).catch(console.error);
    }

    // Handle window resize for confetti
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (levelId) {
      fetchLevelData();
    }
  }, [levelId]);

  const fetchLevelData = async () => {
    try {
      const response = await fetch(`/api/level/${levelId}`);
      if (!response.ok) throw new Error('Failed to load level data');
      const data = await response.json();
      setLevelData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load level data');
    }
  };

  const handleAddGain = async () => {
    if (!newGainText.trim() || !levelId) return;
    try {
      const response = await fetch(`/api/level/${levelId}/gain`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newGainText }),
      });
      if (!response.ok) throw new Error('Failed to add gain item');
      const newItem = await response.json();
      setLevelData(prev => ({
        ...prev,
        gainItems: [...prev.gainItems, newItem],
      }));
      setNewGainText('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add gain item');
    }
  };

  const handleAddLose = async () => {
    if (!newLoseText.trim() || !levelId) return;
    try {
      const response = await fetch(`/api/level/${levelId}/lose`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newLoseText }),
      });
      if (!response.ok) throw new Error('Failed to add lose item');
      const newItem = await response.json();
      setLevelData(prev => ({
        ...prev,
        loseItems: [...prev.loseItems, newItem],
      }));
      setNewLoseText('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add lose item');
    }
  };

  const handleDeleteGain = async (timestamp: number) => {
    if (!levelId) return;
    try {
      const response = await fetch(`/api/level/${levelId}/gain/${timestamp}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete gain item');
      setLevelData(prev => ({
        ...prev,
        gainItems: prev.gainItems.filter(item => item.timestamp !== timestamp),
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete gain item');
    }
  };

  const handleDeleteLose = async (timestamp: number) => {
    if (!levelId) return;
    try {
      const response = await fetch(`/api/level/${levelId}/lose/${timestamp}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete lose item');
      setLevelData(prev => ({
        ...prev,
        loseItems: prev.loseItems.filter(item => item.timestamp !== timestamp),
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete lose item');
    }
  };

  const handleNextLevel = () => {
    setShowConfetti(true);
    
    // After confetti animation, navigate to the next level
    setTimeout(() => {
      // Navigate to the Confidence page (level 2)
      router.push('/level/2');
    }, 5000); // 5 seconds for confetti animation
  };

  // Check if both columns have at least one item
  const showNextLevelButton = levelData.gainItems.length > 0 && levelData.loseItems.length > 0;

  if (error) return <div>Error: {error}</div>;

  return (
    <LevelContainer>
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.2}
          initialVelocityY={20}
          colors={['#4a90e2', '#6ba4e7', '#ffd700', '#ffffff', '#ff6b6b']}
        />
      )}
      <GalaxyBackground />
      <BackButton onClick={() => router.push('/')}>Back to Map</BackButton>
      <ContentContainer>
        <Title>Energy</Title>
        <Description>
          Track your energy levels throughout the day. Add items that give you energy and those that drain it.
          This will help you identify patterns and make better choices for maintaining your energy.
        </Description>
        <ColumnsContainer>
          <Column>
            <ColumnTitle>Gain Energy</ColumnTitle>
            <InputContainer>
              <Input
                type="text"
                placeholder="What gives you energy?"
                value={newGainText}
                onChange={(e) => setNewGainText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddGain()}
              />
              <AddButton onClick={handleAddGain}>Add</AddButton>
            </InputContainer>
            <ItemList>
              {levelData.gainItems.map((item) => (
                <Item key={item.timestamp}>
                  {item.text}
                  <DeleteButton onClick={() => handleDeleteGain(item.timestamp)}>×</DeleteButton>
                </Item>
              ))}
            </ItemList>
          </Column>
          <Column>
            <ColumnTitle>Lose Energy</ColumnTitle>
            <InputContainer>
              <Input
                type="text"
                placeholder="What drains your energy?"
                value={newLoseText}
                onChange={(e) => setNewLoseText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddLose()}
              />
              <AddButton onClick={handleAddLose}>Add</AddButton>
            </InputContainer>
            <ItemList>
              {levelData.loseItems.map((item) => (
                <Item key={item.timestamp}>
                  {item.text}
                  <DeleteButton onClick={() => handleDeleteLose(item.timestamp)}>×</DeleteButton>
                </Item>
              ))}
            </ItemList>
          </Column>
        </ColumnsContainer>
        <NextLevelButton 
          visible={showNextLevelButton} 
          onClick={handleNextLevel}
        >
          Next Level
        </NextLevelButton>
      </ContentContainer>
    </LevelContainer>
  );
};

export default LevelPage; 