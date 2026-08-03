import React from "react";
import { MessageCircle, Phone, AlertTriangle, MapPin } from "lucide-react";
import "../styles/floating.css";

export default function FloatingControls({ onEmergencyClick }) {
  return (
    <div className="floating-container">
      {/* Emergency Button */}
      <button onClick={onEmergencyClick} className="btn-floating-emergency">
        <AlertTriangle size={18} color="#fde047" />
        <span>🚨 Emergency SOS</span>
      </button>

      {/* Maps */}
      <a
        href="https://maps.app.goo.gl/KivdmBaBLosVq1ou5"
        target="_blank"
        rel="noreferrer"
        className="floating-icon-btn map-btn"
        title="Google Maps"
      >
        <MapPin size={20} />
      </a>

      {/* Call */}
      <a
        href="tel:+917408998188"
        className="floating-icon-btn phone-btn"
        title="Call Mechanic"
      >
        <Phone size={20} />
      </a>

      {/* WhatsApp */}
      <a
        href="https://wa.me/917408998188?text=Hi%20Shiv%20Auto%20Service,%20I%20want%20to%20book%20a%20service"
        target="_blank"
        rel="noreferrer"
        className="floating-icon-btn whatsapp-btn"
        title="WhatsApp Chat"
      >
        <MessageCircle size={22} />
      </a>
    </div>
  );
}
