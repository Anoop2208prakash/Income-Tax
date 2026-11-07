import Breadcrumb from "../../components/Breadcrumb";
import SectionHeader from "../../components/SectionHeader";
import InfoCard from "../../components/InfoCard";

import "./about.scss";

const aboutItems = [
  {
    title: "Income Tax Information",
    description:
      "Access structured information about income tax, taxation concepts, important updates and taxpayer resources.",
  },
  {
    title: "Acts & Laws",
    description:
      "Explore important income tax provisions, legal references, acts, rules and regulations in an organized format.",
  },
  {
    title: "Tax Calculator",
    description:
      "Understand your estimated tax liability through an easy-to-use tax calculation interface.",
  },
  {
    title: "Knowledge Base",
    description:
      "Improve your understanding of taxation through educational resources, guides and frequently asked questions.",
  },
  {
    title: "Income Tax Forms",
    description:
      "Find useful income tax forms, documents and references in one convenient location.",
  },
  {
    title: "Help & Support",
    description:
      "Get guidance and useful information to understand common taxation-related questions.",
  },
];

const coreValues = [
  {
    icon: "01",
    title: "Transparency",
    description:
      "Presenting tax-related information in a clear, understandable and organized manner.",
  },
  {
    icon: "02",
    title: "Accessibility",
    description:
      "Making important tax resources easy to find and accessible across different devices.",
  },
  {
    icon: "03",
    title: "Accuracy",
    description:
      "Encouraging the use of reliable references and updated taxation information.",
  },
  {
    icon: "04",
    title: "Simplicity",
    description:
      "Creating a user-friendly experience that makes complex tax concepts easier to understand.",
  },
];

export default function AboutPage() {
  return (
    <div className="about-page">

      {/* BREADCRUMB */}

      <Breadcrumb current="About Us" />

      {/* ABOUT HERO */}

      <section className="about-hero">
        <div className="container">

          <div className="about-hero-grid">

            <div className="about-hero-content">

              <span className="about-tag">
                <span className="tag-dot"></span>
                ABOUT OUR PORTAL
              </span>

              <h1>
                Making Income Tax
                <span> Information Simple.</span>
              </h1>

              <p>
                Welcome to the Income Tax Portal, a modern and
                user-friendly platform designed to organize
                taxation information, legal references, useful
                resources and tax-related tools in one place.
              </p>

              <div className="about-hero-actions">
                <a href="#about-overview" className="about-btn primary">
                  Explore Our Portal
                  <span>→</span>
                </a>

                <a href="#about-mission" className="about-btn secondary">
                  Our Mission
                </a>
              </div>

            </div>

            {/* HERO INFORMATION CARD */}

            <div className="about-hero-card">

              <div className="hero-card-top">
                <span>YOUR TAX RESOURCE CENTRE</span>

                <div className="hero-card-icon">₹</div>
              </div>

              <h2>One Portal.</h2>
              <h2 className="highlight-heading">
                Multiple Resources.
              </h2>

              <p>
                A structured digital experience for exploring
                income tax information and essential resources.
              </p>

              <div className="hero-card-divider"></div>

              <div className="hero-card-stats">

                <div>
                  <h3>06+</h3>
                  <span>Portal Modules</span>
                </div>

                <div>
                  <h3>24/7</h3>
                  <span>Online Access</span>
                </div>

                <div>
                  <h3>100%</h3>
                  <span>Responsive UI</span>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* PROJECT OVERVIEW */}

      <section className="content-section about-overview" id="about-overview">
        <div className="container">

          <SectionHeader
            eyebrow="PROJECT OVERVIEW"
            title="What Is Income Tax Portal?"
            subtitle="A centralized digital platform concept designed to make taxation information easier to explore and understand."
          />

          <div className="about-overview-grid">

            <div className="overview-content">

              <span className="overview-label">
                OUR PLATFORM
              </span>

              <h3>
                Simplifying the way people
                <span> explore taxation.</span>
              </h3>

              <p>
                The Income Tax Portal is designed to bring
                important taxation-related information and
                resources together through a modern web interface.
              </p>

              <p>
                Users can explore different sections such as
                income tax information, acts and laws, tax
                calculations, knowledge resources, forms and help.
              </p>

              <p>
                The platform focuses on organized content,
                simple navigation, accessibility and a consistent
                user experience.
              </p>

            </div>

            <div className="overview-visual">

              <div className="overview-visual-icon">₹</div>

              <h3>Income Tax Portal</h3>

              <p>
                A modern digital destination for tax information
                and educational resources.
              </p>

              <div className="overview-points">
                <span>✓ Organized Information</span>
                <span>✓ User-Friendly Interface</span>
                <span>✓ Responsive Experience</span>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* PORTAL MODULES */}

      <section className="content-section alt-bg about-modules">
        <div className="container">

          <SectionHeader
            eyebrow="WHAT WE OFFER"
            title="Explore Our Portal Modules"
            subtitle="Discover the different sections available throughout the Income Tax Portal."
          />

          <div className="card-grid">

            {aboutItems.map((item) => (
              <InfoCard
                key={item.title}
                title={item.title}
                description={item.description}
                badge="About"
              />
            ))}

          </div>

        </div>
      </section>

      {/* MISSION AND VISION */}

      <section
        className="content-section about-mission-section"
        id="about-mission"
      >
        <div className="container">

          <SectionHeader
            eyebrow="OUR PURPOSE"
            title="Mission & Vision"
            subtitle="Our approach towards creating a simpler and more accessible taxation information experience."
          />

          <div className="mission-grid">

            <div className="mission-card mission">
              <div className="mission-icon">◎</div>

              <span>OUR MISSION</span>

              <h3>Making Tax Information Accessible</h3>

              <p>
                To provide a structured, informative and
                user-friendly digital platform where users
                can explore taxation concepts, legal references
                and useful resources with ease.
              </p>

              <div className="mission-line"></div>
            </div>

            <div className="mission-card vision">
              <div className="mission-icon">✧</div>

              <span>OUR VISION</span>

              <h3>A Smarter Digital Tax Experience</h3>

              <p>
                To create an organized digital environment
                that encourages tax awareness, improves
                accessibility and makes taxation information
                easier to understand.
              </p>

              <div className="mission-line"></div>
            </div>

          </div>

        </div>
      </section>

      {/* CORE VALUES */}

      <section className="content-section alt-bg about-values">
        <div className="container">

          <SectionHeader
            eyebrow="OUR PRINCIPLES"
            title="Our Core Values"
            subtitle="The principles that guide the design and experience of our platform."
          />

          <div className="values-grid">

            {coreValues.map((item) => (
              <div className="value-card" key={item.title}>

                <div className="value-number">
                  {item.icon}
                </div>

                <h3>{item.title}</h3>

                <p>{item.description}</p>

                <span className="value-arrow">↗</span>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* FINAL CTA */}

      <section className="about-cta-section">
        <div className="container">

          <div className="about-cta">

            <div>
              <span>EXPLORE THE PLATFORM</span>

              <h2>
                Everything You Need,
                <br />
                In One Place.
              </h2>

              <p>
                Explore the available tax resources, educational
                content and tools through our portal.
              </p>
            </div>

            <a href="/" className="about-btn cta-btn">
              Back to Home
              <span>→</span>
            </a>

          </div>

        </div>
      </section>

    </div>
  );
}
