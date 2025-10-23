import { DETAILED_FEATURES } from "@/constants/features";

import { SimpleFeatures } from "./simple-features";

export function FeatureSection() {
  return (
    <section>
      <div className="md:hidden" id="simple-features">
        <SimpleFeatures />
      </div>

      <div className="mt-8 space-y-12 md:space-y-20">
        {DETAILED_FEATURES.map((feature) => (
          <div
            className="scroll-mt-20"
            id={`feature-${feature.id}`}
            key={feature.id}
          >
            <div
              className={`${feature.bgColor} rounded-xl md:rounded-2xl p-6 md:p-8`}
            >
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="text-2xl md:text-3xl">{feature.icon}</div>
                <h3 className="text-lg md:text-2xl font-bold text-gray-900">
                  {feature.title}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {feature.sections.map((section, index) => (
                  <div key={index}>
                    <h4 className="font-semibold text-sm md:text-base mb-2 md:mb-3 text-gray-800">
                      {section.title}
                    </h4>
                    <ul className="text-gray-600 space-y-1 md:space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <li className="text-xs md:text-sm" key={itemIndex}>
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
