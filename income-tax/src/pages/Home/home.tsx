
import { useState } from "react";

import Button from "../../components/ui/Button";
import { homeHighlights } from "../../data/siteData";

import "./home.scss";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);

  const quickStats = [
    { value: "01", label: "Tax Information" },
    { value: "02", label: "Acts & Regulations" },
    { value: "03", label: "Tax Calculator" },
    { value: "04", label: "Forms & Resources" },
  ];

  const quickLinks = [
    { icon: "₹", title: "Tax Calculator", subtitle: "Calculate your tax", path: "/tax-calculator" },
    { icon: "§", title: "Acts & Laws", subtitle: "Explore tax laws", path: "/acts-laws" },
    { icon: "▤", title: "Tax Forms", subtitle: "Forms and documents", path: "/tax-forms" },
    { icon: "?", title: "Help Centre", subtitle: "Get assistance", path: "/help" },
  ];

  return (
    <main className="home-page">

      {/* HERO SECTION */}
      <section className="home-hero">
        <div className="container">

          <div className="hero-grid">

            <div className="hero-content">

              <div className="hero-badge">
                <span className="status-dot" />
                INCOME TAX INFORMATION PORTAL
              </div>

              <h1>
                Simplifying Tax.
                <br />
                <span>Empowering</span> Citizens.
              </h1>

              <p>
                Your trusted destination for income tax information,
                tax calculations, legal updates and essential resources.
                Everything you need, all in one place.
              </p>

              <div className="hero-actions">
                <Button
                  appearance="primary"
                  component="a"
                  href="/tax-calculator"
                >
                  Calculate Your Tax <span>↗</span>
                </Button>

                <Button
                  appearance="outlined"
                  onClick={() => setShowModal(true)}
                >
                  Latest Notifications
                </Button>
              </div>

              <div className="hero-trust">
                <span className="trust-icon">✓</span>
                Simple & Accessible Tax Information
              </div>

            </div>

            {/* HERO INFORMATION CARD */}
            <div className="hero-visual">

              <div className="visual-decoration decoration-one" />
              <div className="visual-decoration decoration-two" />

              <div className="tax-overview-card">

                <div className="overview-top">
                  <div>
                    <span className="overview-label">
                      YOUR TAX RESOURCE CENTRE
                    </span>
                    <h3>Tax Overview</h3>
                  </div>

                  <div className="overview-icon">₹</div>
                </div>

                <div className="overview-highlight">
                  <span>Explore your tax resources</span>
                  <strong>Everything in one place.</strong>
                  <p>
                    Access useful information, tools and resources
                    to make tax-related decisions easier.
                  </p>
                </div>

                <div className="overview-list">
                  <div>
                    <span className="list-icon">✓</span>
                    <span>Income Tax Guidelines</span>
                    <span className="list-arrow">↗</span>
                  </div>

                  <div>
                    <span className="list-icon">✓</span>
                    <span>Tax Calculation Tools</span>
                    <span className="list-arrow">↗</span>
                  </div>

                  <div>
                    <span className="list-icon">✓</span>
                    <span>Forms & Documentation</span>
                    <span className="list-arrow">↗</span>
                  </div>
                </div>

                <div className="overview-footer">
                  <span>INCOME TAX PORTAL</span>
                  <span>Explore Resources →</span>
                </div>

              </div>

            </div>

          </div>

          {/* QUICK STATS */}
          <div className="hero-stats">
            {quickStats.map((item) => (
              <div className="stat-item" key={item.value}>
                <span>{item.value}</span>
                <p>{item.label}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* QUICK ACCESS */}
      <section className="quick-access-section">
        <div className="container">

          <div className="section-heading">
            <div>
              <span className="section-eyebrow">QUICK NAVIGATION</span>
              <h2>Everything you need, <span>within reach.</span></h2>
              <p>Access frequently used income tax services and resources.</p>
            </div>

            <span className="section-count">01 / QUICK ACCESS</span>
          </div>

          <div className="quick-access-grid">
            {quickLinks.map((item) => (
              <a
                href={item.path}
                className="quick-access-card"
                key={item.title}
              >
                <div className="quick-icon">{item.icon}</div>

                <div className="quick-card-content">
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                </div>

                <span className="quick-arrow">↗</span>
              </a>
            ))}
          </div>

        </div>
      </section>

      {/* CORE MODULES */}
      <section className="modules-section">
        <div className="container">

          <div className="section-heading">
            <div>
              <span className="section-eyebrow">EXPLORE OUR SERVICES</span>
              <h2>Discover our <span>core modules.</span></h2>
              <p>
                Find important information, guidance and resources
                through our dedicated sections.
              </p>
            </div>

            <span className="section-count">02 / OUR SERVICES</span>
          </div>

          <div className="modern-card-grid">
            {homeHighlights.map((item, index) => (
              <article className="modern-module-card" key={item.title}>

                <div className="module-card-top">
                  <span className="module-number">
                    0{index + 1}
                  </span>

                  <span className="module-card-arrow">↗</span>
                </div>

                <div className="module-card-content">
                  <span className="module-label">INCOME TAX RESOURCE</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>

                <div className="module-card-footer">
                  <span>Explore Module</span>
                  <span>→</span>
                </div>

              </article>
            ))}
          </div>

        </div>
      </section>

      {/* INFORMATION BANNER */}
      <section className="information-section">
        <div className="container">

          <div className="information-banner">

            <div className="information-content">
              <span className="section-eyebrow">BUILT FOR EASY ACCESS</span>

              <h2>
                Tax information,
                <br />
                made <span>simpler.</span>
              </h2>

              <p>
                Explore a structured collection of tax information,
                legal resources and useful tools designed to help
                citizens navigate income tax topics.
              </p>

              <Button
                appearance="primary"
                component="a"
                href="/knowledge-base"
              >
                Explore Knowledge Base ↗
              </Button>
            </div>

            <div className="information-art">
              <div className="art-circle">
                <span>₹</span>
              </div>
              <div className="art-floating art-one">TAX</div>
              <div className="art-floating art-two">✓</div>
              <div className="art-floating art-three">01</div>
            </div>

          </div>

        </div>
      </section>

      {/* NOTIFICATIONS MODAL */}
      {showModal && (
        <div
          className="notification-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="notification-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="notification-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <span className="section-eyebrow">LATEST UPDATES</span>
                <h3 id="notification-title">Notifications & Circulars</h3>
              </div>

              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <a href="/pdfs/notice1.pdf" target="_blank" rel="noreferrer">
                <span className="notice-icon">PDF</span>
                <span>Income Tax Circular 1</span>
                <span>↗</span>
              </a>

              <a href="/pdfs/notice2.pdf" target="_blank" rel="noreferrer">
                <span className="notice-icon">PDF</span>
                <span>Income Tax Circular 2</span>
                <span>↗</span>
              </a>
            </div>

            <div className="modal-footer">
              <Button
                appearance="primary"
                onClick={() => setShowModal(false)}
              >
                Close
              </Button>
            </div>

          </div>
        </div>
      )}

    </main>
  );
};

export default HomePage;
