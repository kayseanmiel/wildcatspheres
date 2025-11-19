import React from 'react';

const FloatingElements = () => {
  const clusters = [...Array(35)];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <style>{`
        @keyframes floating {
          0% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(25px, -15px) rotate(2deg); }
          66% { transform: translate(-20px, 10px) rotate(-1deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
      `}</style>

      {clusters.map((_, i) => {
        const top = `${Math.random() * 95}%`;
        const left = `${Math.random() * 95}%`;
        const animationDuration = `${20 + Math.random() * 10}s`;
        const animationDelay = `${Math.random() * 10}s`;

        return (
          <div
            key={i}
            className="absolute"
            style={{
              top,
              left,
              animation: `floating ${animationDuration} ease-in-out infinite alternate`,
              animationDelay,
            }}
          >
            {[...Array(Math.floor(Math.random() * 3) + 3)].map((_, j) => {
              const size = 4 + Math.floor(Math.random() * 6);
              const color = j % 2 === 0 ? 'bg-yellow-500' : 'bg-red-500';
              const opacity = 0.3 + Math.random() * 0.7;
              const translateX = Math.random() * 40 - 20;
              const translateY = Math.random() * 40 - 20;
              const scale = 0.9 + Math.random() * 0.3;

              return (
                <div
                  key={`${i}-${j}`}
                  className={`absolute rounded-full ${color}`}
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    opacity,
                    transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
                  }}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default FloatingElements;
