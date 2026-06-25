import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import * as placeService from '../services/placeService.js';
import { validationResult } from 'express-validator';

export const getAll = asyncHandler(async (req, res) => {
  const result = await placeService.getPlaces(req.query);

  res.status(200).json(
    new ApiResponse(200, 'Places fetched', result)
  );
});

export const getAllList = asyncHandler(async (req, res) => {
  const places = await placeService.getAllPlaces();

  res.status(200).json(
    new ApiResponse(200, 'Places fetched', places)
  );
});

export const getById = asyncHandler(async (req, res) => {
  const place = await placeService.getPlaceById(req.params.id);

  res.status(200).json(
    new ApiResponse(200, 'Place fetched', place)
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

  const place = await placeService.createPlace(req.body);

  res.status(201).json(
    new ApiResponse(201, 'Place created', place)
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

  const place = await placeService.updatePlace(req.params.id, req.body);

  res.status(200).json(
    new ApiResponse(200, 'Place updated', place)
  );
});

export const remove = asyncHandler(async (req, res) => {
  await placeService.deletePlace(req.params.id);

  res.status(200).json(
    new ApiResponse(200, 'Place deleted')
  );
});
