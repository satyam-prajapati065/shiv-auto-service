import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Wrench,
  Phone,
  Bot,
  Sparkles,
  Menu,
  X,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import "../styles/navbar.css";

export default function Navbar({
  activeTab,
  setActiveTab,
  onOpenAiAdvisor,
  isAdminLoggedIn,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home", path: "/" },
    { id: "services", label: "Services", path: "/services" },
    { id: "spare-parts", label: "Spare Parts", path: "/spare-parts" },
    { id: "about", label: "About Us", path: "/about" },
    { id: "gallery", label: "Gallery", path: "/gallery" },
    { id: "reviews", label: "Reviews", path: "/reviews" },
    { id: "contact", label: "Contact", path: "/contact" },
  ];
  if (isAdminLoggedIn) {
    navItems.push({
      id: "shivadmin",
      label: "👑 Admin Panel",
      path: "/shivadmin",
    });
  }
  return (
    <header className="navbar-wrapper">
      {/* Top Banner */}
      <div className="top-bar">
        <div className="container top-bar-container">
          <div className="top-left">
            <span className="badge-authorized">
              Valvoline Bike Xpert Authorized
            </span>
            <span className="top-text-hide">
              ⚡ 100% Genuine Oils & OEM Spares
            </span>
          </div>

          <div className="top-right">
            {/* 📍 Workshop Address */}
            <a
              href="https://maps.app.goo.gl/KivdmBaBLosVq1ou5"
              target="_blank"
              rel="noreferrer"
              className="top-info-link address-link"
              title="Get Directions on Google Maps"
            >
              <MapPin size={13} color="#fcd34d" />
              <span>Bhabanpur, Ramnagar, UP</span>
            </a>

            <span className="top-divider">|</span>

            {/* 📞 Hotline Number */}
            <a href="tel:+917408998188" className="top-info-link phone-link">
              <Phone size={13} />
              <span>Hotline: +91 74089 98188</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="main-nav">
        <div className="container main-nav-container">
          {/* Logo */}
          <Link
            to="/"
            className="brand-logo"
            onClick={() => setActiveTab("home")}
          >
            <div className="logo-icon">
              <Wrench size={22} color="#e31b23" />
            </div>
            <div className="logo-text">
              <span className="brand-title">
                VALVOLINE <small>BIKE XPERT</small>
              </span>
              <span className="brand-sub">
                <ShieldCheck size={12} color="#10b981" /> SHIV AUTO SERVICE
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="desktop-links">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setActiveTab(item.id)}
                className={`nav-item ${activeTab === item.id ? "active" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* AI Advisor Button */}
          <div className="nav-actions">
            <button className="btn-ai" onClick={onOpenAiAdvisor}>
              <Bot size={18} />
              <span>AI Mechanic</span>
              <Sparkles size={14} color="#f59e0b" />
            </button>

            {/* Hamburger Toggle */}
            <button
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`mobile-nav-item ${activeTab === item.id ? "active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
