"use client";

import React, { useState, useEffect, useRef } from "react";

type Stats = {
  id: number;
  name: string;
  value: string;
  numValue: number;
};

const stats: Stats[] = [
  {
    id: 1,
    name: "Monthly readers across web and print.",
    value: "10,000+",
    numValue: 10000,
  },
  {
    id: 2,
    name: "Nationwide distribution points including hotels, malls, bookshops, gas stations, pharmacies and more.",
    value: "80+",
    numValue: 80,
  },
  {
    id: 3,
    name: "Annual magazine published and distributed nationwide.",
    value: "3 Editions",
    numValue: 3,
  },
  {
    id: 4,
    name: "Featured real estate professionals, projects, and brands.",
    value: "500+",
    numValue: 500,
  },
];

const AnimatedCounter = ({
  end,
  suffix = "",
  duration = 2000,
  isVisible,
}: {
  end: number;
  suffix: string;
  duration: number;
  isVisible: boolean;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setCount(Math.floor(end * easeOutQuart));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isVisible]);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K";
    }
    return num.toString();
  };

  return (
    <span>
      {end >= 1000 ? formatNumber(count) : count}
      {suffix}
    </span>
  );
};

const BrandStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Disconnect observer after first trigger to prevent re-animation
          observer.disconnect();
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: "0px 0px -50px 0px", // Trigger slightly before the section is fully in view
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getSuffix = (stat: Stats) => {
    if (stat.value.includes("+")) return "+";
    if (stat.value.includes("Editions")) return " Editions";
    return "";
  };

  return (
    <div ref={sectionRef} className="py-4 sm:py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className="mx-auto flex max-w-xs flex-col gap-y-4"
              style={{
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                opacity: isVisible ? 1 : 0,
                transition: `all 0.6s ease-out ${index * 0.1}s`,
              }}
            >
              <dt className="text-base/7 text-gray-400">{stat.name}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                <AnimatedCounter
                  end={stat.numValue}
                  suffix={getSuffix(stat)}
                  duration={2000 + index * 200} // Stagger animation duration
                  isVisible={isVisible}
                />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default BrandStats;
