import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// ==========================================================================
// 1. MONGODB DATABASE CONNECTION
// ==========================================================================
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://satyamprajapati065_db_user:satyam1234@shivautoservice.yn3jqj3.mongodb.net/shiv_auto_db?retryWrites=true&w=majority";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB Database Connected Successfully!"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// MongoDB Schemas & Models
const serviceSchema = new mongoose.Schema({
  id: String,
  title: String,
  category: String,
  price: Number,
  originalPrice: Number,
  timeRequired: String,
  image: String,
  description: String,
  highlights: [String],
});

const partSchema = new mongoose.Schema({
  id: String,
  name: String,
  category: String,
  price: Number,
  brand: String,
  availability: String,
  rating: Number,
  image: String,
  description: String,
});

const offerSchema = new mongoose.Schema({
  id: String,
  title: String,
  discount: String,
  code: String,
  description: String,
  validTill: String,
  badge: String,
});

const reviewSchema = new mongoose.Schema({
  id: String,
  name: String,
  bikeModel: String,
  rating: Number,
  date: String,
  comment: String,
  verified: Boolean,
  createdAt: { type: Date, default: Date.now },
});

const blogSchema = new mongoose.Schema({
  id: String,
  title: String,
  category: String,
  date: String,
  readTime: String,
  image: String,
  excerpt: String,
  content: String,
});

const inquirySchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const breakdownSchema = new mongoose.Schema({
  id: { type: String, required: true },
  customerName: { type: String, required: true },
  mobile: { type: String, required: true },
  bikeModel: { type: String, default: "Bike Breakdown" },
  location: { type: String, required: true },
  issue: { type: String, default: "General Breakdown" },
  status: { type: String, default: "Urgent Alert Sent to Mechanic" },
  createdAt: { type: Date, default: Date.now },
});

const Service = mongoose.model("Service", serviceSchema);
const Part = mongoose.model("Part", partSchema);
const Offer = mongoose.model("Offer", offerSchema);
const Review = mongoose.model("Review", reviewSchema);
const Blog = mongoose.model("Blog", blogSchema);
const Inquiry = mongoose.model("Inquiry", inquirySchema);
const Breakdown = mongoose.model("Breakdown", breakdownSchema);

// ==========================================================================
// 2. INITIALIZE GEMINI AI CLIENT
// ==========================================================================
const GEMINI_KEY =
  process.env.GEMINI_API_KEY ||
  "AQ.Ab8RN6LHSphYb5jmvZ7uSMyqnIsP3p0nsSZ6KRT1ssr5fui0wg";

let aiClient = null;
try {
  aiClient = new GoogleGenAI({ apiKey: GEMINI_KEY });
} catch (err) {
  console.warn("Gemini API Init Warning:", err.message);
}

/* ==========================================================================
   API ENDPOINTS
   ========================================================================== */

// 1. Services API (Fetch, Add, Delete)
app.get("/api/services", async (req, res) => {
  try {
    const services = await Service.find();
    res.json({ success: true, data: services });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message, data: [] });
  }
});

