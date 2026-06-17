const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },

    serviceName: String,

    date: Date,

    time: String,

    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Booking", BookingSchema);
