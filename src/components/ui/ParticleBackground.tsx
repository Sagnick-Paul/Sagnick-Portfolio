"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Container, Engine } from "tsparticles-engine";
import { useTheme } from "next-themes";

export default function ParticleBackground() {
  const { resolvedTheme } = useTheme();
  
  // Decide particle colors based on theme
  const isDark = resolvedTheme === "dark" || resolvedTheme === undefined;
  const particleColor = isDark ? "#ffffff" : "#000000";
  const linkColor = isDark ? "#ffffff" : "#000000";

  const particlesInit = useCallback(async (engine: Engine) => {
    // loadSlim is crucial! it loads the basic features without heavy bloat
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // Optional: Log container to debug if needed
    // console.log(container);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      className="fixed inset-0 pointer-events-none -z-50"
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "grab",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 2,
            },
            grab: {
              distance: 140,
              links: {
                opacity: 0.15,
              },
            },
          },
        },
        particles: {
          color: {
            value: particleColor,
          },
          links: {
            color: linkColor,
            distance: 150,
            enable: true,
            opacity: isDark ? 0.1 : 0.05,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 0.6,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 40, // Low quantity for subtlety and performance
          },
          opacity: {
            value: isDark ? 0.2 : 0.1,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 2 },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
