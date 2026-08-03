import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";

// Components
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import FloatingControls from "./components/FloatingControls.jsx";
import AiAdvisorModal from "./components/AiAdvisorModal.jsx";

// Pages
import Home from "./pages/Home.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import SparePartsPage from "./pages/SparePartsPage.jsx";
import EmergencyPage from "./pages/EmergencyPage.jsx";
import HealthCheckPage from "./pages/HealthCheckPage.jsx";
import OffersPage from "./pages/OffersPage.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";
import ReviewsPage from "./pages/ReviewsPage.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Modals & Navigation State
  const [aiAdvisorOpen, setAiAdvisorOpen] = useState(false);

  // Dynamic States (Direct from Database)
  const [services, setServices] = useState([]);
  const [parts, setParts] = useState([]);
  const [offers, setOffers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  // Fetch Live Data from MongoDB API on initial load
  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchAllData = async () => {
      try {
        const [servicesRes, partsRes, offersRes, reviewsRes, blogsRes] =
          await Promise.all([
            fetch(`${API_BASE_URL}/api/services`)
              .then((res) => res.json())
              .catch(() => ({ success: false })),
            fetch(`${API_BASE_URL}/api/parts`)
              .then((res) => res.json())
              .catch(() => ({ success: false })),
            fetch(`${API_BASE_URL}/api/offers`)
              .then((res) => res.json())
              .catch(() => ({ success: false })),
            fetch(`${API_BASE_URL}/api/reviews`)
              .then((res) => res.json())
              .catch(() => ({ success: false })),
            fetch(`${API_BASE_URL}/api/blogs`)
              .then((res) => res.json())
              .catch(() => ({ success: false })),
          ]);

        if (servicesRes && servicesRes.success)
          setServices(servicesRes.data || []);
        if (partsRes && partsRes.success) setParts(partsRes.data || []);
        if (offersRes && offersRes.success) setOffers(offersRes.data || []);
        if (reviewsRes && reviewsRes.success) setReviews(reviewsRes.data || []);
        if (blogsRes && blogsRes.success) setBlogs(blogsRes.data || []);
      } catch (err) {
        console.error("Error fetching live MongoDB data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [location.pathname]);

  const pathClean = location.pathname.replace(/^\/+/, "").toLowerCase();
  const activeTab = pathClean === "shivadmin" ? "admin" : pathClean || "home";

  const changeTab = (tab) => {
    let target = "/";
    if (tab === "admin" || tab === "shivadmin") {
      target = "/shivadmin";
    } else if (tab !== "home") {
      target = `/${tab}`;
    }
    if (location.pathname.toLowerCase() !== target.toLowerCase()) {
      navigate(target);
    }
  };

  const handleDirectWhatsApp = (serviceName) => {
    const text = encodeURIComponent(
      `Hello Shiv Auto Service! I want to inquire for: ${serviceName || "Bike Repair"}`,
    );
    window.open(`https://wa.me/917408998188?text=${text}`, "_blank");
  };

  const handleAddReview = (newReview) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  const handleServiceAdded = (newService) => {
    setServices((prev) => [newService, ...prev]);
  };

  const handleServiceDeleted = (serviceId) => {
    setServices((prev) => prev.filter((srv) => srv.id !== serviceId));
  };

  const handlePartAdded = (newPart) => {
    setParts((prev) => [newPart, ...prev]);
  };

  const handlePartDeleted = (partId) => {
    setParts((prev) => prev.filter((p) => p.id !== partId));
  };
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem("shiv_admin_session") === "true";
  });

  // Admin Login & Logout Handlers
  const handleAdminLogin = () => {
    localStorage.setItem("shiv_admin_session", "true");
    setIsAdminLoggedIn(true);
  };

  const handleAdminLogout = () => {
    localStorage.removeItem("shiv_admin_session");
    setIsAdminLoggedIn(false);
  };
  return (
    <div className="app-layout">
      <Navbar
        activeTab={activeTab}
        setActiveTab={changeTab}
        onOpenAiAdvisor={() => setAiAdvisorOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                services={services}
                reviews={reviews}
                setActiveTab={changeTab}
                onOpenAiAdvisor={() => setAiAdvisorOpen(true)}
              />
            }
          />
          <Route path="/about" element={<AboutUs setActiveTab={changeTab} />} />
          <Route
            path="/services"
            element={
              <ServicesPage
                services={services}
                onSelectServiceForBooking={handleDirectWhatsApp}
              />
            }
          />
          <Route
            path="/spare-parts"
            element={<SparePartsPage parts={parts} />}
          />
          <Route path="/emergency" element={<EmergencyPage />} />
          <Route
            path="/health-check"
            element={
              <HealthCheckPage
                onBookServiceWithIssue={(issueMsg) =>
                  handleDirectWhatsApp(`Diagnostic Issue: ${issueMsg}`)
                }
              />
            }
          />
          <Route
            path="/offers"
            element={
              <OffersPage
                offers={offers}
                onBookServiceWithCoupon={(couponCode) =>
                  handleDirectWhatsApp(`Coupon Code Offer: ${couponCode}`)
                }
              />
            }
          />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route
            path="/reviews"
            element={
              <ReviewsPage reviews={reviews} onAddReview={handleAddReview} />
            }
          />
          <Route path="/blog" element={<BlogPage blogs={blogs} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/shivadmin"
            element={
              <AdminPage
                services={services}
                parts={parts}
                onServiceAdded={handleServiceAdded}
                onServiceDeleted={handleServiceDeleted}
                onPartAdded={handlePartAdded}
                onPartDeleted={handlePartDeleted}
                isAdminLoggedIn={isAdminLoggedIn}
                onLoginSuccess={handleAdminLogin}
                onLogout={handleAdminLogout}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer setActiveTab={changeTab} />
      <FloatingControls onEmergencyClick={() => changeTab("emergency")} />
      <AiAdvisorModal
        isOpen={aiAdvisorOpen}
        onClose={() => setAiAdvisorOpen(false)}
        onBookServiceWithIssue={(issue) =>
          handleDirectWhatsApp(`Diagnostic Issue: ${issue}`)
        }
      />
    </div>
  );
}
