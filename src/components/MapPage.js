import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const MapContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a472a 0%, #2d5a3f 50%, #3d6b4f 100%);
  padding: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&q=80');
    opacity: 0.1;
    mix-blend-mode: overlay;
  }
`;

const MapTitle = styled.h1`
  color: #ffd700;
  font-size: 3.5rem;
  margin-bottom: 3rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  font-weight: 700;
  letter-spacing: -1px;
  text-align: center;
  position: relative;
  z-index: 2;
`;

const MapLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  max-width: 1200px;
  padding: 2rem;
  height: 100vh;
  justify-content: space-between;
`;

const RoadContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  pointer-events: none;
`;

const CurvedRoad = styled.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
`;

const RainbowContainer = styled.div`
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  height: 200px;
  z-index: 1;
  overflow: hidden;
`;

const Rainbow = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50% 50% 0 0;
  background: linear-gradient(
    to bottom,
    #ff0000 0%,
    #ff7f00 16.66%,
    #ffff00 33.33%,
    #00ff00 50%,
    #0000ff 66.66%,
    #4b0082 83.33%,
    #8f00ff 100%
  );
  opacity: 0.8;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  animation: rainbowGlow 3s ease-in-out infinite;
  transform: scale(3, 1.5);
  transform-origin: bottom center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, transparent 50%, #1a472a 51%);
    border-radius: 50% 50% 0 0;
    transform: scale(3, 1.5);
    transform-origin: bottom center;
  }

  @keyframes rainbowGlow {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 1; }
  }
`;

const Sparkle = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  animation: sparkle 1.5s ease-in-out infinite;
  opacity: 0;

  @keyframes sparkle {
    0%, 100% { transform: scale(0); opacity: 0; }
    50% { transform: scale(1); opacity: 1; }
  }
`;

const YellowBrickRoad = styled.div`
  position: absolute;
  background: linear-gradient(90deg, #ffd700 0%, #ffeb3b 50%, #ffd700 100%);
  width: 40px;
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 20px;
  opacity: 0.8;
  z-index: 1;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      rgba(0, 0, 0, 0.1) 10px,
      rgba(0, 0, 0, 0.1) 20px
    );
  }
`;

const LevelRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  z-index: 2;
  margin: 2rem 0;
`;

const LevelCard = styled.div`
  background: ${props => props.active ? 'linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)' : 'linear-gradient(135deg, #4a4a4a 0%, #666666 100%)'};
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  cursor: ${props => props.active ? 'pointer' : 'not-allowed'};
  opacity: ${props => props.active ? 1 : 0.5};
  transition: all 0.3s ease;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  width: 280px;
  margin: 0 1rem;
  position: relative;
  border: 3px solid ${props => props.active ? '#ffd700' : 'transparent'};
  transform: ${props => props.active ? 'scale(1)' : 'scale(0.95)'};

  &:hover {
    transform: ${props => props.active ? 'scale(1.05) translateY(-5px)' : 'scale(0.95)'};
    box-shadow: ${props => props.active ? '0 12px 24px rgba(0, 0, 0, 0.3)' : '0 8px 16px rgba(0, 0, 0, 0.2)'};
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -20px;
    width: 20px;
    height: 2px;
    background-color: ${props => props.active ? '#ffd700' : '#666666'};
    opacity: 0.5;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: -20px;
    width: 20px;
    height: 2px;
    background-color: ${props => props.active ? '#ffd700' : '#666666'};
    opacity: 0.5;
  }
`;

const LevelNumber = styled.h2`
  color: #ffffff;
  margin: 0;
  font-size: 1.8rem;
  line-height: 1.3;
  font-weight: 600;
  letter-spacing: -0.5px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;

const LevelStatus = styled.p`
  color: #ffffff;
  margin: 0.8rem 0 0;
  font-size: 1rem;
  font-weight: 400;
  opacity: 0.9;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;

const MapPage = () => {
  const navigate = useNavigate();
  const levels = [
    { id: 1, name: 'Energy', active: true },
    { id: 2, name: 'Confidence', active: false },
    { id: 3, name: 'Focus', active: false },
    { id: 4, name: 'Balance', active: false },
    { id: 5, name: 'Self-Esteem', active: false },
    { id: 6, name: 'Strength', active: false },
  ];

  const handleLevelClick = (level) => {
    if (level.active) {
      navigate(`/level/${level.id}`);
    }
  };

  return (
    <MapContainer>
      <MapTitle>EmpowerU</MapTitle>
      <RoadContainer>
        <YellowBrickRoad />
        <RainbowContainer>
          <Rainbow />
          {[...Array(12)].map((_, i) => (
            <Sparkle
              key={i}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </RainbowContainer>
      </RoadContainer>
      <MapLayout>
        <YellowBrickRoad />
        <LevelRow>
          <LevelCard
            active={levels[0].active}
            onClick={() => handleLevelClick(levels[0])}
          >
            <LevelNumber>{levels[0].name}</LevelNumber>
            <LevelStatus>{levels[0].active ? 'Available' : 'Locked'}</LevelStatus>
          </LevelCard>
        </LevelRow>
        <LevelRow>
          <LevelCard
            active={levels[1].active}
            onClick={() => handleLevelClick(levels[1])}
          >
            <LevelNumber>{levels[1].name}</LevelNumber>
            <LevelStatus>{levels[1].active ? 'Available' : 'Locked'}</LevelStatus>
          </LevelCard>
          <LevelCard
            active={levels[2].active}
            onClick={() => handleLevelClick(levels[2])}
          >
            <LevelNumber>{levels[2].name}</LevelNumber>
            <LevelStatus>{levels[2].active ? 'Available' : 'Locked'}</LevelStatus>
          </LevelCard>
        </LevelRow>
        <LevelRow>
          <LevelCard
            active={levels[3].active}
            onClick={() => handleLevelClick(levels[3])}
          >
            <LevelNumber>{levels[3].name}</LevelNumber>
            <LevelStatus>{levels[3].active ? 'Available' : 'Locked'}</LevelStatus>
          </LevelCard>
          <LevelCard
            active={levels[4].active}
            onClick={() => handleLevelClick(levels[4])}
          >
            <LevelNumber>{levels[4].name}</LevelNumber>
            <LevelStatus>{levels[4].active ? 'Available' : 'Locked'}</LevelStatus>
          </LevelCard>
        </LevelRow>
        <LevelRow>
          <LevelCard
            active={levels[5].active}
            onClick={() => handleLevelClick(levels[5])}
          >
            <LevelNumber>{levels[5].name}</LevelNumber>
            <LevelStatus>{levels[5].active ? 'Available' : 'Locked'}</LevelStatus>
          </LevelCard>
        </LevelRow>
      </MapLayout>
    </MapContainer>
  );
};

export default MapPage; 