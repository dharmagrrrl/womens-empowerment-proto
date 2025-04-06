'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from '@emotion/styled';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a0f0f 0%, #2d1a1a 100%);
  padding: 2rem;
  position: relative;
  overflow: hidden;
`;

const PhoenixBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, rgba(255, 69, 0, 0.3) 0%, rgba(139, 0, 0, 0.2) 50%, transparent 70%);
    animation: fireGlow 8s ease-in-out infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10%;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 60%;
    background-image: url('/phoenix.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0.7;
    filter: drop-shadow(0 0 20px rgba(255, 69, 0, 0.5));
  }
  
  @keyframes fireGlow {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 0.8; }
  }
`;

const AshesContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20%;
  background: linear-gradient(to top, #333, transparent);
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background-image: url('/ashes.png');
    background-size: cover;
    background-position: center;
    opacity: 0.7;
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
  color: #ff8c00;
  font-size: 3.5rem;
  margin: 0 0 2rem;
  text-align: center;
  font-family: 'Nunito', sans-serif;
  text-shadow: 0 0 10px rgba(255, 140, 0, 0.7);
`;

const Description = styled.p`
  color: #ffffff;
  font-size: 1.2rem;
  line-height: 1.6;
  margin: 0 0 3rem;
  text-align: center;
  font-family: 'Nunito', sans-serif;
  background: rgba(45, 26, 26, 0.8);
  padding: 2rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 69, 0, 0.3);
`;

const ColumnsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
`;

const Column = styled.div`
  background: rgba(45, 26, 26, 0.8);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 69, 0, 0.3);
`;

const ColumnTitle = styled.h2`
  color: #ff8c00;
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
  border: 2px solid #ff4500;
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
    border-color: #ff8c00;
    box-shadow: 0 0 10px rgba(255, 140, 0, 0.3);
  }
`;

const AddButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: linear-gradient(135deg, #ff4500 0%, #ff8c00 100%);
  border: none;
  border-radius: 10px;
  color: #ffffff;
  font-size: 1rem;
  font-family: 'Nunito', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #ff8c00 0%, #ff4500 100%);
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
  border-left: 3px solid #ff4500;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #ff4500;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    color: #ff8c00;
    transform: scale(1.1);
  }
`;

const BackButton = styled.button`
  position: fixed;
  top: 2rem;
  left: 2rem;
  padding: 0.8rem 1.5rem;
  background: rgba(45, 26, 26, 0.8);
  border: 1px solid rgba(255, 69, 0, 0.3);
  border-radius: 10px;
  color: #ffffff;
  font-size: 1rem;
  font-family: 'Nunito', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 3;

  &:hover {
    background: rgba(255, 69, 0, 0.3);
    transform: translateY(-2px);
  }
`;

interface ConfidenceData {
  strengths: Array<{ text: string; timestamp: number }>;
  challenges: Array<{ text: string; timestamp: number }>;
}

const ConfidencePage = () => {
  const router = useRouter();
  const [confidenceData, setConfidenceData] = useState<ConfidenceData>({ strengths: [], challenges: [] });
  const [newStrengthText, setNewStrengthText] = useState('');
  const [newChallengeText, setNewChallengeText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [levelId, setLevelId] = useState<string | null>(null);

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
  }, []);

  useEffect(() => {
    if (levelId) {
      fetchConfidenceData();
    }
  }, [levelId]);

  const fetchConfidenceData = async () => {
    try {
      const response = await fetch(`/api/level/${levelId}`);
      if (!response.ok) throw new Error('Failed to load confidence data');
      const data = await response.json();
      setConfidenceData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load confidence data');
    }
  };

  const handleAddStrength = async () => {
    if (!newStrengthText.trim() || !levelId) return;
    try {
      const response = await fetch(`/api/level/${levelId}/gain`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newStrengthText }),
      });
      if (!response.ok) throw new Error('Failed to add strength');
      const newItem = await response.json();
      setConfidenceData(prev => ({
        ...prev,
        strengths: [...prev.strengths, newItem],
      }));
      setNewStrengthText('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add strength');
    }
  };

  const handleAddChallenge = async () => {
    if (!newChallengeText.trim() || !levelId) return;
    try {
      const response = await fetch(`/api/level/${levelId}/lose`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newChallengeText }),
      });
      if (!response.ok) throw new Error('Failed to add challenge');
      const newItem = await response.json();
      setConfidenceData(prev => ({
        ...prev,
        challenges: [...prev.challenges, newItem],
      }));
      setNewChallengeText('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add challenge');
    }
  };

  const handleDeleteStrength = async (timestamp: number) => {
    if (!levelId) return;
    try {
      const response = await fetch(`/api/level/${levelId}/gain/${timestamp}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete strength');
      setConfidenceData(prev => ({
        ...prev,
        strengths: prev.strengths.filter(item => item.timestamp !== timestamp),
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete strength');
    }
  };

  const handleDeleteChallenge = async (timestamp: number) => {
    if (!levelId) return;
    try {
      const response = await fetch(`/api/level/${levelId}/lose/${timestamp}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete challenge');
      setConfidenceData(prev => ({
        ...prev,
        challenges: prev.challenges.filter(item => item.timestamp !== timestamp),
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete challenge');
    }
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <PageContainer>
      <PhoenixBackground />
      <AshesContainer />
      <BackButton onClick={() => router.push('/')}>Back to Map</BackButton>
      <ContentContainer>
        <Title>Confidence</Title>
        <Description>
          Confidence is like a phoenix rising from the ashes. It's about recognizing your inner strength,
          embracing your unique qualities, and believing in your ability to overcome challenges.
          Track what builds your confidence and what challenges it to help you grow stronger.
        </Description>
        <ColumnsContainer>
          <Column>
            <ColumnTitle>Inner Strengths</ColumnTitle>
            <InputContainer>
              <Input
                type="text"
                placeholder="What builds your confidence?"
                value={newStrengthText}
                onChange={(e) => setNewStrengthText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddStrength()}
              />
              <AddButton onClick={handleAddStrength}>Add</AddButton>
            </InputContainer>
            <ItemList>
              {confidenceData.strengths?.map((item) => (
                <Item key={item.timestamp}>
                  {item.text}
                  <DeleteButton onClick={() => handleDeleteStrength(item.timestamp)}>×</DeleteButton>
                </Item>
              ))}
            </ItemList>
          </Column>
          <Column>
            <ColumnTitle>Confidence Challenges</ColumnTitle>
            <InputContainer>
              <Input
                type="text"
                placeholder="What challenges your confidence?"
                value={newChallengeText}
                onChange={(e) => setNewChallengeText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddChallenge()}
              />
              <AddButton onClick={handleAddChallenge}>Add</AddButton>
            </InputContainer>
            <ItemList>
              {confidenceData.challenges?.map((item) => (
                <Item key={item.timestamp}>
                  {item.text}
                  <DeleteButton onClick={() => handleDeleteChallenge(item.timestamp)}>×</DeleteButton>
                </Item>
              ))}
            </ItemList>
          </Column>
        </ColumnsContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default ConfidencePage; 