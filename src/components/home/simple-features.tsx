import Link from "next/link";

import { SIMPLE_FEATURES } from "@/constants/features";

export function SimpleFeatures() {
  return (
    <div className="md:mt-16 bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SIMPLE_FEATURES.map((feature) => (
          <div
            className={`${feature.bgColor} rounded-lg p-4 text-center`}
            key={feature.id}
          >
            <div className="text-3xl mb-2">{feature.icon}</div>
            <h3 className="font-semibold text-sm md:text-base">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600 mb-3">{feature.description}</p>
            <Link
              aria-label={feature.ariaLabel}
              className="underline text-sm"
              href={feature.href}
            >
              詳しくみる
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
