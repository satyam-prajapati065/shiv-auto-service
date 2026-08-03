import React from "react";
import { Link } from "react-router-dom";
import {
  Wrench,
  MapPin,
  Phone,
  Mail,
  Clock,
  Award,
  MessageCircle,
  ChevronRight,
  Heart,
} from "lucide-react";
import "../styles/footer.css";

export default function Footer({ setActiveTab }) {
  const quickLinks = [
    { label: "Home Page", tab: "home", path: "/" },
    { label: "All Bike Services", tab: "services", path: "/services" },
    { label: "Spare Parts Store", tab: "spare-parts", path: "/spare-parts" },
    { label: "🚨 Emergency Assistance", tab: "emergency", path: "/emergency" },
    {
      label: "20-Point Health Check",
      tab: "health-check",
      path: "/health-check",
    },
    { label: "Special Offers & Coupons", tab: "offers", path: "/offers" },
    { label: "About Workshop", tab: "about", path: "/about" },
  ];

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1 */}
          <div className="footer-col space-gap">
            <div className="brand-header">
              <div className="footer-logo-icon">
                <Wrench size={20} color="#ffffff" />
              </div>
              <div>
                <h3 className="footer-brand-title">
                  VALVOLINE <span>BIKE XPERT</span>
                </h3>
                <p className="footer-brand-sub">SHIV AUTO SERVICE</p>
              </div>
            </div>

            <p className="footer-text">
              Shiv Auto Service is an official certified Valvoline Bike Xpert
              partner workshop with over 12+ years of experience in multi-brand
              two-wheeler repair and high-performance lubricants.
            </p>

            <div className="certified-box">
              <Award size={28} color="#fcd34d" />
              <div>
                <p className="cert-title">100% Valvoline Certified</p>
                <p className="cert-sub">Genuine Oil & OEM Warranty Assured</p>
              </div>
            </div>
          </div>

          {/* Col 2 */}
          <div className="footer-col space-gap">
            <h4 className="footer-heading">Quick Navigation</h4>
            <ul className="footer-links">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    onClick={() => setActiveTab(link.tab)}
                    className="footer-link"
                  >
                    <ChevronRight size={14} color="#e31b23" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div className="footer-col space-gap">
            <h4 className="footer-heading">Working Hours</h4>
            <div className="timing-box">
              <Clock size={18} color="#6ee7b7" />
              <div>
                <p className="time-title">Monday - Sunday</p>
                <p className="time-sub">09:00 AM - 07:00 PM</p>
              </div>
            </div>
            <div className="brands-supported">
              <p className="brands-title">We Service All Brands:</p>
              <p className="brands-list">
                Honda • Hero • TVS • Bajaj • Yamaha • Royal Enfield • KTM •
                Suzuki • Vespa
              </p>
            </div>
          </div>

          {/* Col 4 */}
          <div className="footer-col space-gap">
            <h4 className="footer-heading">Workshop Contact</h4>
            <div className="contact-list">
              <div className="contact-item">
                <MapPin size={18} color="#e31b23" className="shrink" />
                <span>
                  Shiv Auto Service, Bhabanpur, Ramnagar, Shahpur Ouraw, UP
                  224181
                </span>
              </div>
              <div className="contact-item">
                <Phone size={18} color="#fcd34d" className="shrink" />
                <a href="tel:+917408998188">+91 74089 98188</a>
              </div>
              <div className="contact-item">
                <Mail size={18} color="#6ee7b7" className="shrink" />
                <span>chandrapratapsashi@gamil.com</span>
              </div>
              <a
                href="https://wa.me/917408998188"
                target="_blank"
                rel="noreferrer"
                className="btn-wa-footer"
              >
                <MessageCircle size={16} />
                <span>WhatsApp Inquiry</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>
            © 2026 Valvoline Bike Xpert - Shiv Auto Service. All Rights
            Reserved.
          </p>
          <p className="built-with">
            Built with <Heart size={14} color="#e31b23" fill="#e31b23" /> for
            Indian Two-Wheeler Riders
          </p>
        </div>
      </div>
    </footer>
  );
}
