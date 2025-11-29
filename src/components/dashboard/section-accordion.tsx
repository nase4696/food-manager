"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SectionAccordionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  badge: {
    count: number;
    color: "purple" | "orange" | "red" | "yellow" | "green";
  };
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

const badgeColorClasses = {
  purple: "bg-purple-500",
  orange: "bg-orange-500",
  red: "bg-red-500",
  yellow: "bg-yellow-500",
  green: "bg-green-500",
};

export function SectionAccordion({
  title,
  description,
  icon,
  badge,
  children,
  defaultExpanded = false,
}: SectionAccordionProps) {
  return (
    <Accordion
      className="mb-6 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      collapsible
      defaultValue={defaultExpanded ? "item" : undefined}
      type="single"
    >
      <AccordionItem className="border-0" value="item">
        <AccordionTrigger className="p-2 sm:p-4 md:p-6 border-b border-gray-100 rounded-t-2xl hover:no-underline hover:bg-gray-50 transition-colors">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
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
                className={`${badgeColorClasses[badge.color]} text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium`}
              >
                {badge.count}品
              </span>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-0">
          <div className="p-3 sm:p-6">{children}</div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
