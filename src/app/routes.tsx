import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
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
  | "menu"
  | "phone"
  | "quote"
  | "shield"
  | "team"
  | "tools";

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
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    phone: (
      <path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-4-2-2 2c-3.7-1.6-6.4-4.3-8-8l2-2Z" />
    ),
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
    image: "/images/project-11.jpg",
    video: "/media/videos/site-video-3.mp4",
    poster: "/media/videos/site-video-3.jpg",
    eyebrow: "Public Infrastructure",
    title: "Progress, made tangible.",
    text: "Delivering complex government projects with quality, safety and speed.",
  },
  {
    image: "/images/project-18.jpg",
    video: "/media/videos/site-video-4.mp4",
    poster: "/media/videos/site-video-4.jpg",
    eyebrow: "24 Years of Trust",
    title: "Committed to every detail.",
    text: "Experienced teams, modern machinery and a promise to deliver on time.",
  },
];

const metrics = [
  ["24", "Years of experience"],
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
    tags: ["Dedicated", "Reliable", "Responsible"],
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
  ["Cover Shade at Surat", "Industrial", 6],
  ["Industrial Training Institute at Vallabhipur", "Institutional", 4],
  ["Cover Shade at Udhana Railway Station", "Government", 9],
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
    text: "Purpose-built factories, training institutes, warehouses and complex industrial facilities.",
    image: "/images/project-1.png",
  },
  {
    number: "02",
    title: "Institutional",
    text: "Enduring campuses, colleges, schools and public institutions designed for everyday life.",
    image: "/images/project-17.jpg",
  },
  {
    number: "03",
    title: "Government",
    text: "Dependable civic infrastructure delivered with rigorous quality, safety and accountability.",
    image: "/images/project-11.jpg",
  },
  {
    number: "04",
    title: "Residential",
    text: "Thoughtful residential environments and quarters made for comfort, longevity and community.",
    image: "/images/project-8.png",
  },
];

