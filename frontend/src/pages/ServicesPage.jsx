import React, { useState } from "react";
import {
  Wrench,
  Search,
  Clock,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  X,
} from "lucide-react";
import "../styles/services.css";

export default function ServicesPage({ services, onSelectServiceForBooking }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalService, setModalService] = useState(null);

  const categories = [
    "All",
    "Regular",
    "Oil",
    "Engine",
    "Brakes",
    "Drivetrain",
    "Transmission",
    "Electrical",
    "Wheels",
    "Detailing",
    "Bodywork",
  ];

  const filteredServices = services.filter((srv) => {
    const matchesCategory =
      selectedCategory === "All" ||
      srv.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      srv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="contact-page-container section-padding">
      {/* Title & Header */}
      <div className="page-header-center">
        <span className="header-badge">VALVOLINE BIKE XPERT SERVICE MENU</span>
        <h1 className="page-title">
          Comprehensive Two-Wheeler Repair & Services
        </h1>
        <p className="page-subtitle">
          From 30-minute Valvoline oil replacement to complete engine
          restoration, every job is backed by certified mechanics.
        </p>
      </div>

      {/* Filter & Search Controls */}
      <div className="filter-card">
        <div className="filter-top-row">
          {/* Search Input */}
          <div className="search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search services (e.g. Oil, Engine, Brake)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="btn-clear-search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Count Badge */}
          <div className="service-count-text">
            Showing{" "}
            <strong className="count-num">{filteredServices.length}</strong> of{" "}
            {services.length} Workshop Services
          </div>
        </div>

        {/* Category Pills */}
        <div className="category-pills">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`pill-btn ${selectedCategory === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <div className="empty-services">
          <Wrench size={40} className="empty-icon" />
          <h3>No services found matching search</h3>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="btn-clear-filter"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="services-catalog-grid">
          {filteredServices.map((srv) => (
            <div key={srv.id} className="service-item-card">
              <div className="service-card-content">
                <div className="srv-img-box">
                  <img src={srv.image} alt={srv.title} />
                  <span className="srv-cat-badge">{srv.category}</span>
                  <span className="srv-time-badge">
                    <Clock size={12} color="#f59e0b" /> {srv.timeRequired}
                  </span>
                </div>

                <div className="srv-info-body">
                  <h3 className="srv-item-title">{srv.title}</h3>
                  <p className="srv-item-desc">{srv.description}</p>

                  <ul className="srv-item-highlights">
                    {srv.highlights.map((hl, idx) => (
                      <li key={idx}>
                        <CheckCircle2
                          size={14}
                          color="#10b981"
                          className="shrink"
                        />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer */}
              <div className="srv-item-footer">
                <div className="srv-pricing">
                  <span className="srv-old-price">₹{srv.originalPrice}</span>
                  <span className="srv-new-price">₹{srv.price}</span>
                </div>

                <div className="srv-action-btns">
                  <button
                    onClick={() => setModalService(srv)}
                    className="btn btn-details"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => onSelectServiceForBooking(srv.title)}
                    className="btn btn-primary btn-sm"
                  >
                    <Calendar size={14} />
                    <span>Book Now</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Service Detail Pop-up Modal */}
      {modalService && (
        <div className="modal-overlay">
          <div className="modal-detail-card">
            <div className="detail-modal-banner">
              <img src={modalService.image} alt={modalService.title} />
              <button
                onClick={() => setModalService(null)}
                className="btn-close-detail"
              >
                <X size={18} />
              </button>
              <div className="banner-overlay-text">
                <span className="srv-cat-badge">{modalService.category}</span>
                <h2>{modalService.title}</h2>
              </div>
            </div>

            <div className="detail-modal-body">
              <p className="detail-desc">{modalService.description}</p>

              <div className="detail-info-row">
                <div>
                  <span className="info-lbl">Est. Time Required</span>
                  <span className="info-val blue">
                    {modalService.timeRequired}
                  </span>
                </div>
                <div>
                  <span className="info-lbl">Offer Price</span>
                  <span className="info-val green">₹{modalService.price}</span>
                </div>
              </div>

              <div className="includes-section">
                <h4>Service Includes:</h4>
                <ul className="includes-list">
                  {modalService.highlights.map((h, i) => (
                    <li key={i}>
                      <CheckCircle2
                        size={16}
                        color="#10b981"
                        className="shrink"
                      />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="detail-modal-footer">
                <div className="guarantee-text">
                  <ShieldCheck size={16} color="#10b981" />
                  <span>Shiv Auto Service Guarantee</span>
                </div>

                <button
                  onClick={() => {
                    const title = modalService.title;
                    setModalService(null);
                    onSelectServiceForBooking(title);
                  }}
                  className="btn btn-primary"
                >
                  <Calendar size={16} />
                  <span>Book Appointment Slot</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
