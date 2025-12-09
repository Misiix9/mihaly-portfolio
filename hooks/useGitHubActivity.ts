import { useState, useEffect } from 'react';

interface GitHubActivity {
  totalCommits: number;
  levels: number[]; // Array of 7 numbers (0-3) representing activity levels for last 7 days
  lastUpdated: string;
  isLoading: boolean;
  error: string | null;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export function useGitHubActivity() {
  const [data, setData] = useState<GitHubActivity>({
    totalCommits: 0,
    levels: [0, 0, 0, 0, 0, 0, 0],
    lastUpdated: '',
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      // If no API URL is set, use fallback data
      if (!API_URL) {
        setData({
          totalCommits: 12,
          levels: [2, 3, 1, 3, 2, 3, 1],
          lastUpdated: new Date().toISOString(),
          isLoading: false,
          error: null,
        });
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/github`);
        if (!response.ok) throw new Error('Failed to fetch');
        
        const result = await response.json();
        setData({
          totalCommits: result.totalCommits,
          levels: result.levels,
          lastUpdated: result.lastUpdated,
          isLoading: false,
          error: null,
        });
      } catch (err) {
        console.error('GitHub fetch error:', err);
        // Use fallback data on error
        setData({
          totalCommits: 12,
          levels: [2, 3, 1, 3, 2, 3, 1],
          lastUpdated: new Date().toISOString(),
          isLoading: false,
          error: 'Using cached data',
        });
      }
    };

    fetchData();

    // Refresh every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return data;
}
