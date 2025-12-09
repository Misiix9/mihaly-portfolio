import type { VercelRequest, VercelResponse } from '@vercel/node';

interface GitHubEvent {
  type: string;
  created_at: string;
  payload: {
    commits?: Array<{ message: string }>;
    size?: number;
  };
}

interface ActivityDay {
  date: string;
  level: number; // 0-3
  commits: number;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const username = process.env.GITHUB_USERNAME || 'Misiix9';

  try {
    // Fetch recent events from GitHub API
    const response = await fetch(
      `https://api.github.com/users/${username}/events?per_page=100`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-API',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}`);
    }

    const events: GitHubEvent[] = await response.json();

    // Get dates for last 7 days
    const last7Days: ActivityDay[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      last7Days.push({ date: dateStr, level: 0, commits: 0 });
    }

    // Count commits per day
    let totalCommits = 0;
    events.forEach((event) => {
      if (event.type === 'PushEvent') {
        const eventDate = event.created_at.split('T')[0];
        const dayIndex = last7Days.findIndex((d) => d.date === eventDate);
        if (dayIndex !== -1) {
          const commitCount = event.payload.commits?.length || event.payload.size || 1;
          last7Days[dayIndex].commits += commitCount;
          totalCommits += commitCount;
        }
      }
    });

    // Calculate activity levels (0-3)
    const maxCommits = Math.max(...last7Days.map((d) => d.commits), 1);
    last7Days.forEach((day) => {
      if (day.commits === 0) {
        day.level = 0;
      } else if (day.commits <= maxCommits / 3) {
        day.level = 1;
      } else if (day.commits <= (maxCommits * 2) / 3) {
        day.level = 2;
      } else {
        day.level = 3;
      }
    });

    return res.status(200).json({
      username,
      totalCommits,
      levels: last7Days.map((d) => d.level),
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('GitHub API error:', error);
    return res.status(500).json({
      error: 'Failed to fetch GitHub data',
      fallback: {
        username,
        totalCommits: 0,
        levels: [0, 0, 0, 0, 0, 0, 0],
      },
    });
  }
}
