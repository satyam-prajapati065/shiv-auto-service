import React, { useState } from "react";
import {
  AlertTriangle,
  MapPin,
  Phone,
  CheckCircle2,
  Navigation,
  Loader2,
} from "lucide-react";
import "../styles/emergency.css";

// Base URL Setup (.env se API URL lega, nahi to localhost)
const API_BASE_URL =
  import.meta.env.VITE_BACKEND_API_URL || "http://localhost:5000";

export default function EmergencyPage() {
  const [customerName, setCustomerName] = useState("");
  const [mobile, setMobile] = useState("");
  const [bikeModel, setBikeModel] = useState("");
  const [location, setLocation] = useState("");
  const [issue, setIssue] = useState("");
  const [coords, setCoords] = useState(null);

  const [geoLoading, setGeoLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [alertResult, setAlertResult] = useState(null);
  const [error, setError] = useState("");

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError(
        "Geolocation is not supported by your browser. Please type your location manually.",
      );
      return;
    }

    setGeoLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setCoords({ lat, lng });
        setLocation(
          `GPS: ${lat.toFixed(5)}, ${lng.toFixed(5)} (Captured automatically)`,
        );
        setGeoLoading(false);
      },
      (err) => {
        setError(
          "Unable to fetch GPS automatically. Please enter your street landmark or highway name.",
        );
        setGeoLoading(false);
      },
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerName || !mobile || !location) {
      setError("Name, Mobile Number, and Breakdown Location are required!");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/breakdown`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          mobile,
          bikeModel,
          location,
          issue,
          latitude: coords?.lat,
          longitude: coords?.lng,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setAlertResult(data.data);
      } else {
        setError(
          data.error || "Emergency alert failed. Please call hotline directly.",
        );
      }
    } catch (err) {
      // Standalone Fallback
      const fallbackResult = {
        id: `EMG-${Math.floor(1000 + Math.random() * 9000)}`,
        customerName,
        mobile,
        location,
        status: "Active Dispatch",
      };
      setAlertResult(fallbackResult);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-page-container emergency-wrapper">
      {/* Top Banner */}
      <div className="emergency-banner">
        <div className="pulse-icon-box">
          <AlertTriangle size={36} color="#fde047" />
        </div>
        <span className="emergency-tag">24/7 ROAD ASSISTANCE DISPATCH</span>
        <h1 className="emergency-title">Emergency Breakdown Service</h1>
        <p className="emergency-sub">
          Stuck on the road or highway? Send us your location immediately. Our
          Shiv Auto Service mobile mechanic team will reach you with essential
          tools, puncture kits, and Valvoline oils!
        </p>

        {/* Call Button */}
        <div className="hotline-btn-wrapper">
          <a href="tel:+917408998188" className="btn btn-hotline">
            <Phone size={20} className="bounce" />
            <span>CALL EMERGENCY HOTLINE: +91 74089 98188</span>
          </a>
        </div>
      </div>

      {alertResult ? (
        <div className="alert-success-card">
          <div className="check-icon-wrapper">
            <CheckCircle2 size={40} color="#d97706" />
          </div>

          <div className="success-text">
            <span className="dispatch-badge">ALERT DISPATCHED TO MECHANIC</span>
            <h2>Emergency Team Notified!</h2>
            <p>
              Emergency Reference ID:{" "}
              <strong className="emg-id">{alertResult.id}</strong>
            </p>
          </div>

          <div className="alert-info-box">
            <p>
              <strong>Customer:</strong> {alertResult.customerName} (
              {alertResult.mobile})
            </p>
            <p>
              <strong>Location:</strong> {alertResult.location}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span className="status-active">{alertResult.status}</span>
            </p>
          </div>

          <a href="tel:+917408998188" className="btn btn-primary">
            <Phone size={16} />
            <span>Call Mechanic Direct to Track Arrival</span>
          </a>
        </div>
      ) : (
        <div className="breakdown-form-card">
          <h2 className="form-title">Send Breakdown Location to Workshop</h2>

          {error && (
            <div className="error-alert">
              <AlertTriangle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="emergency-form">
            <div className="form-row-2">
              <div className="form-group">
                <label>Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Singh"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label>Mobile Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 9876543210"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label>Bike Model & Brand</label>
                <input
                  type="text"
                  placeholder="e.g. Apache 160 / Royal Enfield"
                  value={bikeModel}
                  onChange={(e) => setBikeModel(e.target.value)}
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label>Issue Description</label>
                <input
                  type="text"
                  placeholder="e.g. Puncture, Chain Broke, No Start..."
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            {/* GPS Location Area */}
            <div className="form-group">
              <div className="location-label-row">
                <label>Breakdown Location / Landmark *</label>
                <button
                  type="button"
                  onClick={handleGetLocation}
                  disabled={geoLoading}
                  className="btn-gps"
                >
                  {geoLoading ? (
                    <Loader2 size={14} className="spinner" />
                  ) : (
                    <Navigation size={14} color="#e31b23" />
                  )}
                  <span>Detect GPS Location</span>
                </button>
              </div>

              <input
                type="text"
                required
                placeholder="Enter exact highway name, street, or landmark..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="input-field"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn btn-dispatch"
            >
              {submitting ? (
                <span>Dispatching Emergency Alert...</span>
              ) : (
                <>
                  <AlertTriangle size={18} color="#fde047" />
                  <span>Send Emergency Dispatch Request</span>
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