app.post("/api/services", async (req, res) => {
  const {
    title,
    category,
    price,
    originalPrice,
    timeRequired,
    image,
    description,
    highlights,
  } = req.body;
  if (!title || !price) {
    return res
      .status(400)
      .json({ success: false, error: "Title and Price are required" });
  }

  try {
    const newService = new Service({
      id: `srv-${Date.now()}`,
      title,
      category: category || "Regular",
      price: Number(price),
      originalPrice: Number(originalPrice) || Number(price) + 150,
      timeRequired: timeRequired || "1 Hour",
      image:
        image ||
        "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
      description: description || "Professional Service",
      highlights: highlights || ["100% Genuine Parts", "Certified Mechanics"],
    });

    await newService.save();
    res.status(201).json({ success: true, data: newService });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete("/api/services/:id", async (req, res) => {
  try {
    await Service.findOneAndDelete({ id: req.params.id });
    res.json({ success: true, message: "Service deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. Spare Parts API
app.get("/api/parts", async (req, res) => {
  try {
    const parts = await Part.find();
    res.json({ success: true, data: parts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message, data: [] });
  }
});

// 3. Offers API
app.get("/api/offers", async (req, res) => {
  try {
    const offers = await Offer.find();
    res.json({ success: true, data: offers });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message, data: [] });
  }
});

// 4. Customer Reviews API (Fetch & Post)
app.get("/api/reviews", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json({ success: true, data: reviews });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message, data: [] });
  }
});

app.post("/api/reviews", async (req, res) => {
  const { name, bikeModel, rating, comment } = req.body;
  if (!name || !comment) {
    return res
      .status(400)
      .json({ success: false, error: "Name and Comment are required." });
  }

  try {
    const newReview = new Review({
      id: `rev-${Date.now()}`,
      name,
      bikeModel: bikeModel || "Bike Owner",
      rating: Number(rating) || 5,
      date: "Just now",
      comment,
      verified: true,
    });

    await newReview.save();
    res.status(201).json({ success: true, data: newReview });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to submit review." });
  }
});

// 5. Blogs API
app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json({ success: true, data: blogs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message, data: [] });
  }
});

// 6. Contact Inquiries
app.get("/api/inquiries", async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, data: inquiries });
  } catch (err) {
    res.json({ success: true, data: [] });
  }
});

app.post("/api/inquiries", async (req, res) => {
  const { name, mobile, message } = req.body;
  if (!name || !mobile || !message) {
    return res
      .status(400)
      .json({ success: false, error: "All fields are required." });
  }

  try {
    const newInquiry = new Inquiry({
      id: `INQ-${Math.floor(100 + Math.random() * 900)}`,
      name,
      mobile,
      message,
    });
    await newInquiry.save();
    res.status(201).json({ success: true, data: newInquiry });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to save inquiry." });
  }
});

// 7. Emergency Roadside Breakdown
app.get("/api/breakdowns", async (req, res) => {
  try {
    const breakdowns = await Breakdown.find().sort({ createdAt: -1 });
    res.json({ success: true, data: breakdowns });
  } catch (err) {
    res.json({ success: true, data: [] });
  }
});

app.post("/api/breakdown", async (req, res) => {
  const { customerName, mobile, bikeModel, location, issue } = req.body;
  if (!customerName || !mobile || !location) {
    return res.status(400).json({
      success: false,
      error: "Name, Mobile, and Location are required.",
    });
  }

  try {
    const newBreakdown = new Breakdown({
      id: `EMG-${Math.floor(100 + Math.random() * 900)}`,
      customerName,
      mobile,
      bikeModel: bikeModel || "Bike Breakdown",
      location,
      issue: issue || "Roadside Breakdown",
    });

    await newBreakdown.save();
    res.status(201).json({ success: true, data: newBreakdown });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to log breakdown." });
  }
});

