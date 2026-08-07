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

export interface PinnedRepoData {
  name: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: string;
  languageColor: string;
  updated: string;
}

export interface GithubCombinedResponse {
  username: string;
  name: string;
  avatarUrl: string;
  bio: string;
  followersCount: number;
  followingCount: number;
  reposCount: number;
  totalStars: number;
  totalForks: number;
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  weeks: ContributionWeek[];
  months: ContributionMonth[];
  languages: GithubLanguageData[];
  pinnedRepos: PinnedRepoData[];
  isFallback: boolean;
  errorMessage?: string;
}

function generateFallbackData(username: string): GithubCombinedResponse {
  const weeks: ContributionWeek[] = [];
  const today = new Date();
  let totalContribs = 0;
  let allDays: { date: string; count: number }[] = [];

  for (let w = 0; w < 52; w++) {
    const days: ContributionDay[] = [];
    for (let d = 0; d < 7; d++) {
      const dayOffset = (51 - w) * 7 + (6 - d);
      const dateObj = new Date(today);
      dateObj.setDate(dateObj.getDate() - dayOffset);
      const dateStr = dateObj.toISOString().split('T')[0];

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

  weeks.forEach((week) => {
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
    followingCount: 12,
    reposCount: 24,
    totalStars: 42,
    totalForks: 12,
    totalContributions: totalContribs || 480,
    currentStreak: currentStreak || 7,
    longestStreak: longestStreak || 21,
    weeks,
    months,
    languages: [
      { name: 'TypeScript', percentage: 45, color: '#3178c6' },
      { name: 'JavaScript', percentage: 30, color: '#f7df1e' },
      { name: 'Java', percentage: 15, color: '#b07219' },
      { name: 'HTML/CSS', percentage: 10, color: '#e34c26' },
    ],
    pinnedRepos: [
      {
        name: 'portfolio-website',
        description: 'Personal Portfolio built with Next.js 15, Tailwind CSS, Framer Motion, and Sanity CMS.',
        url: 'https://github.com/Mahendiran-S/portfolio-website',
        stars: 12,
        forks: 4,
        language: 'TypeScript',
        languageColor: '#3178c6',
        updated: 'Recent',
      },
      {
        name: 'fullstack-saas-platform',
        description: 'Production-ready SaaS platform with authentication, payments, and dashboard analytics.',
        url: 'https://github.com/Mahendiran-S',
        stars: 18,
        forks: 6,
        language: 'JavaScript',
        languageColor: '#f7df1e',
        updated: 'Recent',
      },
    ],
    isFallback: true,
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username') || 'Mahendiran-S';

  const token = process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  const headers: Record<string, string> = {
    'User-Agent': 'Mahendiran-Portfolio-App',
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `bearer ${token}`;
  }

  try {
    // REST API Calls (Profile & Public Repos)
    const restProfilePromise = fetch(`https://api.github.com/users/${username}`, {
      headers,
      next: { revalidate: 3600 },
    });

    const restReposPromise = fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
      headers,
      next: { revalidate: 3600 },
    });

    // GraphQL API Call (Contributions Calendar & Pinned Repos)
    const graphqlQuery = `
      query($username: String!) {
        user(login: $username) {
          name
          bio
          avatarUrl
          url
          followers { totalCount }
          following { totalCount }
          pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
              ... on Repository {
                name
                description
                url
                stargazerCount
                forkCount
                updatedAt
                primaryLanguage {
                  name
                  color
                }
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

    const graphqlPromise = fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers,
      body: JSON.stringify({ query: graphqlQuery, variables: { username } }),
      next: { revalidate: 3600 },
    });

    const [restProfileRes, restReposRes, graphqlRes] = await Promise.all([
      restProfilePromise,
      restReposPromise,
      graphqlPromise,
    ]);

    let restProfile: any = null;
    let restRepos: any[] = [];

    if (restProfileRes.ok) {
      restProfile = await restProfileRes.json();
    }
    if (restReposRes.ok) {
      restRepos = await restReposRes.json();
    }

    let graphqlData: any = null;
    if (graphqlRes.ok) {
      const gqlJson = await graphqlRes.json();
      graphqlData = gqlJson.data?.user;
    }

    if (!restProfile && !graphqlData) {
      return NextResponse.json(generateFallbackData(username));
    }

    // Merge REST Profile & GraphQL Data
    const name = restProfile?.name || graphqlData?.name || 'Mahendiran S';
    const avatarUrl = restProfile?.avatar_url || graphqlData?.avatarUrl || 'https://github.com/Mahendiran-S.png';
    const bio = restProfile?.bio || graphqlData?.bio || 'Software Developer & IT Student.';
    const followersCount = restProfile?.followers ?? graphqlData?.followers?.totalCount ?? 0;
    const followingCount = restProfile?.following ?? graphqlData?.following?.totalCount ?? 0;
    const reposCount = restProfile?.public_repos ?? 0;

    // Calculate Stars, Forks & Languages from REST repos
    let totalStars = 0;
    let totalForks = 0;
    const langCounts: Record<string, { count: number; color: string }> = {};
    let totalLangsCount = 0;

    if (Array.isArray(restRepos)) {
      restRepos.forEach((repo: any) => {
        totalStars += repo.stargazers_count || 0;
        totalForks += repo.forks_count || 0;
        if (repo.language) {
          if (!langCounts[repo.language]) {
            langCounts[repo.language] = { count: 0, color: '#3178c6' };
          }
          langCounts[repo.language].count += 1;
          totalLangsCount += 1;
        }
      });
    }

    const languages: GithubLanguageData[] = Object.entries(langCounts)
      .map(([langName, data]) => ({
        name: langName,
        percentage: Math.round((data.count / (totalLangsCount || 1)) * 100),
        color: data.color,
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5);

    // Process GraphQL Contribution Calendar
    const calendar = graphqlData?.contributionsCollection?.contributionCalendar;
    let weeks: ContributionWeek[] = [];
    let months: ContributionMonth[] = [];
    let allDays: ContributionDay[] = [];
    let totalContribs = calendar?.totalContributions || 0;

    if (calendar) {
      weeks = (calendar.weeks || []).map((w: any) => ({
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

      months = (calendar.months || []).map((m: any) => ({
        name: m.name,
        firstDay: m.firstDay,
        totalWeeks: m.totalWeeks,
      }));
    } else {
      const fallback = generateFallbackData(username);
      weeks = fallback.weeks;
      months = fallback.months;
    }

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

    // Process GraphQL Pinned Repositories
    const pinnedNodes = graphqlData?.pinnedItems?.nodes || [];
    let pinnedRepos: PinnedRepoData[] = [];

    if (Array.isArray(pinnedNodes) && pinnedNodes.length > 0) {
      pinnedRepos = pinnedNodes.map((repo: any) => ({
        name: repo.name,
        description: repo.description || 'GitHub Repository',
        url: repo.url,
        stars: repo.stargazerCount || 0,
        forks: repo.forkCount || 0,
        language: repo.primaryLanguage?.name || 'TypeScript',
        languageColor: repo.primaryLanguage?.color || '#3178c6',
        updated: repo.updatedAt ? new Date(repo.updatedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Recent',
      }));
    } else if (Array.isArray(restRepos) && restRepos.length > 0) {
      // Fallback: pick top 4 updated repos from REST API
      pinnedRepos = restRepos.slice(0, 4).map((repo: any) => ({
        name: repo.name,
        description: repo.description || 'GitHub Repository',
        url: repo.html_url,
        stars: repo.stargazers_count || 0,
        forks: repo.forks_count || 0,
        language: repo.language || 'TypeScript',
        languageColor: '#3178c6',
        updated: repo.updated_at ? new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Recent',
      }));
    }

    const payload: GithubCombinedResponse = {
      username,
      name,
      avatarUrl,
      bio,
      followersCount,
      followingCount,
      reposCount,
      totalStars,
      totalForks,
      totalContributions: totalContribs || 480,
      currentStreak,
      longestStreak,
      weeks,
      months,
      languages: languages.length > 0 ? languages : [
        { name: 'TypeScript', percentage: 45, color: '#3178c6' },
        { name: 'JavaScript', percentage: 30, color: '#f7df1e' },
        { name: 'Java', percentage: 15, color: '#b07219' },
      ],
      pinnedRepos,
      isFallback: false,
    };

    return NextResponse.json(payload, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (err: any) {
    console.error('GitHub API Combined Fetch Error:', err);
    return NextResponse.json(generateFallbackData(username));
  }
}
