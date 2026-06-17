const Booking = require("../models/Booking");
const Customer = require("../models/Customer");
const { ApiError } = require("../utils/ApiError");
const ApiResponse = require("../utils/Apiresponse");
const asyncHandler = require("../utils/AsyncHandler");

const createBooking = asyncHandler(async (req, res) => {
  const { name, email, serviceName, date, time } = req.body;

  let customer = await Customer.findOne({ email });
  if (!customer) {
    customer = await Customer.create({
      name,
      email,
      bookingsCount: 0,
      availableRewards: 0,
      rewardsClaimed: 0,
    });
  }
  customer.bookingsCount += 1;

  if (customer.bookingsCount % 5 === 0) {
    customer.availableRewards += 1;
  }

  await customer.save();

  const booking = await Booking.create({
    customer: customer._id,
    serviceName,
    date,
    time,
  });

  res
    .status(201)
    .json(new ApiResponse(201, booking, "Booking Created Successfully"));
});

const claimReward = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const customer = await Customer.findOne({ email });

  if (!customer) {
    throw new ApiError(404, "Customer not found");
  }

  if (customer.availableRewards <= 0) {
    return res.status(201).json(new ApiResponse(200, "No rewards available"));
  }

  customer.availableRewards -= 1;
  customer.rewardsClaimed += 1;

  await customer.save();

  res.status(201).json(new ApiResponse(201, "Reward Claimed"));
});

module.exports = { createBooking, claimReward };
