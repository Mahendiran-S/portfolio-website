"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GITHUB_STATS } from "@/data/portfolioData";
import { Star, GitFork, BookOpen, ExternalLink, Sparkles, Code2, Flame, Zap, AlertTriangle, Calendar } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";
import type { GithubContributionsResponse, ContributionDay } from "@/app/api/github-contributions/route";

export default function GithubSection() {
  const { profile, pinnedRepos } = GITHUB_STATS;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [telemetry, setTelemetry] = useState<GithubContributionsResponse | null>(null);
  const [hoveredDay, setHoveredDay] = useState<{ day: ContributionDay; x: number; y: number } | null>(null);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const res = await fetch(`/api/github-contributions?username=${profile.username}`);
        if (!res.ok) throw new Error("Failed to fetch contribution telemetry");
        const data: GithubContributionsResponse = await res.json();
        setTelemetry(data);
      } catch (err) {
        console.warn("Using default fallback contribution telemetry:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContributions();
  }, [profile.username]);

  const getSquareColorClass = (day: ContributionDay) => {
    if (day.contributionCount === 0) {
      return "bg-[#161b22] border border-white/[0.04]";
    }
    switch (day.contributionLevel) {
      case "FIRST_QUARTILE":
        return "bg-[#0e4429] border border-emerald-900/40";
      case "SECOND_QUARTILE":
        return "bg-[#006d32] border border-emerald-700/50";
      case "THIRD_QUARTILE":
        return "bg-[#26a641] shadow-[0_0_6px_rgba(38,166,65,0.4)]";
      case "FOURTH_QUARTILE":
        return "bg-[#39d353] shadow-[0_0_10px_rgba(57,211,83,0.6)]";
      default:
        return "bg-[#0e4429]";
    }
  };

  const formatDateLabel = (dateStr: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <section id="github" className="py-28 relative">
      <div className="w-[92%] max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col mb-14">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-400 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>06 / GRAPHQL OPEN SOURCE TELEMETRY</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-bold font-space tracking-tight text-white uppercase">
            GITHUB <span className="text-stroke-outline">CONTRIBUTIONS</span>
          </h2>
        </div>

        {/* Fallback Warning Notice if GitHub token missing/rate limited */}
        {telemetry?.isFallback && (
          <div className="mb-8 p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-amber-200 text-xs font-mono flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Live GitHub API Rate-Limited. Displaying cached telemetry snapshot.</span>
            </div>
            <span className="text-[10px] text-amber-400/80">Cached Snapshot</span>
          </div>
        )}

        {/* Top GitHub Profile & Language Composition Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          
          {/* Profile Header Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 glass-card rounded-3xl p-7 border border-white/10 flex flex-col justify-between"
          >
            {isLoading ? (
              <div className="animate-pulse space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-white/10" />
                  <div className="space-y-2 flex-1">
                    <div className="h-6 bg-white/10 rounded w-1/3" />
                    <div className="h-4 bg-white/10 rounded w-3/4" />
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-3 pt-6">
                  <div className="h-14 bg-white/10 rounded-xl" />
                  <div className="h-14 bg-white/10 rounded-xl" />
                  <div className="h-14 bg-white/10 rounded-xl" />
                  <div className="h-14 bg-white/10 rounded-xl" />
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/20 p-0.5 shrink-0 bg-white/5 shadow-xl">
                    <img
                      src={telemetry?.avatarUrl || profile.avatar}
                      alt={profile.username}
                      loading="lazy"
                      className="w-full h-full object-cover object-top rounded-xl"
                      onError={(e) => {
                        (e.target as HTMLElement).setAttribute("src", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80");
                      }}
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-2xl font-bold text-white font-space">@{telemetry?.username || profile.username}</h3>
                      <a
                        href={`https://github.com/${profile.username}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                        aria-label="View GitHub Profile"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed max-w-md">
                      {telemetry?.bio || profile.bio}
                    </p>
                  </div>
                </div>

                {/* Stat Cards Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10 text-center">
                  <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-center">
                    <div className="text-xl font-bold font-space text-white">{telemetry?.totalContributions ?? 480}</div>
                    <div className="text-[10px] font-mono text-gray-400">Total Commits</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-center">
                    <div className="text-xl font-bold font-space text-emerald-400 flex items-center justify-center gap-1">
                      <span>{telemetry?.currentStreak ?? 7}</span>
                      <Flame className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="text-[10px] font-mono text-gray-400">Current Streak</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-center">
                    <div className="text-xl font-bold font-space text-amber-400 flex items-center justify-center gap-1">
                      <span>{telemetry?.longestStreak ?? 21}</span>
                      <Zap className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="text-[10px] font-mono text-gray-400">Longest Streak</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-center">
                    <div className="text-xl font-bold font-space text-white">{telemetry?.reposCount ?? profile.publicRepos}</div>
                    <div className="text-[10px] font-mono text-gray-400">Repositories</div>
                  </div>
                </div>
              </>
            )}
          </motion.div>

          {/* Languages Breakdown Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5 glass-card rounded-3xl p-7 border border-white/10 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-white" />
                Language Composition
              </h3>

              {/* Progress Stack Bar */}
              <div className="w-full h-3 rounded-full overflow-hidden flex gap-0.5 mb-6 border border-white/10 bg-black/40">
                {(telemetry?.languages || GITHUB_STATS.languages).map((lang) => (
                  <div
                    key={lang.name}
                    style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                    className="h-full transition-all duration-500 hover:brightness-125"
                    title={`${lang.name}: ${lang.percentage}%`}
                  />
                ))}
              </div>

              {/* Language Legend */}
              <div className="space-y-2.5">
                {(telemetry?.languages || GITHUB_STATS.languages).map((lang) => (
                  <div key={lang.name} className="flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lang.color }} />
                      <span className="text-white font-medium">{lang.name}</span>
                    </div>
                    <span className="text-gray-400">{lang.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>

        {/* Custom 52-Week GitHub Contribution Calendar Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 mb-12 relative"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
            <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <GithubIcon className="w-4 h-4 text-white" />
              <span>{telemetry?.totalContributions ?? 480} contributions in the last year</span>
            </h3>

            {/* Legend Bar */}
            <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400">
              <span>Less</span>
              <span className="w-3 h-3 rounded-[3px] bg-[#161b22] border border-white/[0.04]" />
              <span className="w-3 h-3 rounded-[3px] bg-[#0e4429]" />
              <span className="w-3 h-3 rounded-[3px] bg-[#006d32]" />
              <span className="w-3 h-3 rounded-[3px] bg-[#26a641]" />
              <span className="w-3 h-3 rounded-[3px] bg-[#39d353] shadow-[0_0_6px_rgba(57,211,83,0.6)]" />
              <span>More</span>
            </div>
          </div>

          {/* Interactive Contribution Grid View */}
          <div className="overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            <div className="inline-block min-w-[760px]">
              
              {/* Month Header Row */}
              <div className="flex text-[10px] font-mono text-gray-400 mb-2 pl-8">
                {(telemetry?.months || []).map((m, idx) => (
                  <div
                    key={idx}
                    style={{ flex: m.totalWeeks }}
                    className="truncate text-left"
                  >
                    {m.name}
                  </div>
                ))}
              </div>

              {/* Calendar Grid Container (Left Weekday Labels + 52 Weeks) */}
              <div className="flex gap-2">
                {/* Weekday Labels (Mon, Wed, Fri) */}
                <div className="flex flex-col justify-between text-[9px] font-mono text-gray-500 py-0.5 select-none shrink-0 w-6">
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri</span>
                </div>

                {/* 52 Week Columns */}
                <div className="flex gap-1 flex-1">
                  {(telemetry?.weeks || []).map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-1 flex-1">
                      {week.contributionDays.map((day, dIdx) => (
                        <div
                          key={dIdx}
                          onMouseEnter={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            setHoveredDay({
                              day,
                              x: rect.left + rect.width / 2,
                              y: rect.top - 10,
                            });
                          }}
                          onMouseLeave={() => setHoveredDay(null)}
                          className={`w-3 h-3 rounded-[3px] ${getSquareColorClass(
                            day
                          )} transition-all duration-200 hover:scale-150 hover:z-30 cursor-pointer`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Floating Hover Tooltip */}
          {hoveredDay && (
            <div
              style={{
                position: "fixed",
                left: `${hoveredDay.x}px`,
                top: `${hoveredDay.y}px`,
                transform: "translate(-50%, -100%)",
              }}
              className="z-50 pointer-events-none px-3 py-1.5 rounded-lg bg-black/95 text-white text-[11px] font-mono border border-white/20 shadow-2xl flex items-center gap-2 whitespace-nowrap backdrop-blur-md"
            >
              <Calendar className="w-3 h-3 text-emerald-400" />
              <span>
                <strong>{hoveredDay.day.contributionCount} contributions</strong> on {formatDateLabel(hoveredDay.day.date)}
              </span>
            </div>
          )}
        </motion.div>

        {/* Pinned Repositories Grid */}
        <div>
          <h3 className="text-lg font-bold font-space text-white mb-6 uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-white" />
            Pinned Repositories
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pinnedRepos.map((repo, idx) => (
              <motion.a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="glass-card rounded-2xl p-6 border border-white/10 hover:border-white/30 hover:scale-[1.01] transition-all group flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 font-mono text-sm font-bold text-white group-hover:text-white/90">
                      <BookOpen className="w-4 h-4 text-gray-400 group-hover:text-white" />
                      <span>{repo.name}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed mb-6">
                    {repo.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-gray-400 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-white">
                      <span className="w-2 h-2 rounded-full bg-white" />
                      {repo.language}
                    </span>
                    <span className="flex items-center gap-1 hover:text-white">
                      <Star className="w-3.5 h-3.5 text-amber-400" />
                      {repo.stars}
                    </span>
                    <span className="flex items-center gap-1 hover:text-white">
                      <GitFork className="w-3.5 h-3.5" />
                      {repo.forks}
                    </span>
                  </div>
                  <span>Updated {repo.updated}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
