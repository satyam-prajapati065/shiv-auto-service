import {
  ShieldCheck,
  Award,
  Wrench,
  Users,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Droplets,
  Building,
} from "lucide-react";
import "../styles/about.css";

export default function AboutUs({ setActiveTab }) {
  return (
    <div className="contact-page-container section-padding about-wrapper">
      {/* Title Header */}
      <div className="page-header-center">
        <span className="header-badge red">VALVOLINE CERTIFIED PARTNER</span>
        <h1 className="page-title">About Shiv Auto Service</h1>
        <p className="page-subtitle">
          Dedicated two-wheeler workshop providing certified repairs, genuine
          OEM spare parts, and premium Valvoline 4T lubricants since 2014.
        </p>
      </div>

      {/* Hero Story Banner */}
      <div className="about-hero-card">
        <div className="about-hero-grid">
          <div className="about-story-text">
            <span className="story-tag">OUR WORKSHOP LEGACY</span>
            <h2>12+ Years of Engineering Excellence & Customer Trust</h2>
            <p>
              Shiv Auto Service started with a simple vision: to give
              two-wheeler owners in Ramnagar and Bhabanpur honest, transparent,
              and high-performance bike maintenance.
            </p>
            <p>
              As an officially certified{" "}
              <strong>Valvoline Bike Xpert Workshop</strong>, our facility is
              equipped with modern hydraulic lifts, pneumatic tools, and digital
              diagnostics to service all motorcycle brands—from 100cc commuter
              bikes to 350cc+ cruisers.
            </p>

            <div className="story-highlights-list">
              <div className="story-item">
                <CheckCircle2 size={18} color="#10b981" className="shrink" />
                <span>
                  100% Original Valvoline Oils opened directly in front of you
                </span>
              </div>
              <div className="story-item">
                <CheckCircle2 size={18} color="#10b981" className="shrink" />
                <span>
                  Certified Master Mechanics for BS4/BS6 FI Engine Tuning
                </span>
              </div>
              <div className="story-item">
                <CheckCircle2 size={18} color="#10b981" className="shrink" />
                <span>
                  Transparent quotation approval before replacing any part
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setActiveTab("book-service");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="btn btn-primary"
            >
              <Calendar size={16} />
              <span>Book Appointment Slot</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="about-img-frame">
            <img
              src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80"
              alt="Shiv Auto Service Workshop"
            />
            <div className="frame-overlay-badge">
              <Award size={28} color="#fcd34d" />
              <div>
                <p className="frame-badge-title">Valvoline Certified</p>
                <p className="frame-badge-sub">Bike Xpert Master Center</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Pillars Section */}
      <div className="pillars-section">
        <div className="section-header-center">
          <span className="section-sub-title blue">OUR CORE COMMITMENTS</span>
          <h2 className="section-main-title">Why Riders Choose Us</h2>
        </div>

        <div className="pillars-grid">
          <div className="pillar-card">
            <div className="pillar-icon red">
              <Droplets size={24} />
            </div>
            <h3>Pure Synthetic Lubricants</h3>
            <p>
              We stock 100% genuine Valvoline Champ 4T engine oils engineered
              for engine cooling and gear protection.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon blue">
              <Wrench size={24} />
            </div>
            <h3>Certified Master Mechanics</h3>
            <p>
              Our mechanics undergo continuous technical training on modern fuel
              injectors and disc brake systems.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon green">
              <ShieldCheck size={24} />
            </div>
            <h3>Genuine OEM Spare Parts</h3>
            <p>
              Every spark plug, brake shoe, and chain set replaced comes
              directly from authorized OEM distributors.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon amber">
              <Users size={24} />
            </div>
            <h3>Customer-First Transparency</h3>
            <p>
              We explain every fault step-by-step and show you old replaced
              parts upon job completion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
