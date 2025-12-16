/**
 * Trading Background Component
 * SpongeBob/Bikini Bottom–inspired underwater scene with bubbles and sea plants.
 */
const TradingBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
      {/* Base ocean gradient (extra layer over body background for depth) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#B3E5FC]/80 via-[#4FC3F7]/70 to-[#01579B]/90" />

      {/* Soft sea flower / bloom motifs */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-soft-light"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.18) 0, transparent 55%)," +
            "radial-gradient(circle at 80% 25%, rgba(255, 255, 255, 0.13) 0, transparent 55%)," +
            "radial-gradient(circle at 20% 75%, rgba(255, 255, 255, 0.15) 0, transparent 55%)," +
            "radial-gradient(circle at 75% 80%, rgba(255, 255, 255, 0.12) 0, transparent 55%)",
        }}
      />

      {/* Sea floor / sand bank */}
      <div className="absolute bottom-[-40px] left-[-10%] right-[-10%] h-[160px] bg-gradient-to-t from-[#FFE0B2]/90 via-[#FFE0B2]/70 to-transparent rounded-[50%] blur-[1px]" />

      {/* Stylized coral shapes */}
      <div className="absolute bottom-0 left-5 sm:left-16 w-32 sm:w-44 h-40 sm:h-52 origin-bottom animate-float-slow">
        <div className="absolute bottom-0 w-6 sm:w-8 h-24 sm:h-32 bg-[#FF7043]/80 rounded-t-full shadow-[0_0_20px_rgba(255,112,67,0.6)]" />
        <div className="absolute bottom-0 left-7 w-6 sm:w-8 h-20 sm:h-28 bg-[#FF8A65]/80 rounded-t-full" />
        <div className="absolute bottom-0 left-14 w-6 sm:w-8 h-28 sm:h-36 bg-[#F4511E]/75 rounded-t-full" />
      </div>

      <div className="absolute bottom-0 right-2 sm:right-12 w-32 sm:w-40 h-40 sm:h-52 origin-bottom animate-float-slow delay-150">
        <div className="absolute bottom-0 right-2 w-5 sm:w-7 h-24 sm:h-32 bg-[#4DD0E1]/80 rounded-t-full" />
        <div className="absolute bottom-0 right-7 w-6 sm:w-8 h-28 sm:h-36 bg-[#26C6DA]/80 rounded-t-full" />
        <div className="absolute bottom-0 right-14 w-5 sm:w-7 h-20 sm:h-28 bg-[#00ACC1]/80 rounded-t-full" />
      </div>

      {/* Rising bubbles along edges */}
      <div className="absolute inset-y-0 left-0 w-24 sm:w-32">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute bottom-[-80px] rounded-full bg-white/40 backdrop-blur-sm animate-bubble-rise"
            style={{
              left: `${5 + (i % 3) * 18}%`,
              width: `${6 + (i % 4) * 2}px`,
              height: `${6 + (i % 4) * 2}px`,
              animationDelay: `${i * 0.9}s`,
              animationDuration: `${10 + (i % 5)}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-y-0 right-0 w-24 sm:w-32">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute bottom-[-90px] rounded-full bg-white/40 backdrop-blur-sm animate-bubble-rise"
            style={{
              right: `${5 + (i % 3) * 18}%`,
              width: `${5 + ((i + 1) % 4) * 2}px`,
              height: `${5 + ((i + 1) % 4) * 2}px`,
              animationDelay: `${0.5 + i * 0.85}s`,
              animationDuration: `${11 + ((i + 2) % 5)}s`,
            }}
          />
        ))}
      </div>

      {/* Jellyfish silhouettes drifting in background */}
      <div className="absolute inset-0 mix-blend-soft-light opacity-60">
        <div className="absolute top-10 sm:top-16 left-[18%] w-12 sm:w-16 h-16 sm:h-20 animate-jelly">
          <div className="w-full h-3/5 bg-[#E1F5FE]/70 rounded-t-full shadow-[0_0_18px_rgba(225,245,254,0.7)]" />
          <div className="flex justify-between px-1 mt-0.5">
            <span className="w-[2px] h-6 bg-[#B3E5FC]/70 rounded-full" />
            <span className="w-[2px] h-7 bg-[#B3E5FC]/70 rounded-full" />
            <span className="w-[2px] h-5 bg-[#B3E5FC]/70 rounded-full" />
          </div>
        </div>
        <div className="absolute top-24 sm:top-32 right-[16%] w-10 sm:w-14 h-14 sm:h-18 animate-jelly delay-150">
          <div className="w-full h-3/5 bg-[#BBDEFB]/70 rounded-t-full shadow-[0_0_16px_rgba(187,222,251,0.7)]" />
          <div className="flex justify-between px-1 mt-0.5">
            <span className="w-[2px] h-5 bg-[#90CAF9]/70 rounded-full" />
            <span className="w-[2px] h-6 bg-[#90CAF9]/70 rounded-full" />
            <span className="w-[2px] h-4 bg-[#90CAF9]/70 rounded-full" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bubble-rise {
          0% {
            transform: translate3d(0, 100%, 0) scale(0.7);
            opacity: 0;
          }
          15% {
            opacity: 0.35;
          }
          40% {
            opacity: 0.85;
          }
          100% {
            transform: translate3d(0, -120%, 0) scale(1.05);
            opacity: 0;
          }
        }

        @keyframes float-slow {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(0, -6px, 0) scale(1.02); }
        }

        @keyframes jelly {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          25% { transform: translate3d(-4px, 4px, 0) scale(1.03); }
          50% { transform: translate3d(2px, -2px, 0) scale(0.98); }
          75% { transform: translate3d(4px, 2px, 0) scale(1.02); }
        }

        .animate-float-slow {
          animation: float-slow 9s ease-in-out infinite;
        }
        .animate-jelly {
          animation: jelly 14s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-float-slow,
          .animate-jelly,
          .animate-bubble-rise {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default TradingBackground;
