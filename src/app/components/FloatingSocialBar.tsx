import React, { useState } from "react";

interface SocialItem {
  id: string;
  name: string;
  label: string;
  url: string;
  color: string;
  gradient?: string;
  icon: React.ReactNode;
}

const SOCIAL_ITEMS: SocialItem[] = [
  {
    id: "instagram",
    name: "Instagram",
    label: "Follow on Instagram",
    url: "https://www.instagram.com/siddhi_infra?rpxt=NmR3MzB5dDhvZ20=",
    color: "#e1306c",
    gradient: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    id: "facebook",
    name: "Facebook",
    label: "Follow on Facebook",
    url: "https://www.facebook.com/share/1CLyTHDM26/",
    color: "#1877f2",
    gradient: "linear-gradient(135deg, #1877f2 0%, #0d65d9 100%)",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    label: "Connect on LinkedIn",
    url: "http://www.linkedin.com/in/mr-vishal-sutariya-980474220",
    color: "#0a66c2",
    gradient: "linear-gradient(135deg, #0a66c2 0%, #004182 100%)",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    label: "Chat on WhatsApp",
    url: "https://wa.me/919429744199?text=Hello%20Siddhivinayak%20Infrastructure,%20I%20would%20like%20to%20connect%20with%20you.",
    color: "#25d366",
    gradient: "linear-gradient(135deg, #25d366 0%, #128c7e 100%)",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.188 8.188 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.23 8.23zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.55.13.17 1.74 2.66 4.21 3.73.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.31z" />
      </svg>
    ),
  },
];

export default function FloatingSocialBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside
      className={`floating-social-dock ${isOpen ? "is-open" : "is-collapsed"}`}
      aria-label="Social media quick links"
    >
      {/* Mobile Toggle Trigger */}
      <button
        type="button"
        className="floating-social-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close social media menu" : "Open social media menu"}
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        )}
      </button>

      <ul className="floating-social-list" role="list">
        {SOCIAL_ITEMS.map((item) => (
          <li key={item.id} className="floating-social-item">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`floating-social-btn floating-social-${item.id}`}
              aria-label={item.label}
              style={{
                "--item-color": item.color,
                "--item-gradient": item.gradient || item.color,
              } as React.CSSProperties}
            >
              {/* Slide-out Tooltip Pill */}
              <span className="floating-social-tooltip" aria-hidden="true">
                <span className="floating-social-tooltip-text">{item.label}</span>
                <span className="floating-social-tooltip-arrow" />
              </span>

              {/* Icon */}
              <span className="floating-social-icon">{item.icon}</span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
