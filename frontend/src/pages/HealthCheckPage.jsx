import React, { useState, useRef } from "react";
import {
  CheckSquare,
  Wrench,
  Printer,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import "../styles/healthcheck.css";

export default function HealthCheckPage({ onBookServiceWithIssue }) {
  const initialPoints = [
    {
      id: 1,
      name: "Engine Oil Level & Viscosity",
      category: "Engine",
      status: "ok",
      desc: "100% synthetic/blend level check",
    },
    {
      id: 2,
      name: "Engine Noise & Tappet Clearance",
      category: "Engine",
      status: "ok",
      desc: "No metallic knocking sound",
    },
    {
      id: 3,
      name: "Exhaust Smoke Test (White/Black)",
      category: "Engine",
      status: "ok",
      desc: "Zero ring seal leakage",
    },
    {
      id: 4,
      name: "Spark Plug Carbon & Gap Test",
      category: "Ignition",
      status: "ok",
      desc: "Electrode gap 0.7-0.8mm",
    },
    {
      id: 5,
      name: "Air Filter Cleanliness",
      category: "Engine",
      status: "ok",
      desc: "Free from heavy dust block",
    },
    {
      id: 6,
      name: "Front Disc Brake Pad Thickness",
      category: "Brakes",
      status: "ok",
      desc: "> 3mm friction material left",
    },
    {
      id: 7,
      name: "Rear Drum Brake Shoe Wear",
      category: "Brakes",
      status: "ok",
      desc: "Cam play within tolerance",
    },
    {
      id: 8,
      name: "Brake Fluid Level & Moisture",
      category: "Brakes",
      status: "ok",
      desc: "DOT 4 moisture < 2%",
    },
    {
      id: 9,
      name: "Drive Chain Slack & Lubrication",
      category: "Drivetrain",
      status: "ok",
      desc: "25mm slack with Valvoline lube",
    },
    {
      id: 10,
      name: "Front & Rear Sprocket Teeth Wear",
      category: "Drivetrain",
      status: "ok",
      desc: "No hooked teeth",
    },
    {
      id: 11,
      name: "Clutch Free Play & Cable Tension",
      category: "Clutch",
      status: "ok",
      desc: "10-15mm play",
    },
    {
      id: 12,
      name: "Battery Voltage & Terminal Corrosion",
      category: "Electrical",
      status: "ok",
      desc: "12.6V+ resting voltage",
    },
    {
      id: 13,
      name: "Headlight (High/Low Beam) & LED",
      category: "Electrical",
      status: "ok",
      desc: "Clear projection",
    },
    {
      id: 14,
      name: "Indicators, Tail Light & Horn",
      category: "Electrical",
      status: "ok",
      desc: "All 4 indicators active",
    },
    {
      id: 15,
      name: "Tyre Tread Depth & PSI Check",
      category: "Wheels",
      status: "ok",
      desc: "Good grip depth",
    },
    {
      id: 16,
      name: "Wheel Rim Wobble & Alignment",
      category: "Wheels",
      status: "ok",
      desc: "Zero bent rims",
    },
    {
      id: 17,
      name: "Front Suspension Fork Seal Leakage",
      category: "Suspension",
      status: "ok",
      desc: "Dry fork tubes",
    },
    {
      id: 18,
      name: "Rear Shock Absorber Damping",
      category: "Suspension",
      status: "ok",
      desc: "Smooth bounce recovery",
    },
    {
      id: 19,
      name: "Fuel Injector / Carburetor Idling",
      category: "Fuel System",
      status: "ok",
      desc: "1400 RPM smooth idle",
    },
    {
      id: 20,
      name: "Chassis Frame & Side Stand Sensor",
      category: "Body",
      status: "ok",
      desc: "Zero rust cracks",
    },
  ];

  const [points, setPoints] = useState(initialPoints);
  const [bikeBrand, setBikeBrand] = useState("Honda");
  const [bikeModel, setBikeModel] = useState("Shine / Unicorn");
  const [reportGenerated, setReportGenerated] = useState(false);

  const reportRef = useRef(null);

  const togglePointStatus = (id) => {
    setPoints((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return { ...p, status: p.status === "ok" ? "attention" : "ok" };
        }
        return p;
      }),
    );
  };

  const okCount = points.filter((p) => p.status === "ok").length;
  const attentionCount = points.length - okCount;
  const healthScore = Math.round((okCount / points.length) * 100);

  const handleGenerateReport = () => {
    setReportGenerated(true);
    setTimeout(() => {
      if (reportRef.current) {
        reportRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="contact-page-container section-padding healthcheck-wrapper">
      {/* Title Header (Screen Only) */}
      <div className="page-header-center print-hide">
        <span className="header-badge green">
          VALVOLINE DIGITAL DIAGNOSTIC SYSTEM
        </span>
        <h1 className="page-title">20-Point Interactive Bike Health Checkup</h1>
        <p className="page-subtitle">
          Run our digital workshop health audit tool on your motorcycle to
          inspect key components and generate an instant Valvoline Health
          Report!
        </p>
      </div>

      {/* Bike Details Header (Screen Only) */}
      <div className="audit-header-card print-hide">
        <div className="audit-inputs">
          <div className="form-group">
            <label style={{ color: "#64748b" }}>Bike Brand</label>
            <input
              type="text"
              value={bikeBrand}
              onChange={(e) => setBikeBrand(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="form-group">
            <label style={{ color: "#64748b" }}>Bike Model</label>
            <input
              type="text"
              value={bikeModel}
              onChange={(e) => setBikeModel(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="score-summary-side">
          <div className="score-box">
            <span className="score-lbl">Health Score</span>
            <span
              className={`score-num ${healthScore >= 80 ? "green" : "amber"}`}
            >
              {healthScore}%
            </span>
          </div>
          <button onClick={handleGenerateReport} className="btn btn-primary">
            Generate Report
          </button>
        </div>
      </div>

      {/* Interactive 20 Point Checklist Grid (Screen Only) */}
      <div className="checklist-grid print-hide">
        {points.map((pt) => {
          const isOk = pt.status === "ok";
          return (
            <div
              key={pt.id}
              onClick={() => togglePointStatus(pt.id)}
              className={`check-item-card ${isOk ? "ok" : "attention"}`}
            >
              <div className="check-icon">
                {isOk ? (
                  <CheckSquare size={20} color="#10b981" />
                ) : (
                  <AlertTriangle size={20} color="#d97706" />
                )}
              </div>

              <div className="check-details">
                <div className="check-top">
                  <span className="check-title">
                    {pt.id}. {pt.name}
                  </span>
                  <span className={`status-pill ${isOk ? "green" : "amber"}`}>
                    {isOk ? "PASSED" : "ATTENTION"}
                  </span>
                </div>
                <p className="check-desc">{pt.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Generated Report Section */}
      {reportGenerated && (
        <div ref={reportRef} className="generated-report-card print-document">
          <div className="report-header-flex">
            <div className="report-brand">
              <div className="wrench-badge">
                <Wrench size={22} color="#ffffff" />
              </div>
              <div>
                <h3>Valvoline Digital Health Certificate</h3>
                <p>
                  Shiv Auto Service Workshop Audit • Vehicle: {bikeBrand} (
                  {bikeModel})
                </p>
              </div>
            </div>

            <div className="report-actions print-hide">
              <button
                onClick={handlePrint}
                className="btn btn-secondary-outline"
              >
                <Printer size={16} color="#003876" />
                <span>Print / Save PDF</span>
              </button>

              <button
                onClick={() =>
                  onBookServiceWithIssue(
                    `20-Point Health Checkup Result: ${attentionCount} components need attention (${bikeBrand} ${bikeModel})`,
                  )
                }
                className="btn btn-primary"
              >
                <span>Book Repair Slot</span>
              </button>
            </div>
          </div>

          <div className="report-stats-grid">
            <div className="stat-card">
              <span className="stat-label">Overall Health</span>
              <span className="stat-value green">{healthScore}%</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Passed Points</span>
              <span className="stat-value blue">{okCount} / 20</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Action Needed</span>
              <span className="stat-value amber">{attentionCount}</span>
            </div>
          </div>

          {attentionCount > 0 && (
            <div className="recommendations-box">
              <h4>Recommended Workshop Repairs:</h4>
              <ul>
                {points
                  .filter((p) => p.status === "attention")
                  .map((p) => (
                    <li key={p.id}>
                      <AlertTriangle size={14} color="#d97706" />
                      <span>
                        <strong>{p.name}</strong> ({p.category}) - {p.desc}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {/* DEDICATED PRINT TABLE - Completely hidden on screen */}
          <div className="print-only-table-section">
            <h4 className="print-table-heading">
              Full 20-Point Inspection Details:
            </h4>
            <table className="print-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Inspection Item</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {points.map((pt) => {
                  const isOk = pt.status === "ok";
                  return (
                    <tr key={pt.id} className={isOk ? "tr-pass" : "tr-warn"}>
                      <td>
                        <strong>{pt.id}</strong>
                      </td>
                      <td>
                        <strong>{pt.name}</strong>
                      </td>
                      <td>{pt.category}</td>
                      <td>
                        <span
                          className={`print-tag ${isOk ? "tag-pass" : "tag-warn"}`}
                        >
                          {isOk ? "PASSED" : "ATTENTION"}
                        </span>
                      </td>
                      <td>{pt.desc}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* DEDICATED PRINT FOOTER - Completely hidden on screen */}
          <div className="print-only-stamp-footer">
            <div className="stamp-flex">
              <div>
                <p className="shop-title">
                  Shiv Auto Service (Valvoline Authorized Bike Xpert)
                </p>
                <p className="shop-sub">
                  Bhabanpur, Ramnagar, UP • Contact: +91 74089 98188
                </p>
              </div>
              <div className="seal-badge">
                <CheckCircle2 size={16} color="#059669" />
                <span>OFFICIAL VERIFIED CERTIFICATE</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
