import React, { useState } from "react";
import { Tag, Copy, Check, Calendar } from "lucide-react";
import "../styles/offers.css";

export default function OffersPage({ offers, onBookServiceWithCoupon }) {
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="contact-page-container section-padding offers-wrapper">
      {/* Title Header */}
      <div className="page-header-center">
        <span className="header-badge red">EXCLUSIVE SAVINGS & DISCOUNTS</span>
        <h1 className="page-title">
          Special Festival Offers & Service Coupons
        </h1>
        <p className="page-subtitle">
          Save big on your next bike service with official Valvoline promotional
          codes and free add-ons!
        </p>
      </div>

      {/* Offers Grid */}
      <div className="offers-grid">
        {offers.map((off) => (
          <div key={off.id} className="offer-card">
            <div className="offer-card-top">
              <div className="offer-badge-row">
                <span className="offer-badge">{off.badge}</span>
                <span className="valid-till">{off.validTill}</span>
              </div>

              <div className="offer-main-info">
                <span className="discount-tag">{off.discount}</span>
                <h3 className="offer-title">{off.title}</h3>
                <p className="offer-desc">{off.description}</p>
              </div>
            </div>

            <div className="offer-card-bottom">
              {/* Promo Code Box */}
              <div className="promo-code-box">
                <div>
                  <span className="promo-label">PROMO CODE</span>
                  <span className="promo-code">{off.code}</span>
                </div>

                <button
                  onClick={() => handleCopy(off.code)}
                  className="btn-copy"
                >
                  {copiedCode === off.code ? (
                    <>
                      <Check size={14} color="#10b981" />
                      <span className="copied-text">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} color="#64748b" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={() => onBookServiceWithCoupon(off.code)}
                className="btn btn-primary btn-block"
              >
                <Calendar size={16} />
                <span>Apply Coupon & Book Service</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
