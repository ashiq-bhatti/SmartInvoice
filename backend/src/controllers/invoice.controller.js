import invoiceModel from "../models/invoice.model.js";

export const createInvoice = async (req, res) => {
  try {
    const { clientName, items } = req.body;

    const totalAmount = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    const invoice = await invoiceModel.create({
      clientName,
      items,
      totalAmount,
      user: req.user._id,
    });
    res
      .status(201)
      .json({ success: true, msg: "Invoice Created Successfully!", invoice });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const getInvoices = async (req, res) => {
  try {
    const invoices = await invoiceModel.find({ user: req.user._id });

    res.status(200).json({ success: true, count: invoices.length, invoices });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const getSingleInvoice = async (req, res) => {
  try {
    const invoice = await invoiceModel.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!invoice) {
      return res.status(404).json({
        success: false,
        msg: "Invoice not found",
      });
    }
    res.status(200).json({ success: true, invoice });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const updateInvoiceStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const invoice = await invoiceModel.findByIdAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      { status },
      { new: true },
    );

    if (!invoice) {
      return res.status(404).json({
        success: false,
        msg: "Invoice not found",
      });
    }
    res
      .status(200)
      .json({ success: true, msg: "Invoice status updated", invoice });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const deleteInvoice = async (req, res) => {
  try {
    const invoice = await invoiceModel.findByIdAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!invoice) {
      return res.status(404).json({
        success: false,
        msg: "Invoice not found",
      });
    }
    res.status(200).json({ success: true, msg: "Invoice deleted", });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};
