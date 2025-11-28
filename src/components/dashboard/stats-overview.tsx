"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import type { ExpiryStats } from "@/types/food";
import { STATS_CONFIG } from "@/constants/stats";

import { Button } from "../ui/button";

type StatsOverviewProps = {
  stats: ExpiryStats;
};

export function StatsOverview({ stats }: StatsOverviewProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <section className="mb-6 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <Button
        className="p-2 sm:p-4 md:p-6 border-b border-gray-100 rounded-t-2xl"
        onClick={() => setIsExpanded(!isExpanded)}
        size="full"
        variant="sectionHeader"
      >
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0 flex-1">
          <div className="p-1 sm:p-2 md:p-3 bg-gray-100 rounded-xl shrink-0">
            <div className="text-lg sm:text-xl md:text-2xl text-gray-700">
              📊
            </div>
          </div>
          <div className="text-left min-w-0 flex-1">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 truncate">
              統計概要
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 truncate">
              食品の管理状況を一目で確認
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="hidden xs:flex items-center gap-1 sm:gap-2">
            <span className="bg-gray-800 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
              計{stats.active}品
            </span>
          </div>
          <div className="p-1 sm:p-2 bg-gray-100 rounded-lg">
            {isExpanded ? (
              <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-gray-600" />
            ) : (
              <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-gray-600" />
            )}
          </div>
        </div>
      </Button>

      <div
        className={`
        transition-all duration-500 ease-in-out overflow-hidden
        ${isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
      `}
      >
        <div className="p-3 sm:p-4 md:p-6">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            {/* 改善されたmap展開 */}
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
        </div>
      </div>
    </section>
  );
}
