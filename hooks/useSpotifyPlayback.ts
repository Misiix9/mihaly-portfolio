import { useState, useEffect } from 'react';

interface SpotifyPlayback {
  isPlaying: boolean;
  track: string | null;
  artist: string | null;
  album: string | null;
  albumArt: string | null;
  url: string | null;
  isLoading: boolean;
  error: string | null;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export function useSpotifyPlayback() {
  const [data, setData] = useState<SpotifyPlayback>({
    isPlaying: false,
    track: null,
    artist: null,
    album: null,
    albumArt: null,
    url: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      // If no API URL is set, use fallback data
      if (!API_URL) {
        setData({
          isPlaying: true,
          track: 'Blinding Lights',
          artist: 'The Weeknd',
          album: 'After Hours',
          albumArt: null,
          url: null,
          isLoading: false,
          error: null,
        });
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/spotify`);
        if (!response.ok) throw new Error('Failed to fetch');
        
        const result = await response.json();
        setData({
          isPlaying: result.isPlaying,
          track: result.track,
          artist: result.artist,
          album: result.album,
          albumArt: result.albumArt,
          url: result.url,
          isLoading: false,
          error: null,
        });
      } catch (err) {
        console.error('Spotify fetch error:', err);
        // Use fallback data on error
        setData({
          isPlaying: false,
          track: 'Not connected',
          artist: null,
          album: null,
          albumArt: null,
          url: null,
          isLoading: false,
          error: 'Using cached data',
        });
      }
    };

    fetchData();

    // Refresh every 30 seconds
    const interval = setInterval(fetchData, 30 * 1000);
    return () => clearInterval(interval);
  }, []);

  return data;
}
