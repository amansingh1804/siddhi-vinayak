import React, { useState, useRef, useEffect, useMemo } from "react";
import { CITIES, MAP_DOTS, MAP_CONFIG, type CityLocation } from "./gujaratMapData";

export default function ProjectLocationsMap() {
  const [activeCityName, setActiveCityName] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 4, y: -4 });
  const [targetTilt, setTargetTilt] = useState({ x: 4, y: -4 });
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Smooth tilt lerp
  useEffect(() => {
    const updateTilt = () => {
      setTilt((prev) => {
        const dx = targetTilt.x - prev.x;
        const dy = targetTilt.y - prev.y;
        if (Math.abs(dx) < 0.01 && Math.abs(dy) < 0.01) {
          return targetTilt;
        }
        return {
          x: prev.x + dx * 0.1,
          y: prev.y + dy * 0.1,
        };
      });
      animFrameRef.current = requestAnimationFrame(updateTilt);
    };
    animFrameRef.current = requestAnimationFrame(updateTilt);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [targetTilt]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    // Max tilt angles: 10deg
    setTargetTilt({
      x: -y * 12,
      y: x * 14,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTargetTilt({ x: 4, y: -4 }); // return to subtle resting 3D angle
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Find active city object
  const activeCity = useMemo(() => {
    return CITIES.find((c) => c.name === activeCityName) || null;
  }, [activeCityName]);

  // Separate cities into the 2 columns matching the original design
  const col1 = useMemo(() => CITIES.filter((c) => c.column === 1), []);
  const col2 = useMemo(() => CITIES.filter((c) => c.column === 2), []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="project-map-card"
      style={{
        perspective: "1200px",
      }}
    >
      {/* 3D Scene Wrapper with Dynamic Tilt */}
      <div
        className="project-map-inner"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.08s ease-out",
        }}
      >
        {/* Ambient Top Glow */}
        <div className="project-map-ambient-glow" />

        {/* Top Header Bar */}
        <div className="project-map-header">
          {/* Top-left radar / target badge matching the screenshot */}
          <div className="project-map-radar-badge" title="Live Project Locations across Gujarat">
            <span className="project-map-radar-ring" />
            <span className="project-map-radar-dot" />
          </div>

          {/* Title with Cursive 'Projects' */}
          <h2 className="project-map-heading">
            Locations of our{" "}
            <span className="project-map-cursive">Projects</span>
          </h2>

          {/* Hidden spacer to center title */}
          <div className="project-map-header-spacer" />
        </div>

        {/* Main Grid: Left = 3D Dotted Map, Right = 2 Columns of Cities */}
        <div className="project-map-body">
          {/* Map Column */}
          <div className="project-map-canvas-container">
            <svg
              viewBox={MAP_CONFIG.viewBox}
              className="project-map-svg"
              aria-label="Interactive map of Gujarat with project location dots"
            >
              <defs>
                {/* 3D Drop Shadow filter for map dots relief */}
                <filter id="map-dot-shadow" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="3.5" stdDeviation="2.5" floodColor="#172630" floodOpacity="0.2" />
                </filter>

                {/* Glow & shadow filter for normal project dots */}
                <filter id="orange-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="2.5" stdDeviation="3.5" floodColor="#ea7e2a" floodOpacity="0.6" />
                  <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Intense glowing filter for POPPED dot */}
                <filter id="pop-glow" x="-100%" y="-100%" width="300%" height="300%">
                  <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#ea7e2a" floodOpacity="0.75" />
                  <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur1" />
                  <feFlood floodColor="#ea7e2a" floodOpacity="0.95" result="color" />
                  <feComposite in="color" in2="blur1" operator="in" result="shadow1" />
                  <feMerge>
                    <feMergeNode in="shadow1" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Linear gradient for sonar ripple rings */}
                <radialGradient id="sonar-gradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ff9900" stopOpacity="0.8" />
                  <stop offset="60%" stopColor="#ea580c" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Base Dots Layer with 3D shadow */}
              <g className="project-map-dots-layer" filter="url(#map-dot-shadow)">
                {MAP_DOTS.map((dot, idx) => {
                  const isCity = Boolean(dot.city);
                  const isPopped = activeCityName === dot.city;
                  const isBackground = !isCity;

                  // Dim non-active dots when a city is hovered
                  let opacity = 0.95;
                  if (activeCityName) {
                    if (isPopped) opacity = 1;
                    else if (isCity) opacity = 0.5;
                    else opacity = 0.35;
                  }

                  // Normal dot styles
                  if (isBackground) {
                    return (
                      <circle
                        key={`bg-dot-${idx}`}
                        cx={dot.x}
                        cy={dot.y}
                        r={MAP_CONFIG.dotRadius}
                        fill="#8fa4b2"
                        opacity={opacity}
                        className="project-map-dot-bg"
                      />
                    );
                  }

                  // If it's a project city dot (orange in original)
                  return (
                    <circle
                      key={`city-dot-${dot.city}`}
                      cx={dot.x}
                      cy={dot.y}
                      r={isPopped ? 8.5 : MAP_CONFIG.dotRadius + 0.3}
                      fill={isPopped ? "#e26f12" : "#ea7e2a"}
                      filter={isPopped ? "url(#pop-glow)" : "url(#orange-glow)"}
                      opacity={opacity}
                      className={`project-map-dot-city ${isPopped ? "is-popped" : ""}`}
                      onMouseEnter={() => dot.city && setActiveCityName(dot.city)}
                      onMouseLeave={() => setActiveCityName(null)}
                      style={{
                        cursor: "pointer",
                        transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      }}
                    />
                  );
                })}
              </g>

              {/* POPPING SONAR RIPPLES & GLOW EFFECT ON ACTIVE DOT */}
              {activeCity && (
                <g
                  className="project-map-active-fx"
                  style={{
                    transformOrigin: `${activeCity.x}px ${activeCity.y}px`,
                  }}
                >
                  {/* Expanding Sonar Waves */}
                  <circle
                    cx={activeCity.x}
                    cy={activeCity.y}
                    r={18}
                    fill="none"
                    stroke="#ea7e2a"
                    strokeWidth="2"
                    className="sonar-wave-1"
                  />
                  <circle
                    cx={activeCity.x}
                    cy={activeCity.y}
                    r={32}
                    fill="none"
                    stroke="#ff9f43"
                    strokeWidth="1.5"
                    className="sonar-wave-2"
                  />
                  <circle
                    cx={activeCity.x}
                    cy={activeCity.y}
                    r={45}
                    fill="none"
                    stroke="#ffa500"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                    className="sonar-wave-3"
                  />

                  {/* Popped Dot Core Accent */}
                  <circle
                    cx={activeCity.x}
                    cy={activeCity.y}
                    r={9.5}
                    fill="#fff"
                    stroke="#ea7e2a"
                    strokeWidth="2"
                    className="popped-core"
                  />
                  <circle
                    cx={activeCity.x}
                    cy={activeCity.y}
                    r={5.5}
                    fill="#ea7e2a"
                    className="popped-inner-core"
                  />
                </g>
              )}
            </svg>

            {/* 3D Floating Tooltip Pin */}
            {activeCity && (
              <div
                className="project-map-tooltip"
                style={{
                  left: `${(activeCity.x / MAP_CONFIG.width) * 100}%`,
                  top: `${(activeCity.y / MAP_CONFIG.height) * 100}%`,
                  transform: "translate(-50%, -130%) translateZ(40px)",
                }}
              >
                <div className="project-map-tooltip-content">
                  <div className="project-map-tooltip-badge">
                    <span className="project-map-tooltip-dot" />
                    <span className="project-map-tooltip-region">{activeCity.region}</span>
                  </div>
                  <div className="project-map-tooltip-title">{activeCity.name}</div>
                  {activeCity.projects && (
                    <div className="project-map-tooltip-sub">{activeCity.projects}</div>
                  )}
                </div>
                {/* Pointer Arrow */}
                <div className="project-map-tooltip-arrow" />
              </div>
            )}
          </div>

          {/* Cities List Column (2 Columns of 10 Cities Each) */}
          <div className="project-map-cities-container">
            <div className="project-map-columns">
              {/* Column 1 */}
              <ul className="project-map-city-list" role="list">
                {col1.map((city) => {
                  const isActive = activeCityName === city.name;
                  return (
                    <li
                      key={city.name}
                      onMouseEnter={() => setActiveCityName(city.name)}
                      onMouseLeave={() => setActiveCityName(null)}
                      onClick={() =>
                        setActiveCityName((prev) => (prev === city.name ? null : city.name))
                      }
                      className={`project-map-city-item ${isActive ? "active" : ""}`}
                    >
                      <span className="project-map-city-indicator" />
                      <span className="project-map-city-name">{city.name}</span>
                    </li>
                  );
                })}
              </ul>

              {/* Column 2 */}
              <ul className="project-map-city-list" role="list">
                {col2.map((city) => {
                  const isActive = activeCityName === city.name;
                  return (
                    <li
                      key={city.name}
                      onMouseEnter={() => setActiveCityName(city.name)}
                      onMouseLeave={() => setActiveCityName(null)}
                      onClick={() =>
                        setActiveCityName((prev) => (prev === city.name ? null : city.name))
                      }
                      className={`project-map-city-item ${isActive ? "active" : ""}`}
                    >
                      <span className="project-map-city-indicator" />
                      <span className="project-map-city-name">{city.name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Quick interactive hint */}
            <div className="project-map-hint">
              <span>✦ Hover or tap any location to pop on map</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
