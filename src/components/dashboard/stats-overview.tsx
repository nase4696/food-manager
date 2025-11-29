"use client";

import { BarChart3 } from "lucide-react";

import type { ExpiryStats } from "@/types/food";
import { STATS_CONFIG } from "@/constants/stats";

import { SectionAccordion } from "./section-accordion";

interface StatsOverviewProps {
  stats: ExpiryStats;
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  const totalActive = stats.active;

  return (
    <SectionAccordion
      badge={{
        count: totalActive,
        color: "green",
      }}
      defaultExpanded={true}
      description="食品の期限状態を確認"
      icon={<BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />}
      title="統計概要"
    >
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        {STATS_CONFIG.map((stat) => (
          <div
            className="bg-white p-2 sm:p-3 md:p-5 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300 hover:border-gray-300"
            key={stat.key}
          >
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-[10px] xs:text-xs font-semibold text-gray-500 uppercase tracking-wide truncate">
                  {stat.label}
                </p>
                <p
                  className={`text-lg sm:text-xl md:text-2xl font-bold mt-1 sm:mt-2 truncate ${stat.textColor}`}
                >
                  {stats[stat.key]}
                </p>
                <p className="text-[10px] xs:text-xs text-gray-400 mt-1 truncate">
                  {stat.description}
                </p>
              </div>
              <div
                className={`p-1 sm:p-2 md:p-3 ${stat.bgColor} rounded-lg shrink-0 ml-2`}
              >
                <div
                  className={`text-base sm:text-lg md:text-xl ${stat.textColor}`}
                >
                  {stat.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionAccordion>
  );
}
