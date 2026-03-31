import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const invoiceSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true,
    },
    items: [itemSchema],
    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      required: true,
      enum: ["pending", "paid"],
      default: "pending",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

export default  mongoose.model("invoice", invoiceSchema);
