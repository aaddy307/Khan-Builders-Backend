import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import * as categoryService from '../services/categoryService.js';
import { validationResult } from 'express-validator';

export const getAll = asyncHandler(async (req, res) => {
  const result = await categoryService.getCategories(req.query);

  res.status(200).json(
    new ApiResponse(200, 'Categories fetched', result)
  );
});

export const getAllList = asyncHandler(async (req, res) => {
  const categories = await categoryService.getAllCategories();

  res.status(200).json(
    new ApiResponse(200, 'Categories fetched', categories)
  );
});

export const getById = asyncHandler(async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.id);

  res.status(200).json(
    new ApiResponse(200, 'Category fetched', category)
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

  const category = await categoryService.createCategory(req.body);

  res.status(201).json(
    new ApiResponse(201, 'Category created', category)
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

  const category = await categoryService.updateCategory(req.params.id, req.body);

  res.status(200).json(
    new ApiResponse(200, 'Category updated', category)
  );
});

export const remove = asyncHandler(async (req, res) => {
  await categoryService.deleteCategory(req.params.id);

  res.status(200).json(
    new ApiResponse(200, 'Category deleted')
  );
});
