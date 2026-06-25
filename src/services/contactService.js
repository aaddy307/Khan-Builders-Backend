import Contact from '../models/Contact.js';
import ApiError from '../utils/ApiError.js';

export const getContact = async () => {
  let contact = await Contact.findOne();
  if (!contact) {
    contact = await Contact.create({
      phone: [],
      email: [],
      address: '',
      businessHours: [],
      socialLinks: {},
    });
  }
  return contact;
};

export const updateContact = async (data) => {
  let contact = await Contact.findOne();
  if (!contact) {
    contact = await Contact.create(data);
  } else {
    Object.assign(contact, data);
    await contact.save();
  }
  return contact;
};
