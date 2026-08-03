import React from "react";
import {
  Wrench,
  Calendar,
  Phone,
  ShieldCheck,
  Star,
  Clock,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Sparkles,
  AlertTriangle,
  Droplets,
  Truck,
  HeartHandshake,
} from "lucide-react";
import "../styles/home.css";

export default function Home({
  services = [],
  reviews = [],
  setActiveTab,
  onOpenAiAdvisor,
}) {
  const topServices = (services || []).slice(0, 6);
  const displayReviews = (reviews || []).slice(0, 3);

  const BRANDS = [
    { name: "Honda", logo: "🏍️" },
    { name: "Hero", logo: "🛵" },
    { name: "TVS", logo: "🏁" },
    { name: "Bajaj", logo: "⚙️" },
    { name: "Yamaha", logo: "⚡" },
    { name: "Royal Enfield", logo: "👑" },
    { name: "KTM", logo: "🔥" },
    { name: "Suzuki", logo: "🚀" },
    { name: "Jawa / Yezdi", logo: "🛡️" },
    { name: "Vespa / Aprilia", logo: "✨" },
  ];

  return (
    <div className="home-wrapper">
      {/* 1. HERO BANNER */}
      <section className="hero-section">
        <div className="hero-bg-overlay">
          <img
            src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1920&q=80"
            alt="Valvoline Bike Xpert Workshop"
            className="hero-img"
          />
          <div className="hero-gradient" />
        </div>

        <div
          className="container hero-container"
          style={{ paddingTop: "20px" }}
        >
          <div className="hero-grid">
            {/* Left Content */}
            <div className="hero-content">
              <div className="hero-badge">
                <span className="ping-dot" />
                <span>VALVOLINE AUTHORIZED BIKE XPERT WORKSHOP</span>
              </div>

              <h1 className="hero-headline">
                Apki Bike Ki Best Care, <br />
                <span className="highlight-tag">
                  Shiv Auto Service Ke Saath!
                </span>
              </h1>

              <p className="hero-subtext">
                Professional two-wheeler maintenance with{" "}
                <strong>100% genuine Valvoline lubricants</strong>, OEM spare
                parts, and certified mechanics. Get your bike serviced with
                complete peace of mind.
              </p>

              <div className="hero-bullets">
                <div className="bullet-item">
                  <CheckCircle2 size={16} color="#34d399" />
                  <span>25-Point Inspection</span>
                </div>
                <div className="bullet-item">
                  <CheckCircle2 size={16} color="#34d399" />
                  <span>Valvoline Oil Warranty</span>
                </div>
              </div>

              <div className="hero-cta-group">
                <button
                  onClick={() => {
                    const text = encodeURIComponent(
                      "Hello Shiv Auto Service! I want to book a service for my bike.",
                    );
                    window.open(
                      `https://wa.me/917408998188?text=${text}`,
                      "_blank",
                    );
                  }}
                  className="btn btn-primary"
                >
                  <Calendar size={16} />
                  <span>Book Your Service Now</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  onClick={() => {
                    setActiveTab("emergency");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="btn btn-warning"
                >
                  <AlertTriangle size={16} />
                  <span>🚨 Emergency Assistance</span>
                </button>

                <button onClick={onOpenAiAdvisor} className="btn btn-outline">
                  <Sparkles size={16} color="#fcd34d" />
                  <span>AI Bike Diagnosis</span>
                </button>
              </div>
            </div>

            {/* Right Card */}
            <div className="hero-card-col">
              <div className="highlights-card">
                <div className="card-top-header">
                  <div className="header-left">
                    <div className="card-wrench-icon">
                      <Wrench size={20} color="#e31b23" />
                    </div>
                    <div>
                      <h3>Workshop Highlights</h3>
                      <p>Shiv Auto Service - Valvoline Xpert</p>
                    </div>
                  </div>
                  <span className="rating-badge">
                    <Star size={14} color="#f59e0b" fill="#f59e0b" /> 4.9 Rating
                  </span>
                </div>

                <div className="stats-grid">
                  <div className="stat-box">
                    <div className="stat-num blue">12+ Years</div>
                    <div className="stat-lbl">Workshop Legacy</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-num red">15,000+</div>
                    <div className="stat-lbl">Bikes Serviced</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-num blue">100%</div>
                    <div className="stat-lbl">Original Valvoline</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-num green">1 Hours</div>
                    <div className="stat-lbl">Express Oil Service</div>
                  </div>
                </div>

                <div className="phone-banner">
                  <div className="phone-banner-info">
                    <Phone size={20} color="#003876" />
                    <div>
                      <p className="phone-title">Call Master Mechanic</p>
                      <p className="phone-number">+91 74089 98188</p>
                    </div>
                  </div>
                  <a href="tel:+917408998188" className="btn btn-secondary">
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. POPULAR SERVICES PREVIEW */}
      <section className="section-padding container">
        <div className="section-header-flex">
          <div>
            <span className="section-sub-title red">
              OUR POPULAR WORKSHOP SERVICES
            </span>
            <h2 className="section-main-title">
              Top Rated Bike Maintenance Services
            </h2>
          </div>
          <button
            onClick={() => {
              setActiveTab("services");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="link-btn"
          >
            <span>View All Services</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="services-grid">
          {topServices.length === 0 ? (
            <p style={{ color: "#64748b", fontStyle: "italic" }}>
              Loading popular services...
            </p>
          ) : (
            topServices.map((srv) => (
              <div key={srv.id || srv._id} className="service-card">
                <div className="srv-img-wrapper">
                  <img src={srv.image} alt={srv.title} />
                  <span className="srv-category-tag">{srv.category}</span>
                  <span className="srv-time-tag">
                    <Clock size={12} color="#f59e0b" /> {srv.timeRequired}
                  </span>
                </div>

                <div className="srv-card-body">
                  <div>
                    <h3 className="srv-title">{srv.title}</h3>
                    <p className="srv-desc">{srv.description}</p>
                    <ul className="srv-highlights">
                      {(srv.highlights || []).slice(0, 2).map((hl, idx) => (
                        <li key={idx}>
                          <CheckCircle2 size={14} color="#10b981" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="srv-card-footer">
                    <div>
                      <span className="original-price">
                        ₹{srv.originalPrice}
                      </span>
                      <span className="current-price">₹{srv.price}</span>
                    </div>
                    <button
                      onClick={() => {
                        const text = encodeURIComponent(
                          `Hello Shiv Auto Service! I want to book: ${srv.title}`,
                        );
                        window.open(
                          `https://wa.me/917408998188?text=${text}`,
                          "_blank",
                        );
                      }}
                      className="btn btn-primary"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* 3. WHY CHOOSE SHIV AUTO SERVICE */}
      <section className="why-us-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-sub-title blue">
              WHY SHIV AUTO SERVICE & VALVOLINE
            </span>
            <h2 className="section-main-title">
              Why 15,000+ Bike Owners Trust Us
            </h2>
            <p className="section-desc">
              We combine world-class Valvoline oil technology with expert
              mechanics & transparent pricing.
            </p>
          </div>

          <div className="why-us-grid">
            <div className="feature-card">
              <div className="feature-icon red">
                <Droplets size={24} />
              </div>
              <h3>Original Valvoline Oils</h3>
              <p>
                100% genuine Valvoline synthetic engine oils engineered for
                maximum engine cooling.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon blue">
                <ShieldCheck size={24} />
              </div>
              <h3>Valvoline Certified Mechanics</h3>
              <p>
                Master technicians trained directly to handle all BS4/BS6 setups
                & FI systems.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon green">
                <Truck size={24} />
              </div>
              <h3>Free Doorstep Pickup & Drop</h3>
              <p>
                We pick up your bike from your home/office and deliver it back
                washed & fully serviced.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon amber">
                <HeartHandshake size={24} />
              </div>
              <h3>100% Transparent Billing</h3>
              <p>
                No hidden costs. Digital quotation approval before replacing any
                spare part.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WORKFLOW PROCESS */}
      <section className="section-padding container">
        <div className="section-header-center">
          <span className="section-sub-title red">SIMPLE WORKFLOW</span>
          <h2 className="section-main-title">How Our Service Works</h2>
        </div>

        <div className="process-grid">
          {[
            {
              step: "01",
              title: "Book Online / Call",
              desc: "Select your bike model and preferred service slot or call hotline.",
            },
            {
              step: "02",
              title: "Pickup / Arrival",
              desc: "Enjoy doorstep pickup or drop your bike at Shiv Auto Service.",
            },
            {
              step: "03",
              title: "25-Point Repair",
              desc: "Certified mechanic performs Valvoline oil change & multi-point fix.",
            },
            {
              step: "04",
              title: "Foam Wash & Delivery",
              desc: "Get your bike back shiny, road tested, and smooth!",
            },
          ].map((proc, idx) => (
            <div key={idx} className="process-card">
              <div className="step-num">{proc.step}</div>
              <h3>{proc.title}</h3>
              <p>{proc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. 20-POINT HEALTH BANNER */}
      <section className="container">
        <div className="promo-banner">
          <div className="promo-text">
            <span className="promo-badge">EXCLUSIVE VALVOLINE PROMO</span>
            <h2>Get Free 20-Point Digital Bike Health Checkup!</h2>
            <p>
              Run our interactive 20-point digital health inspection tool online
              right now!
            </p>
          </div>
          <button
            onClick={() => {
              setActiveTab("health-check");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="btn btn-white"
          >
            Start Digital Health Check
          </button>
        </div>
      </section>

      {/* 6. BRANDS */}
      <section className="section-padding container">
        <div className="section-header-center">
          <span className="section-sub-title">MULTI-BRAND SPECIALISTS</span>
          <h2 className="section-main-title">
            We Repair All Major Two-Wheeler Brands
          </h2>
        </div>
        <div className="brands-grid">
          {BRANDS.map((b, idx) => (
            <div key={idx} className="brand-card">
              <span>{b.logo}</span>
              <span>{b.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 7. REVIEWS */}
      <section className="reviews-section">
        <div className="container">
          <div className="section-header-flex">
            <div>
              <div className="rating-row">
                <Star size={16} color="#f59e0b" fill="#f59e0b" />
                <Star size={16} color="#f59e0b" fill="#f59e0b" />
                <Star size={16} color="#f59e0b" fill="#f59e0b" />
                <Star size={16} color="#f59e0b" fill="#f59e0b" />
                <Star size={16} color="#f59e0b" fill="#f59e0b" />
                <span className="rating-score">4.9 / 5.0 Google Rating</span>
              </div>
              <h2 className="section-main-title">What Our Customers Say</h2>
            </div>
            <button
              onClick={() => {
                setActiveTab("reviews");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="link-btn"
            >
              <span>See All Reviews</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="reviews-grid">
            {displayReviews.map((rev) => (
              <div
                key={rev.id || rev._id || Math.random()}
                className="review-card"
              >
                <div className="rev-stars">
                  {[...Array(rev.rating || 5)].map((_, i) => (
                    <Star key={i} size={14} color="#f59e0b" fill="#f59e0b" />
                  ))}
                </div>
                <p className="rev-comment">"{rev.comment}"</p>
                <div className="rev-footer">
                  <div>
                    <p className="rev-author">{rev.name}</p>
                    <p className="rev-bike">{rev.bikeModel || "Two Wheeler"}</p>
                  </div>
                  <span className="verified-badge">Verified Customer</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. LOCATION MAP */}
      <section className="section-padding container">
        <div className="map-grid">
          <div className="map-info">
            <span className="section-sub-title red">WORKSHOP LOCATION</span>
            <h2 className="section-main-title">
              Visit Shiv Auto Service Today
            </h2>
            <p className="map-desc">
              Located conveniently in Bhabanpur with dedicated parking and live
              mechanic view.
            </p>
            <div className="map-contact-list">
              <div className="contact-row">
                <MapPin size={18} color="#e31b23" /> Bhabanpur, Ramnagar,
                Shahpur Ouraw, UP 224181
              </div>
              <div className="contact-row">
                <Phone size={18} color="#003876" /> +91 74089 98188
              </div>
              <div className="contact-row">
                <Clock size={18} color="#10b981" /> Mon - Sat: 09:00 AM - 07:00
                PM
              </div>
            </div>
            <a
              href="https://maps.app.goo.gl/KivdmBaBLosVq1ou5"
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
            >
              <MapPin size={16} /> Get Driving Directions
            </a>
          </div>
          <div className="map-frame-wrapper">
            <iframe
              title="Shiv Auto Service Google Map"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d114323.64117393398!2d82.9330802!3d26.4359372!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3990e35a8da0f517%3A0x33b5ae590fd989ed!2sValvoline%20Bike%20Xpert%20-%20Shiv%20Auto%20Service!5e0!3m2!1sen!2sin!4v1785344089267!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
