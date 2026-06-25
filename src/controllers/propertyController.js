import { v2 as cloudinary } from 'cloudinary';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import * as propertyService from '../services/propertyService.js';
import { validationResult } from 'express-validator';
import streamifier from 'streamifier';

export const getAll = asyncHandler(async (req, res) => {
  const result = await propertyService.getProperties(req.query);

  res.status(200).json(
    new ApiResponse(200, 'Properties fetched', result)
  );
});

export const getById = asyncHandler(async (req, res) => {
  const property = await propertyService.getPropertyById(req.params.id);

  res.status(200).json(
    new ApiResponse(200, 'Property fetched', property)
  );
});

export const create = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array(),
    });
  }

  const property = await propertyService.createProperty(req.body);

  res.status(201).json(
    new ApiResponse(201, 'Property created', property)
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

  const property = await propertyService.updateProperty(req.params.id, req.body);

  res.status(200).json(
    new ApiResponse(200, 'Property updated', property)
  );
});

export const remove = asyncHandler(async (req, res) => {
  await propertyService.deleteProperty(req.params.id);

  res.status(200).json(
    new ApiResponse(200, 'Property deleted')
  );
});

export const toggleFeatured = asyncHandler(async (req, res) => {
  const property = await propertyService.toggleFeatured(req.params.id);

  res.status(200).json(
    new ApiResponse(200, 'Featured status toggled', property)
  );
});

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'khanbd/properties' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No image file provided',
    });
  }

  const result = await uploadToCloudinary(req.file.buffer);

  res.status(200).json(
    new ApiResponse(200, 'Image uploaded', {
      url: result.secure_url,
      publicId: result.public_id,
    })
  );
});
