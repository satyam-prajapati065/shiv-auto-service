import React, { useState } from "react";
import {
  Bot,
  Sparkles,
  X,
  Send,
  ShieldCheck,
  Wrench,
  ArrowRight,
  Loader2,
} from "lucide-react";
import "../styles/modal.css";

export default function AiAdvisorModal({
  isOpen,
  onClose,
  onBookServiceWithIssue,
}) {
  const [bikeModel, setBikeModel] = useState("");
  const [userQuery, setUserQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [adviceResult, setAdviceResult] = useState("");

  if (!isOpen) return null;

  const handleAskAdvisor = async (e) => {
    e.preventDefault();
    if (!userQuery.trim()) return;

    setLoading(true);
    setAdviceResult("");

    try {
      const res = await fetch("/api/ai-advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userQuery, bikeModel }),
      });
      const data = await res.json();
      if (data.success) {
        setAdviceResult(data.advice);
      } else {
        setAdviceResult(
          "Sorry, I couldn't analyze the issue right now. Please call Shiv Auto Service hotline: +91 74089 98188.",
        );
      }
    } catch (err) {
      setAdviceResult(
        "Connection error. Please call our master mechanic at +91 74089 98188.",
      );
    } finally {
      setLoading(false);
    }
  };

  const sampleChips = [
    "Self start problem",
    "White smoke from silencer",
    "Gear shift hard",
    "Engine heat quickly",
    "Disc brake noise",
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-bot-icon">
              <Bot size={24} color="#ffffff" />
            </div>
            <div>
              <div className="modal-heading-badge">
                <h3>Valvoline AI Bike Mechanic</h3>
                <span className="live-badge">LIVE AI</span>
              </div>
              <p className="modal-subtext">
                Describe any bike problem to get instant diagnostic guidance
              </p>
            </div>
          </div>
          <button onClick={onClose} className="modal-close-btn">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <form onSubmit={handleAskAdvisor} className="modal-form">
            <div className="form-grid">
              <div className="form-group col-1">
                <label>Bike Model (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Pulsar 220, Activa 6G"
                  value={bikeModel}
                  onChange={(e) => setBikeModel(e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group col-2">
                <label>Describe Bike Problem *</label>
                <div className="input-with-button">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gadi start nahi ho rahi, noise aa rahi hai..."
                    value={userQuery}
                    onChange={(e) => setUserQuery(e.target.value)}
                    className="form-input"
                  />
                  <button type="submit" disabled={loading} className="btn-send">
                    {loading ? (
                      <Loader2 size={16} className="spinner" />
                    ) : (
                      <Send size={16} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Sample Chips */}
            <div className="chips-wrapper">
              <span className="chips-label">Quick Examples:</span>
              {sampleChips.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setUserQuery(chip)}
                  className="chip-btn"
                >
                  {chip}
                </button>
              ))}
            </div>
          </form>

          {/* Diagnostic Result */}
          {adviceResult && (
            <div className="diagnostic-report">
              <div className="report-title">
                <Sparkles size={16} color="#f59e0b" />
                <span>Shiv Auto Service AI Diagnostic Report</span>
              </div>

              <div className="report-content">{adviceResult}</div>

              <div className="report-footer">
                <div className="guarantee-tag">
                  <ShieldCheck size={16} color="#10b981" />
                  <span>100% Genuine Valvoline Repairs</span>
                </div>

                <button
                  onClick={() => {
                    onBookServiceWithIssue(userQuery);
                    onClose();
                  }}
                  className="btn-book-issue"
                >
                  <Wrench size={14} />
                  <span>Book Repair Slot for this Issue</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
