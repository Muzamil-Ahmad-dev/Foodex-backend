import * as ContactService from "./contact.service.js";

// Submit contact form
export const submitContact = async (req, res) => {
  try {
    const contact = await ContactService.createContact(req.body);
    res.status(201).json({
      success: true,
      message: "Query submitted successfully",
      data: contact,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all queries (Admin)
export const getContacts = async (req, res) => {
  try {
    const contacts = await ContactService.getAllContacts();
    res.json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get single query by ID
export const getContact = async (req, res) => {
  try {
    const contact = await ContactService.getContactById(req.params.id);
    if (!contact) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Admin respond & status update
export const respondContact = async (req, res) => {
  try {
    const { response, status } = req.body;
    const updatedContact = await ContactService.updateContactResponse(
      req.params.id,
      response,
      status
    );
    if (!updatedContact)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: updatedContact });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete contact
export const deleteContact = async (req, res) => {
  try {
    const deleted = await ContactService.deleteContact(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};