import React, { useState } from "react";
import { Star, Plus, CheckCircle2, X } from "lucide-react";
import "../styles/reviews.css";

export default function ReviewsPage({ reviews, onAddReview }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterRating, setFilterRating] = useState("All");

  const [name, setName] = useState("");
  const [bikeModel, setBikeModel] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const filteredReviews =
    filterRating === "All"
      ? reviews
      : reviews.filter((r) => r.rating === Number(filterRating));

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!name || !comment) return;

    setSubmitting(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, bikeModel, rating, comment }),
      });

      const data = await res.json();
      if (data.success) {
        onAddReview(data.data);
        setSuccessMsg("Thank you! Your review has been added.");
        setTimeout(() => {
          setShowAddModal(false);
          setSuccessMsg("");
          setName("");
          setBikeModel("");
          setComment("");
        }, 1500);
      }
    } catch (err) {
      // Standalone Fallback
      const fallbackReview = {
        id: Date.now(),
        name,
        bikeModel: bikeModel || "Bike Owner",
        rating: Number(rating),
        comment,
        date: "Just now",
      };
      onAddReview(fallbackReview);
      setSuccessMsg("Thank you! Your review has been added.");
      setTimeout(() => {
        setShowAddModal(false);
        setSuccessMsg("");
        setName("");
        setBikeModel("");
        setComment("");
      }, 1500);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-page-container section-padding reviews-wrapper">
      {/* Title Header */}
      <div className="page-header-center">
        <span className="header-badge amber">GOOGLE REVIEWS & FEEDBACK</span>
        <h1 className="page-title">What Bike Owners Say About Us</h1>
        <p className="page-subtitle">
          Real feedback from 1000+ happy motorcycle owners serviced at Shiv Auto
          Service Valvoline Xpert.
        </p>
      </div>

      {/* Google Rating Banner */}
      <div className="google-rating-banner">
        <div className="rating-score-group">
          <div className="big-rating-num">4.9</div>
          <div>
            <div className="star-row">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} color="#f59e0b" fill="#f59e0b" />
              ))}
            </div>
            <p className="rating-sub">
              Based on 1,250+ Google Customer Reviews
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary"
        >
          <Plus size={16} />
          <span>Write a Customer Review</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="review-filter-row">
        <span className="filter-label">Filter by Rating:</span>
        {["All", "5", "4", "3"].map((star, idx) => (
          <button
            key={idx}
            onClick={() => setFilterRating(star)}
            className={`filter-tab-btn ${filterRating === star ? "active" : ""}`}
          >
            {star === "All" ? "All Reviews" : `${star} Star ★`}
          </button>
        ))}
      </div>

      {/* Reviews Grid */}
      <div className="reviews-card-grid">
        {filteredReviews.map((rev) => (
          <div key={rev.id} className="user-review-card">
            <div className="review-top-meta">
              <div className="star-row">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={14} color="#f59e0b" fill="#f59e0b" />
                ))}
              </div>
              <span className="review-date">{rev.date}</span>
            </div>

            <p className="review-comment">"{rev.comment}"</p>

            <div className="review-user-footer">
              <div>
                <p className="user-name">{rev.name}</p>
                <p className="user-bike">{rev.bikeModel}</p>
              </div>
              <span className="verified-tag">
                <CheckCircle2 size={12} color="#10b981" /> Verified Customer
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Review Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="add-review-modal">
            <div className="modal-header-flex">
              <h3>Write Your Review for Shiv Auto Service</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="btn-close-modal"
              >
                <X size={18} />
              </button>
            </div>

            {successMsg ? (
              <div className="success-msg-box">
                <CheckCircle2 size={20} color="#10b981" />
                <span>{successMsg}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="modal-form-stack">
                <div className="form-group">
                  <label>Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field"
                  />
                </div>

                <div className="form-group">
                  <label>Bike Model</label>
                  <input
                    type="text"
                    placeholder="e.g. Pulsar 220F"
                    value={bikeModel}
                    onChange={(e) => setBikeModel(e.target.value)}
                    className="input-field"
                  />
                </div>

                <div className="form-group">
                  <label>Star Rating</label>
                  <div className="star-select-row">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setRating(s)}
                        className={`star-select-btn ${rating >= s ? "selected" : ""}`}
                      >
                        {s} ★
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Your Feedback *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Share your experience regarding service quality, mechanic behavior, pricing..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="input-field"
                  />
                </div>

                <div className="modal-actions-right">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="btn btn-secondary-outline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary"
                  >
                    {submitting ? "Submitting..." : "Submit Review"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
