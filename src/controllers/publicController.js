import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import * as propertyService from '../services/propertyService.js';
import * as categoryService from '../services/categoryService.js';
import * as placeService from '../services/placeService.js';
import * as contactService from '../services/contactService.js';
import * as enquiryService from '../services/enquiryService.js';
import { validationResult } from 'express-validator';

export const getProperties = asyncHandler(async (req, res) => {
  const result = await propertyService.getProperties(req.query);

  res.status(200).json(
    new ApiResponse(200, 'Properties fetched', result)
  );
});

export const getFeaturedProperties = asyncHandler(async (req, res) => {
  const properties = await propertyService.getFeaturedProperties();

  res.status(200).json(
    new ApiResponse(200, 'Featured properties fetched', properties)
  );
});

export const getPropertyBySlug = asyncHandler(async (req, res) => {
  const property = await propertyService.getPropertyBySlug(req.params.slug);

  res.status(200).json(
    new ApiResponse(200, 'Property fetched', property)
  );
});

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await categoryService.getAllCategories();

  res.status(200).json(
    new ApiResponse(200, 'Categories fetched', categories)
  );
});

export const getPlaces = asyncHandler(async (req, res) => {
  const places = await placeService.getAllPlaces();

  res.status(200).json(
    new ApiResponse(200, 'Places fetched', places)
  );
});

export const getContact = asyncHandler(async (req, res) => {
  const contact = await contactService.getContact();

  res.status(200).json(
    new ApiResponse(200, 'Contact details fetched', contact)
  );
});

export const createEnquiry = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array(),
    });
  }

  const enquiry = await enquiryService.createEnquiry(req.body);

  res.status(201).json(
    new ApiResponse(201, 'Enquiry submitted successfully', enquiry)
  );
});
