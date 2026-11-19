import React, { useEffect } from "react";
import { createPortal } from "react-dom";

export interface Leader {
  id: string;
  name: string;
  role: string;
  tagline: string;
  image: string;
  statement: string;
  quote: string;
  pillars: string[];
  highlights: { label: string; value: string }[];
}

export const LEADERS: Leader[] = [
  {
    id: "vashrambhai",
    name: "Vashrambhai Sutariya",
    role: "Founder & Chairman",
    tagline: "Foundational Vision & Long-Term Value",
    image: "/media/content/vashrambhai-sutariya.png",
    statement:
      "Siddhivinayak Infrastructure was founded with a clear vision to deliver quality-driven and reliable construction solutions. Our focus has always been on strong foundations, ethical practices, and long-term value creation. I am proud of our journey and confident about our future growth. We remain committed to building infrastructure that inspires trust and shapes a better future.",
    quote:
      "We remain committed to building infrastructure that inspires trust and shapes a better future.",
    pillars: ["Strong Foundations", "Ethical Practices", "Long-Term Value Creation"],
    highlights: [
      { label: "Core Vision", value: "Trust & Quality" },
      { label: "Role", value: "Founder & Chairman" },
      { label: "Philosophy", value: "Ethical Construction" },
    ],
  },
  {
    id: "ramesh",
    name: "Ramesh Gadhiya",
    role: "Co-Founder & CEO",
    tagline: "Innovation, Efficiency & Execution Excellence",
    image: "/media/content/ramesh-gadhiya.png",
    statement:
      "At Siddhivinayak Infrastructure, we believe in innovation, efficiency, and excellence in execution. Our goal is to continuously raise standards in construction and deliver projects that reflect precision, performance, and professionalism. We are dedicated to adopting modern technologies and best practices to ensure timely delivery and superior quality in every project.",
    quote:
      "Our goal is to continuously raise standards in construction and deliver projects that reflect precision, performance, and professionalism.",
    pillars: ["Execution Excellence", "Modern Technologies", "Timely Delivery"],
    highlights: [
      { label: "Execution", value: "Precision & Speed" },
      { label: "Role", value: "Co-Founder & CEO" },
      { label: "Standard", value: "Advanced Engineering" },
    ],
  },
  {
    id: "vishal",
    name: "Vishal Sutariya",
    role: "Managing Director",
    tagline: "Future-Ready Strategies & Sustainable Development",
    image: "/media/content/vishal-sutariya.png",
    statement:
      "Our company is driven by modern thinking and future-ready strategies. We are committed to expanding our capabilities, adopting new technologies, and creating impactful infrastructure that contributes to sustainable development. We strive to deliver innovative, reliable, and value-driven solutions that shape the future of infrastructure.",
    quote:
      "We strive to deliver innovative, reliable, and value-driven solutions that shape the future of infrastructure.",
    pillars: ["Future-Ready Strategies", "Sustainable Development", "Innovative Solutions"],
    highlights: [
      { label: "Strategic Growth", value: "Sustainable Expansion" },
      { label: "Role", value: "Managing Director" },
      { label: "Focus", value: "Next-Gen Infrastructure" },
    ],
  },
];

