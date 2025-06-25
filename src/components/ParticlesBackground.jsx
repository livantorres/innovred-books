import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: {
            color: "transparent"
          },
          particles: {
            number: {
              value: 80,
              density: {
                enable: true,
                area: 800
              }
            },
            color: {
              value: ["#FF5E5E", "#FFD700", "#5EFF87", "#5E87FF"]
            },
            shape: {
              type: "circle"
            },
            opacity: {
              value: 0.5,
              random: true,
            },
            size: {
              value: { min: 1, max: 3 },
              random: true
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: true,
              outModes: {
                default: "bounce"
              }
             ,
               trail: {
                enable: true,
                length: 10,
                fillColor: "#ffff"
              }
            }
          },
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "repulse"
              }
            }
          }
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
}