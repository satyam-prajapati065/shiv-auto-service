import React, { useState } from "react";
import { Camera, X, Image as ImageIcon } from "lucide-react";
import "../styles/gallery.css";

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxImg, setLightboxImg] = useState(null);

  const galleryItems = [
    {
      id: 1,
      title: "Valvoline Express Oil Bay",
      category: "Workshop",
      image:
        "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
      description:
        "Dedicated quick service bay for 30-minute Valvoline engine oil replacement.",
    },
    {
      id: 2,
      title: "Hydraulic Bike Lift Setup",
      category: "Equipment",
      image:
        "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80",
      description:
        "Professional hydraulic lifts for ergonomic 25-point bike inspection.",
    },
    {
      id: 3,
      title: "Royal Enfield Engine Overhaul",
      category: "Repairs",
      image:
        "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80",
      description:
        "Complete piston ring and valve seal restoration using genuine spares.",
    },
    {
      id: 4,
      title: "High Pressure Foam Wash",
      category: "Washing",
      image:
        "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
      description: "Snow foam washing with pressure rinse for grease removal.",
    },
    {
      id: 5,
      title: "100% Original Spares Rack",
      category: "Spare Parts",
      image:
        "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80",
      description:
        "Fully stocked shelf of genuine OEM filters, brake pads, and Valvoline oils.",
    },
    {
      id: 6,
      title: "Yamaha R15 Brake System Tuning",
      category: "Repairs",
      image:
        "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80",
      description: "Disc brake fluid flushing and caliper pad alignment.",
    },
  ];

  const categories = [
    "All",
    "Workshop",
    "Equipment",
    "Repairs",
    "Washing",
    "Spare Parts",
  ];

  const filteredItems =
    activeFilter === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <div className="contact-page-container section-padding gallery-wrapper">
      {/* Title Header */}
      <div className="page-header-center">
        <span className="header-badge blue">WORKSHOP PHOTO GALLERY</span>
        <h1 className="page-title">Inside Shiv Auto Service Workshop</h1>
        <p className="page-subtitle">
          Take a visual tour of our Valvoline Bike Xpert facilities, modern
          hydraulic lifts, genuine parts inventory, and completed bike repairs.
        </p>
      </div>

      {/* Filter Pills */}
      <div className="gallery-filter-bar">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setActiveFilter(cat)}
            className={`gallery-filter-btn ${activeFilter === cat ? "active" : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="gallery-grid">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setLightboxImg(item)}
            className="gallery-card"
          >
            <div className="gallery-img-box">
              <img src={item.image} alt={item.title} />
              <div className="gallery-overlay">
                <Camera size={24} color="#ffffff" />
                <span>View Photo</span>
              </div>
              <span className="gallery-cat-badge">{item.category}</span>
            </div>

            <div className="gallery-card-body">
              <h3 className="gallery-card-title">{item.title}</h3>
              <p className="gallery-card-desc">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Pop-up Modal */}
      {lightboxImg && (
        <div className="modal-overlay" onClick={() => setLightboxImg(null)}>
          <div className="lightbox-card" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-img-wrapper">
              <img src={lightboxImg.image} alt={lightboxImg.title} />
              <button
                onClick={() => setLightboxImg(null)}
                className="btn-close-lightbox"
              >
                <X size={20} />
              </button>
            </div>

            <div className="lightbox-body">
              <span className="gallery-cat-badge">{lightboxImg.category}</span>
              <h2>{lightboxImg.title}</h2>
              <p>{lightboxImg.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
