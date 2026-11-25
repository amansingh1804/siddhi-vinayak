import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { createBrowserRouter, Link, NavLink, Outlet, useLocation } from "react-router";
import ProjectLocationsMap from "./components/ProjectLocationsMap";
import FounderModal, { LEADERS } from "./components/FounderModal";
import FloatingSocialBar from "./components/FloatingSocialBar";

type IconName =
  | "arrow"
  | "calendar"
  | "check"
  | "clock"
  | "close"
  | "mail"
  | "map"
  | "maximize"
  | "menu"
  | "minimize"
  | "mute"
  | "pause"
  | "phone"
  | "play"
  | "quote"
  | "shield"
  | "team"
  | "tools"
  | "volume";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m14 7 5 5-5 5" />
      </>
    ),
    calendar: (
      <>
        <path d="M6 2v4M18 2v4M3 9h18M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2Z" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    close: <path d="m6 6 12 12M18 6 6 18" />,
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="1" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    map: (
      <>
        <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Z" />
        <path d="M9 3v15M15 6v15" />
      </>
    ),
    maximize: (
      <>
        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
      </>
    ),
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    minimize: (
      <>
        <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
      </>
    ),
    mute: (
      <>
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <line x1="23" y1="9" x2="17" y2="15" />
        <line x1="17" y1="9" x2="23" y2="15" />
      </>
    ),
    pause: (
      <>
        <rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none" />
        <rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none" />
      </>
    ),
    phone: (
      <path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-4-2-2 2c-3.7-1.6-6.4-4.3-8-8l2-2Z" />
    ),
    play: <path d="m7 4 12 8-12 8V4Z" fill="currentColor" stroke="none" />,
    quote: (
      <path d="M8 11H4c0-4 2-6 6-7v2c-2 .7-3 1.7-3 3h3v7H4v-5m14 0h-4c0-4 2-6 6-7v2c-2 .7-3 1.7-3 3h3v7h-6v-5" />
    ),
    shield: <path d="M12 3 5 6v5c0 4.7 2.9 8 7 10 4.1-2 7-5.3 7-10V6Z" />,
    team: (
      <>
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="10" r="2" />
        <path d="M3 20c0-4 2-6 6-6s6 2 6 6M15 15c3 0 5 1.5 5 4" />
      </>
    ),
    tools: (
      <>
        <path d="m14 7 3-3 3 3-3 3M4 20l10-10" />
        <path d="m8 4 2 2-4 4-2-2a4 4 0 0 1 4-4Z" />
      </>
    ),
    volume: (
      <>
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      </>
    ),
  };
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

const slides = [
  {
    image: "/images/project-8.png",
    video: "/media/videos/site-video-1.mp4",
    poster: "/media/videos/site-video-1.jpg",
    eyebrow: "Industrial Infrastructure",
    title: "We build tomorrow.",
    text: "Engineering dependable spaces that strengthen communities and shape a better Gujarat.",
  },
  {
    image: "/images/project-17.jpg",
    video: "/media/videos/site-video-2.mp4",
    poster: "/media/videos/site-video-2.jpg",
    eyebrow: "Institutional Excellence",
    title: "Built with purpose.",
    text: "From campuses to civic landmarks, every structure begins with responsibility.",
  },
  {
    image: "/images/project-18.jpg",
    video: "/media/videos/site-video-4.mp4",
    poster: "/media/videos/site-video-4.jpg",
    eyebrow: "24 Years of Trust",
    title: "24 Years of Trust.",
    text: "Over two decades of proven reliability, disciplined execution and landmark infrastructure across Gujarat.",
  },
];

const metrics = [
  ["24+", "Years of Trust"],
  ["85+", "Projects completed"],
  ["63+", "Projects under execution"],
  ["40+", "Machinery"],
  ["11 Lac+", "Sq. ft. constructed"],
];

const values = [
  {
    icon: "check" as IconName,
    title: "Commitment",
    text: "We honor our promises and stay dedicated to delivering excellence.",
    tags: ["24 Years of Trust", "Reliable", "Responsible"],
  },
  {
    icon: "tools" as IconName,
    title: "Ability",
    text: "We continuously enhance our skills, knowledge, and capacity to perform at the highest level.",
    tags: ["Skilled", "Capable", "Progressive"],
  },
  {
    icon: "team" as IconName,
    title: "Collaboration",
    text: "We grow together by sharing ideas, supporting each other, and working as one team.",
    tags: ["Together", "Supportive", "United"],
  },
  {
    icon: "clock" as IconName,
    title: "Quality",
    text: "We deliver superior standards in every action, every project, and every interaction.",
    tags: ["Precise", "Consistent", "Excellent"],
  },
  {
    icon: "shield" as IconName,
    title: "Well-being",
    text: "We create an environment where people feel safe, valued, healthy, and happy.",
    tags: ["Safe", "Valued", "Healthy"],
  },
];

const projects = [
  ["Industrial Training Institute at Shihor", "Industrial", 1],
  ["Industrial Training Institute at Vallabhipur", "Institutional", 4],
  ["Arts and Commerce College at Gadhada", "Institutional", 2],
  ["Government Residential Quarters at Botad", "Government Residential", 8],
  ["Industrial Training Institute at Ranpur", "Industrial", 3],
  ["Earth Work at Residential Quarters Botad", "Government Residential", 7],
  ["Girls' Hostel at Botad", "Institutional", 5],
  ["Arts and Commerce College at Barwala", "Institutional", 11],
  ["Building at Asalpur", "Government", 12],
  ["Godown at Dhandhuka", "Government", 13],
  ["Government Secondary School at Haripar", "Institutional", 14],
  ["Police Station at Khergam", "Government", 15],
  ["School Complex at Pardi", "Institutional", 16],
  ["Court Building at Ranpur", "Government", 17],
  ["Godown at Ranpur", "Government", 18],
] as const;

// Key Management Leaders are loaded from FounderModal
const leaders = LEADERS;


const expertise = [
  {
    number: "01",
    title: "Industrial",
    fullName: "Industrial Infrastructure",
    text: "Purpose-built factories, training institutes, warehouses, and complex industrial structures delivered with precision and durability.",
    image: "/images/project-1.png",
    count: "15+ Projects",
    tags: ["Factories", "Warehouses", "ITIs", "Industrial Sheds"],
  },
  {
    number: "02",
    title: "Institutional",
    fullName: "Institutional Excellence",
    text: "Enduring campuses, colleges, schools, and public institutions designed for everyday life and community growth.",
    image: "/images/project-17.jpg",
    count: "20+ Projects",
    tags: ["Colleges", "Schools", "Hostels", "Civic Halls"],
  },
  {
    number: "03",
    title: "Government",
    fullName: "Civic & Government",
    text: "Dependable public infrastructure delivered with rigorous quality, safety, and accountability at every scale.",
    image: "/images/project-11.jpg",
    count: "18+ Projects",
    tags: ["Courts", "Police Stations", "Godowns", "Civic Offices"],
  },
  {
    number: "04",
    title: "Residential",
    fullName: "Residential Communities",
    text: "Thoughtful residential environments and government quarters built for comfort, longevity, and well-being.",
    image: "/images/project-8.png",
    count: "10+ Projects",
    tags: ["Quarters", "Housing", "Govt. Residential", "Layouts"],
  },
];

interface GalleryItem {
  id: string;
  image: string;
  title: string;
  location: string;
  category: string;
  video: string;
  poster: string;
  desc: string;
}

const gallery: GalleryItem[] = [
  {
    id: "archive-01",
    image: "/images/project-12.jpg",
    title: "Government building at Asalpur",
    location: "Asalpur, Gujarat",
    category: "Civil Construction",
    video: "/media/videos/site-video-1.mp4",
    poster: "/media/videos/site-video-1.jpg",
    desc: "Comprehensive on-site drone capture showcasing the structural framework, masonry elevation, and perimeter civil development engineered to civic standards at Asalpur.",
  },
  {
    id: "archive-02",
    image: "/images/project-15.jpg",
    title: "Police station at Khergam",
    location: "Khergam, Gujarat",
    category: "Civic Infrastructure",
    video: "/media/videos/site-video-2.mp4",
    poster: "/media/videos/site-video-2.jpg",
    desc: "Full civil execution and modern façade architecture for the departmental police headquarters at Khergam, built for durability, security, and departmental operations.",
  },
  {
    id: "archive-03",
    image: "/images/project-4.png",
    title: "Industrial Training Institute at Vallabhipur",
    location: "Vallabhipur, Gujarat",
    category: "Institutional Campus",
    video: "/media/videos/site-video-3.mp4",
    poster: "/media/videos/site-video-3.jpg",
    desc: "Aerial site documentation illustrating the expansive institutional campus, multi-wing technical workshop sheds, and administrative quarters at Vallabhipur.",
  },
  {
    id: "archive-04",
    image: "/images/project-16.jpeg",
    title: "School complex at Pardi",
    location: "Pardi, Gujarat",
    category: "Educational Campus",
    video: "/media/videos/site-video-4.mp4",
    poster: "/media/videos/site-video-4.jpg",
    desc: "Modern multi-storey educational facility featuring spacious classroom wings, open corridors, robust structural foundations, and safe campus environments.",
  },
  {
    id: "archive-05",
    image: "/images/project-7.jpg",
    title: "Residential quarters at Botad",
    location: "Botad, Gujarat",
    category: "Government Residential",
    video: "/media/videos/site-video-5.mp4",
    poster: "/media/videos/site-video-5.jpg",
    desc: "High-density residential quarter blocks and foundational earthwork constructed for government staff and administrative personnel in Botad.",
  },
  {
    id: "archive-06",
    image: "/images/project-13.jpg",
    title: "Godown at Dhandhuka",
    location: "Dhandhuka, Gujarat",
    category: "Industrial & Storage",
    video: "/media/videos/site-video-6.mp4",
    poster: "/media/videos/site-video-6.jpg",
    desc: "Heavy-duty industrial storage godown and steel superstructure engineered for maximum volumetric efficiency, logistics access, and high-load transport.",
  },
];

