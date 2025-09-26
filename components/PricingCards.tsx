import React from "react";
import { CheckCircleIcon, StarIcon } from "@heroicons/react/24/solid";

const packages = [
  {
    name: "Premium Package",
    price: "₵15,000",
    period: "per issue",
    description:
      "Maximum visibility with prime placement and comprehensive coverage",
    features: [
      "Full page advertisement",
      "Editorial feature article",
      "Social media promotion",
      "Website banner placement",
      "Event co-branding opportunities",
      "Priority customer support",
    ],
    popular: true,
  },
  {
    name: "Standard Package",
    price: "₵8,000",
    period: "per issue",
    description: "Great exposure with strategic placement and solid coverage",
    features: [
      "Half page advertisement",
      "Business spotlight feature",
      "Social media mentions",
      "Website listing",
      "Newsletter inclusion",
    ],
    popular: false,
  },
  {
    name: "Starter Package",
    price: "₵4,500",
    period: "per issue",
    description: "Perfect entry point for emerging brands and businesses",
    features: [
      "Quarter page advertisement",
      "Company profile listing",
      "Digital promotion",
      "Basic website mention",
    ],
    popular: false,
  },
];

const PricingCards = () => {
  return (
    <div className="max-w-7xl mx-auto px-10 md:px-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-[#141516] mb-4">
          Advertising Packages
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Choose the perfect package to match your marketing goals and budget.
          Each package is designed to maximize your brand's impact and reach.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className={`relative rounded-2xl p-8 ${
              pkg.popular
                ? "bg-[#FF202B] text-white shadow-2xl scale-105"
                : "bg-gray-50 text-gray-900 shadow-lg"
            } transition-all duration-200 hover:shadow-xl`}
          >
            {pkg.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#232525] text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
                  <StarIcon className="h-4 w-4" />
                  Most Popular
                </span>
              </div>
            )}

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">{pkg.price}</span>
                <span
                  className={`text-sm ml-2 ${pkg.popular ? "text-gray-200" : "text-gray-500"}`}
                >
                  {pkg.period}
                </span>
              </div>
              <p
                className={`${pkg.popular ? "text-gray-200" : "text-gray-600"}`}
              >
                {pkg.description}
              </p>
            </div>

            <ul className="space-y-4 mb-8">
              {pkg.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center gap-3">
                  <CheckCircleIcon
                    className={`h-5 w-5 flex-shrink-0 ${
                      pkg.popular ? "text-white" : "text-[#FF202B]"
                    }`}
                  />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${
                pkg.popular
                  ? "bg-white text-[#FF202B] hover:bg-gray-100"
                  : "bg-[#FF202B] text-white hover:bg-[#232525]"
              }`}
            >
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingCards;
