import React, { useState } from "react";
import { BookOpen, Clock, Calendar, Search, ArrowRight, X } from "lucide-react";
import "../styles/blog.css";

export default function BlogPage({ blogs }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);

  const filteredBlogs = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="contact-page-container section-padding blog-wrapper">
      {/* Title Header */}
      <div className="page-header-center">
        <span className="header-badge red">VALVOLINE MECHANIC GUIDES</span>
        <h1 className="page-title">Two-Wheeler Maintenance & Care Blog</h1>
        <p className="page-subtitle">
          Expert tips on engine oil changes, BS6 FI troubleshooting, brake
          maintenance, and maximizing bike mileage from master mechanics.
        </p>
      </div>

      {/* Search Bar */}
      <div className="blog-search-card">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search articles (e.g. Engine Oil, Mileage, Brake)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="btn-clear-search"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Blog Cards Grid */}
      {filteredBlogs.length === 0 ? (
        <div className="empty-blog">
          <BookOpen size={40} className="empty-icon" />
          <h3>No articles found matching your search</h3>
          <button
            onClick={() => setSearchQuery("")}
            className="btn-clear-filter"
          >
            Reset Search
          </button>
        </div>
      ) : (
        <div className="blog-grid">
          {filteredBlogs.map((post) => (
            <div key={post.id} className="blog-card">
              <div className="blog-img-box">
                <img src={post.image} alt={post.title} />
                <span className="blog-cat-badge">{post.category}</span>
                <span className="blog-time-badge">
                  <Clock size={12} color="#f59e0b" /> {post.readTime}
                </span>
              </div>

              <div className="blog-card-body">
                <div className="blog-date">
                  <Calendar size={12} color="#64748b" />
                  <span>{post.date}</span>
                </div>

                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>

                <button
                  onClick={() => setSelectedBlog(post)}
                  className="btn-read-more"
                >
                  <span>Read Full Article</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Article Detail Modal */}
      {selectedBlog && (
        <div className="modal-overlay" onClick={() => setSelectedBlog(null)}>
          <div className="blog-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="blog-modal-banner">
              <img src={selectedBlog.image} alt={selectedBlog.title} />
              <button
                onClick={() => setSelectedBlog(null)}
                className="btn-close-blog-modal"
              >
                <X size={18} />
              </button>
              <div className="blog-banner-overlay">
                <span className="blog-cat-badge">{selectedBlog.category}</span>
                <h2>{selectedBlog.title}</h2>
              </div>
            </div>

            <div className="blog-modal-body">
              <div className="blog-modal-meta">
                <span>
                  <Calendar size={14} /> {selectedBlog.date}
                </span>
                <span>
                  <Clock size={14} /> {selectedBlog.readTime}
                </span>
              </div>

              <div className="blog-modal-content">
                <p>{selectedBlog.content}</p>
                <p className="blog-tip-box">
                  💡 <strong>Shiv Auto Service Pro-Tip:</strong> Always use 100%
                  genuine Valvoline 4T oils certified for your motorcycle's
                  exact engine displacement (100cc to 350cc+).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
