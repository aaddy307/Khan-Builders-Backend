import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import * as enquiryService from '../services/enquiryService.js';

export const getAll = asyncHandler(async (req, res) => {
  const result = await enquiryService.getEnquiries(req.query);

  res.status(200).json(
    new ApiResponse(200, 'Enquiries fetched', result)
  );
});

export const getById = asyncHandler(async (req, res) => {
  const enquiry = await enquiryService.getEnquiryById(req.params.id);

  res.status(200).json(
    new ApiResponse(200, 'Enquiry fetched', enquiry)
  );
});


export const update = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array(),
    });
  }

  const enquiry = await enquiryService.updateEnquiry(req.params.id, req.body);

  res.status(200).json(
    new ApiResponse(200, 'Enquiry updated', enquiry)
  );
});

export const remove = asyncHandler(async (req, res) => {
  await enquiryService.deleteEnquiry(req.params.id);

  res.status(200).json(
    new ApiResponse(200, 'Enquiry deleted')
  );
});
