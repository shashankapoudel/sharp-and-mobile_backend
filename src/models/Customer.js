const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    bookingsCount: {
      type: Number,
      default: 0,
    },

    rewardsClaimed: {
      type: Number,
      default: 0,
    },

    availableRewards: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Customer", CustomerSchema);
