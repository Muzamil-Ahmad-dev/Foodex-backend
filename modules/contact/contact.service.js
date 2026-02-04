import Contact from "./contact.model.js";

export const createContact = async (data) => {
  const contact = await Contact.create(data);
  return contact;
};

export const getAllContacts = async () => {
  return await Contact.find().sort({ createdAt: -1 });
};

export const getContactById = async (id) => {
  return await Contact.findById(id);
};

export const updateContactResponse = async (id, response, status) => {
  return await Contact.findByIdAndUpdate(
    id,
    { response, status },
    { new: true }
  );
};

export const deleteContact = async (id) => {
  return await Contact.findByIdAndDelete(id);
};