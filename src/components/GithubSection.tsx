"use client";

import { motion } from "framer-motion";
import { GITHUB_STATS } from "@/data/portfolioData";
import { Star, GitFork, BookOpen, ExternalLink, Sparkles, Code2, Users } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";

export default function GithubSection() {
  const { profile, languages, pinnedRepos } = GITHUB_STATS;

  // Generate simulated 52-week contribution heat grid
  const generateContributionWeeks = () => {
    const weeks = [];
    for (let w = 0; w < 40; w++) {
      const days = [];
      for (let d = 0; d < 7; d++) {
        const count = Math.floor(Math.random() * 8);
        days.push(count);
      }
      weeks.push(days);
    }
    return weeks;
  };

  const contributionGrid = generateContributionWeeks();

  const getHeatColor = (count: number) => {
    if (count === 0) return "bg-white/5";
    if (count < 3) return "bg-white/20";
    if (count < 6) return "bg-white/50";
    return "bg-white";
  };

  return (
    <section id="github" className="py-28 relative">
      <div className="w-[92%] max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-400 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>06 / OPEN SOURCE TELEMETRY</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-bold font-space tracking-tight text-white uppercase">
            GITHUB <span className="text-stroke-outline">ACTIVITY</span>
          </h2>
        </div>

        {/* Top GitHub Profile & Language Stats Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Profile Header Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 glass-card rounded-3xl p-8 border border-white/10 flex flex-col justify-between"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/20 p-0.5 shrink-0">
                <img
                  src={profile.avatar}
                  alt={profile.username}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-2xl font-bold text-white font-space">@{profile.username}</h3>
                  <a
                    href={`https://github.com/${profile.username}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-white transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed max-w-md">
                  {profile.bio}
                </p>
              </div>
            </div>

            {/* Stats Pills */}
            <div className="grid grid-cols-4 gap-3 pt-6 border-t border-white/10 text-center">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-lg font-bold font-space text-white">{profile.publicRepos}</div>
                <div className="text-[10px] font-mono text-gray-400">Repositories</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-lg font-bold font-space text-white">{profile.totalStars}</div>
                <div className="text-[10px] font-mono text-gray-400">Stars Earned</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-lg font-bold font-space text-white">{profile.followers}</div>
                <div className="text-[10px] font-mono text-gray-400">Followers</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-lg font-bold font-space text-white">{profile.contributionsThisYear}</div>
                <div className="text-[10px] font-mono text-gray-400">Commits '26</div>
              </div>
            </div>
          </motion.div>

          {/* Languages Breakdown Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5 glass-card rounded-3xl p-8 border border-white/10 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-sm font-mono text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-white" />
                Language Composition
              </h3>

              {/* Progress Stack Bar */}
              <div className="w-full h-3 rounded-full overflow-hidden flex gap-0.5 mb-6 border border-white/10">
                {languages.map((lang) => (
                  <div
                    key={lang.name}
                    style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                    className="h-full transition-all"
                    title={`${lang.name}: ${lang.percentage}%`}
                  />
                ))}
              </div>

              {/* Language Legend */}
              <div className="space-y-2.5">
                {languages.map((lang) => (
                  <div key={lang.name} className="flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lang.color }} />
                      <span className="text-white">{lang.name}</span>
                    </div>
                    <span className="text-gray-400">{lang.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>

        {/* Contribution Graph Heat Map */}
        <div className="glass-card rounded-3xl p-8 border border-white/10 mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-mono text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <GithubIcon className="w-4 h-4 text-white" />
              Contribution Matrix ({profile.contributionsThisYear} contributions in the last year)
            </h3>
            <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400">
              <span>Less</span>
              <span className="w-2.5 h-2.5 rounded-sm bg-white/5" />
              <span className="w-2.5 h-2.5 rounded-sm bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-sm bg-white/50" />
              <span className="w-2.5 h-2.5 rounded-sm bg-white" />
              <span>More</span>
            </div>
          </div>

          <div className="overflow-x-auto pb-2">
            <div className="flex gap-1.5 min-w-[700px] justify-between">
              {contributionGrid.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1.5">
                  {week.map((count, dIdx) => (
                    <div
                      key={dIdx}
                      className={`w-3 h-3 rounded-sm ${getHeatColor(count)} transition-all hover:scale-125 hover:border hover:border-white`}
                      title={`Activity level: ${count}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

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
                className="glass-card rounded-2xl p-6 border border-white/10 hover:border-white/30 hover:scale-[1.01] transition-all group flex flex-col justify-between"
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
                      <Star className="w-3.5 h-3.5" />
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