// 8. Valvoline AI Advisor
app.post("/api/ai-advisor", async (req, res) => {
  const { userQuery, bikeModel } = req.body;

  if (!userQuery) {
    return res
      .status(400)
      .json({ success: false, error: "Please describe your bike issue." });
  }

  if (aiClient) {
    try {
      const response = await aiClient.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `You are the master mechanic assistant at "Valvoline Bike Xpert - Shiv Auto Service". 
Customer Bike Model: ${bikeModel || "Two Wheeler"}
Customer Issue: "${userQuery}"

Provide a friendly, expert diagnostic breakdown in bullet points in simple Hinglish/English.
Cover:
1. Likely Root Cause
2. Recommended Valvoline Product / Repair Service
3. Estimated Repair Time
4. Safety Urgency (Low / Medium / High)

Keep it concise, clear, and reassuring. End with a recommendation to contact Shiv Auto Service.`,
      });

      if (response && response.text) {
        return res.json({ success: true, advice: response.text });
      }
    } catch (err) {
      console.error("Gemini AI error:", err.message);
    }
  }

  const queryLower = userQuery.toLowerCase();
  let cause = "General engine or electrical wear.";
  let recService = "General Bike Service & 20-Point Inspection";
  let recProduct = "Valvoline Champ 4T 20W-40 Synthetic Blend Oil";
  let time = "1 - 2 Hours";
  let urgency = "Medium";

  if (queryLower.includes("start") || queryLower.includes("self")) {
    cause = "Battery voltage drop, fouled spark plug, or starter relay issue.";
    recService = "Electrical & Battery Testing Service";
    recProduct = "Amaron VRLA Battery & Bosch Spark Plug";
    time = "30 Minutes";
    urgency = "High";
  }

  const ruleAdvice = `🔧 **Shiv Auto Service Diagnostic Advice for ${bikeModel || "Your Bike"}**:

• **Possible Root Cause**: ${cause}
• **Recommended Service**: ${recService}
• **Recommended Valvoline/OEM Product**: ${recProduct}
• **Estimated Workshop Time**: ${time}
• **Safety Priority**: ${urgency}`;

  res.json({ success: true, advice: ruleAdvice });
});

// Admin Authentication
app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  if (password === "admin123" || password === "shiv123") {
    res.json({ success: true, token: "SHIV-ADMIN-AUTH-OK" });
  } else {
    res
      .status(401)
      .json({ success: false, error: "Invalid Admin Credentials!" });
  }
});

// Add New Spare Part (Admin Only)
app.post("/api/parts", async (req, res) => {
  const {
    name,
    category,
    price,
    brand,
    availability,
    rating,
    image,
    description,
  } = req.body;

  if (!name || !price) {
    return res
      .status(400)
      .json({ success: false, error: "Name and Price are required!" });
  }

  try {
    const newPart = new Part({
      id: `prt-${Date.now()}`,
      name,
      category: category || "Spare Part",
      price: Number(price),
      brand: brand || "Generic",
      availability: availability || "In Stock",
      rating: Number(rating) || 5.0,
      image:
        image ||
        "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80",
      description: description || "Genuine OEM Spare Part",
    });

    await newPart.save();
    res.status(201).json({ success: true, data: newPart });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Delete Spare Part (Admin Only)
app.delete("/api/parts/:id", async (req, res) => {
  try {
    await Part.findOneAndDelete({ id: req.params.id });
    res.json({ success: true, message: "Part deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Admin Schema & Model
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, default: "admin" },
  password: { type: String, required: true, default: "admin123" },
});
const Admin = mongoose.model("Admin", adminSchema);

// Admin Login Route (Username & Password Check)
app.post("/api/admin/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, error: "Username and Password are required!" });
  }

  try {
    let admin = await Admin.findOne();
    if (!admin) {
      // First time initial setup
      admin = new Admin({ username: "admin", password: "admin123" });
      await admin.save();
    }

    if (username === admin.username && password === admin.password) {
      res.json({
        success: true,
        token: "SHIV-ADMIN-AUTH-OK",
        username: admin.username,
      });
    } else {
      res
        .status(401)
        .json({ success: false, error: "Invalid Username or Password!" });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: "Authentication failed." });
  }
});

// Update Admin Username & Password Route
app.put("/api/admin/update-credentials", async (req, res) => {
  const { newUsername, newPassword, currentPassword } = req.body;

  try {
    let admin = await Admin.findOne();
    if (!admin) {
      admin = new Admin({ username: "admin", password: "admin123" });
      await admin.save();
    }

    if (currentPassword !== admin.password) {
      return res
        .status(400)
        .json({ success: false, error: "Incorrect current password!" });
    }

    if (newUsername) admin.username = newUsername;
    if (newPassword) admin.password = newPassword;

    await admin.save();
    res.json({
      success: true,
      message: "Credentials updated successfully!",
      username: admin.username,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Start Server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Shiv Auto Service Server listening on http://localhost:${PORT}`);
});
