import React, { useState } from "react";
import {
  Package,
  Search,
  MessageCircle,
  CheckCircle2,
  Star,
  ShieldCheck,
  X,
} from "lucide-react";
import "../styles/spareparts.css";

export default function SparePartsPage({ parts }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Oil",
    "Engine Parts",
    "Brake Parts",
    "Clutch Parts",
    "Battery",
    "Tyres",
    "Air Filter",
    "Spark Plug",
    "Chain Set",
    "Accessories",
  ];

  const filteredParts = parts.filter((prt) => {
    const matchesCategory =
      selectedCategory === "All" ||
      prt.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      selectedCategory.toLowerCase().includes(prt.category.toLowerCase());

    const matchesSearch =
      prt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prt.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prt.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const getWhatsAppLink = (part) => {
    const text = encodeURIComponent(
      `Hello Shiv Auto Service! I am interested in buying 100% Genuine Spare Part:\n\n*Product*: ${part.name}\n*Brand*: ${part.brand}\n*Price*: ₹${part.price}\n\nPlease confirm availability and installation at your workshop.`,
    );
    return `https://wa.me/917408998188?text=${text}`;
  };

  return (
    <div className="contact-page-container section-padding">
      {/* Title Header */}
      <div className="page-header-center">
        <span className="header-badge">
          GENUINE OEM & VALVOLINE SPARE PARTS
        </span>
        <h1 className="page-title">
          100% Original Two-Wheeler Spare Parts Catalog
        </h1>
        <p className="page-subtitle">
          Authorized distributor for Valvoline lubricants, Amaron/Exide
          batteries, CEAT/MRF tyres, Rolon chain sets, and genuine Honda, Hero,
          Bajaj OEM spares.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="filter-card">
        <div className="filter-top-row">
          <div className="search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search parts by name or brand (Valvoline, CEAT)..."
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

          <div className="service-count-text">
            Found <strong className="count-num">{filteredParts.length}</strong>{" "}
            Parts
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

      {/* Parts Catalog Grid */}
      {filteredParts.length === 0 ? (
        <div className="empty-parts">
          <Package size={40} className="empty-icon" />
          <h3>No parts found matching your criteria</h3>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="btn-clear-filter"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="parts-catalog-grid">
          {filteredParts.map((prt) => (
            <div key={prt.id} className="part-card">
              <div className="part-card-content">
                <div className="part-img-box">
                  <img src={prt.image} alt={prt.name} />
                  <span className="part-brand-badge">{prt.brand}</span>
                  <span className="part-avail-badge">
                    <CheckCircle2 size={12} color="#10b981" />{" "}
                    {prt.availability}
                  </span>
                </div>

                <div className="part-info-body">
                  <div className="part-meta-row">
                    <span className="part-category">{prt.category}</span>
                    <div className="part-rating">
                      <Star size={12} color="#f59e0b" fill="#f59e0b" />
                      <span>{prt.rating}</span>
                    </div>
                  </div>

                  <h3 className="part-title">{prt.name}</h3>
                  <p className="part-desc">{prt.description}</p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="part-footer">
                <div>
                  <span className="price-lbl">Price</span>
                  <span className="part-price">₹{prt.price}</span>
                </div>

                <a
                  href={getWhatsAppLink(prt)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-whatsapp-sm"
                >
                  <MessageCircle size={14} />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Assurance Footer Banner */}
      <div className="parts-assurance-banner">
        <div className="assurance-info">
          <ShieldCheck size={32} color="#003876" className="shrink" />
          <div>
            <h4>Need a specific part not listed in the catalog?</h4>
            <p>
              We source hard-to-find engine parts, body panels, and carburetors
              within 24 hours!
            </p>
          </div>
        </div>

        <a
          href="https://wa.me/917408998188?text=Hi%20Shiv%20Auto%20Service,%20I%20am%20looking%20for%20a%20specific%20spare%20part"
          target="_blank"
          rel="noreferrer"
          className="btn btn-secondary"
        >
          Request Custom Spare Part
        </a>
      </div>
    </div>
  );
}
