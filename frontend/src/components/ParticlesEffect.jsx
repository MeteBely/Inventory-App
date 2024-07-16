/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState, useRef } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadAll } from "@tsparticles/all";

const ParticlesComponent = React.memo((props) => {
  const [init, setInit] = useState(false);
  const particlesInit = useRef(false);

  useEffect(() => {
    if (!particlesInit.current) {
      initParticlesEngine(async (engine) => {
        await loadAll(engine);
      }).then(() => {
        setInit(true);
        particlesInit.current = true;
      });
    }
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      fullScreen: { enable: false },
      particles: {
        color: {
          value: "#000",
        },
        links: {
          color: "#000",
          distance: 150,
          enable: true,
          opacity: 0.3,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: true,
          speed: 2,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 125,
        },
        opacity: {
          value: 1.0,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 3, max: 5 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  if (!init) return null;

  return <Particles id={props.id} init={particlesLoaded} options={options} />;
});

export default ParticlesComponent;