interface FounderModalProps {
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export default function FounderModal({
  currentIndex,
  isOpen,
  onClose,
  onSelectIndex,
}: FounderModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onSelectIndex((currentIndex + 1) % LEADERS.length);
      if (e.key === "ArrowLeft")
        onSelectIndex((currentIndex - 1 + LEADERS.length) % LEADERS.length);
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.documentElement.classList.add("modal-open");
      document.body.classList.add("modal-open");

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";
        document.documentElement.classList.remove("modal-open");
        document.body.classList.remove("modal-open");
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen, currentIndex, onClose, onSelectIndex]);

  if (!isOpen) return null;

  const currentLeader = LEADERS[currentIndex] || LEADERS[0];
  const prevLeader = LEADERS[(currentIndex - 1 + LEADERS.length) % LEADERS.length];
  const nextLeader = LEADERS[(currentIndex + 1) % LEADERS.length];

  return createPortal(
    <div className="founder-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="founder-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Pinned Top-Right Close Button */}
        <button
          onClick={onClose}
          className="founder-modal-close-btn"
          aria-label="Close founder statement"
        >
          ✕
        </button>

        {/* Top Controls Bar */}
        <div className="founder-modal-header">
          <div className="founder-modal-eyebrow">
            <span className="founder-modal-dot" />
            <span>Key Management • Executive Statement</span>
          </div>

          {/* Quick Switcher Tabs */}
          <div className="founder-switcher-tabs" role="tablist">
            {LEADERS.map((leader, idx) => (
              <button
                key={leader.id}
                role="tab"
                aria-selected={idx === currentIndex}
                onClick={() => onSelectIndex(idx)}
                className={`founder-tab-pill ${idx === currentIndex ? "active" : ""}`}
              >
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="founder-tab-avatar"
                />
                <span>{leader.name.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="founder-modal-body">
          {/* Left Column: Portrait & Highlights */}
          <div className="founder-modal-portrait-col">
            <div className="founder-portrait-wrap">
              <img
                src={currentLeader.image}
                alt={currentLeader.name}
                className="founder-portrait-img"
              />
              <div className="founder-portrait-glow" />
              <div className="founder-portrait-badge">
                <span>0{currentIndex + 1}</span>
              </div>
            </div>

            <div className="founder-role-tag">
              <span className="founder-role-dot" />
              <span>{currentLeader.role}</span>
            </div>

            <h3 className="founder-modal-name">{currentLeader.name}</h3>
            <p className="founder-tagline">{currentLeader.tagline}</p>

            <div className="founder-specs-grid">
              {currentLeader.highlights.map((h, i) => (
                <div key={i} className="founder-spec-item">
                  <span className="founder-spec-label">{h.label}</span>
                  <strong className="founder-spec-val">{h.value}</strong>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Statement & Quote */}
          <div className="founder-modal-content-col">
            {/* Pull Quote Box */}
            <div className="founder-quote-box">
              <div className="founder-quote-mark">“</div>
              <blockquote className="founder-quote-text">
                {currentLeader.quote}
              </blockquote>
            </div>

            {/* Complete Statement Paragraph */}
            <div className="founder-statement-wrap">
              <h4 className="founder-statement-title">Executive Message & Philosophy</h4>
              <p className="founder-statement-text">{currentLeader.statement}</p>
            </div>

            {/* Strategic Pillars */}
            <div className="founder-pillars-wrap">
              <span className="founder-pillars-label">Strategic Focus Pillars:</span>
              <div className="founder-pillars-list">
                {currentLeader.pillars.map((pillar, i) => (
                  <span key={i} className="founder-pillar-tag">
                    <span className="founder-pillar-star">✦</span>
                    {pillar}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Navigator */}
            <div className="founder-nav-footer">
              <button
                onClick={() => onSelectIndex((currentIndex - 1 + LEADERS.length) % LEADERS.length)}
                className="founder-nav-btn prev"
                aria-label={`View previous leader: ${prevLeader.name}`}
              >
                ← <span>{prevLeader.name.split(" ")[0]}</span>
              </button>

              <div className="founder-nav-indicator">
                {LEADERS.map((_, i) => (
                  <span
                    key={i}
                    onClick={() => onSelectIndex(i)}
                    className={`founder-nav-dot ${i === currentIndex ? "active" : ""}`}
                  />
                ))}
              </div>

              <button
                onClick={() => onSelectIndex((currentIndex + 1) % LEADERS.length)}
                className="founder-nav-btn next"
                aria-label={`View next leader: ${nextLeader.name}`}
              >
                <span>{nextLeader.name.split(" ")[0]}</span> →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
