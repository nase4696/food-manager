"use client";

import type { FoodDisplay } from "@/types/food";
import { FoodCompactCard } from "@/features/food/components/food-compact-card";

import { SectionAccordion } from "./section-accordion";

type FoodSectionProps = {
  foods: FoodDisplay[];
  title: string;
  description: string;
  icon: string;
  badgeColor: "orange" | "red" | "yellow";
  emptyMessage: string;
  emptyDescription: string;
  defaultExpanded?: boolean;
};

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
  return (
    <SectionAccordion
      badge={{
        count: foods.length,
        color: badgeColor,
      }}
      defaultExpanded={defaultExpanded}
      description={description}
      icon={<span>{icon}</span>}
      title={title}
    >
      {foods.length > 0 ? (
        <div className="space-y-3 mb-4 sm:mb-6 max-w-full overflow-hidden">
          {foods.map((food) => (
            <FoodCompactCard food={food} key={food.id} />
          ))}
        </div>
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
    </SectionAccordion>
  );
}
