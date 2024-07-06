const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const { Error } = require("mongoose");
//@desc Get all contacts
//@route GET /api/contacts
//access public

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

//@desc create new contacts
//@route POST /api/contacts
//access public

const createContact = asyncHandler(async (req, res) => {
  console.log("Request body is:", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
  });
  res.status(201).json(contact);
});

//@desc Get all contacts
//@route GET /api/contacts/:id
//access public

// const getContact = asyncHandler(async(req, res) => {
//     const contact = await Contact.findById(req.params.id);
//     if (!contact) {
//         res.status(404).json({ error: "Contact not found" });
//         return;
//     }
//     res.status(200).json(contact);
// });

const getContact = asyncHandler(async (req, res) => {
  const contactId = req.params.id;

  try {
    const contact = await Contact.findById(contactId);

    if (!contact) {
      res.status(404).json({ error: "Contact not found" });
      return;
    }

    res.status(200).json(contact);
  } catch (error) {
    if (error instanceof CastError) {
      // Handle invalid ID format
      res.status(400).json({ error: "Invalid contact ID format" });
    } else {
      // Handle other errors
      console.error("Error fetching contact:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

//@desc update contacts
//@route PUT /api/contacts
//access public

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

//@desc Delete contacts
//@route DELETE /api/contacts
//access public

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
