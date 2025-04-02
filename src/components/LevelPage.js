import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { getLevel, addGainItem, addLoseItem, removeGainItem, removeLoseItem } from '../services/api';

const LevelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #2c3e50;
  position: relative;
  overflow: hidden;
`;

const GalaxyBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50vh;
  background: linear-gradient(135deg, #1a0f3c 0%, #2d1b4d 50%, #3d2b5d 100%);
  overflow: hidden;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&q=80');
    background-size: cover;
    background-position: center;
    opacity: 0.7;
    mix-blend-mode: screen;
    animation: nebulaPulse 8s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 30%, rgba(255, 0, 128, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(0, 255, 255, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 50%);
    mix-blend-mode: screen;
    animation: colorPulse 8s ease-in-out infinite;
  }

  @keyframes nebulaPulse {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 0.8; }
  }

  @keyframes colorPulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 0.8; }
  }
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 800px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;
`;

const LevelTitle = styled.h1`
  color: #ecf0f1;
  font-size: 3rem;
  margin: 2rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  text-align: center;
  position: relative;
  z-index: 2;
`;

const BackButton = styled.button`
  background-color: #2d1b4d;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  position: fixed;
  top: 2rem;
  left: 2rem;
  z-index: 3;

  &:hover {
    background-color: #3d2b5d;
  }
`;

const LevelContent = styled.div`
  background-color: rgba(52, 73, 94, 0.9);
  padding: 2rem;
  border-radius: 20px;
  color: #ecf0f1;
  width: 100%;
  text-align: center;
  margin: 2rem 0;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Description = styled.p`
  font-family: 'Nunito', sans-serif;
  font-size: 1.2rem;
  line-height: 1.6;
  color: #ecf0f1;
  text-align: center;
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: rgba(52, 73, 94, 0.9);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 2;
`;

const EnergyColumns = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
  max-width: 1000px;
  margin: 2rem 0;
  position: relative;
  z-index: 2;
`;

const EnergyColumn = styled.div`
  flex: 1;
  background: rgba(52, 73, 94, 0.9);
  border-radius: 20px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const ColumnTitle = styled.h2`
  color: #ecf0f1;
  font-size: 1.8rem;
  margin: 0 0 1.5rem 0;
  text-align: center;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.8rem;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: #ecf0f1;
  font-size: 1rem;
  font-family: 'Nunito', sans-serif;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: #00bfff;
  }
`;

const AddButton = styled.button`
  padding: 0.8rem 1.2rem;
  background: #00bfff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background: #0099cc;
  }
`;

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Item = styled.li`
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  color: #ecf0f1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemText = styled.span`
  flex: 1;
  margin-right: 1rem;
  font-family: 'Nunito', sans-serif;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  padding: 0.2rem 0.5rem;
  font-size: 1.2rem;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const LoadingMessage = styled.div`
  color: #ecf0f1;
  font-size: 1.5rem;
  text-align: center;
  margin-top: 2rem;
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 1.5rem;
  text-align: center;
  margin-top: 2rem;
  background: rgba(231, 76, 60, 0.1);
  padding: 1rem;
  border-radius: 8px;
`;

const LevelPage = () => {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const [gainItems, setGainItems] = useState([]);
  const [loseItems, setLoseItems] = useState([]);
  const [newGainItem, setNewGainItem] = useState('');
  const [newLoseItem, setNewLoseItem] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLevelData = async () => {
      if (!levelId) {
        setError('Invalid level ID');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getLevel(levelId);
        setGainItems(data.gainItems || []);
        setLoseItems(data.loseItems || []);
        setError(null);
      } catch (err) {
        setError('Failed to load level data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLevelData();
  }, [levelId]);

  const handleAddGainItem = async () => {
    if (!levelId) return;
    if (newGainItem.trim()) {
      try {
        const data = await addGainItem(levelId, newGainItem.trim());
        setGainItems(data.gainItems);
        setNewGainItem('');
      } catch (err) {
        setError('Failed to add item');
        console.error(err);
      }
    }
  };

  const handleAddLoseItem = async () => {
    if (!levelId) return;
    if (newLoseItem.trim()) {
      try {
        const data = await addLoseItem(levelId, newLoseItem.trim());
        setLoseItems(data.loseItems);
        setNewLoseItem('');
      } catch (err) {
        setError('Failed to add item');
        console.error(err);
      }
    }
  };

  const handleRemoveGainItem = async (timestamp) => {
    if (!levelId) return;
    try {
      const data = await removeGainItem(levelId, timestamp);
      setGainItems(data.gainItems);
    } catch (err) {
      setError('Failed to remove item');
      console.error(err);
    }
  };

  const handleRemoveLoseItem = async (timestamp) => {
    if (!levelId) return;
    try {
      const data = await removeLoseItem(levelId, timestamp);
      setLoseItems(data.loseItems);
    } catch (err) {
      setError('Failed to remove item');
      console.error(err);
    }
  };

  const handleKeyPress = (e, handler) => {
    if (e.key === 'Enter') {
      handler();
    }
  };

  if (loading) {
    return (
      <LevelContainer>
        <ContentContainer>
          <LoadingMessage>Loading...</LoadingMessage>
        </ContentContainer>
      </LevelContainer>
    );
  }

  if (error) {
    return (
      <LevelContainer>
        <ContentContainer>
          <ErrorMessage>{error}</ErrorMessage>
        </ContentContainer>
      </LevelContainer>
    );
  }

  return (
    <LevelContainer>
      {levelId === '1' && <GalaxyBackground />}
      <BackButton onClick={() => navigate('/')}>
        Back to Map
      </BackButton>
      <ContentContainer>
        <LevelTitle>{levelId === '1' ? 'Energy' : `Level ${levelId}`}</LevelTitle>
        {levelId === '1' && (
          <Description>
            Energy is the foundation of everything we do. It's the fuel that powers our thoughts, actions, and emotions. When our energy is high, we feel vibrant, motivated, and ready to take on the world. When it's low, even simple tasks can feel overwhelming. Understanding what gives us energy and what drains it is the first step to managing it effectively.
          </Description>
        )}
        <EnergyColumns>
          <EnergyColumn>
            <ColumnTitle>Gain Energy</ColumnTitle>
            <InputContainer>
              <Input
                type="text"
                value={newGainItem}
                onChange={(e) => setNewGainItem(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, handleAddGainItem)}
                placeholder="What gives you energy?"
              />
              <AddButton onClick={handleAddGainItem}>+</AddButton>
            </InputContainer>
            <ItemList>
              {gainItems.map((item) => (
                <Item key={item.timestamp}>
                  <ItemText>{item.text}</ItemText>
                  <DeleteButton onClick={() => handleRemoveGainItem(item.timestamp)}>×</DeleteButton>
                </Item>
              ))}
            </ItemList>
          </EnergyColumn>
          <EnergyColumn>
            <ColumnTitle>Lose Energy</ColumnTitle>
            <InputContainer>
              <Input
                type="text"
                value={newLoseItem}
                onChange={(e) => setNewLoseItem(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, handleAddLoseItem)}
                placeholder="What drains your energy?"
              />
              <AddButton onClick={handleAddLoseItem}>+</AddButton>
            </InputContainer>
            <ItemList>
              {loseItems.map((item) => (
                <Item key={item.timestamp}>
                  <ItemText>{item.text}</ItemText>
                  <DeleteButton onClick={() => handleRemoveLoseItem(item.timestamp)}>×</DeleteButton>
                </Item>
              ))}
            </ItemList>
          </EnergyColumn>
        </EnergyColumns>
      </ContentContainer>
    </LevelContainer>
  );
};

export default LevelPage; 