const HR_FUNCTIONS = [
  {
    num: "01",
    title: "Recruitment & Selection",
    desc: "Rigorous talent acquisition identifying experienced civil engineers, project managers, site supervisors, and technical experts.",
    tag: "Talent Acquisition",
    icon: "team" as const,
  },
  {
    num: "02",
    title: "Employee Onboarding",
    desc: "Structured induction program ensuring rapid cultural alignment, safety certifications, and role clarity across project sites.",
    tag: "People Integration",
    icon: "check" as const,
  },
  {
    num: "03",
    title: "Salary Processing",
    desc: "Dependable, transparent payroll governance with timely monthly salary processing and statutory benefit administration.",
    tag: "Payroll & Benefits",
    icon: "calendar" as const,
  },
  {
    num: "04",
    title: "Attendance & Leave Management",
    desc: "Integrated biometric attendance and automated leave tracking powered by the KEKA HRMS cloud platform.",
    tag: "Workforce Tracking",
    icon: "clock" as const,
  },
  {
    num: "05",
    title: "Employee Documentation",
    desc: "Systematic maintenance of employee dossiers, appointment letters, verifications, and career progress records in KEKA HRMS.",
    tag: "KEKA HRMS Records",
    icon: "shield" as const,
  },
  {
    num: "06",
    title: "HR Reporting & Compliance",
    desc: "Strategic workforce analytics, site manpower reconciliation reports, and regulatory compliance monitoring.",
    tag: "Audits & Analytics",
    icon: "tools" as const,
  },
  {
    num: "07",
    title: "Employee Coordination",
    desc: "Facilitating healthy workplace relations, grievance resolution, positive site culture, and team-building initiatives.",
    tag: "Culture & Welfare",
    icon: "team" as const,
  },
  {
    num: "08",
    title: "Social Media Management",
    desc: "Managing corporate digital communications, sharing project milestones, site progress, achievements, and brand stories.",
    tag: "Digital & Outreach",
    icon: "arrow" as const,
  },
] as const;

const careerRolesSummary = [
  {
    role: "Project Manager",
    req: "10+ years; B.E./M.E. Civil",
    badge: "Project Management",
  },
  {
    role: "Senior Engineer",
    req: "5+ years; Diploma / B.E. / B.Tech Civil",
    badge: "Senior Civil",
  },
  {
    role: "Junior Engineer",
    req: "0–4 years; Diploma / B.E. / B.Tech Civil",
    badge: "Site Engineering",
  },
  {
    role: "Site Supervisor",
    req: "Graduate; experience to be confirmed",
    badge: "Site Supervision",
  },
  {
    role: "Microsoft Office Support Engineer",
    req: "1–2 years; Microsoft Office knowledge",
    badge: "IT & Systems",
  },
] as const;

const jobs = [
  {
    title: "Project Manager",
    experience: "Above 10 Years",
    education: "B.E. (Civil) / M.E. (Civil)",
    details:
      "Work closely with engineers, architects and other team members to understand project requirements and specifications. Coordinate with external vendors, negotiate contracts, and ensure full adherence to health and safety standards while driving execution within budget.",
    duties: [
      "Work closely with engineers, architects and other team members to understand project requirements and specifications.",
      "Coordinate with external vendors and negotiate contracts.",
      "Arrange the necessary permits and licenses from the concerned authorities.",
      "Prepare monthly reconciliation statements for building materials.",
      "Plan and manage manpower, equipment and material requirements within the project budget.",
      "Schedule construction activities and ensure that work is completed on time.",
      "Select contractors and staff and assign responsibilities.",
      "Guide and supervise site workers and other team members.",
      "Monitor project progress and prepare regular reports.",
      "Ensure that all health and safety standards are followed.",
    ],
  },
  {
    title: "Senior Engineer",
    experience: "Above 5 Years",
    education: "Diploma / B.E. / B.Tech (Civil)",
    details:
      "Study BOQs and drawings, prepare and verify certified RA bills, manage monthly material reconciliation, handle rate analysis, estimation, and oversee client, contractor, and labour billing.",
    duties: [
      "Study BOQs as per project specifications and calculate quantities from drawings.",
      "Prepare and certify RA bills.",
      "Verify certified RA bills.",
      "Prepare monthly reconciliation statements for building materials.",
      "Handle estimation, costing and rate analysis.",
      "Manage client billing, contractor billing and labour billing.",
    ],
  },
  {
    title: "Junior Engineer",
    experience: "0–4 Years",
    education: "Diploma / B.E. / B.Tech (Civil)",
    details:
      "Assist in managing and developing construction projects while ensuring safe and timely execution. Visit project sites, study drawings, evaluate materials and costs, and maintain technical documentation.",
    duties: [
      "Assist in managing and developing construction projects while ensuring safe and timely execution.",
      "Visit project sites, study drawings and analyse reports, maps and test results.",
      "Carry out technical and feasibility studies and prepare drawings as per project requirements.",
      "Evaluate project materials, costs and possible risks.",
      "Identify technical issues and find suitable solutions.",
      "Coordinate with team members and other project stakeholders.",
      "Monitor project progress and prepare regular status reports.",
      "Manage budgets and arrange the required equipment and materials.",
      "Ensure that work follows safety guidelines, regulations and permit requirements.",
      "Maintain technical files and project documentation.",
    ],
  },
  {
    title: "Supervisor",
    experience: "Graduate; experience to be confirmed",
    education: "Any Graduate",
    details:
      "Study BOQs as per project specifications, calculate quantities from drawings, prepare and verify RA bills, handle material reconciliation, and support estimation, costing, and contractor billing.",
    duties: [
      "Study BOQs as per project specifications and calculate quantities from drawings.",
      "Prepare and certify RA bills.",
      "Verify certified RA bills.",
      "Prepare monthly reconciliation statements for building materials.",
      "Handle estimation, costing and rate analysis.",
      "Manage client billing, contractor billing and labour billing.",
    ],
  },
  {
    title: "Microsoft Office – Support Engineer",
    experience: "1–2 Years",
    education: "Microsoft Office Certified",
    qualification: "Microsoft Office Certified",
    details:
      "Deliver administrative and digital operations support, proficient in MS Office suite, advanced Excel formulas, Intune, email communications, and corporate documentation.",
    duties: [
      "Should have good communication skills in English, Hindi and Gujarati, along with proper email etiquette.",
      "Should have 1–2 years of relevant experience and Microsoft Office certification.",
      "Should be willing to learn new things and continuously improve.",
      "Should have good knowledge of MS Word, Excel, PowerPoint, Outlook, Intune and Vision/PowerPoint.",
      "Prepare Excel formats using formulas and advanced Excel functions.",
    ],
  },
];

const openings = [
  { designation: "Procurement Civil Engineer", location: "Surat", experience: "3 Years", positions: "1" },
  { designation: "Billing Engineer", location: "Sachin to Billimora", experience: "7–8 Years", positions: "1" },
  { designation: "Electrical Engineer", location: "Surat", experience: "4 Years", positions: "1" },
  { designation: "Sr. Civil Engineer", location: "Harij", experience: "1–3 Years", positions: "1" },
  { designation: "Jr. Civil Engineer", location: "Surat", experience: "1–3 Years", positions: "1" },
  { designation: "Back Office Executive", location: "Surat", experience: "Fresher", positions: "1" },
  { designation: "Billing Engineer", location: "Surat", experience: "2–5 Years", positions: "1" },
  { designation: "Site Supervisor", location: "Mangrol (Surat)", experience: "0–1 Years", positions: "1" },
] as const;

const hiringProcess = [
  {
    step: "1",
    title: "Apply Online",
    desc: "Candidates submit their applications through the Careers page.",
  },
  {
    step: "2",
    title: "Application Screening",
    desc: "The HR team reviews applications based on qualifications, experience and job requirements.",
  },
  {
    step: "3",
    title: "Interview Process",
    desc: "Shortlisted candidates are invited for an interview with the concerned department.",
  },
  {
    step: "4",
    title: "Final Selection",
    desc: "Candidates are evaluated based on their skills, experience and suitability for the role.",
  },
  {
    step: "5",
    title: "Offer & Documentation",
    desc: "Selected candidates receive an offer and complete the required joining formalities.",
  },
] as const;

