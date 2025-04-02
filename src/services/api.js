const API_URL = 'http://localhost:5000/api';

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

export const getLevel = async (levelId) => {
  const response = await fetch(`${API_URL}/level/${levelId}`, {
    method: 'GET',
    headers: defaultHeaders
  });
  if (!response.ok) {
    throw new Error('Failed to fetch level data');
  }
  return response.json();
};

export const addGainItem = async (levelId, text) => {
  const response = await fetch(`${API_URL}/level/${levelId}/gain`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify({ text }),
  });
  if (!response.ok) {
    throw new Error('Failed to add gain item');
  }
  return response.json();
};

export const addLoseItem = async (levelId, text) => {
  const response = await fetch(`${API_URL}/level/${levelId}/lose`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify({ text }),
  });
  if (!response.ok) {
    throw new Error('Failed to add lose item');
  }
  return response.json();
};

export const removeGainItem = async (levelId, timestamp) => {
  const response = await fetch(`${API_URL}/level/${levelId}/gain/${timestamp}`, {
    method: 'DELETE',
    headers: defaultHeaders
  });
  if (!response.ok) {
    throw new Error('Failed to remove gain item');
  }
  return response.json();
};

export const removeLoseItem = async (levelId, timestamp) => {
  const response = await fetch(`${API_URL}/level/${levelId}/lose/${timestamp}`, {
    method: 'DELETE',
    headers: defaultHeaders
  });
  if (!response.ok) {
    throw new Error('Failed to remove lose item');
  }
  return response.json();
}; 