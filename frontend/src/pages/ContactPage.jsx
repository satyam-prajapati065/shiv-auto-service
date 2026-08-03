import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Send,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
} from "lucide-react";
import "../styles/contact.css";

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(0);
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryMobile, setInquiryMobile] = useState("");
  const [inquiryMsg, setInquiryMsg] = useState("");
  const [submittingInquiry, setSubmittingInquiry] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const faqs = [
    {
      q: "Bike service kitne kilometers baad karwani chahiye?",
      a: "Kommuter bikes (100cc - 150cc) ke liye regular service har 2,500 se 3,000 km par recommended hai. Synthetic engine oil use karne par interval 4,000 km tak extend ho sakta hai.",
    },
    {
      q: "Engine oil kab change karna chahiye?",
      a: "Mineral oil har 2,000 km par, Valvoline Champ 4T synthetic blend har 3,000 - 3,500 km par, aur Fully Synthetic Valvoline 4T oil har 5,000 km par replace karna chahiye.",
    },
    {
      q: "Doorstep Pickup & Drop service available hai?",
      a: "Haan! Shiv Auto Service city me 10km radius ke andar 100% Free doorstep pickup and drop service provide karta hai.",
    },
    {
      q: "Kya Shiv Auto Service par Original Valvoline Parts & Oils milte hain?",
      a: "Bilkul! Hum Valvoline Bike Xpert Authorized Partner hain. 100% genuine sealed Valvoline engine oils, Exide/Amaron batteries, CEAT/MRF tyres, aur Honda/Hero OEM spares milte hain.",
    },
  ];

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setSubmittingInquiry(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: inquiryName,
          mobile: inquiryMobile,
          message: inquiryMsg,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSentSuccess(true);
      } else {
        setErrorMessage(
          data.error || "Message send nahi ho paya. Dobara koshish karein.",
        );
      }
    } catch (err) {
      console.error("Inquiry submission API error:", err);
      setErrorMessage(
        "Server Connection Error! Please hotline par contact karein.",
      );
    } finally {
      setSubmittingInquiry(false);
    }
  };

  return (
    <div className="contact-page-container">
      {/* Title Header */}
      <div className="contact-header-section">
        <span className="contact-tag">WORKSHOP CONTACT & LOCATION</span>
        <h1 className="contact-title">Get In Touch With Shiv Auto Service</h1>
        <p className="contact-subtitle">
          Have a question about bike servicing, spare part availability, or
          emergency assistance? Call or visit us today!
        </p>
      </div>

      {/* Info Cards Grid */}
      <div className="contact-info-grid">
        {/* Address Card */}
        <div className="info-card">
          <div className="icon-badge icon-badge-red">
            <MapPin size={20} />
          </div>
          <h3 className="info-card-title">Workshop Address</h3>
          <p className="info-card-text">
            Opposite Union Bank of India, Bhabanpur, Ramnagar, Shahpur Ouraw,
            Uttar Pradesh 224181
          </p>
          <a
            href="https://maps.app.goo.gl/KivdmBaBLosVq1ou5"
            target="_blank"
            rel="noreferrer"
            className="info-card-link"
          >
            Open in Google Maps →
          </a>
        </div>

        {/* Phone Card */}
        <div className="info-card">
          <div className="icon-badge icon-badge-blue">
            <Phone size={20} />
          </div>
          <h3 className="info-card-title">Phone & Hotline</h3>
          <p className="info-card-phone">
            <a href="tel:+917408998188">+91 74089 98188</a>
          </p>
        </div>

        {/* WhatsApp Card */}
        <div className="info-card">
          <div className="icon-badge icon-badge-green">
            <MessageCircle size={20} />
          </div>
          <h3 className="info-card-title">WhatsApp Support</h3>
          <a
            href="https://wa.me/917408998188"
            target="_blank"
            rel="noreferrer"
            className="info-card-whatsapp"
          >
            Chat: +91 74089 98188
          </a>
        </div>

        {/* Hours Card */}
        <div className="info-card">
          <div className="icon-badge icon-badge-amber">
            <Clock size={20} />
          </div>
          <h3 className="info-card-title">Working Hours</h3>
          <p className="info-card-text">Monday - Sunday: 09:00 AM - 07:00 PM</p>
        </div>
      </div>

      {/* Map & Inquiry Form Row */}
      <div className="form-map-row">
        {/* Contact Form */}
        <div className="form-card-container">
          <h3 className="form-heading">Send Quick Message to Workshop</h3>

          {errorMessage && (
            <div className="alert-box alert-error">{errorMessage}</div>
          )}

          {sentSuccess ? (
            <div className="alert-box alert-success">
              <div className="alert-success-header">
                <CheckCircle2 size={20} />
                <span>Message Saved in Database!</span>
              </div>
              <p className="alert-success-text">
                Aapka message Admin Panel (<code>/shivadmin</code>) me live save
                ho gaya hai. Humare workshop mechanic jald se jald aapse contact
                karenge.
              </p>
              <div className="alert-action-buttons">
                <a
                  href={`https://wa.me/917408998188?text=${encodeURIComponent(
                    `Hi Shiv Auto Service, my name is ${inquiryName} (${inquiryMobile}). Inquiry: ${inquiryMsg}`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-whatsapp-action"
                >
                  <MessageCircle size={16} />
                  <span>Send on WhatsApp as well</span>
                </a>
                <button
                  onClick={() => {
                    setSentSuccess(false);
                    setInquiryName("");
                    setInquiryMobile("");
                    setInquiryMsg("");
                  }}
                  className="btn-reset-action"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} className="contact-form-body">
              <div className="form-group-item">
                <label>Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Satyam Prajapati"
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                />
              </div>

              <div className="form-group-item">
                <label>Mobile Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 9876543210"
                  value={inquiryMobile}
                  onChange={(e) => setInquiryMobile(e.target.value)}
                />
              </div>

              <div className="form-group-item">
                <label>Inquiry Message *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your query or spare part requirement..."
                  value={inquiryMsg}
                  onChange={(e) => setInquiryMsg(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={submittingInquiry}
                className="btn-submit-red"
              >
                <Send size={16} />
                <span>
                  {submittingInquiry
                    ? "Saving to Database..."
                    : "Send Inquiry Message"}
                </span>
              </button>
            </form>
          )}
        </div>

        {/* Embedded Map */}
        <div className="map-card-container">
          <iframe
            title="Shiv Auto Service Map Location"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d114323.64117393398!2d82.9330802!3d26.4359372!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3990e35a8da0f517%3A0x33b5ae590fd989ed!2sValvoline%20Bike%20Xpert%20-%20Shiv%20Auto%20Service!5e0!3m2!1sen!2sin!4v1785344089267!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          />
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="faq-section-container">
        <div className="faq-title-header">
          <span className="faq-tag">FREQUENTLY ASKED QUESTIONS</span>
          <h2 className="faq-main-title">Frequently Asked Questions (FAQ)</h2>
        </div>

        <div className="faq-list">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="faq-card-item">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="faq-question-btn"
                >
                  <span className="faq-question-text">
                    <HelpCircle size={16} className="faq-help-icon" />
                    <span>{faq.q}</span>
                  </span>
                  {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {isOpen && <div className="faq-answer-content">{faq.a}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
