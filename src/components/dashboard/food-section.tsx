"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react";

import type { FoodDisplay } from "@/types/food";
import { FoodCompactCard } from "@/features/food/components/food-compact-card";

import { Button } from "../ui/button";

interface FoodSectionProps {
  foods: FoodDisplay[];
  title: string;
  description: string;
  icon: string;
  badgeColor: "orange" | "red" | "yellow";
  emptyMessage: string;
  emptyDescription: string;
  defaultExpanded?: boolean;
}

export function FoodSection({
  foods,
  title,
  description,
  icon,
  badgeColor,
  emptyMessage,
  emptyDescription,
  defaultExpanded = false,
}: FoodSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const badgeColorClasses = {
    orange: "bg-orange-500",
    red: "bg-red-500",
    yellow: "bg-yellow-500",
  };

  const displayFoods = isExpanded ? foods : [];

  return (
    <section className="mb-6 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <Button
        className="p-2 sm:p-4 md:p-6 border-b border-gray-100 rounded-t-2xl"
        onClick={() => setIsExpanded(!isExpanded)}
        size="full"
        variant="sectionHeader"
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="p-2 sm:p-3 bg-gray-100 rounded-xl">
            <div className="text-xl sm:text-2xl text-gray-700">{icon}</div>
          </div>
          <div className="text-left min-w-0 flex-1">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 truncate">
              {description}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <span
            className={`${badgeColorClasses[badgeColor]} text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium`}
          >
            {foods.length}品
          </span>
          <div className="p-1 sm:p-2 bg-gray-100 rounded-lg">
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
            ) : (
              <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
            )}
          </div>
        </div>
      </Button>

      {/* コンテンツ */}
      <div
        className={`
        transition-all duration-500 ease-in-out overflow-hidden
        ${isExpanded ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}
      `}
      >
        <div className="p-4 sm:p-6">
          {foods.length > 0 ? (
            <>
              <div className="space-y-3 mb-4 sm:mb-6 max-w-full overflow-hidden">
                {displayFoods.map((food) => (
                  <FoodCompactCard food={food} key={food.id} />
                ))}
              </div>

              {/* 全て見るリンク */}
              {foods.length > 0 && (
                <div className="text-center">
                  <a
                    className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm sm:text-base"
                    href="/products"
                  >
                    <span>全ての食品を見る</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-6 sm:py-8">
              <div className="text-3xl sm:text-4xl mb-3">🎉</div>
              <p className="text-gray-700 font-medium text-base sm:text-lg">
                {emptyMessage}
              </p>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">
                {emptyDescription}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