const mediaPhotos = [
  ["/media/content/school-complex.jpg", "School complex"],
  ["/media/content/asalpur-house.png", "Building at Asalpur"],
  ["/media/content/arts-commerce-college.png", "Arts and Commerce College"],
  ["/images/project-1.png", "Industrial Training Institute at Shihor"],
  ["/media/content/police-station-khergam.png", "Police Station at Khergam"],
  ["/media/content/arts-commerce-barwala.png", "Arts and Commerce College at Barwala"],
  ["/media/content/iti-ranpur.png", "Industrial Training Institute at Ranpur"],
  ["/media/content/court-building-ranpur.png", "Court Building at Ranpur"],
  ["/media/content/godown-ranpur.png", "Godown at Ranpur"],
  ["/media/content/school-haripar.png", "Government School at Haripar"],
  ["/media/content/iti-vallabhipur.png", "Industrial Training Institute at Vallabhipur"],
  ["/media/content/godown-dhandhuka.png", "Godown at Dhandhuka"],
] as const;

const mediaVideos = Array.from({ length: 7 }, (_, index) => ({
  src: `/media/videos/site-video-${index + 1}.mp4`,
  poster: `/media/videos/site-video-${index + 1}.jpg`,
  title: `Siddhivinayak Infrastructure - Site Video ${String(index + 1).padStart(2, "0")}`,
}));

const socialLinks = [
  ["LinkedIn", "http://www.linkedin.com/in/mr-vishal-sutariya-980474220"],
  ["Facebook", "https://www.facebook.com/share/1CLyTHDM26/"],
  ["Instagram", "https://www.instagram.com/siddhi_infra?rpxt=NmR3MzB5dDhvZ20="],
  ["WhatsApp", "https://wa.me/919429744199?text=Hello%20Siddhivinayak%20Infrastructure"],
] as const;

