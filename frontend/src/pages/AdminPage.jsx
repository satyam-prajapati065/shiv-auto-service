import React, { useState, useEffect } from "react";
import {
  Lock,
  Key,
  User,
  AlertTriangle,
  RefreshCw,
  LogOut,
  ShieldCheck,
  Plus,
  Trash2,
  X,
  Settings,
} from "lucide-react";
import "../styles/admin.css";

// Base URL Setup (.env se API URL lega, nahi to localhost)
const API_BASE_URL =
  import.meta.env.VITE_BACKEND_API_URL || "http://localhost:5000";

export default function AdminPage({
  services = [],
  parts = [],
  onServiceAdded,
  onServiceDeleted,
  onPartAdded,
  onPartDeleted,
  isAdminLoggedIn,
  onLoginSuccess,
  onLogout,
}) {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeAdminTab, setActiveAdminTab] = useState("inquiries");

  // State for Account Credentials Update
  const [currentPassword, setCurrentPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [inquiries, setInquiries] = useState([]);
  const [breakdowns, setBreakdowns] = useState([]);

  // Modal State for Services
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [submittingService, setSubmittingService] = useState(false);
  const [newService, setNewService] = useState({
    title: "",
    category: "Regular",
    price: "",
    originalPrice: "",
    timeRequired: "1 Hour",
    image: "",
    description: "",
    highlights: "",
  });

  // Modal State for Spare Parts
  const [isPartModalOpen, setIsPartModalOpen] = useState(false);
  const [submittingPart, setSubmittingPart] = useState(false);
  const [newPart, setNewPart] = useState({
    name: "",
    category: "Oil",
    price: "",
    brand: "Valvoline",
    availability: "In Stock",
    rating: "5.0",
    image: "",
    description: "",
  });

  const loadAdminData = () => {
    // Fetch Inquiries
    fetch(`${API_BASE_URL}/api/inquiries`)
      .then((res) => res.json())
      .then((data) => {
        const apiData = data.success ? data.data : [];
        let localData = [];
        try {
          localData = JSON.parse(
            localStorage.getItem("shiv_inquiries") || "[]",
          );
        } catch (e) {}

        const merged = [...apiData, ...localData];
        const uniqueMap = new Map();

        merged.forEach((item) => {
          const contentKey = `${(item.name || "").trim().toLowerCase()}_${(
            item.mobile || ""
          ).replace(/[^0-9]/g, "")}_${(item.message || "")
            .trim()
            .toLowerCase()}`;
          if (!uniqueMap.has(contentKey) && !uniqueMap.has(item.id)) {
            uniqueMap.set(contentKey, item);
            if (item.id) uniqueMap.set(item.id, item);
          }
        });

        setInquiries(Array.from(new Set(uniqueMap.values())));
      })
      .catch(() => {
        try {
          setInquiries(
            JSON.parse(localStorage.getItem("shiv_inquiries") || "[]"),
          );
        } catch (e) {}
      });

    // Fetch Breakdowns
    fetch(`${API_BASE_URL}/api/breakdowns`)
      .then((res) => res.json())
      .then((data) => {
        const apiData = data.success ? data.data : [];
        let localData = [];
        try {
          localData = JSON.parse(
            localStorage.getItem("shiv_breakdowns") || "[]",
          );
        } catch (e) {}

        const merged = [...apiData, ...localData];
        const uniqueMap = new Map();

        merged.forEach((item) => {
          const contentKey = `${(item.customerName || "")
            .trim()
            .toLowerCase()}_${(item.mobile || "").replace(
            /[^0-9]/g,
            "",
          )}_${(item.issue || "").trim().toLowerCase()}`;
          if (!uniqueMap.has(contentKey) && !uniqueMap.has(item.id)) {
            uniqueMap.set(contentKey, item);
            if (item.id) uniqueMap.set(item.id, item);
          }
        });

        setBreakdowns(Array.from(new Set(uniqueMap.values())));
      })
      .catch(() => {
        try {
          setBreakdowns(
            JSON.parse(localStorage.getItem("shiv_breakdowns") || "[]"),
          );
        } catch (e) {}
      });
  };

  useEffect(() => {
    if (isAdminLoggedIn) {
      loadAdminData();
    }
  }, [isAdminLoggedIn]);

  // Handle Login Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: usernameInput,
          password: passwordInput,
        }),
      });

      const data = await res.json();
      if (data.success) {
        if (onLoginSuccess) onLoginSuccess();
        setUsernameInput("");
        setPasswordInput("");
      } else {
        setLoginError(data.error || "Invalid Username or Password!");
      }
    } catch (err) {
      setLoginError("Server Connection Error!");
    }
  };

  // Update Credentials Handler
  const handleUpdateCredentials = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/update-credentials`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newUsername, newPassword, currentPassword }),
      });

      const data = await res.json();
      if (data.success) {
        alert("🎉 Admin Credentials updated successfully!");
        setNewUsername("");
        setNewPassword("");
        setCurrentPassword("");
      } else {
        alert(data.error || "Failed to update credentials.");
      }
    } catch (err) {
      alert("Server Connection Error!");
    }
  };

  // Add Service Handler
  const handleAddServiceSubmit = async (e) => {
    e.preventDefault();
    setSubmittingService(true);

    const highlightsArray = newService.highlights
      ? newService.highlights.split(",").map((hl) => hl.trim())
      : ["Genuine Products", "Certified Mechanics"];

    try {
      const res = await fetch(`${API_BASE_URL}/api/services`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newService, highlights: highlightsArray }),
      });

      const data = await res.json();
      if (data.success) {
        alert("🎉 New Service Added Successfully!");
        if (onServiceAdded) onServiceAdded(data.data);
        setIsServiceModalOpen(false);
        setNewService({
          title: "",
          category: "Regular",
          price: "",
          originalPrice: "",
          timeRequired: "1 Hour",
          image: "",
          description: "",
          highlights: "",
        });
      } else {
        alert(data.error || "Failed to add service.");
      }
    } catch (err) {
      alert("Server Connection Error!");
    } finally {
      setSubmittingService(false);
    }
  };

  // Delete Service Handler
  const handleDeleteService = async (id) => {
    if (
      !window.confirm("Kya aap sach me is service ko delete karna chahte hain?")
    )
      return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/services/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        alert("Service deleted successfully!");
        if (onServiceDeleted) onServiceDeleted(id);
      }
    } catch (err) {
      alert("Error deleting service.");
    }
  };

  // Add Spare Part Handler
  const handleAddPartSubmit = async (e) => {
    e.preventDefault();
    setSubmittingPart(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/parts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPart),
      });

      const data = await res.json();
      if (data.success) {
        alert("🎉 New Spare Part Added Successfully!");
        if (onPartAdded) onPartAdded(data.data);
        setIsPartModalOpen(false);
        setNewPart({
          name: "",
          category: "Oil",
          price: "",
          brand: "Valvoline",
          availability: "In Stock",
          rating: "5.0",
          image: "",
          description: "",
        });
      } else {
        alert(data.error || "Failed to add part.");
      }
    } catch (err) {
      alert("Server Connection Error!");
    } finally {
      setSubmittingPart(false);
    }
  };

  // Delete Spare Part Handler
  const handleDeletePart = async (id) => {
    if (
      !window.confirm(
        "Kya aap sach me is Spare Part ko delete karna chahte hain?",
      )
    )
      return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/parts/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        alert("Spare Part deleted successfully!");
        if (onPartDeleted) onPartDeleted(id);
      }
    } catch (err) {
      alert("Error deleting part.");
    }
  };

  // ==========================================================================
  // LOGIN SCREEN RENDER (UNAUTHENTICATED)
  // ==========================================================================
  if (!isAdminLoggedIn) {
    return (
      <div className="container section-padding admin-login-wrapper">
        <div className="login-card">
          <div className="login-icon-box">
            <Lock size={32} color="#003876" />
          </div>

          <div className="login-header">
            <h2>Workshop Admin Portal</h2>
            <p>Shiv Auto Service Management System</p>
          </div>

          {loginError && (
            <div className="login-error-alert">
              <AlertTriangle size={16} />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="login-form">
            <div className="form-group">
              <label>Username *</label>
              <div className="input-with-icon">
                <User size={16} className="input-icon" />
                <input
                  type="text"
                  required
                  placeholder="Username (default: admin)"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="input-field icon-padding"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password *</label>
              <div className="input-with-icon">
                <Key size={16} className="input-icon" />
                <input
                  type="password"
                  required
                  placeholder="Password (default: admin123)"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="input-field icon-padding"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Login to Admin Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // DASHBOARD RENDER (AUTHENTICATED)
  // ==========================================================================
  return (
    <div className="contact-page-container section-padding admin-dashboard-wrapper">
      <div className="admin-header-flex">
        <div className="admin-header-title">
          <div className="admin-logo-icon">
            <ShieldCheck size={24} color="#ffffff" />
          </div>
          <div>
            <h1 className="page-title">Shiv Auto Service Dashboard</h1>
            <p className="session-active-tag">
              <span className="live-dot" /> Admin Session Active
            </p>
          </div>
        </div>

        <div className="admin-top-actions">
          <button onClick={loadAdminData} className="btn btn-[#003876] btn-sm">
            <RefreshCw size={14} />
            <span>Refresh Data</span>
          </button>
          <button onClick={onLogout} className="btn btn-logout btn-sm">
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Overview */}
      <div className="kpi-stats-grid">
        <div className="kpi-card">
          <span className="kpi-label">Inquiry Messages</span>
          <span className="kpi-value blue">{inquiries.length}</span>
          <span className="kpi-sub">Customer Contacts</span>
        </div>

        <div className="kpi-card">
          <span className="kpi-label">Emergency Alerts</span>
          <span className="kpi-value amber">{breakdowns.length}</span>
          <span className="kpi-sub amber">Roadside Dispatches</span>
        </div>

        <div className="kpi-card">
          <span className="kpi-label">Services Offered</span>
          <span className="kpi-value green">{services.length}</span>
          <span className="kpi-sub">Workshop Catalog</span>
        </div>

        <div className="kpi-card">
          <span className="kpi-label">Parts Inventory</span>
          <span className="kpi-value blue">{parts.length}</span>
          <span className="kpi-sub">Genuine Spares</span>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="admin-tabs-row">
        {[
          { id: "inquiries", label: `Inquiries (${inquiries.length})` },
          { id: "breakdowns", label: `Emergency (${breakdowns.length})` },
          { id: "services", label: `Services (${services.length})` },
          { id: "parts", label: `Spare Parts (${parts.length})` },
          { id: "settings", label: "⚙️ Account Settings" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveAdminTab(tab.id)}
            className={`admin-tab-btn ${
              activeAdminTab === tab.id ? "active" : ""
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. Inquiry Messages View */}
      {activeAdminTab === "inquiries" && (
        <div className="admin-view-stack">
          {inquiries.length === 0 ? (
            <p className="empty-box-text">No inquiry messages received yet.</p>
          ) : (
            <div className="bookings-table-wrapper">
              <table className="bookings-table">
                <thead>
                  <tr>
                    <th>Customer Name</th>
                    <th>Mobile Number</th>
                    <th>Message</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((inq) => (
                    <tr key={inq.id || Math.random()}>
                      <td>
                        <p className="cust-name">{inq.name}</p>
                      </td>
                      <td>
                        <span className="cust-phone">{inq.mobile}</span>
                      </td>
                      <td>
                        <p className="inquiry-msg-text">{inq.message}</p>
                      </td>
                      <td>
                        <a
                          href={`https://wa.me/${(inq.mobile || "").replace(
                            /[^0-9]/g,
                            "",
                          )}?text=${encodeURIComponent(
                            `Hello ${inq.name}, replying from Shiv Auto Service regarding your inquiry: "${inq.message}"`,
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-whatsapp-sm"
                        >
                          Reply on WhatsApp
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* 2. Emergency Breakdown Alerts View */}
      {activeAdminTab === "breakdowns" && (
        <div className="admin-view-stack">
          {breakdowns.length === 0 ? (
            <p className="empty-box-text">
              No emergency breakdown alerts received.
            </p>
          ) : (
            <div className="bookings-table-wrapper">
              <table className="bookings-table breakdown-theme">
                <thead>
                  <tr>
                    <th>Customer & Mobile</th>
                    <th>Bike Model</th>
                    <th>Breakdown Location</th>
                    <th>Issue</th>
                  </tr>
                </thead>
                <tbody>
                  {breakdowns.map((b) => (
                    <tr key={b.id || Math.random()}>
                      <td>
                        <p className="cust-name">{b.customerName}</p>
                        <a href={`tel:${b.mobile}`} className="cust-phone link">
                          {b.mobile}
                        </a>
                      </td>
                      <td>
                        <p className="service-name">{b.bikeModel}</p>
                      </td>
                      <td>
                        <p className="location-text">{b.location}</p>
                      </td>
                      <td>
                        <p className="issue-text">{b.issue}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* 3. Services List View */}
      {activeAdminTab === "services" && (
        <div className="admin-view-stack">
          <div className="section-title-row">
            <h3>Workshop Services Catalog</h3>
            <button
              onClick={() => setIsServiceModalOpen(true)}
              className="btn btn-add-service"
            >
              <Plus size={16} />
              <span>Add New Service</span>
            </button>
          </div>

          <div className="manager-cards-grid">
            {services.map((srv) => (
              <div key={srv.id} className="manager-item-card flex-between">
                <div>
                  <div className="manager-card-top">
                    <h4>{srv.title}</h4>
                    <span className="item-price">₹{srv.price}</span>
                  </div>
                  <p className="item-desc">{srv.description}</p>
                </div>

                <div className="card-action-bar">
                  <span className="cat-text">Category: {srv.category}</span>
                  <button
                    onClick={() => handleDeleteService(srv.id)}
                    className="btn-delete-sm"
                  >
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Spare Parts List View */}
      {activeAdminTab === "parts" && (
        <div className="admin-view-stack">
          <div className="section-title-row">
            <h3>Genuine Spare Parts Catalog</h3>
            <button
              onClick={() => setIsPartModalOpen(true)}
              className="btn btn-add-service"
            >
              <Plus size={16} />
              <span>Add New Spare Part</span>
            </button>
          </div>

          <div className="manager-cards-grid">
            {parts.map((prt) => (
              <div key={prt.id} className="manager-item-card flex-between">
                <div>
                  <div className="manager-card-top">
                    <div>
                      <span className="brand-tag">{prt.brand}</span>
                      <h4>{prt.name}</h4>
                    </div>
                    <span className="item-price">₹{prt.price}</span>
                  </div>
                  <p className="item-avail">{prt.availability}</p>
                </div>

                <div className="card-action-bar">
                  <span className="cat-text">Category: {prt.category}</span>
                  <button
                    onClick={() => handleDeletePart(prt.id)}
                    className="btn-delete-sm"
                  >
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Account Settings View (Update Credentials) */}
      {activeAdminTab === "settings" && (
        <div className="admin-view-stack">
          <div
            className="admin-modal-card"
            style={{ maxWidth: "500px", margin: "0 auto" }}
          >
            <h3
              style={{
                margin: "0 0 16px 0",
                color: "#003876",
                fontSize: "18px",
                fontWeight: "900",
              }}
            >
              Update Admin Login Credentials
            </h3>
            <form
              onSubmit={handleUpdateCredentials}
              className="modal-form-stack"
            >
              <div className="form-group-item">
                <label>Current Password * (Required for security check)</label>
                <input
                  type="password"
                  required
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>

              <div className="form-group-item">
                <label>New Username (Optional)</label>
                <input
                  type="text"
                  placeholder="Enter new username"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
              </div>

              <div className="form-group-item">
                <label>New Password (Optional)</label>
                <input
                  type="password"
                  placeholder="Enter new strong password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn-submit-modal"
                style={{ marginTop: "12px" }}
              >
                Update Credentials
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ADD NEW SERVICE MODAL */}
      {isServiceModalOpen && (
        <div className="modal-overlay">
          <div className="admin-modal-card">
            <div className="modal-header-row">
              <h3>+ Add New Service</h3>
              <button
                onClick={() => setIsServiceModalOpen(false)}
                className="btn-close-modal"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleAddServiceSubmit}
              className="modal-form-stack"
            >
              <div className="form-group-item">
                <label>Service Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BS6 FI Fuel Injector Cleaning"
                  value={newService.title}
                  onChange={(e) =>
                    setNewService({ ...newService, title: e.target.value })
                  }
                />
              </div>

              <div className="grid-2-col">
                <div className="form-group-item">
                  <label>Category</label>
                  <select
                    value={newService.category}
                    onChange={(e) =>
                      setNewService({
                        ...newService,
                        category: e.target.value,
                      })
                    }
                  >
                    <option value="Regular">Regular</option>
                    <option value="Oil">Oil</option>
                    <option value="Engine">Engine</option>
                    <option value="Brakes">Brakes</option>
                    <option value="Drivetrain">Drivetrain</option>
                    <option value="Transmission">Transmission</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Wheels">Wheels</option>
                    <option value="Detailing">Detailing</option>
                  </select>
                </div>

                <div className="form-group-item">
                  <label>Time Required</label>
                  <input
                    type="text"
                    placeholder="e.g. 45 Minutes"
                    value={newService.timeRequired}
                    onChange={(e) =>
                      setNewService({
                        ...newService,
                        timeRequired: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid-2-col">
                <div className="form-group-item">
                  <label>Offer Price (₹) *</label>
                  <input
                    type="number"
                    required
                    placeholder="399"
                    value={newService.price}
                    onChange={(e) =>
                      setNewService({ ...newService, price: e.target.value })
                    }
                  />
                </div>

                <div className="form-group-item">
                  <label>Original Price (₹)</label>
                  <input
                    type="number"
                    placeholder="599"
                    value={newService.originalPrice}
                    onChange={(e) =>
                      setNewService({
                        ...newService,
                        originalPrice: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="form-group-item">
                <label>Image URL (Optional)</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={newService.image}
                  onChange={(e) =>
                    setNewService({ ...newService, image: e.target.value })
                  }
                />
              </div>

              <div className="form-group-item">
                <label>Description *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Service details..."
                  value={newService.description}
                  onChange={(e) =>
                    setNewService({
                      ...newService,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <button
                type="submit"
                disabled={submittingService}
                className="btn-submit-modal"
              >
                {submittingService ? "Saving..." : "+ Save Service"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ADD NEW SPARE PART MODAL */}
      {isPartModalOpen && (
        <div className="modal-overlay">
          <div className="admin-modal-card">
            <div className="modal-header-row">
              <h3>+ Add New Spare Part</h3>
              <button
                onClick={() => setIsPartModalOpen(false)}
                className="btn-close-modal"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddPartSubmit} className="modal-form-stack">
              <div className="form-group-item">
                <label>Part Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Valvoline 4T Full Synthetic Oil 1L"
                  value={newPart.name}
                  onChange={(e) =>
                    setNewPart({ ...newPart, name: e.target.value })
                  }
                />
              </div>

              <div className="grid-2-col">
                <div className="form-group-item">
                  <label>Brand Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Valvoline / Amaron"
                    value={newPart.brand}
                    onChange={(e) =>
                      setNewPart({ ...newPart, brand: e.target.value })
                    }
                  />
                </div>

                <div className="form-group-item">
                  <label>Category</label>
                  <select
                    value={newPart.category}
                    onChange={(e) =>
                      setNewPart({ ...newPart, category: e.target.value })
                    }
                  >
                    <option value="Oil">Oil</option>
                    <option value="Chain Set">Chain Set</option>
                    <option value="Battery">Battery</option>
                    <option value="Spark Plug">Spark Plug</option>
                    <option value="Tyres">Tyres</option>
                    <option value="Brake Parts">Brake Parts</option>
                    <option value="Clutch Parts">Clutch Parts</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
              </div>

              <div className="grid-2-col">
                <div className="form-group-item">
                  <label>Price (₹) *</label>
                  <input
                    type="number"
                    required
                    placeholder="490"
                    value={newPart.price}
                    onChange={(e) =>
                      setNewPart({ ...newPart, price: e.target.value })
                    }
                  />
                </div>

                <div className="form-group-item">
                  <label>Availability</label>
                  <select
                    value={newPart.availability}
                    onChange={(e) =>
                      setNewPart({ ...newPart, availability: e.target.value })
                    }
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Limited Stock">Limited Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div className="form-group-item">
                <label>Image URL (Optional)</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={newPart.image}
                  onChange={(e) =>
                    setNewPart({ ...newPart, image: e.target.value })
                  }
                />
              </div>

              <div className="form-group-item">
                <label>Description</label>
                <textarea
                  rows={2}
                  placeholder="Part specifications..."
                  value={newPart.description}
                  onChange={(e) =>
                    setNewPart({ ...newPart, description: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                disabled={submittingPart}
                className="btn-submit-modal"
              >
                {submittingPart ? "Saving..." : "+ Save Spare Part"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
