"use client";

import React from "react";
import Link from "next/link";

const ElevateBrand = () => {
  return (
    <section
      id="contact"
      className="py-20 bg-[#141516] relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-[#FF202B]/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-l from-[#FF202B]/15 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl animate-ping delay-2000"></div>

        {/* Moving Grid Lines */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
              linear-gradient(rgba(255, 32, 43, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 32, 43, 0.1) 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
              animation: "moveGrid 20s linear infinite",
            }}
          ></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-[#FF202B] rounded-full animate-bounce delay-500"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-white rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-1.5 h-1.5 bg-[#FF202B] rounded-full animate-bounce delay-1500"></div>
        <div className="absolute bottom-10 right-1/3 w-1 h-1 bg-white rounded-full animate-bounce delay-2000"></div>
        <div className="absolute top-1/3 left-20 w-1 h-1 bg-[#FF202B] rounded-full animate-bounce delay-700"></div>
        <div className="absolute top-2/3 right-10 w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-1200"></div>

        {/* Gradient Waves */}
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-[#FF202B]/10 via-transparent to-transparent rounded-full animate-spin-slow"></div>
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-bl from-white/5 via-transparent to-transparent rounded-full animate-spin-reverse-slow"></div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-10 md:px-20 text-center relative z-10">
        <h2 className="text-4xl font-bold text-white mb-6 animate-fade-in-up">
          Ready to Elevate Your Brand?
        </h2>
        <p className="text-md text-gray-300 mb-8 leading-relaxed animate-fade-in-up delay-200">
          Join industry leaders who have already discovered the power of
          advertising with Housing In Ghana. Let's discuss how we can help you
          reach your marketing goals.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-400">
          <Link
            href="/advertise"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#141516] hover:scale-105 transition-all duration-200 hover:shadow-lg"
          >
            Tell Me More
          </Link>
          <Link
            href="/contact-us"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#FF202B] text-white font-semibold rounded-lg hover:bg-red-700 hover:scale-105 transition-all duration-200 hover:shadow-lg hover:shadow-[#FF202B]/25"
          >
            Contact Our Team
          </Link>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes moveGrid {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse-slow {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 30s linear infinite;
        }

        .animate-spin-reverse-slow {
          animation: spin-reverse-slow 25s linear infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-400 {
          animation-delay: 0.4s;
        }

        .delay-600 {
          animation-delay: 0.6s;
        }

        .delay-500 {
          animation-delay: 0.5s;
        }

        .delay-700 {
          animation-delay: 0.7s;
        }

        .delay-1000 {
          animation-delay: 1s;
        }

        .delay-1200 {
          animation-delay: 1.2s;
        }

        .delay-1500 {
          animation-delay: 1.5s;
        }

        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default ElevateBrand;