const gallery = [
  ["/images/project-12.jpg", "Government building at Asalpur"],
  ["/images/project-15.jpg", "Police station at Khergam"],
  ["/images/project-4.png", "Industrial Training Institute at Vallabhipur"],
  ["/images/project-16.jpeg", "School complex at Pardi"],
  ["/images/project-7.jpg", "Residential quarters at Botad"],
  ["/images/project-13.jpg", "Godown at Dhandhuka"],
] as const;

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
  ["/media/content/arts-commerce-college.jpg", "Arts and Commerce College"],
  ["/media/content/cover-shade-udhana.png", "Cover shade at Udhana"],
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
  title: `Siddhivinayak Infrastructure film ${String(index + 1).padStart(2, "0")}`,
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
          Business enquiry <Icon name="arrow" size={17} />
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
        <div className="breadcrumbs">
          <Link to="/">Home</Link>
          <span>/</span>
          <strong>{eyebrow}</strong>
        </div>
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
          <div className="hero-slide-label">
            <span>0{slide + 1}</span>
            <i />
            <p>{slides[slide].eyebrow}</p>
          </div>
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
          <a className="hero-scroll" href="#discover">
            <span>Scroll</span>
            <i />
          </a>
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
              <strong>24</strong>
              <span>
                Years of
                <br />
                experience
              </span>
            </div>
          </div>
          <div className="about-copy">
            <p className="eyebrow">About us</p>
            <h2>Infrastructure that moves communities forward.</h2>
            <p className="lead">
              A multidisciplinary construction company serving industrial, institutional, government
              and residential sectors across India.
            </p>
            <PageLink to="/about">Discover our company</PageLink>
          </div>
        </div>
      </section>

      <Metrics />

      <section className="section expertise-section">
        <div className="container">
          <div className="section-heading split">
            <div>
              <p className="eyebrow">What we build</p>
              <h2>Expertise across every sector.</h2>
            </div>
            <p>
              Integrated construction capabilities, experienced teams and disciplined execution
              bring demanding ideas to life.
            </p>
          </div>
          <div className="expertise-grid">
            {expertise.map((item) => (
              <article className="expertise-card" key={item.title}>
                <img src={item.image} alt="" />
                <div className="expertise-shade" />
                <span>{item.number}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

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
        <div className="container contact-grid">
          <div className="contact-copy">
            <p className="eyebrow">Start a conversation</p>
            <h2>Have a project in mind?</h2>
            <p>
              Tell us what you are planning. Our team is ready to discuss your construction and
              infrastructure requirements.
            </p>
            <div className="home-contact-note">
              <span>Prefer to speak directly?</span>
              <a href="tel:+919429744199">+91 94297 44199</a>
              <a href="mailto:info@siddhiinfra.in">info@siddhiinfra.in</a>
            </div>
          </div>
          <ContactForm />
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
              <strong>24</strong>
              <span>Years of experience</span>
            </div>
          </div>
          <div className="about-copy">
            <p className="eyebrow">Our story</p>
            <h2>A multidisciplinary construction company.</h2>
            <p className="lead">
              Siddhivinayak Infrastructure offers a diversified range of construction and allied
              services across India.
            </p>
            <p>
              Our capabilities span industrial, institutional and government projects, roads,
              bridges, earthworks, government residential and private residential development.
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
                    ₹21,111 CRORE BY 2036
                  </span>
                </div>
                <p>
                  To achieve 21111 Crore by 2036 by creating an organisation built on reliability,
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

function parseProjectInfo(rawTitle: string) {
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

function ProjectGrid({
  items,
  featured = true,
}: {
  items: readonly (readonly [string, string, number])[];
  featured?: boolean;
}) {
  const [selectedProject, setSelectedProject] = useState<(readonly [string, string, number]) | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    if (selectedProject) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  return (
    <>
      <div className="projects-grid">
        {items.map(([title, category, image], index) => {
          const info = parseProjectInfo(title);
          return (
            <article
              className={`project-card ${featured && index === 0 ? "project-featured" : ""}`}
              key={title}
              onClick={() => setSelectedProject([title, category, image])}
              role="button"
              tabIndex={0}
              aria-label={`View details for ${title}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedProject([title, category, image]);
                }
              }}
            >
              <img src={projectImage(image)} alt={title} loading="lazy" />

              {/* Floating Top Badges */}
              <div className="project-top-tags">
                <span className="project-category-tag">
                  <span className="project-category-dot" />
                  {category}
                </span>
                <span className="project-location-tag">
                  <Icon name="map" size={13} />
                  {info.location}
                </span>
              </div>

              {/* Bottom Info Overlay */}
              <div className="project-overlay">
                <div className="project-info">
                  <span className="project-spec">Infrastructure • Gujarat</span>
                  <h3>{title}</h3>
                </div>
                <div className="project-action-btn" title="View Project Details">
                  <Icon name="arrow" size={18} />
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Lightbox / Detail Modal */}
      {selectedProject && (
        <div className="portfolio-modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="portfolio-modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              className="portfolio-modal-close"
              onClick={() => setSelectedProject(null)}
              aria-label="Close project preview"
            >
              <Icon name="close" size={20} />
            </button>
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
                  {parseProjectInfo(selectedProject[0]).location}
                </span>
              </div>
            </div>
            <div className="portfolio-modal-content">
              <span className="project-spec">Siddhivinayak Infrastructure Project</span>
              <h3>{selectedProject[0]}</h3>
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
                  <strong>{parseProjectInfo(selectedProject[0]).location}</strong>
                </div>
                <div className="portfolio-modal-meta-item">
                  <label>Execution Quality</label>
                  <strong>ISO Standard Compliant</strong>
                </div>
                <div className="portfolio-modal-meta-item">
                  <label>Delivery Status</label>
                  <strong className="status-delivered">Delivered / Active</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function GalleryGrid() {
  const [selectedGallery, setSelectedGallery] = useState<(readonly [string, string]) | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedGallery(null);
    };
    if (selectedGallery) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedGallery]);

  return (
    <>
      <div className="gallery-grid">
        {gallery.map(([image, title], index) => {
          const info = parseProjectInfo(title);
          return (
            <figure
              className={`gallery-item gallery-item-${index + 1}`}
              key={image}
              onClick={() => setSelectedGallery([image, title])}
              role="button"
              tabIndex={0}
              aria-label={`View full image for ${title}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedGallery([image, title]);
                }
              }}
            >
              <img src={image} alt={title} loading="lazy" />

              {/* Floating Top Badges */}
              <div className="gallery-top-tags">
                <span className="gallery-archive-tag">Archive 0{index + 1}</span>
                <span className="gallery-location-tag">
                  <Icon name="map" size={12} />
                  {info.location}
                </span>
              </div>

              {/* Bottom Caption Overlay */}
              <figcaption className="gallery-caption">
                <div className="gallery-caption-info">
                  <span className="gallery-spec">Civil Construction</span>
                  <h4>{title}</h4>
                </div>
                <div className="gallery-zoom-btn" title="View Full Image">
                  <Icon name="arrow" size={16} />
                </div>
              </figcaption>
            </figure>
          );
        })}
      </div>

      {/* Gallery Lightbox Modal */}
      {selectedGallery && (
        <div className="portfolio-modal-backdrop" onClick={() => setSelectedGallery(null)}>
          <div className="portfolio-modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              className="portfolio-modal-close"
              onClick={() => setSelectedGallery(null)}
              aria-label="Close image preview"
            >
              <Icon name="close" size={20} />
            </button>
            <div className="portfolio-modal-image-wrap gallery-modal-image-wrap">
              <img
                src={selectedGallery[0]}
                alt={selectedGallery[1]}
                className="portfolio-modal-image"
              />
              <div className="portfolio-modal-image-badges">
                <span className="project-category-tag">
                  <span className="project-category-dot" />
                  Site Archive
                </span>
                <span className="project-location-tag">
                  <Icon name="map" size={13} />
                  {parseProjectInfo(selectedGallery[1]).location}
                </span>
              </div>
            </div>
            <div className="portfolio-modal-content">
              <span className="project-spec">On-Site Architectural Documentation</span>
              <h3>{selectedGallery[1]}</h3>
              <p className="portfolio-modal-desc">
                High-resolution site capture illustrating the completed structural scale, material quality,
                and architectural execution delivered by Siddhivinayak Infrastructure across Gujarat.
              </p>
            </div>
          </div>
        </div>
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
              <p className="eyebrow">Films</p>
              <h2>On site with our teams.</h2>
            </div>
            <p>
              Explore seven films from Siddhivinayak Infrastructure projects, people and active
              construction sites.
            </p>
          </div>
          <div className="video-grid">
            {mediaVideos.map((video, index) => (
              <article className={index === 0 ? "video-featured" : ""} key={video.src}>
                <video controls playsInline preload="metadata" poster={video.poster}>
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support embedded video.
                </video>
                <div>
                  <span>Film {String(index + 1).padStart(2, "0")}</span>
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
              <a href="tel:+919429744199">
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
          <img src="/media/content/office-location.jpg" alt="Corporate office location map" />
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
            A dynamic, diversified construction company creating dependable infrastructure with
            experienced architects, designers and engineers.
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
          <a href="tel:+919429744199">+91 94297 44199</a>
          <span>Surat, Gujarat, India</span>
          {socialLinks.map(([label, url]) => (
            <a href={url} target="_blank" rel="noreferrer" key={label}>
              {label}
            </a>
          ))}
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Siddhivinayak Infrastructure. All rights reserved.</span>
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
