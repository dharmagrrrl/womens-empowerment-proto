'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from '@emotion/styled';
import ResetProgressButton from './ResetProgressButton';

const MapContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a472a 0%, #2d5a3f 100%);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const MapTitle = styled.h1`
  color: #ffd700;
  font-size: 3.5rem;
  margin: 2rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  font-family: 'Nunito', sans-serif;
  text-align: center;
`;

const PathContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
`;

const PathSVG = styled.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: visible;
`;

const BrickPattern = styled.pattern`
  patternUnits: userSpaceOnUse;
  width: 40px;
  height: 20px;
  patternTransform: rotate(0);
`;

const BrickRect = styled.rect`
  width: 40px;
  height: 20px;
  fill: #ffd700;
  stroke: #ffc800;
  stroke-width: 1;
`;

const PathElement = styled.path`
  stroke: #ffd700;
  stroke-width: 30;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
  filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.5));
`;

const GlowEffect = styled.path`
  stroke: rgba(255, 215, 0, 0.3);
  stroke-width: 40;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
  filter: blur(10px);
`;

const LevelGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  padding: 4rem 2rem;
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
`;

const LevelButton = styled.button<{ active: boolean; current: boolean }>`
  position: relative;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: ${props => props.active 
    ? 'linear-gradient(135deg, #4a90e2 0%, #6ba4e7 100%)'
    : 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)'};
  border: ${props => props.current 
    ? '4px solid #ffd700'
    : props.active 
      ? '4px solid rgba(255, 255, 255, 0.3)'
      : '4px solid rgba(255, 255, 255, 0.1)'};
  color: ${props => props.active ? '#ffffff' : 'rgba(255, 255, 255, 0.5)'};
  font-size: 1.5rem;
  font-family: 'Nunito', sans-serif;
  cursor: ${props => props.active ? 'pointer' : 'not-allowed'};
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: ${props => props.current 
    ? '0 0 20px rgba(255, 215, 0, 0.5)'
    : props.active 
      ? '0 8px 32px rgba(0, 0, 0, 0.3)'
      : '0 4px 16px rgba(0, 0, 0, 0.2)'};

  &:hover {
    transform: ${props => props.active ? 'translateY(-5px)' : 'none'};
  }

  &::before {
    content: '';
    position: absolute;
    top: -8px;
    right: -8px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${props => props.active 
      ? props.current 
        ? '#ffd700'
        : '#4caf50'
      : '#95a5a6'};
    border: 2px solid #ffffff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
`;

const LevelStatus = styled.div<{ active: boolean }>`
  font-size: 0.9rem;
  margin-top: 0.5rem;
  color: ${props => props.active ? '#4caf50' : '#95a5a6'};
  font-weight: 600;
`;

const LockIcon = styled.div`
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.3);
  margin-top: 0.5rem;
  pointer-events: none;
`;

interface Level {
  id: number;
  name: string;
  active: boolean;
}

const MapPage = () => {
  const router = useRouter();
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [levels, setLevels] = useState<Level[]>([
    { id: 1, name: 'Energy', active: true },
    { id: 2, name: 'Confidence', active: false },
    { id: 3, name: 'Focus', active: false },
    { id: 4, name: 'Balance', active: false },
    { id: 5, name: 'Self-Esteem', active: false },
    { id: 6, name: 'Strength', active: false },
  ]);
  
  const [levelPositions, setLevelPositions] = React.useState<Array<{x: number, y: number}>>([]);
  const levelRefs = React.useRef<Array<HTMLButtonElement | null>>(Array(levels.length).fill(null));

  // Fetch progress data when component mounts
  useEffect(() => {
    fetchProgress();
  }, []);

  // Function to fetch progress data
  const fetchProgress = async () => {
    try {
      const response = await fetch('/api/progress');
      if (response.ok) {
        const data = await response.json();
        setCurrentLevel(data.currentLevel);
        
        // Update levels based on current progress
        setLevels(prev => prev.map(level => ({
          ...level,
          active: level.id <= data.currentLevel
        })));
      }
    } catch (error) {
      console.error('Failed to fetch progress:', error);
    }
  };
  
  React.useEffect(() => {
    // Update positions when component mounts or window resizes
    const updatePositions = () => {
      const positions = levelRefs.current.map(ref => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
          };
        }
        return { x: 0, y: 0 };
      });
      setLevelPositions(positions);
    };
    
    updatePositions();
    window.addEventListener('resize', updatePositions);
    
    return () => {
      window.removeEventListener('resize', updatePositions);
    };
  }, []);
  
  const generatePathData = () => {
    if (levelPositions.length < 2) return '';
    
    let pathData = `M ${levelPositions[0].x} ${levelPositions[0].y}`;
    
    for (let i = 1; i < levelPositions.length; i++) {
      const prev = levelPositions[i-1];
      const curr = levelPositions[i];
      
      const dx = curr.x - prev.x;
      const dy = curr.y - prev.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (Math.abs(dx) > Math.abs(dy)) {
        const midY = prev.y + (Math.random() * 0.4 - 0.2) * distance;
        const controlX1 = prev.x + distance * 0.25;
        const controlY1 = midY;
        const controlX2 = curr.x - distance * 0.25;
        const controlY2 = midY;
        
        pathData += ` C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${curr.x} ${curr.y}`;
      } else {
        const midX = prev.x + (Math.random() * 0.4 - 0.2) * distance;
        const controlX1 = midX;
        const controlY1 = prev.y + distance * 0.25;
        const controlX2 = midX;
        const controlY2 = curr.y - distance * 0.25;
        
        pathData += ` C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${curr.x} ${curr.y}`;
      }
    }
    
    return pathData;
  };

  const handleLevelClick = (level: Level) => {
    if (level.active) {
      router.push(`/level/${level.id}`);
    }
  };

  return (
    <MapContainer>
      <MapTitle>EmpowerU</MapTitle>
      <PathContainer>
        <PathSVG>
          <defs>
            <BrickPattern id="brickPattern">
              <BrickRect />
            </BrickPattern>
          </defs>
          <GlowEffect d={generatePathData()} />
          <PathElement d={generatePathData()} />
        </PathSVG>
      </PathContainer>
      <LevelGrid>
        {levels.map((level, index) => (
          <LevelButton
            key={level.id}
            ref={el => { levelRefs.current[index] = el; }}
            active={level.active}
            current={level.id === currentLevel}
            onClick={() => handleLevelClick(level)}
            style={{
              gridColumn: index % 3 + 1,
              gridRow: Math.floor(index / 3) + 1,
            }}
          >
            {level.name}
            <LevelStatus active={level.active}>
              {level.active 
                ? level.id === currentLevel 
                  ? 'Current Level'
                  : 'Unlocked'
                : 'Locked'}
            </LevelStatus>
            {!level.active && <LockIcon>🔒</LockIcon>}
          </LevelButton>
        ))}
      </LevelGrid>
      <ResetProgressButton />
    </MapContainer>
  );
};

export default MapPage; 