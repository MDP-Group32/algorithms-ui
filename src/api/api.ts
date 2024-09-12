import { AlgorithmServerRequest } from '@/schemas/algorithm';

const serverUrl = "http://127.0.0.1:8000";

// Helper functions
const handleResponse = async (response: Response) => {
  if (response.ok) return response.json();

  // Status not ok
  try {
    const data = await response.json();
    return Promise.reject(data || response.status);
  } catch {
    // Could not parse the JSON
    return Promise.reject(response.status);
  }
};

// Standalone get function
export const getServerStatus = async () => {
  const requestOptions: RequestInit = {
    method: "GET",
    credentials: "include",
  };
  const response = await fetch(serverUrl + '/', requestOptions);
  return handleResponse(response);
};

export const getAlgoOutput = async (algoInput: AlgorithmServerRequest) => {
  const requestOptions: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(algoInput),
  };
  const response = await fetch(serverUrl + '/algorithm/simulator/shortest_path', requestOptions);
  return handleResponse(response);
}