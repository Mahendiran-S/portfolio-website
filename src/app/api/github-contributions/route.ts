import { NextResponse } from 'next/server';

export interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
  contributionLevel: 'NONE' | 'FIRST_QUARTILE' | 'SECOND_QUARTILE' | 'THIRD_QUARTILE' | 'FOURTH_QUARTILE';
  weekday: number;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionMonth {
  name: string;
  firstDay: string;
  totalWeeks: number;
}

export interface GithubLanguageData {
  name: string;
  percentage: number;
  color: string;
}

export interface GithubContributionsResponse {
  username: string;
  name: string;
  avatarUrl: string;
  bio: string;
  followersCount: number;
  reposCount: number;
  totalStars: number;
  totalForks: number;
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  weeks: ContributionWeek[];
  months: ContributionMonth[];
  languages: GithubLanguageData[];
  isFallback: boolean;
  errorMessage?: string;
}

// Deterministic fallback generator if GitHub API is unavailable or rate-limited
function generateFallbackData(username: string): GithubContributionsResponse {
  const weeks: ContributionWeek[] = [];
  const today = new Date();
  let totalContribs = 0;
  let allDays: { date: string; count: number }[] = [];

  // Generate 52 weeks (364 days)
  for (let w = 0; w < 52; w++) {
    const days: ContributionDay[] = [];
    for (let d = 0; d < 7; d++) {
      const dayOffset = (51 - w) * 7 + (6 - d);
      const dateObj = new Date(today);
      dateObj.setDate(dateObj.getDate() - dayOffset);
      const dateStr = dateObj.toISOString().split('T')[0];

      // Deterministic count based on position
      const pseudoCount = (w * 5 + d * 11 + 3) % 9;
      const count = pseudoCount > 6 ? pseudoCount * 2 : pseudoCount > 2 ? pseudoCount : 0;
      totalContribs += count;
      allDays.push({ date: dateStr, count });

      let level: ContributionDay['contributionLevel'] = 'NONE';
      let color = '#161b22';

      if (count > 0 && count <= 2) {
        level = 'FIRST_QUARTILE';
        color = '#0e4429';
      } else if (count > 2 && count <= 5) {
        level = 'SECOND_QUARTILE';
        color = '#006d32';
      } else if (count > 5 && count <= 8) {
        level = 'THIRD_QUARTILE';
        color = '#26a641';
      } else if (count > 8) {
        level = 'FOURTH_QUARTILE';
        color = '#39d353';
      }

      days.push({
        date: dateStr,
        contributionCount: count,
        color,
        contributionLevel: level,
        weekday: d,
      });
    }
    weeks.push({ contributionDays: days });
  }

  // Calculate streaks
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  for (let i = allDays.length - 1; i >= 0; i--) {
    if (allDays[i].count > 0) {
      currentStreak++;
    } else {
      break;
    }
  }

  for (const day of allDays) {
    if (day.count > 0) {
      tempStreak++;
      if (tempStreak > longestStreak) longestStreak = tempStreak;
    } else {
      tempStreak = 0;
    }
  }

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const months: ContributionMonth[] = [];
  let currentMonthIndex = -1;

  weeks.forEach((week, wIdx) => {
    const firstDayStr = week.contributionDays[0]?.date;
    if (firstDayStr) {
      const monthIdx = new Date(firstDayStr).getMonth();
      if (monthIdx !== currentMonthIndex) {
        currentMonthIndex = monthIdx;
        months.push({
          name: monthNames[monthIdx],
          firstDay: firstDayStr,
          totalWeeks: 1,
        });
      } else if (months.length > 0) {
        months[months.length - 1].totalWeeks++;
      }
    }
  });

  return {
    username,
    name: 'Mahendiran S',
    avatarUrl: 'https://github.com/Mahendiran-S.png',
    bio: 'Software Developer & IT Student. Building scalable web applications.',
    followersCount: 18,
    reposCount: 24,
    totalStars: 42,
    totalForks: 12,
    totalContributions: totalContribs || 480,
    currentStreak: currentStreak || 7,
    longestStreak: longestStreak || 21,
    weeks,
    months,
    languages: [
      { name: 'TypeScript', percentage: 42, color: '#3178c6' },
      { name: 'JavaScript', percentage: 28, color: '#f7df1e' },
      { name: 'Java', percentage: 15, color: '#b07219' },
      { name: 'HTML/CSS', percentage: 10, color: '#e34c26' },
      { name: 'Other', percentage: 5, color: '#8b949e' },
    ],
    isFallback: true,
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username') || 'Mahendiran-S';

  const token = process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  if (!token) {
    const fallback = generateFallbackData(username);
    return NextResponse.json(fallback, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        name
        bio
        avatarUrl
        url
        followers {
          totalCount
        }
        repositories(first: 100, isFork: false, ownerAffiliations: OWNER) {
          totalCount
          nodes {
            stargazerCount
            forkCount
            primaryLanguage {
              name
              color
            }
          }
        }
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                color
                contributionLevel
                weekday
              }
            }
            months {
              name
              firstDay
              totalWeeks
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Mahendiran-Portfolio-App',
      },
      body: JSON.stringify({ query, variables: { username } }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.warn(`GitHub GraphQL API returned status ${res.status}`);
      return NextResponse.json(generateFallbackData(username));
    }

    const result = await res.json();

    if (result.errors || !result.data?.user) {
      console.warn('GitHub GraphQL errors or user missing:', result.errors);
      return NextResponse.json(generateFallbackData(username));
    }

    const userData = result.data.user;
    const calendar = userData.contributionsCollection?.contributionCalendar;

    if (!calendar) {
      return NextResponse.json(generateFallbackData(username));
    }

    // Process Repositories & Language Breakdown
    const repos = userData.repositories?.nodes || [];
    let totalStars = 0;
    let totalForks = 0;
    const langCounts: Record<string, { count: number; color: string }> = {};
    let totalLangsCount = 0;

    repos.forEach((repo: any) => {
      totalStars += repo.stargazerCount || 0;
      totalForks += repo.forkCount || 0;
      if (repo.primaryLanguage) {
        const { name, color } = repo.primaryLanguage;
        if (!langCounts[name]) {
          langCounts[name] = { count: 0, color: color || '#8b949e' };
        }
        langCounts[name].count += 1;
        totalLangsCount += 1;
      }
    });

    const languages: GithubLanguageData[] = Object.entries(langCounts)
      .map(([name, data]) => ({
        name,
        percentage: Math.round((data.count / (totalLangsCount || 1)) * 100),
        color: data.color,
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5);

    // Flatten all contribution days for streak calculation
    const allDays: ContributionDay[] = [];
    const weeks: ContributionWeek[] = (calendar.weeks || []).map((w: any) => ({
      contributionDays: (w.contributionDays || []).map((d: any) => {
        const dayObj: ContributionDay = {
          date: d.date,
          contributionCount: d.contributionCount,
          color: d.color,
          contributionLevel: d.contributionLevel,
          weekday: d.weekday,
        };
        allDays.push(dayObj);
        return dayObj;
      }),
    }));

    // Calculate Streaks
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    for (let i = allDays.length - 1; i >= 0; i--) {
      if (allDays[i].contributionCount > 0) {
        currentStreak++;
      } else {
        break;
      }
    }

    for (const day of allDays) {
      if (day.contributionCount > 0) {
        tempStreak++;
        if (tempStreak > longestStreak) longestStreak = tempStreak;
      } else {
        tempStreak = 0;
      }
    }

    const months: ContributionMonth[] = (calendar.months || []).map((m: any) => ({
      name: m.name,
      firstDay: m.firstDay,
      totalWeeks: m.totalWeeks,
    }));

    const responsePayload: GithubContributionsResponse = {
      username,
      name: userData.name || 'Mahendiran S',
      avatarUrl: userData.avatarUrl || 'https://github.com/Mahendiran-S.png',
      bio: userData.bio || 'Software Developer & IT Student.',
      followersCount: userData.followers?.totalCount || 0,
      reposCount: userData.repositories?.totalCount || 0,
      totalStars,
      totalForks,
      totalContributions: calendar.totalContributions || 0,
      currentStreak,
      longestStreak,
      weeks,
      months,
      languages: languages.length > 0 ? languages : [
        { name: 'TypeScript', percentage: 50, color: '#3178c6' },
        { name: 'JavaScript', percentage: 30, color: '#f7df1e' },
        { name: 'Java', percentage: 20, color: '#b07219' },
      ],
      isFallback: false,
    };

    return NextResponse.json(responsePayload, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (err: any) {
    console.error('GitHub GraphQL API Error:', err);
    return NextResponse.json(generateFallbackData(username));
  }
}
