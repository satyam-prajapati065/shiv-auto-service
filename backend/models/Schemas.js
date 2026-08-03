const mongoose = require("mongoose");

// Customer Inquiry Schema
const inquirySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Emergency Breakdown Schema
const breakdownSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  mobile: { type: String, required: true },
  bikeModel: { type: String, default: "Not Specified" },
  location: { type: String, required: true },
  issue: { type: String, default: "Breakdown" },
  status: { type: String, default: "Active Breakdown" },
  createdAt: { type: Date, default: Date.now },
});

const Inquiry = mongoose.model("Inquiry", inquirySchema);
const Breakdown = mongoose.model("Breakdown", breakdownSchema);

module.exports = { Inquiry, Breakdown };
