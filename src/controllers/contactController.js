import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import * as contactService from '../services/contactService.js';

export const getContact = asyncHandler(async (req, res) => {
  const contact = await contactService.getContact();

  res.status(200).json(
    new ApiResponse(200, 'Contact details fetched', contact)
  );
});

export const updateContact = asyncHandler(async (req, res) => {
  const contact = await contactService.updateContact(req.body);

  res.status(200).json(
    new ApiResponse(200, 'Contact details updated', contact)
  );
});
