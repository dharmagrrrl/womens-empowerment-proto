'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styled from '@emotion/styled';

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

const LevelButton = styled.button<{ active: boolean }>`
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  border: 2px solid ${props => props.active ? '#ffd700' : 'rgba(255, 255, 255, 0.3)'};
  border-radius: 15px;
  padding: 2rem;
  color: white;
  font-size: 1.5rem;
  cursor: ${props => props.active ? 'pointer' : 'not-allowed'};
  transition: all 0.3s ease;
  font-family: 'Nunito', sans-serif;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  margin: 1rem;

  &:hover {
    transform: ${props => props.active ? 'translateY(-5px)' : 'none'};
    box-shadow: ${props => props.active ? '0 12px 40px rgba(0, 0, 0, 0.4)' : '0 8px 32px rgba(0, 0, 0, 0.3)'};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:hover::before {
    transform: translateX(100%);
  }
`;

const MapPage = () => {
  const router = useRouter();
  const levels = [
    { id: 1, name: 'Energy', active: true },
    { id: 2, name: 'Confidence', active: false },
    { id: 3, name: 'Focus', active: false },
    { id: 4, name: 'Balance', active: false },
    { id: 5, name: 'Self-Esteem', active: false },
    { id: 6, name: 'Strength', active: false },
  ];
  
  const [levelPositions, setLevelPositions] = React.useState<Array<{x: number, y: number}>>([]);
  const levelRefs = React.useRef<Array<HTMLButtonElement | null>>(Array(levels.length).fill(null));
  
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
  
  // Generate path data for connecting levels
  const generatePathData = () => {
    if (levelPositions.length < 2) return '';
    
    let pathData = `M ${levelPositions[0].x} ${levelPositions[0].y}`;
    
    for (let i = 1; i < levelPositions.length; i++) {
      const prev = levelPositions[i-1];
      const curr = levelPositions[i];
      
      // Calculate distance between points
      const dx = curr.x - prev.x;
      const dy = curr.y - prev.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Create a more interesting path with varying curves
      // For horizontal connections, add vertical curves
      // For vertical connections, add horizontal curves
      if (Math.abs(dx) > Math.abs(dy)) {
        // More horizontal connection
        const midY = prev.y + (Math.random() * 0.4 - 0.2) * distance;
        const controlX1 = prev.x + distance * 0.25;
        const controlY1 = midY;
        const controlX2 = curr.x - distance * 0.25;
        const controlY2 = midY;
        
        pathData += ` C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${curr.x} ${curr.y}`;
      } else {
        // More vertical connection
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

  const handleLevelClick = (level: { id: number; name: string; active: boolean }) => {
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
            onClick={() => handleLevelClick(level)}
            style={{
              gridColumn: index % 3 + 1,
              gridRow: Math.floor(index / 3) + 1,
            }}
          >
            {level.name}
          </LevelButton>
        ))}
      </LevelGrid>
    </MapContainer>
  );
};

export default MapPage; 