const navigation = [
  ["Home", "/"],
  ["About", "/about"],
  ["Projects", "/projects"],
  ["Career", "/career"],
  ["Media", "/media"],
  ["Contact", "/contact"],
] as const;

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
}

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const home = location.pathname === "/";
  return (
    <>
      <ScrollToTop />
      <header className={`site-header ${home ? "" : "inner-header"}`}>
        <Link className="brand" to="/" aria-label="Siddhivinayak Infrastructure home">
          <img src="/images/siddhivinayak-logo.png" alt="Siddhivinayak Infrastructure" />
        </Link>
        <nav className={menuOpen ? "nav-open" : ""} aria-label="Primary navigation">
          {navigation.map(([label, path]) => (
            <NavLink
              end
              key={path}
              to={path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <Link className="header-cta" to="/contact">
          Business enquiry <Icon name="arrow" size={13} />
        </Link>
        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <Icon name={menuOpen ? "close" : "menu"} size={25} />
        </button>
      </header>
      <Outlet />
      <FloatingSocialBar />
      <Footer />
    </>
  );
}

function PageLink({
  children,
  to,
  light = false,
}: {
  children: ReactNode;
  to: string;
  light?: boolean;
}) {
  return (
    <Link to={to} className={`button ${light ? "button-light" : ""}`}>
      {children}
      <Icon name="arrow" size={18} />
    </Link>
  );
}

function PageHero({ eyebrow, title, image }: { eyebrow: string; title: string; image: string }) {
  return (
    <section className="page-hero" style={{ backgroundImage: `url("${image}")` }}>
      <div className="page-hero-shade" />
      <div className="container page-hero-content">
        <p className="eyebrow light">{eyebrow}</p>
        <h1>{title}</h1>
      </div>
    </section>
  );
}

function Metrics() {
  return (
    <section className="metrics" aria-label="Company highlights">
      <div className="container metric-grid">
        {metrics.map(([value, label]) => (
          <div className="metric" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function HeroSlideItem({
  item,
  isActive,
}: {
  item: (typeof slides)[number];
  isActive: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      video.pause();
    }
  }, [isActive]);

  return (
    <div
      className={`hero-slide ${isActive ? "active" : ""}`}
      style={{ backgroundColor: "#06151f" }}
    >
      <video
        ref={videoRef}
        className="hero-video"
        src={item.video}
        autoPlay={isActive}
        muted
        loop
        playsInline
        preload={isActive ? "auto" : "none"}
        style={{ opacity: 0.6 }}
      />
    </div>
  );
}

function ExpertiseSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="section expertise-section">
      <div className="container">
        <div className="section-heading split">
          <div>
            <p className="eyebrow">What we build</p>
            <h2>Expertise across every sector.</h2>
          </div>
          <p>
            Integrated construction capabilities, experienced teams, and disciplined execution
            bringing landmark spaces to life across Gujarat.
          </p>
        </div>

        <div className="expertise-strip" role="region" aria-label="Sectors of expertise">
          {expertise.map((item, index) => {
            const isHovered = hoveredIndex === index;
            const hasHover = hoveredIndex !== null;

            return (
              <article
                key={item.title}
                className={`expertise-column ${isHovered ? "expanded" : hasHover ? "compressed" : ""}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="expertise-col-media">
                  <img src={item.image} alt={item.fullName} />
                  <div className="expertise-col-shade" />
                  <div className="expertise-col-gradient" />
                </div>

                <div className="expertise-col-top">
                  <div className="expertise-col-num-pill">
                    <span>{item.number}</span>
                    <i />
                    <strong>{item.title}</strong>
                  </div>
                  <span className="expertise-col-count">{item.count}</span>
                </div>

                <div className="expertise-col-bottom">
                  <h3>{item.fullName}</h3>
                  <p className="expertise-col-desc">{item.text}</p>
                  <div className="expertise-col-tags">
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <Link to="/projects" className="expertise-col-link">
                    <span>View {item.title} Projects</span>
                    <Icon name="arrow" size={14} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Home() {
  const [slide, setSlide] = useState(0);
  const [selectedLeaderIndex, setSelectedLeaderIndex] = useState(0);
  const [isLeaderModalOpen, setIsLeaderModalOpen] = useState(false);
  useEffect(() => {
    const timer = window.setInterval(
      () => setSlide((current) => (current + 1) % slides.length),
      7000,
    );
    return () => window.clearInterval(timer);
  }, []);

  const changeSlide = (direction: number) => {
    setSlide((current) => (current + direction + slides.length) % slides.length);
  };

  return (
    <main>
      <section className="hero">
        {slides.map((item, index) => (
          <HeroSlideItem
            key={item.video}
            item={item}
            isActive={index === slide}
          />
        ))}
        <div className="hero-shade" />
        <button
          className="hero-side-arrow hero-side-arrow-left"
          onClick={() => changeSlide(-1)}
          aria-label="Previous slide"
        >
          <Icon name="arrow" size={22} />
        </button>
        <div className="hero-content" key={slide} aria-live="polite">
          <h1>
            {slides[slide].title.split(" ").slice(0, -1).join(" ")}{" "}
            <span>{slides[slide].title.split(" ").at(-1)}</span>
          </h1>
          <p className="hero-copy">{slides[slide].text}</p>
          <PageLink light to="/projects">
            Explore our work
          </PageLink>
        </div>
        <button
          className="hero-side-arrow hero-side-arrow-right"
          onClick={() => changeSlide(1)}
          aria-label="Next slide"
        >
          <Icon name="arrow" size={22} />
        </button>
        <div className="hero-bottom">
          <div className="hero-tabs" aria-label="Choose a hero slide">
            {slides.map((item, index) => (
              <button
                key={item.title}
                onClick={() => setSlide(index)}
                aria-label={`View ${item.title}`}
                className={index === slide ? "active" : ""}
              >
                <span>0{index + 1}</span>
                <strong>{item.eyebrow}</strong>
                {index === slide && <i key={slide} />}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="discover" className="section about-section home-preview">
        <div className="container about-grid">
          <div className="about-image">
            <img src="/images/about.png" alt="Siddhivinayak construction project" />
            <div className="experience-stamp">
              <strong>24+</strong>
              <span>
                Years of
                <br />
                Trust
              </span>
            </div>
          </div>
          <div className="about-copy">
            <p className="eyebrow">About us</p>
            <h2>
              <span className="years-hero-num">24</span>
              <span className="years-hero-title">Years of Trust in Infrastructure Development.</span>
            </h2>
            <p className="lead">
              Established in 2000, Siddhivinayak Infrastructure brings 24 years of proven engineering excellence,
              delivering dependable civil, industrial, institutional and civic infrastructure across Gujarat and India.
            </p>
            <PageLink to="/about">Discover our company</PageLink>
          </div>
        </div>
      </section>

      <Metrics />

      <ExpertiseSection />

      <section className="section home-projects">
        <div className="container">
          <div className="section-heading split">
            <div>
              <div className="portfolio-eyebrow-pill">
                <span className="portfolio-pill-dot" />
                <span>Featured Projects</span>
              </div>
              <h2 className="portfolio-title">
                Work that stands as <span className="portfolio-title-accent">proof.</span>
              </h2>
            </div>
            <div className="preview-action">
              <p>
                Explore the industrial, institutional, government and residential projects delivered
                by our teams across Gujarat.
              </p>
              <PageLink to="/projects">View all projects</PageLink>
            </div>
          </div>
          <ProjectGrid items={projects.slice(0, 3)} featured={false} />
        </div>
      </section>

      <section className="section home-leadership">
        <div className="container">
          <div className="section-heading split">
            <div>
              <div className="portfolio-eyebrow-pill">
                <span className="portfolio-pill-dot" />
                <span>Founders & Leadership</span>
              </div>
              <h2 className="portfolio-title">
                Vision backed by <span className="portfolio-title-accent">experience.</span>
              </h2>
            </div>
            <div className="preview-action">
              <p>
                Our leaders combine decades of on-ground knowledge with a forward-looking approach
                to responsible construction.
              </p>
              <PageLink to="/about">Meet our company</PageLink>
            </div>
          </div>
          <div className="home-leader-grid">
            {LEADERS.map((leader, index) => (
              <article
                className="home-leader-card"
                key={leader.name}
                onClick={() => {
                  setSelectedLeaderIndex(index);
                  setIsLeaderModalOpen(true);
                }}
                role="button"
                tabIndex={0}
                aria-label={`View executive statement of ${leader.name}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedLeaderIndex(index);
                    setIsLeaderModalOpen(true);
                  }
                }}
              >
                <div className="home-leader-image">
                  <img src={leader.image} alt={leader.name} />
                  <span>0{index + 1}</span>
                </div>
                <div className="home-leader-card-body">
                  <div className="home-leader-role-badge">
                    <span className="home-leader-role-dot" />
                    <span>{leader.role}</span>
                  </div>
                  <h3 className="home-leader-name">{leader.name}</h3>
                  <p className="home-leader-quote-snippet">“{leader.quote}”</p>
                  <button
                    type="button"
                    className="home-leader-action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLeaderIndex(index);
                      setIsLeaderModalOpen(true);
                    }}
                  >
                    <span>Read Executive Statement</span>
                    <Icon name="arrow" size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="purpose-section">
        <div className="purpose-image" />
        <div className="purpose-copy">
          <p className="eyebrow light">Built responsibly</p>
          <h2>A promise that goes beyond the structure.</h2>
          <p className="purpose-intro">
            Every project is guided by the same principles: uncompromising quality, safe practices
            and respect for time.
          </p>
          <div className="purpose-points">
            <article>
              <span>01</span>
              <div>
                <h3>Quality first</h3>
                <p>Materials, workmanship and details held to exacting standards.</p>
              </div>
            </article>
            <article>
              <span>02</span>
              <div>
                <h3>On-time delivery</h3>
                <p>Clear planning and accountable teams keep every stage moving.</p>
              </div>
            </article>
            <article>
              <span>03</span>
              <div>
                <h3>Safety always</h3>
                <p>Responsible sites that protect our people and surrounding communities.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section gallery-section">
        <div className="container">
          <div className="gallery-heading">
            <div>
              <div className="portfolio-eyebrow-pill">
                <span className="portfolio-pill-dot" />
                <span>Visual Archives</span>
              </div>
              <h2 className="portfolio-title">
                Progress, from every <span className="portfolio-title-accent">angle.</span>
              </h2>
            </div>
            <PageLink to="/projects">Explore full portfolio</PageLink>
          </div>
          <GalleryGrid />
        </div>
      </section>

      <section className="home-career-preview">
        <div className="home-career-image" />
        <div className="home-career-copy">
          <p className="eyebrow light">Careers</p>
          <h2>Build your future while building ours.</h2>
          <p>
            Join a team that values ownership, technical ability and the ambition to create
            meaningful infrastructure.
          </p>
          <PageLink light to="/career">
            View open positions
          </PageLink>
        </div>
      </section>

      <section className="section home-contact-section">
        <div className="container home-contact-wrapper">
          <div className="contact-copy">
            <p className="eyebrow">Start a conversation</p>
            <h2>Have a project in mind?</h2>
            <p>
              Tell us what you are planning. Our team is ready to discuss your construction,
              tendering, and infrastructure requirements across Gujarat.
            </p>
            <div className="home-contact-actions">
              <Link to="/contact" className="button">
                Get in touch <Icon name="arrow" size={16} />
              </Link>
            </div>
            <div className="home-contact-note">
              <span>Direct contact:</span>
              <a href="tel:+919429744199" className="contact-phone">+91 94297 44199</a>
              <a href="mailto:info@siddhiinfra.in">info@siddhiinfra.in</a>
            </div>
          </div>
        </div>
      </section>
      <FounderModal
        currentIndex={selectedLeaderIndex}
        isOpen={isLeaderModalOpen}
        onClose={() => setIsLeaderModalOpen(false)}
        onSelectIndex={setSelectedLeaderIndex}
      />
    </main>
  );
}

function About() {
  const [selectedLeaderIndex, setSelectedLeaderIndex] = useState(0);
  const [isLeaderModalOpen, setIsLeaderModalOpen] = useState(false);
  return (
    <main>
      <PageHero
        eyebrow="About us"
        title="Built on trust. Driven by purpose."
        image="/images/project-17.jpg"
      />
      <section className="section about-section">
        <div className="container about-grid">
          <div className="about-image">
            <img src="/images/about.png" alt="Siddhivinayak Infrastructure project" />
            <div className="experience-stamp">
              <strong>24+</strong>
              <span>
                Years of
                <br />
                Trust
              </span>
            </div>
          </div>
          <div className="about-copy">
            <p className="eyebrow">Our story</p>
            <h2>
              <span className="years-hero-num">24</span>
              <span className="years-hero-title">Years of Trust, Proven Reliability & Excellence.</span>
            </h2>
            <p className="lead">
              Established in 2000, Siddhivinayak Infrastructure is built on 24 years of unwavering trust,
              offering a diversified range of construction and allied civil engineering services across Gujarat and India.
            </p>
            <p>
              Since our founding in 2000, our capabilities have expanded across industrial, institutional and government projects, roads,
              bridges, earthworks, government residential and private residential developments.
              Experienced architects, designers, engineers and project teams work together to
              deliver reliable, high-quality results on time.
            </p>
          </div>
        </div>
      </section>
      <Metrics />
      <section className="section values-section">
        <div className="container">
          <div className="section-heading split">
            <div>
              <p className="eyebrow">What defines us</p>
              <h2>Values built into every project.</h2>
            </div>
            <p>
              We focus on the essentials that make construction dependable: quality, disciplined
              delivery, proven ability, strong partnerships and safety.
            </p>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <article className="value-card" key={value.title}>
                <div className="card-number">0{index + 1}</div>
                <div className="value-icon">
                  <Icon name={value.icon} size={27} />
                </div>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
                <div className="tags">
                  {value.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section mission-section">
        <div className="container mission-grid">
          <div className="mission-intro">
            <p className="eyebrow">Our direction</p>
            <h2>Ambition grounded in responsibility.</h2>
            <div className="quote-icon">
              <Icon name="quote" size={38} />
            </div>
          </div>
          <div className="mission-list">
            <article>
              <span>01</span>
              <div>
                <h3>Our mission</h3>
                <p>
                  To contribute to global progress by creating trustworthy experiences that bring
                  happiness and satisfaction to everyone we serve.
                </p>
              </div>
            </article>
            <article>
              <span>02</span>
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px", marginBottom: "8px" }}>
                  <h3 style={{ margin: 0 }}>Our vision</h3>
                  <span style={{ fontSize: "0.74rem", fontWeight: 700, letterSpacing: "0.08em", padding: "4px 12px", borderRadius: "9999px", background: "rgba(226, 111, 18, 0.15)", border: "1px solid rgba(226, 111, 18, 0.4)", color: "#ea7e2a" }}>
                    ₹1,111 CRORE BY 2036
                  </span>
                </div>
                <p>
                  To achieve ₹1,111 Crore by 2036 by creating an organisation built on reliability,
                  world-class behaviour, and unstoppable growth.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section className="section leadership-section">
        <div className="container">
          <div className="section-heading split">
            <div>
              <div className="portfolio-eyebrow-pill">
                <span className="portfolio-pill-dot" />
                <span>Executive Leadership</span>
              </div>
              <h2 className="portfolio-title">
                Experience at the <span className="portfolio-title-accent">helm.</span>
              </h2>
            </div>
            <p>
              Our experienced leadership brings decisive thinking, ethical governance, and on-ground
              expertise to every infrastructure engagement.
            </p>
          </div>
          <div className="leader-stories">
            {LEADERS.map((leader, index) => (
              <article className="leader-story" key={leader.name}>
                <div className="leader-image">
                  <img src={leader.image} alt={leader.name} />
                </div>
                <div className="leader-story-copy">
                  <span>0{index + 1}</span>
                  <p className="leader-role">{leader.role}</p>
                  <h3>{leader.name}</h3>
                  <p>{leader.statement}</p>
                  <blockquote>“{leader.quote}”</blockquote>
                  <button
                    type="button"
                    className="leader-story-btn"
                    onClick={() => {
                      setSelectedLeaderIndex(index);
                      setIsLeaderModalOpen(true);
                    }}
                  >
                    <span>Open Interactive Profile</span>
                    <Icon name="arrow" size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section hr-about-section">
        <div className="container">
          <div className="hr-about-card">
            <div className="hr-about-header">
              <div className="portfolio-eyebrow-pill">
                <span className="portfolio-pill-dot" />
                <span>5. Introduction of Human Resource and Social Media</span>
              </div>
              <div className="keka-hrms-badge">
                <span className="keka-dot" />
                <span>Powered by KEKA HRMS System</span>
              </div>
            </div>
            <div className="hr-about-grid">
              <div className="hr-about-main">
                <h2>
                  Fostering a progressive environment for{" "}
                  <span className="portfolio-title-accent">growth & excellence.</span>
                </h2>
                <p className="hr-about-lead">
                  The Human Resource (HR) Department at Siddhivinayak Infrastructure plays an
                  important role in managing employees and supporting the smooth functioning of the
                  organization. The department is responsible for recruitment and selection,
                  employee onboarding, salary processing, attendance and leave management,
                  employee documentation, and HR reporting. It also handles employee coordination,
                  social media management, and maintains employee records through the KEKA HRMS system.
                </p>
                <div className="hr-about-actions">
                  <Link to="/career" className="btn btn-primary">
                    View Career Opportunities & HR Details <Icon name="arrow" size={16} />
                  </Link>
                </div>
              </div>
              <div className="hr-about-sidebar">
                <div className="hr-objective-box">
                  <div className="hr-objective-badge">
                    <Icon name="quote" size={15} />
                    <span>Department Main Objective</span>
                  </div>
                  <blockquote className="hr-objective-quote">
                    “The main objective of the HR Department is to ensure effective workforce management,
                    maintain a positive working environment, and support the overall growth and
                    development of the organization.”
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FounderModal
        currentIndex={selectedLeaderIndex}
        isOpen={isLeaderModalOpen}
        onClose={() => setIsLeaderModalOpen(false)}
        onSelectIndex={setSelectedLeaderIndex}
      />
    </main>
  );
}

function projectImage(image: number) {
  const extension = [1, 2, 3, 4, 6, 8, 9, 10].includes(image)
    ? "png"
    : image === 16
      ? "jpeg"
      : "jpg";
  return `/images/project-${image}.${extension}`;
}

const GUJARAT_CITIES = [
  "Ahmedabad", "Botad", "Surat", "Navsari", "Vapi", "Dhandhuka", "Barvala", "Barwala",
  "Vallabhipur", "Asalpur", "Vinchhiya", "Ranpur", "Bilimora", "Valsad",
  "Gadhada", "Shihor", "Haripar", "Khergam", "Pardi"
];

function parseProjectInfo(rawTitle: string) {
  for (const city of GUJARAT_CITIES) {
    const cityRegex = new RegExp(`\\b${city}\\b`, "i");
    if (cityRegex.test(rawTitle)) {
      const atMatch = rawTitle.match(/^(.*?)\s+at\s+(.*)$/i);
      return {
        title: atMatch ? atMatch[1].trim() : rawTitle,
        fullTitle: rawTitle,
        location: `${city}, Gujarat`,
      };
    }
  }

  const atMatch = rawTitle.match(/^(.*?)\s+at\s+(.*)$/i);
  if (atMatch) {
    let loc = atMatch[2].trim();
    if (!loc.toLowerCase().includes("gujarat")) {
      loc = `${loc}, Gujarat`;
    }
    return {
      title: atMatch[1].trim(),
      fullTitle: rawTitle,
      location: loc,
    };
  }
  return {
    title: rawTitle,
    fullTitle: rawTitle,
    location: "Gujarat, India",
  };
}

function getProjectVideo(title: string, imageNum?: number): { video: string; poster: string } | null {
  const t = title.toLowerCase();
  if (t.includes("asalpur") || imageNum === 12) {
    return { video: "/media/videos/site-video-1.mp4", poster: "/media/videos/site-video-1.jpg" };
  }
  if (t.includes("khergam") || imageNum === 15) {
    return { video: "/media/videos/site-video-2.mp4", poster: "/media/videos/site-video-2.jpg" };
  }
  if (t.includes("vallabhipur") || imageNum === 4) {
    return { video: "/media/videos/site-video-3.mp4", poster: "/media/videos/site-video-3.jpg" };
  }
  if (t.includes("pardi") || imageNum === 16) {
    return { video: "/media/videos/site-video-4.mp4", poster: "/media/videos/site-video-4.jpg" };
  }
  if (t.includes("botad") || imageNum === 7 || imageNum === 8 || imageNum === 5) {
    return { video: "/media/videos/site-video-5.mp4", poster: "/media/videos/site-video-5.jpg" };
  }
  if (t.includes("dhandhuka") || imageNum === 13) {
    return { video: "/media/videos/site-video-6.mp4", poster: "/media/videos/site-video-6.jpg" };
  }
  if (t.includes("ranpur") || imageNum === 3 || imageNum === 17 || imageNum === 18) {
    return { video: "/media/videos/site-video-7.mp4", poster: "/media/videos/site-video-7.jpg" };
  }
  return null;
}

function VideoPlayer({
  src,
  poster,
  title,
  autoPlay = false,
  className = "",
}: {
  src: string;
  poster?: string;
  title?: string;
  autoPlay?: boolean;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const progressTrackRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bufferedEnd, setBufferedEnd] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const controlsTimeoutRef = useRef<number | null>(null);

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused || videoRef.current.ended) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (autoPlay && videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Browser policy blocked unmuted autoplay; retry muted so video plays visually
            if (videoRef.current) {
              videoRef.current.muted = true;
              setIsMuted(true);
              videoRef.current
                .play()
                .then(() => setIsPlaying(true))
                .catch(() => {});
            }
          });
      }
    }
  }, [src, autoPlay]);

  const handleTimeUpdate = () => {
    if (!videoRef.current || isDragging) return;
    setCurrentTime(videoRef.current.currentTime);
    if (videoRef.current.buffered.length > 0) {
      const buffered = videoRef.current.buffered.end(videoRef.current.buffered.length - 1);
      setBufferedEnd(buffered);
    }
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration || 0);
  };

  const seekTo = (clientX: number) => {
    if (!progressTrackRef.current || !videoRef.current || !duration) return;
    const rect = progressTrackRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const targetTime = pos * duration;
    videoRef.current.currentTime = targetTime;
    setCurrentTime(targetTime);
  };

  const handleProgressMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    seekTo(e.clientX);

    const onMouseMove = (moveEvent: MouseEvent) => {
      seekTo(moveEvent.clientX);
    };

    const onMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!e.touches[0]) return;
    setIsDragging(true);
    seekTo(e.touches[0].clientX);

    const onTouchMove = (moveEvent: TouchEvent) => {
      // Prevent background page from scrolling while scrubbing video
      if (moveEvent.cancelable) moveEvent.preventDefault();
      if (moveEvent.touches[0]) seekTo(moveEvent.touches[0].clientX);
    };

    const onTouchEnd = () => {
      setIsDragging(false);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };

    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    if (isMuted) {
      videoRef.current.muted = false;
      setIsMuted(false);
      if (volume === 0) {
        setVolume(1);
        videoRef.current.volume = 1;
      }
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      if (val === 0) {
        videoRef.current.muted = true;
        setIsMuted(true);
      } else if (isMuted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) window.clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = window.setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  };

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) window.clearTimeout(controlsTimeoutRef.current);
    };
  }, []);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const bufferedPercent = duration > 0 ? (bufferedEnd / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className={`custom-video-player ${className} ${isPlaying ? "is-playing" : "is-paused"} ${
        showControls || !isPlaying ? "controls-visible" : "controls-hidden"
      } ${isFullscreen ? "is-fullscreen" : ""}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        key={src}
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        preload="metadata"
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Center Play / Pause Overlay Button */}
      <button
        type="button"
        className="custom-video-center-btn"
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause video" : "Play video"}
      >
        <span className="custom-video-center-icon">
          <Icon name={isPlaying ? "pause" : "play"} size={26} />
        </span>
      </button>

      {/* Custom Bottom Controls Bar with Brand Orange Progress Bar */}
      <div className="custom-video-controls" onClick={(e) => e.stopPropagation()}>
        {/* Progress Track spanning full width */}
        <div
          ref={progressTrackRef}
          className="custom-video-progress-wrap"
          onMouseDown={handleProgressMouseDown}
          onTouchStart={handleTouchStart}
          role="slider"
          aria-label="Video scrubber"
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={currentTime}
          tabIndex={0}
        >
          <div className="custom-video-progress-bg">
            <div
              className="custom-video-progress-buffered"
              style={{ width: `${bufferedPercent}%` }}
            />
            <div
              className="custom-video-progress-filled"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="custom-video-progress-thumb" />
            </div>
          </div>
        </div>

        {/* Action Row */}
        <div className="custom-video-actions">
          <div className="custom-video-left-actions">
            <button
              type="button"
              className="custom-video-action-btn"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              <Icon name={isPlaying ? "pause" : "play"} size={16} />
            </button>

            <div className="custom-video-time">
              <span className="custom-video-current-time">{formatTime(currentTime)}</span>
              <span className="custom-video-time-divider">/</span>
              <span className="custom-video-duration-time">{formatTime(duration)}</span>
            </div>
          </div>

          <div className="custom-video-right-actions">
            <div className="custom-video-volume-wrap">
              <button
                type="button"
                className="custom-video-action-btn"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                <Icon name={isMuted || volume === 0 ? "mute" : "volume"} size={17} />
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="custom-video-volume-slider"
                aria-label="Volume slider"
              />
            </div>

            <button
              type="button"
              className="custom-video-action-btn"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              <Icon name={isFullscreen ? "minimize" : "maximize"} size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function lockBackgroundScroll(): () => void {
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
    const prevScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";
    document.body.style.scrollBehavior = "auto";

    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    document.documentElement.classList.remove("modal-open");
    document.body.classList.remove("modal-open");
    window.scrollTo({ top: scrollY, left: 0, behavior: "instant" });

    requestAnimationFrame(() => {
      document.documentElement.style.scrollBehavior = prevScrollBehavior;
      document.body.style.scrollBehavior = "";
    });
  };
}

function ProjectGrid({
  items,
  featured = true,
}: {
  items: readonly (readonly [string, string, number])[];
  featured?: boolean;
}) {
  const [selectedProject, setSelectedProject] = useState<(readonly [string, string, number]) | null>(null);
  const [projectMediaMode, setProjectMediaMode] = useState<"video" | "photo">("video");

  useEffect(() => {
    if (!selectedProject) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    const unlock = lockBackgroundScroll();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      unlock();
    };
  }, [selectedProject]);

  const handleOpenProject = (item: readonly [string, string, number]) => {
    setSelectedProject(item);
    const videoData = getProjectVideo(item[0], item[2]);
    setProjectMediaMode(videoData ? "video" : "photo");
  };

  return (
    <>
      <div className="projects-grid">
        {items.map(([title, category, image], index) => {
          const info = parseProjectInfo(title);
          const videoData = getProjectVideo(title, image);
          return (
            <article
              className={`project-card ${featured && index === 0 ? "project-featured" : ""}`}
              key={title}
              onClick={() => handleOpenProject([title, category, image])}
              role="button"
              tabIndex={0}
              aria-label={`View details and media for ${title}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleOpenProject([title, category, image]);
                }
              }}
            >
              <img src={projectImage(image)} alt={title} loading="lazy" />

              {/* Floating Top Badges */}
              <div className="project-top-tags">
                <div className="project-tags-group">
                  <span className="project-category-tag">
                    <span className="project-category-dot" />
                    {category}
                  </span>
                  <span className="project-location-tag">
                    <Icon name="map" size={12} />
                    {info.location}
                  </span>
                </div>
                {videoData && (
                  <span className="project-video-pill">
                    <Icon name="play" size={10} />
                    <span>Site Video</span>
                  </span>
                )}
              </div>

              {/* Bottom Info Overlay */}
              <div className="project-overlay">
                <div className="project-info">
                  <span className="project-spec">Infrastructure • Gujarat</span>
                  <h3>{title}</h3>
                </div>
                <div className="project-action-btn" title="View Project Details & Video">
                  <Icon name={videoData ? "play" : "arrow"} size={17} />
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Lightbox / Detail Modal with Video */}
      {selectedProject &&
        createPortal(
          (() => {
            const videoData = getProjectVideo(selectedProject[0], selectedProject[2]);
            const info = parseProjectInfo(selectedProject[0]);
            return (
              <div className="portfolio-modal-backdrop" onClick={() => setSelectedProject(null)}>
                <div className="portfolio-modal-box gallery-video-modal-box" onClick={(e) => e.stopPropagation()}>
                  <div className="gallery-modal-top-bar">
                    {videoData ? (
                      <div className="gallery-modal-tabs">
                        <button
                          type="button"
                          className={`gallery-modal-tab ${projectMediaMode === "video" ? "active" : ""}`}
                          onClick={() => setProjectMediaMode("video")}
                        >
                          <Icon name="play" size={13} />
                          <span>Watch Video</span>
                        </button>
                        <button
                          type="button"
                          className={`gallery-modal-tab ${projectMediaMode === "photo" ? "active" : ""}`}
                          onClick={() => setProjectMediaMode("photo")}
                        >
                          <Icon name="arrow" size={13} />
                          <span>Photo</span>
                        </button>
                      </div>
                    ) : (
                      <span className="gallery-modal-top-title">Project Archive</span>
                    )}
                    <button
                      className="portfolio-modal-close"
                      onClick={() => setSelectedProject(null)}
                      aria-label="Close project preview"
                    >
                      <Icon name="close" size={18} />
                    </button>
                  </div>

                  {/* Media Display: VideoPlayer with Orange Scrubber OR High-Res Photo */}
                  {projectMediaMode === "video" && videoData ? (
                    <div className="gallery-modal-player-wrap">
                      <VideoPlayer
                        src={videoData.video}
                        poster={videoData.poster}
                        title={selectedProject[0]}
                        autoPlay={true}
                      />
                    </div>
                  ) : (
                    <div className="portfolio-modal-image-wrap">
                      <img
                        src={projectImage(selectedProject[2])}
                        alt={selectedProject[0]}
                        className="portfolio-modal-image"
                      />
                      <div className="portfolio-modal-image-badges">
                        <span className="project-category-tag">
                          <span className="project-category-dot" />
                          {selectedProject[1]}
                        </span>
                        <span className="project-location-tag">
                          <Icon name="map" size={13} />
                          {info.location}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="portfolio-modal-content">
                    <div className="gallery-modal-header-row">
                      <div>
                        <span className="project-spec">{selectedProject[1]} • Siddhivinayak Infrastructure</span>
                        <h3>{selectedProject[0]}</h3>
                      </div>
                      <span className="gallery-modal-loc-badge">
                        <Icon name="map" size={13} />
                        {info.location}
                      </span>
                    </div>
                    <p className="portfolio-modal-desc">
                      High-standard civil execution engineered with quality materials, advanced methodology,
                      and safety compliance for government and institutional infrastructure across Gujarat.
                    </p>
                    <div className="portfolio-modal-meta-grid">
                      <div className="portfolio-modal-meta-item">
                        <label>Sector</label>
                        <strong>{selectedProject[1]}</strong>
                      </div>
                      <div className="portfolio-modal-meta-item">
                        <label>Location</label>
                        <strong>{info.location}</strong>
                      </div>
                      <div className="portfolio-modal-meta-item">
                        <label>Documentation</label>
                        <strong className="status-delivered">
                          {videoData ? "Verified Site Video Available" : "Photo Archive"}
                        </strong>
                      </div>
                      <div className="portfolio-modal-meta-item">
                        <label>Execution Quality</label>
                        <strong>ISO Standard Compliant</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })(),
          document.body
        )}
    </>
  );
}

function GalleryGrid() {
  const [selectedGallery, setSelectedGallery] = useState<GalleryItem | null>(null);
  const [mediaMode, setMediaMode] = useState<"video" | "photo">("video");

  useEffect(() => {
    if (!selectedGallery) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedGallery(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    const unlock = lockBackgroundScroll();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      unlock();
    };
  }, [selectedGallery]);

  const handleOpenGallery = (item: GalleryItem) => {
    setSelectedGallery(item);
    setMediaMode(item.video ? "video" : "photo");
  };

  return (
    <>
      <div className="gallery-grid">
        {gallery.map((item, index) => (
          <figure
            className={`gallery-item gallery-item-${index + 1}`}
            key={item.id}
            onClick={() => handleOpenGallery(item)}
            role="button"
            tabIndex={0}
            aria-label={`View project details and video for ${item.title}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleOpenGallery(item);
              }
            }}
          >
            <img src={item.image} alt={item.title} loading="lazy" />

            {/* Floating Top Badges */}
            <div className="gallery-top-tags">
              <span className="gallery-archive-tag">Archive 0{index + 1}</span>
              <span className="gallery-location-tag">
                <Icon name="map" size={12} />
                {item.location}
              </span>
              {item.video && (
                <span className="gallery-video-pill">
                  <Icon name="play" size={10} />
                  <span>Site Video</span>
                </span>
              )}
            </div>

            {/* Bottom Caption Overlay */}
            <figcaption className="gallery-caption">
              <div className="gallery-caption-info">
                <span className="gallery-spec">{item.category}</span>
                <h4>{item.title}</h4>
              </div>
              <div className="gallery-zoom-btn" title="Open Video & Photos">
                <Icon name="play" size={15} />
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Gallery Lightbox Modal with Video */}
      {selectedGallery &&
        createPortal(
          <div className="portfolio-modal-backdrop" onClick={() => setSelectedGallery(null)}>
            <div className="portfolio-modal-box gallery-video-modal-box" onClick={(e) => e.stopPropagation()}>
              <div className="gallery-modal-top-bar">
                {selectedGallery.video ? (
                  <div className="gallery-modal-tabs">
                    <button
                      type="button"
                      className={`gallery-modal-tab ${mediaMode === "video" ? "active" : ""}`}
                      onClick={() => setMediaMode("video")}
                    >
                      <Icon name="play" size={13} />
                      <span>Watch Video</span>
                    </button>
                    <button
                      type="button"
                      className={`gallery-modal-tab ${mediaMode === "photo" ? "active" : ""}`}
                      onClick={() => setMediaMode("photo")}
                    >
                      <Icon name="arrow" size={13} />
                      <span>Photo</span>
                    </button>
                  </div>
                ) : (
                  <span className="gallery-modal-top-title">Site Archive</span>
                )}
                <button
                  className="portfolio-modal-close"
                  onClick={() => setSelectedGallery(null)}
                  aria-label="Close project preview"
                >
                  <Icon name="close" size={18} />
                </button>
              </div>

              {/* Modal Media Display */}
              {mediaMode === "video" && selectedGallery.video ? (
                <div className="gallery-modal-player-wrap">
                  <VideoPlayer
                    src={selectedGallery.video}
                    poster={selectedGallery.poster}
                    title={selectedGallery.title}
                    autoPlay={true}
                  />
                </div>
              ) : (
                <div className="portfolio-modal-image-wrap gallery-modal-image-wrap">
                  <img
                    src={selectedGallery.image}
                    alt={selectedGallery.title}
                    className="portfolio-modal-image"
                  />
                  <div className="portfolio-modal-image-badges">
                    <span className="project-category-tag">
                      <span className="project-category-dot" />
                      {selectedGallery.category}
                    </span>
                    <span className="project-location-tag">
                      <Icon name="map" size={13} />
                      {selectedGallery.location}
                    </span>
                  </div>
                </div>
              )}

              <div className="portfolio-modal-content">
                <div className="gallery-modal-header-row">
                  <div>
                    <span className="project-spec">{selectedGallery.category} • Site Archive</span>
                    <h3>{selectedGallery.title}</h3>
                  </div>
                  <span className="gallery-modal-loc-badge">
                    <Icon name="map" size={13} />
                    {selectedGallery.location}
                  </span>
                </div>
                <p className="portfolio-modal-desc">
                  {selectedGallery.desc}
                </p>
                <div className="portfolio-modal-meta-grid">
                  <div className="portfolio-modal-meta-item">
                    <label>Location</label>
                    <strong>{selectedGallery.location}</strong>
                  </div>
                  <div className="portfolio-modal-meta-item">
                    <label>Sector</label>
                    <strong>{selectedGallery.category}</strong>
                  </div>
                  <div className="portfolio-modal-meta-item">
                    <label>Documentation</label>
                    <strong className="status-delivered">
                      {selectedGallery.video ? "Verified Site Video Available" : "Photo Archive"}
                    </strong>
                  </div>
                  <div className="portfolio-modal-meta-item">
                    <label>Execution Quality</label>
                    <strong>ISO Standard Compliant</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

function Projects() {
  const [filter, setFilter] = useState("All");
  const filtered = projects.filter((project) => filter === "All" || project[1] === filter);

  // Category counts
  const categoryCounts = {
    All: projects.length,
    Industrial: projects.filter((p) => p[1] === "Industrial").length,
    Institutional: projects.filter((p) => p[1] === "Institutional").length,
    Government: projects.filter((p) => p[1] === "Government").length,
    "Government Residential": projects.filter((p) => p[1] === "Government Residential").length,
  };

  return (
    <main>
      <PageHero
        eyebrow="Projects"
        title="Building progress across Gujarat."
        image="/images/project-11.jpg"
      />
      <section className="section project-locations-section">
        <div className="container project-locations-grid">
          <div>
            <p className="eyebrow">Our reach</p>
            <h2>Projects across Gujarat.</h2>
            <p>
              Our teams have delivered and continue to execute infrastructure across Ahmedabad,
              Botad, Surat, Navsari, Valsad and communities throughout Gujarat.
            </p>
          </div>
          <ProjectLocationsMap />
        </div>
      </section>
      <section className="section projects-section projects-page">
        <div className="container">
          <div className="project-page-heading">
            <div>
              <div className="portfolio-eyebrow-pill">
                <span className="portfolio-pill-dot" />
                <span>Our Portfolio</span>
              </div>
              <h2 className="portfolio-title">
                Work across <span className="portfolio-title-accent">sectors.</span>
              </h2>
            </div>
            <div className="portfolio-heading-right">
              <p>
                Browse our completed and ongoing industrial, institutional, government and residential
                work delivered across Gujarat.
              </p>
              <div className="portfolio-counter-pill">
                <span className="counter-dot" />
                <span>{filtered.length} Projects Displayed</span>
              </div>
            </div>
          </div>
          <div className="project-page-filters" role="group" aria-label="Filter projects">
            {(["All", "Industrial", "Institutional", "Government", "Government Residential"] as const).map(
              (item) => (
                <button
                  className={`portfolio-filter-pill ${filter === item ? "active" : ""}`}
                  onClick={() => setFilter(item)}
                  key={item}
                >
                  <span>{item}</span>
                  <span className="portfolio-filter-count">{categoryCounts[item]}</span>
                </button>
              ),
            )}
          </div>
          <ProjectGrid items={filtered} />
        </div>
      </section>
    </main>
  );
}

function Career() {
  return (
    <main>
      <PageHero
        eyebrow="Career"
        title="Build a career with impact."
        image="/images/project-18.jpg"
      />
      <section className="section career-intro">
        <div className="container">
          <div className="portfolio-eyebrow-pill mb-4">
            <span className="portfolio-pill-dot" />
            <span>5. Introduction of Human Resource and Social Media</span>
          </div>

          <div className="section-heading split career-split-header mb-8">
            <div>
              <h2 className="career-headline">
                Introduction of Human Resource <br />
                <span className="portfolio-title-accent">& Social Media.</span>
              </h2>
            </div>
            <div className="career-intro-lead-wrap">
              <div className="keka-hrms-badge">
                <span className="keka-dot" />
                <span>Integrated with KEKA HRMS System</span>
              </div>
              <p className="career-lead-text">
                The Human Resource (HR) Department at Siddhivinayak Infrastructure plays an
                important role in managing employees and supporting the smooth functioning of the
                organization. The department is responsible for recruitment and selection,
                employee onboarding, salary processing, attendance and leave management,
                employee documentation, and HR reporting. It also handles employee coordination,
                social media management, and maintains employee records through the KEKA HRMS system.
              </p>
            </div>
          </div>

          <div className="hr-objective-box">
            <div className="hr-objective-badge">
              <Icon name="quote" size={16} />
              <span>Main Department Objective</span>
            </div>
            <blockquote className="hr-objective-quote">
              “The main objective of the HR Department is to ensure effective workforce management,
              maintain a positive working environment, and support the overall growth and
              development of the organization.”
            </blockquote>
          </div>

          <div className="hr-pillars-header">
            <p className="eyebrow">Key Functional Areas</p>
            <h3>Core HR & Social Media Operations</h3>
          </div>

          <div className="hr-pillars-grid">
            {HR_FUNCTIONS.map((item) => (
              <div className="hr-pillar-card" key={item.title}>
                <div className="hr-pillar-top">
                  <div className="hr-pillar-icon">
                    <Icon name={item.icon} size={20} />
                  </div>
                  <span className="hr-pillar-num">{item.num}</span>
                </div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
                <div className="hr-pillar-tag">{item.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* 6. Career - Roles Overview */}
      <section className="section career-roles-summary-section" id="roles-matrix">
        <div className="container">
          <div className="portfolio-eyebrow-pill mb-3">
            <span className="portfolio-pill-dot" />
            <span>6. Career • Roles & Qualifications</span>
          </div>

          <div className="section-heading split mb-8">
            <div>
              <h2 className="roles-headline">
                Roles & Qualifications <br />
                <span className="portfolio-title-accent">Overview.</span>
              </h2>
            </div>
            <p className="roles-sub-copy">
              A structured summary of primary career roles, mandatory experience levels, and
              academic qualifications across Siddhivinayak Infrastructure.
            </p>
          </div>

          <div className="roles-table-wrapper">
            <div className="roles-table-head">
              <span className="role-col-title">Role</span>
              <span className="role-col-qual">Experience / Qualification</span>
              <span className="role-col-action">Job Description</span>
            </div>
            {careerRolesSummary.map((item) => (
              <div className="roles-table-row" key={item.role}>
                <div className="role-col-title">
                  <strong>{item.role}</strong>
                  <span className="role-tag-pill">{item.badge}</span>
                </div>
                <div className="role-col-qual">
                  <span className="role-qual-text">{item.req}</span>
                </div>
                <div className="role-col-action">
                  <a
                    href={`#role-${item.role.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    className="role-anchor-link"
                  >
                    <span>View Role</span>
                    <Icon name="arrow" size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role-wise Job Descriptions */}
      <section className="section jobs-section" id="role-descriptions">
        <div className="container">
          <div className="portfolio-eyebrow-pill mb-3">
            <span className="portfolio-pill-dot" />
            <span>Role-wise Job Descriptions</span>
          </div>

          <div className="section-heading split mb-8">
            <div>
              <h2>Detailed Responsibilities & Criteria.</h2>
            </div>
            <p>
              In-depth scope of work, technical expectations, and academic requirements for each
              position.
            </p>
          </div>

          <div className="jobs-list">
            {jobs.map((job, index) => {
              const roleSlug = `role-${job.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
              return (
                <article className="job-card" key={job.title} id={roleSlug}>
                  <span className="job-number">0{index + 1}</span>
                  <div className="job-title">
                    <p>Designation Profile</p>
                    <h2>{job.title}</h2>
                    <div className="job-title-tags">
                      <span className="job-tag-exp">
                        <Icon name="clock" size={13} />
                        {job.experience}
                      </span>
                    </div>
                  </div>
                  <div className="job-details">
                    <p className="job-overview-text">{job.details}</p>
                    <div className="job-duties-wrapper">
                      <span className="job-duties-heading">Role Responsibilities:</span>
                      <ul className="job-duties-list">
                        {job.duties.map((duty) => (
                          <li key={duty}>{duty}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="job-meta">
                      <span className="job-meta-pill">
                        <small>Experience</small>
                        <strong>{job.experience}</strong>
                      </span>
                      <span className="job-meta-pill">
                        <small>{job.education ? "Education" : "Qualification"}</small>
                        <strong>{job.education || ("qualification" in job ? (job as { qualification: string }).qualification : "")}</strong>
                      </span>
                    </div>
                  </div>
                  <div className="job-action-col">
                    <a
                      className="job-apply"
                      href={`mailto:info@siddhiinfra.in?subject=Application for ${encodeURIComponent(job.title)}`}
                    >
                      Apply now <Icon name="arrow" size={16} />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Openings Section */}
      <section className="section openings-section" id="openings">
        <div className="container">
          <div className="portfolio-eyebrow-pill mb-3">
            <span className="portfolio-pill-dot" />
            <span>Openings</span>
          </div>

          <div className="section-heading split mb-8">
            <div>
              <h2>Current Openings.</h2>
            </div>
            <p>Eight active opportunities across our project sites and corporate team.</p>
          </div>

          <div className="openings-table-card">
            <div className="openings-table-head">
              <span className="col-designation">Designation & Location</span>
              <span className="col-exp">Experience Required</span>
              <span className="col-pos">No. of Positions</span>
              <span className="col-action">Apply</span>
            </div>
            {openings.map((op) => (
              <div
                className="openings-table-row"
                key={`${op.designation}-${op.location}`}
              >
                <div className="col-designation">
                  <strong>
                    {op.designation} – {op.location}
                  </strong>
                  <span className="col-loc-sub">
                    <Icon name="map" size={12} /> {op.location}
                  </span>
                </div>
                <div className="col-exp">
                  <span className="opening-exp-badge">{op.experience}</span>
                </div>
                <div className="col-pos">
                  <span className="opening-pos-badge">
                    {op.positions} Position{op.positions === "1" ? "" : "s"}
                  </span>
                </div>
                <div className="col-action">
                  <a
                    className="opening-apply-btn"
                    href={`mailto:info@siddhiinfra.in?subject=Application for ${encodeURIComponent(`${op.designation} - ${op.location}`)}`}
                  >
                    <span>Apply</span>
                    <Icon name="arrow" size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Hiring Process */}
      <section className="section hiring-section" id="hiring-process">
        <div className="container">
          <div className="portfolio-eyebrow-pill mb-3">
            <span className="portfolio-pill-dot" />
            <span>Our Hiring Process</span>
          </div>
          <div className="section-heading split mb-8">
            <div>
              <h2 className="roles-headline">
                Our Hiring <br />
                <span className="portfolio-title-accent">Process.</span>
              </h2>
            </div>
            <p className="roles-sub-copy">
              A transparent, 5-stage recruitment journey ensuring thorough evaluation, clear
              communication, and a smooth transition into our organization.
            </p>
          </div>
          <div className="hiring-grid-5">
            {hiringProcess.map((item) => (
              <article className="hiring-card" key={item.step}>
                <div className="hiring-card-top">
                  <span className="hiring-step-num">0{item.step}</span>
                  <span className="hiring-step-badge">Stage {item.step}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function Media() {
  return (
    <main>
      <PageHero
        eyebrow="Media"
        title="See our work in motion."
        image="/media/content/school-complex.jpg"
      />
      <section className="section media-videos-section">
        <div className="container">
          <div className="section-heading split">
            <div>
              <p className="eyebrow">Project Videos</p>
              <h2>On site with our teams.</h2>
            </div>
            <p>
              Explore verified on-site drone captures and footage from Siddhivinayak Infrastructure projects, people and active
              construction sites across Gujarat.
            </p>
          </div>
          <div className="video-grid">
            {mediaVideos.map((video, index) => (
              <article className={index === 0 ? "video-featured" : ""} key={video.src}>
                <VideoPlayer
                  src={video.src}
                  poster={video.poster}
                  title={video.title}
                />
                <div>
                  <span>Project Video {String(index + 1).padStart(2, "0")}</span>
                  <h3>{video.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section media-photos-section">
        <div className="container">
          <div className="section-heading split">
            <div>
              <p className="eyebrow">Photo archive</p>
              <h2>Infrastructure, documented.</h2>
            </div>
            <p>
              A collection of supplied project photography from completed and ongoing work across
              Gujarat.
            </p>
          </div>
          <div className="media-photo-grid">
            {mediaPhotos.map(([image, title], index) => (
              <figure className={index % 5 === 0 ? "media-photo-wide" : ""} key={image}>
                <img src={image} alt={title} loading="lazy" />
                <figcaption>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {title}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };
  return (
    <form className="contact-form" onSubmit={submit}>
      {submitted ? (
        <div className="success-message">
          <div>
            <Icon name="check" size={30} />
          </div>
          <h3>Thank you.</h3>
          <p>Your enquiry has been noted. You can also reach us directly at info@siddhiinfra.in.</p>
          <button type="button" onClick={() => setSubmitted(false)}>
            Send another enquiry
          </button>
        </div>
      ) : (
        <>
          <div className="field-row">
            <label>
              Full name
              <input required name="name" placeholder="Your name" />
            </label>
            <label>
              Phone number
              <input required name="phone" type="tel" placeholder="+91" />
            </label>
          </div>
          <label>
            Email address
            <input required name="email" type="email" placeholder="you@company.com" />
          </label>
          <label>
            I'm interested in
            <select name="interest" defaultValue="">
              <option value="" disabled>
                Select an area
              </option>
              <option>Industrial construction</option>
              <option>Institutional construction</option>
              <option>Government projects</option>
              <option>Residential construction</option>
              <option>Career opportunity</option>
            </select>
          </label>
          <label>
            Tell us about your requirement
            <textarea required name="message" rows={4} placeholder="How can we help?" />
          </label>
          <button className="form-submit" type="submit">
            Send enquiry <Icon name="arrow" size={18} />
          </button>
        </>
      )}
    </form>
  );
}

function Contact() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Let's build something that matters."
        image="/images/project-8.png"
      />
      <section className="section contact-section">
        <div className="container contact-grid">
          <div className="contact-copy">
            <p className="eyebrow">Start a conversation</p>
            <h2>Our team is here to help.</h2>
            <p>Have a question or a project in mind? Get in touch with us.</p>
            <div className="contact-details">
              <a href="mailto:info@siddhiinfra.in">
                <Icon name="mail" />
                <span>
                  <small>Email</small>info@siddhiinfra.in
                </span>
              </a>
              <a href="tel:+919429744199" className="contact-phone">
                <Icon name="phone" />
                <span>
                  <small>Phone</small>+91 94297 44199
                </span>
              </a>
              <div>
                <Icon name="map" />
                <span>
                  <small>Office</small>405, Silverstone Arcade, near D-Mart,
                  <br />
                  Causeway Road, Singanpore, Surat 395004, Gujarat
                </span>
              </div>
              <div>
                <Icon name="calendar" />
                <span>
                  <small>Business hours</small>9:00 am – 6:30 pm, Sunday closed
                </span>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
        <div className="container office-location-card">
          <div className="office-map-frame-wrap">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3520.6177168897434!2d72.80484767493091!3d21.225225481002855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04fd3efd870cb%3A0xf4c9c224bb66cd4a!2sSIDDHIVINAYAK%20INFRASTRUCTURE!5e1!3m2!1sen!2sin!4v1795528364111!5m2!1sen!2sin"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="SIDDHIVINAYAK INFRASTRUCTURE Google Maps Location"
            />
          </div>
          <div>
            <p className="eyebrow">Corporate office</p>
            <h2>Visit us in Surat.</h2>
            <p>
              405, Silverstone Arcade, Near D-Mart, Causeway Road, Singanpore, Surat – 395004,
              Gujarat
            </p>
            <a
              className="button"
              href="https://maps.app.goo.gl/ZTeyZ7RmaYo7R4Qz6"
              target="_blank"
              rel="noreferrer"
            >
              Open in Google Maps <Icon name="arrow" size={18} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function Footer() {
  return (
    <footer>
      <div className="container footer-main">
        <div className="footer-brand">
          <img src="/images/siddhivinayak-logo.png" alt="Siddhivinayak Infrastructure" />
          <p>
            Established in 2000, delivering landmark construction across Gujarat for 24 years. Specializing in
            high-precision industrial facilities, educational campuses, government civil works,
            and community residential developments.
          </p>
        </div>
        <div>
          <h4>Navigate</h4>
          {navigation.map(([label, path]) => (
            <Link key={path} to={path}>
              {label}
            </Link>
          ))}
        </div>
        <div>
          <h4>Expertise</h4>
          {["Industrial", "Institutional", "Government", "Residential", "Roads & bridges"].map(
            (item) => (
              <span key={item}>{item}</span>
            ),
          )}
        </div>
        <div>
          <h4>Connect</h4>
          <a href="mailto:info@siddhiinfra.in">info@siddhiinfra.in</a>
          <a href="tel:+919429744199" className="contact-phone">+91 94297 44199</a>
          <span>Surat, Gujarat, India</span>
          {socialLinks.map(([label, url]) => (
            <a href={url} target="_blank" rel="noreferrer" key={label}>
              {label}
            </a>
          ))}
        </div>
      </div>
      <div className="container footer-bottom">
        <span>Established 2000 • 24 Years of Trust • © {new Date().getFullYear()} Siddhivinayak Infrastructure. All rights reserved.</span>
        <Link to="/">Back to home ↑</Link>
      </div>
    </footer>
  );
}

function NotFound() {
  return (
    <main className="not-found">
      <p className="eyebrow">404</p>
      <h1>Page not found.</h1>
      <PageLink to="/">Return home</PageLink>
    </main>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "projects", Component: Projects },
      { path: "career", Component: Career },
      { path: "media", Component: Media },
      { path: "contact", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  },
]);
